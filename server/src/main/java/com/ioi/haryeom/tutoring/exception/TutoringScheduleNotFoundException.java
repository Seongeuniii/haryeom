package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class TutoringScheduleNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 과외 일정 ID 입니다. 과외 일정 ID: %d";

    public TutoringScheduleNotFoundException(Long tutoringScheduleId) {
        super(String.format(MESSAGE, tutoringScheduleId));
    }
}
