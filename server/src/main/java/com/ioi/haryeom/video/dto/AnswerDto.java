package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerDto {

    Object answer;
    int callerId;
    int calleeId;
}
