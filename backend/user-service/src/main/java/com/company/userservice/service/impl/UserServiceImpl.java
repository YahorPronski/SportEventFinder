package com.company.userservice.service.impl;

import com.company.userservice.model.User;
import com.company.userservice.repository.UserRepository;
import com.company.userservice.service.UserService;
import com.company.userservice.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FileUtil fileUtil;

    @Override
    public User saveUser(User user, byte[] avatar) {
        User savedUser = userRepository.save(user);
        if (avatar != null && avatar.length > 0) {
            fileUtil.saveFile(savedUser.getId().toString(), "avatar", avatar);
        }
        return savedUser;
    }

    @Override
    public Optional<User> getUserById(String userId) {
        if (!NumberUtils.isParsable(userId)) {
            return Optional.empty();
        }
        return getUserById(Long.parseLong(userId));
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> getUserByCredentials(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
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
