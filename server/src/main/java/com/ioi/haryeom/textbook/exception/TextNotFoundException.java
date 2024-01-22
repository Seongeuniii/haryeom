package com.ioi.haryeom.textbook.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class TextNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 학습자료 ID 입니다. 학습자료 ID: %d";

    public TextNotFoundException(Long textbookId) {
        super(String.format(MESSAGE, textbookId));
    }
}
