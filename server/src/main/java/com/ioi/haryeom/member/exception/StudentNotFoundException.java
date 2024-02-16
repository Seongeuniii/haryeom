package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class StudentNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 학생 ID 입니다. 학생 ID: %d";

    public StudentNotFoundException(Long memberId) {
        super(String.format(MESSAGE, memberId));
    }
}
