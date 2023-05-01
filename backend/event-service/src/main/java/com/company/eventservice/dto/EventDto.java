package com.company.eventservice.dto;

import com.company.eventservice.model.Event;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class EventDto {

    @NotBlank
    private String name;

    @NotNull
    private CategoryDto category;

    @NotNull
    private LocationDto location;

    @NotBlank
    @Pattern(regexp = "^(\\d{2}/){2}\\d{4} \\d{2}:\\d{2}$", message = "Invalid date format, it should be " + Event.DATE_FORMAT)
    private String startDateTime;

    private Float ticketPrice;

    private String imageBase64;

}
