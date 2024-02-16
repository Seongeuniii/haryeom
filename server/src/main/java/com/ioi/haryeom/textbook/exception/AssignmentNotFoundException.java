package com.ioi.haryeom.textbook.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class AssignmentNotFoundException extends NotFoundException {

    private static final String MESSAGE = "지정되지 않았습니다.";

    public AssignmentNotFoundException() {
        super(MESSAGE);
    }
}
