package com.ioi.haryeom.chat.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class ChatMessageBadRequestException extends BadRequestException {

    private static final String MESSAGE = "메시지 형태를 읽을 수 없습니다.";

    public ChatMessageBadRequestException() {
        super(MESSAGE);
    }
    public ChatMessageBadRequestException(String message) {
        super(message);
    }
}
