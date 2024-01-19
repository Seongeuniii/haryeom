package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class NoTeacherException extends ForbiddenException {

    private static final String MESSAGE = "선생님만 접근 가능합니다.";

    public NoTeacherException() {
        super(MESSAGE);
    }
}
