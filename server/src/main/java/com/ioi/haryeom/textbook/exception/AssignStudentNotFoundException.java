package com.ioi.haryeom.textbook.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class AssignStudentNotFoundException extends NotFoundException {

    private static final String MESSAGE = "지정 가능한 학생이 없습니다.";

    public AssignStudentNotFoundException() {
        super(MESSAGE);
    }
}
