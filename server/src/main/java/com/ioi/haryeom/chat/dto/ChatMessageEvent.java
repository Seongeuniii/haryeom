package com.ioi.haryeom.chat.dto;

import lombok.Getter;

@Getter
public class ChatMessageEvent {

    private Long chatRoomId;
    private ChatMessageResponse chatMessageResponse;

    public ChatMessageEvent(Long chatRoomId, ChatMessageResponse chatMessageResponse) {
        this.chatRoomId = chatRoomId;
        this.chatMessageResponse = chatMessageResponse;
    }
}
