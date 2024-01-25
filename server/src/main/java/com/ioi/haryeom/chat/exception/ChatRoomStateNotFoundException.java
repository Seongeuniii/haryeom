package com.ioi.haryeom.chat.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class ChatRoomStateNotFoundException extends NotFoundException {

    private static final String MESSAGE = "채팅방 상태가 존재하지 않습니다.";

    public ChatRoomStateNotFoundException() {
        super(MESSAGE);
    }

    public ChatRoomStateNotFoundException(String message) {
        super(message);
    }
}
