package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.ConflictException;

public class DuplicateTutoringScheduleByTeacherException extends ConflictException {

    private static final String MESSAGE = "선생님의 과외 일정과 겹치는 일정이 존재합니다.";

    public DuplicateTutoringScheduleByTeacherException() {
        super(MESSAGE);
    }
}
