package com.ioi.haryeom.auth.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class AuthorizationException extends ForbiddenException {

    private static final String MESSAGE = "접근 권한이 없는 회원 ID 입니다. 회원 ID: %d";

    public AuthorizationException(Long memberId) {
        super(String.format(MESSAGE, memberId));
    }
}
