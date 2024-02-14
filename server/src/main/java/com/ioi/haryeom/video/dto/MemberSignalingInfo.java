package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberSignalingInfo {

    private String memberId;
    private String socketId;
    private String memberName;
}
