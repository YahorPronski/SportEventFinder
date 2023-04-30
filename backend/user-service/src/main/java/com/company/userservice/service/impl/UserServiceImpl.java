package com.company.userservice.service.impl;

import com.company.userservice.model.User;
import com.company.userservice.repository.UserRepository;
import com.company.userservice.service.UserService;
import com.company.userservice.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FileUtil fileUtil;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user, byte[] avatar) {
        User savedUser = userRepository.save(user);
        if (avatar != null && avatar.length > 0) {
            fileUtil.saveFile(savedUser.getId().toString(), "avatar", avatar);
        }
        return savedUser;
    }

    @Override
    public User updateUser(Long userId, User updatedUser, byte[] avatar) {
        User existingUser = userRepository.findById(userId).get();
        updatedUser.setId(userId);
        if (updatedUser.getPassword() == null) {
            updatedUser.setPassword(existingUser.getPassword());
        }
        if (avatar != null && avatar.length > 0) {
            fileUtil.saveFile(userId.toString(), "avatar", avatar);
        }
        return userRepository.save(updatedUser);
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> getUserByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    @Override
    public byte[] getUserAvatar(Long userId) {
        return fileUtil.readFile(userId.toString(), "avatar");
    }

    @Override
    public User updateUserPassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId).get();
        user.setPassword(newPassword);
        return userRepository.save(user);
    }

    @Override
    public boolean isEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

}
