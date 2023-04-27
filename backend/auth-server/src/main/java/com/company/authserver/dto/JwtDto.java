package com.company.authserver.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtDto {

    private final String type = "Bearer";
    private String accessToken;
    private String refreshToken;

}
