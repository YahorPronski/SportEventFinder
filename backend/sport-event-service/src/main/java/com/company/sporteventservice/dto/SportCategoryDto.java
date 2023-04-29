package com.company.sporteventservice.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class SportCategoryDto {

    @NotBlank
    private String name;

}
