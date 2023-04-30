package com.company.userservice.controller;

import com.company.userservice.dto.*;
import com.company.userservice.model.User;
import com.company.userservice.service.UserService;
import com.company.userservice.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final FileUtil fileUtil;

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }

    @PostMapping("/login")
    public Long loginUser(@RequestBody @Valid LoginRequest loginRequest) {
        Optional<User> user = userService.getUserByUsernameOrEmail(loginRequest.getUsernameOrEmail());
        if (!user.isPresent() || !user.get().getPassword().equals(loginRequest.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username/email or password");
        }
        return user.get().getId();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@RequestBody @Valid UserRequest userRequest) {
        if (userService.isEmailExists(userRequest.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with this email already exists");
        }
        if (userService.isUsernameExists(userRequest.getUsername())) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Account with this username already exists");
        }
        User user = modelMapper.map(userRequest, User.class);
        byte[] userAvatar = getByteArrayFromBase64(userRequest.getAvatarBase64());
        userService.saveUser(user, userAvatar);
    }

    @PatchMapping("/profile")
    public void updateUserProfile(@RequestBody @Valid UpdateUserInfoDto userInfoDto,
                                      @RequestHeader("X-auth-user-id") Long userId) {
        User loggedInUser = userService.getUserById(userId).get();
        if (!loggedInUser.getEmail().equals(userInfoDto.getEmail()) && userService.isEmailExists(userInfoDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with this email already exists");
        }
        if (!loggedInUser.getUsername().equals(userInfoDto.getUsername()) && userService.isUsernameExists(userInfoDto.getUsername())) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Account with this username already exists");
        }
        User user = modelMapper.map(userInfoDto, User.class);
        byte[] userAvatar = getByteArrayFromBase64(userInfoDto.getAvatarBase64());
        userService.updateUser(userId, user, userAvatar);
    }

    @PatchMapping("/password")
    public void updateUserPassword(@RequestBody @Valid UpdatePasswordDto passwordDto,
                                   @RequestHeader("X-auth-user-id") Long userId) {
        User loggedInUser = userService.getUserById(userId).get();
        if (!loggedInUser.getPassword().equals(passwordDto.getOldPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong old password");
        }
        userService.updateUserPassword(userId, passwordDto.getNewPassword());
    }

    private byte[] getByteArrayFromBase64(String fileBase64) {
        byte[] file = null;
        if (StringUtils.isNotBlank(fileBase64)) {
            file = fileUtil.decodeBase64(fileBase64);
        }
        return file;
    }

}
