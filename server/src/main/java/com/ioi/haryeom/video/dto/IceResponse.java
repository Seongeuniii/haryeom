package com.ioi.haryeom.video.dto;

import lombok.Getter;

@Getter
public class IceResponse {
    private Object iceCandidate;
    private Long peerId;

    public IceResponse(Object iceCandidate, Long peerId){
        this.iceCandidate=iceCandidate;
        this.peerId=peerId;
    }
}
