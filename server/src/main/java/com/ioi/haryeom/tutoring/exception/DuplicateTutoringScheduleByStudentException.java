package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.ConflictException;

public class DuplicateTutoringScheduleByStudentException extends ConflictException {

    private static final String MESSAGE = "학생의 과외 일정과 겹치는 일정이 존재합니다.";

    public DuplicateTutoringScheduleByStudentException() {
        super(MESSAGE);
    }
}
