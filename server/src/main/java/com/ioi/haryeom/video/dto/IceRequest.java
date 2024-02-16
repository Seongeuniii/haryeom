package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IceRequest {

    private Object iceCandidate;
    private String socketId;
}
