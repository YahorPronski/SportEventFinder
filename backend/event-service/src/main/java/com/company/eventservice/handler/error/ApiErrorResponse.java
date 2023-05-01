package com.company.eventservice.handler.error;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@Builder
public class ApiErrorResponse {

    private HttpStatus status;
    private String message;
    private List<String> errors;

}