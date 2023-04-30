package com.company.authserver.controller;

import com.company.authserver.dto.LoginRequest;
import com.company.authserver.dto.JwtDto;
import com.company.authserver.dto.RegisterRequest;
import com.company.authserver.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public JwtDto login(@RequestBody @Valid LoginRequest loginRequest) {
        return authService.loginUser(loginRequest);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody @Valid RegisterRequest registerRequest) {
        authService.registerUser(registerRequest);
    }

    @PostMapping("/validate")
    public Long validate(@RequestBody @NotNull JwtDto jwtDto) {
        String accessToken = jwtDto.getAccessToken();
        if (StringUtils.isBlank(accessToken)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Access token is missing");
        }
        return authService.getUserIdFromToken(accessToken)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid access token"));
    }

    @PostMapping("/refresh")
    public JwtDto refresh(@RequestBody @NotNull JwtDto jwtDto) {
        String refreshToken = jwtDto.getAccessToken();
        if (StringUtils.isBlank(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token is missing");
        }
        return authService.refreshJwt(refreshToken)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid refresh token"));
    }

}
