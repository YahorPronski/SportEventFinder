package com.company.authserver.service;

import com.company.authserver.dto.LoginRequest;
import com.company.authserver.dto.JwtDto;
import com.company.authserver.dto.RegisterRequest;

import java.util.Optional;

public interface AuthService {
    JwtDto loginUser(LoginRequest loginRequest);

    void registerUser(RegisterRequest registerRequest);

    Optional<Long> getUserIdFromToken(String accessToken);

    Optional<JwtDto> refreshJwt(String refreshToken);
}
