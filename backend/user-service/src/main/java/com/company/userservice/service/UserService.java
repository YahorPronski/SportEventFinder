package com.company.userservice.service;

import com.company.userservice.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();

    User saveUser(User user, byte[] avatar);

    User updateUser(Long userId, User user, byte[] avatar);

    Optional<User> getUserById(Long userId);

    Optional<User> getUserByCredentials(String username, String password);

    User updateUserPassword(Long userId, String newPassword);

    boolean isEmailExists(String email);

    boolean isUsernameExists(String username);
}
