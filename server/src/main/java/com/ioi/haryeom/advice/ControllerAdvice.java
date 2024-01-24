package com.ioi.haryeom.advice;

import com.ioi.haryeom.advice.exception.BusinessException;
import com.ioi.haryeom.common.dto.ErrorResponse;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        log.error("{} error message >> {} ", e.getClass().getSimpleName(), e.getMessage());
        return ResponseEntity.status(e.status()).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
        String errorMessage = e.getConstraintViolations().stream()
            .map(violation -> String.format("Field '%s': %s",
                violation.getPropertyPath(),
                violation.getMessage()))
            .collect(Collectors.joining("; "));

        log.error("ConstraintViolationException error message >> {} ", errorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(errorMessage));
    }


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> unexpectedRException(RuntimeException e) {
        log.error("{} error message >> {} \n", e.getClass().getSimpleName(), e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(e.getMessage()));
    }
}