package com.company.sporteventservice.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LocationDto {

    @NotBlank
    private String country;

    @NotBlank
    private String city;

    private String address;

}
