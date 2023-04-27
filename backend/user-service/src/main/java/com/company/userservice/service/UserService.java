package com.company.userservice.service;

import com.company.userservice.model.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user, byte[] avatar);
    Optional<User> getUserById(String userId);
    Optional<User> getUserById(Long userId);
    Optional<User> getUserByCredentials(String username, String password);
    User updateUserPassword(Long userId, String newPassword);
    boolean isEmailExists(String email);
    boolean isUsernameExists(String username);
}
