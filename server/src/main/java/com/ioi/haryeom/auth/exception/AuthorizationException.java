package com.ioi.haryeom.auth.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class AuthorizationException extends ForbiddenException {

    private static final String MESSAGE = "접근 권한이 없습니다.";

    public AuthorizationException() {
        super(MESSAGE);
    }
}
