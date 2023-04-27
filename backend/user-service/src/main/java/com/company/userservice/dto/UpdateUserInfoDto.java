package com.company.userservice.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpdateUserInfoDto {

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    private String firstName;
    private String lastName;
    private String avatarBase64;
}
