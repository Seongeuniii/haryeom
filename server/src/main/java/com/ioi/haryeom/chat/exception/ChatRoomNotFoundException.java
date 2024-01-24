package com.ioi.haryeom.chat.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class ChatRoomNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 채팅방 ID 입니다. 채팅방 ID: %d";

    public ChatRoomNotFoundException(Long chatRoomId) {
        super(String.format(MESSAGE, chatRoomId));
    }
}
