package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class NotAllowNegativeNumberForDurationException extends BadRequestException {

    private static final String MESSAGE = "진행 시간은 음수값이 허용되지 않습니다.";

    public NotAllowNegativeNumberForDurationException() {
        super(MESSAGE);
    }

}
