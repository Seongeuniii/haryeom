package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class NoStudentException extends ForbiddenException {

    private static final String MESSAGE = "학생만 접근 가능합니다.";

    public NoStudentException() {
        super(MESSAGE);
    }
}
