package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class ScheduleOnlyInProgerssTutoringException extends BadRequestException {

    private static final String MESSAGE = "진행 중인 과외에만 일정을 등록/수정할 수 있습니다.";

    public ScheduleOnlyInProgerssTutoringException() {
        super(MESSAGE);
    }

}