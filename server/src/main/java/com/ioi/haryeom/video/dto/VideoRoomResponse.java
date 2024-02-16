package com.ioi.haryeom.video.dto;

import lombok.Getter;

@Getter
public class VideoRoomResponse {
    private String roomCode;
    public VideoRoomResponse(String roomCode){
        this.roomCode=roomCode;
    }
}
