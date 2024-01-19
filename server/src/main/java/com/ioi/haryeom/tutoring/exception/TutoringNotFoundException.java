package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class TutoringNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 과외 ID 입니다. 과외 ID: %d";

    public TutoringNotFoundException(Long tutoringId) {
        super(String.format(MESSAGE, tutoringId));
    }
}
