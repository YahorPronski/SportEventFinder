package com.company.sporteventservice.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class SportEventDto {

    @NotBlank
    private String name;

    @NotNull
    private SportCategoryDto category;

    @NotNull
    private LocationDto location;

    private Float ticketPrice;

    private String imageBase64;

}
