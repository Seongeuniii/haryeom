package com.ioi.haryeom.auth.exception;

import com.ioi.haryeom.advice.exception.UnauthorizedException;

public class RefreshTokenNotFoundException extends UnauthorizedException {

    private static final String MESSAGE = "Refresh Token이 존재하지 않습니다.";

    public RefreshTokenNotFoundException() {
        super(MESSAGE);
    }
}