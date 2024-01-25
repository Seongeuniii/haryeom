package com.ioi.haryeom.matching.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMatchingRequest {

    private Long chatRoomId;
    private Long subjectId;
    private Integer hourlyRate;
}