package com.ioi.haryeom.textbook.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class SelectedTextbookNotFoundException extends NotFoundException {

    private static final String MESSAGE = "과외에 지정된 학습 자료가 없습니다. 과외 ID : %d";

    public SelectedTextbookNotFoundException(Long tutoringId) {
        super(String.format(MESSAGE, tutoringId));
    }
}
