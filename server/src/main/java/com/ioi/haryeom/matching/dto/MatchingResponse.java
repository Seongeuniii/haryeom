package com.ioi.haryeom.matching.dto;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;

@Getter
public class MatchingResponse<T> {

    private Long chatRoomId;
    private MatchingStatus status;
    private T response;

    public MatchingResponse(Long chatRoomId, MatchingStatus status, T response) {
        this.chatRoomId = chatRoomId;
        this.status = status;
        this.response = response;
    }


}
