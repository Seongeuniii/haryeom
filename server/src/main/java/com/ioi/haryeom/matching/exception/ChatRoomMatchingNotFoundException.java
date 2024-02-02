package com.ioi.haryeom.matching.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class ChatRoomMatchingNotFoundException extends NotFoundException {

    private static final String MESSAGE = "%s 매칭 ID에 대한 채팅방 ID가 존재하지 않습니다.";
    public ChatRoomMatchingNotFoundException(String matchingId) {
        super(String.format(MESSAGE, matchingId));
    }
}
