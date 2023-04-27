package com.company.userservice.controller;

import com.company.userservice.dto.CredentialsDto;
import com.company.userservice.dto.UpdatePasswordDto;
import com.company.userservice.dto.UpdateUserInfoDto;
import com.company.userservice.dto.UserRequest;
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

@RestController
@RequestMapping(path = "/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final FileUtil fileUtil;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@RequestBody @Valid UserRequest userRequest) {
        if (userService.isEmailExists(userRequest.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with this email already exists");
        }
        if (userService.isUsernameExists(userRequest.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with this username already exists");
        }
        User user = modelMapper.map(userRequest, User.class);
        byte[] userAvatar = getByteArrayFromBase64(userRequest.getAvatarBase64());
        userService.saveUser(user, userAvatar);
    }

    @PostMapping("/login")
    public Long getUserIdByCredentials(@RequestBody @Valid CredentialsDto credentialsDto) {
        return userService
                .getUserByCredentials(credentialsDto.getUsername(), credentialsDto.getPassword())
                .map(User::getId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    }

    @PatchMapping("/profile")
    public void updateUserProfileInfo(@RequestBody @Valid UpdateUserInfoDto userInfoDto,
                                      @RequestHeader("X-auth-user-id") Long userId) {
        // TODO
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
