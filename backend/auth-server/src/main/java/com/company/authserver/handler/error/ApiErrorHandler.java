package com.company.authserver.handler.error;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ApiErrorHandler extends ResponseEntityExceptionHandler {

    @Override
    @NonNull
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception,
            @NonNull HttpHeaders headers,
            @NonNull HttpStatus status,
            @NonNull WebRequest request) {
        List<String> errorMessages = getErrorMessages(
                exception.getBindingResult().getFieldErrors(),
                exception.getBindingResult().getGlobalErrors()
        );

        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(exception.getLocalizedMessage())
                .errors(errorMessages)
                .build();

        return handleExceptionInternal(
                exception,
                apiErrorResponse,
                headers,
                apiErrorResponse.getStatus(),
                request
        );
    }

    private List<String> getErrorMessages(List<FieldError> fieldErrors, List<ObjectError> globalErrors) {
        List<String> errorMessages = new ArrayList<>();

        for (FieldError error : fieldErrors) {
            errorMessages.add(error.getField() + ": " + error.getDefaultMessage());
        }

        for (ObjectError error : globalErrors) {
            errorMessages.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        return errorMessages;
    }
}