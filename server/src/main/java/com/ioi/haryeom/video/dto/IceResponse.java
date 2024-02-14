package com.ioi.haryeom.video.dto;

import lombok.Getter;

@Getter
public class IceResponse {
    private Object iceCandidate;
    private String peerId;

    public IceResponse(Object iceCandidate, String peerId){
        this.iceCandidate=iceCandidate;
        this.peerId=peerId;
    }
}
