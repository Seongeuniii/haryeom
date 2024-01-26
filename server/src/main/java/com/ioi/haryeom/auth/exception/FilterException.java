package com.ioi.haryeom.auth.exception;

import com.ioi.haryeom.auth.type.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class FilterException extends RuntimeException{
    private final ErrorCode errorCode;
    private final String errorMessage;
    private final HttpStatus httpStatus;

    public FilterException(ErrorCode errorCode, HttpStatus httpStatus) {
        this.errorCode = errorCode;
        this.errorMessage = errorCode.getMessage();
        this.httpStatus = httpStatus;
    }
}
