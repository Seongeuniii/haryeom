package com.ioi.haryeom.homework.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class HomeworkStatusException extends ForbiddenException {


    private static final String MESSAGE = "학생이 이미 숙제를 확인했으므로 변경이 불가능합니다.";

    public HomeworkStatusException() {
        super(MESSAGE);
    }
}
