package com.company.userservice.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PasswordsDto {

    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;
}
