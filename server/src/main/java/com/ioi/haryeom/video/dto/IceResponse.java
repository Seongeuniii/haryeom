package com.ioi.haryeom.video.dto;

import lombok.Getter;

@Getter
public class IceResponse {
    private Object iceCandidate;
    private String socketId;

    public IceResponse(Object iceCandidate, String socketId){
        this.iceCandidate=iceCandidate;
        this.socketId=socketId;
    }
}
