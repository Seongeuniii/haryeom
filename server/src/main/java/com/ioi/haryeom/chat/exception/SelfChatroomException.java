package com.ioi.haryeom.chat.exception;

import com.ioi.haryeom.advice.exception.ConflictException;

public class SelfChatroomException extends ConflictException {

    private static final String MESSAGE = "자기 자신에 대한 채팅방은 개설할 수 없습니다.";

    public SelfChatroomException() {
        super(MESSAGE);
    }

    public SelfChatroomException(String message) {
        super(message);
    }
}
