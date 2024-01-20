package com.ioi.haryeom.homework.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class InvalidDeadlineException extends BadRequestException {

    private final static String MESSAGE = "숙제 마감일은 현재 날짜 이후여야 합니다.";

    public InvalidDeadlineException() {
        super(MESSAGE);
    }
}
