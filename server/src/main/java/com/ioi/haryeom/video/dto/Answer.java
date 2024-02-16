package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Answer {

    private Object answer;
    private String callerId;
    private String calleeId;
    private Long calleeMemberId;
}
