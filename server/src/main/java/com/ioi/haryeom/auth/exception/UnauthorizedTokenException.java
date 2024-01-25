package com.ioi.haryeom.auth.exception;

import com.ioi.haryeom.advice.exception.UnauthorizedException;

public class UnauthorizedTokenException extends UnauthorizedException {

    public UnauthorizedTokenException(String message) {
        super(message);
    }
}
