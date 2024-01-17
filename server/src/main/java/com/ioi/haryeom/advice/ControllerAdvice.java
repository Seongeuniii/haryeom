package com.ioi.haryeom.advice;

import com.ioi.haryeom.advice.exception.BusinessException;
import com.ioi.haryeom.common.dto.ErrorResponse;
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


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> unexpectedRException(RuntimeException e) {
        log.error("{} error message >> {} ", e.getClass().getSimpleName(), e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(e.getMessage()));
    }
}