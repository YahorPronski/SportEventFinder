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
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/current")
    public UserResponse getLoggedInUser(@RequestHeader("X-auth-user-id") Long userId) {
        return userService.getUserById(userId)
                .map(user -> mapUserToResponse(user, userService.getUserAvatar(userId)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with id=" + userId + " doesn't exist"));
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

    @PatchMapping("/current/profile")
    public void updateUserProfile(@RequestBody @Valid UserInfoDto userInfoDto,
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

    @PatchMapping("/current/password")
    public void updateUserPassword(@RequestBody @Valid PasswordsDto passwordDto,
                                   @RequestHeader("X-auth-user-id") Long userId) {
        User loggedInUser = userService.getUserById(userId).get();
        if (!loggedInUser.getPassword().equals(passwordDto.getOldPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong old password");
        }
        userService.updateUserPassword(userId, passwordDto.getNewPassword());
    }

    private UserResponse mapUserToResponse(User user, byte[] userAvatar) {
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        if (userAvatar != null && userAvatar.length != 0) {
            userResponse.setAvatarBase64(fileUtil.encodeBase64(userAvatar));
        }
        return userResponse;
    }

    private byte[] getByteArrayFromBase64(String fileBase64) {
        byte[] file = null;
        if (StringUtils.isNotBlank(fileBase64)) {
            file = fileUtil.decodeBase64(fileBase64);
        }
        return file;
    }

}
