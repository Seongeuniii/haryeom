package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Offer {

    private Object offer;
    private String callerId;
    private Long callerMemberId;
    private String calleeId;
}
