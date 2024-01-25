package com.ioi.haryeom.auth.exception;

import com.ioi.haryeom.advice.exception.UnauthorizedException;

public class TokenNotFoundException extends UnauthorizedException {
    private static final String MESSAGE = "Authorization key가 존재하지 않습니다.";

    public TokenNotFoundException() {
        super(MESSAGE);
    }
}