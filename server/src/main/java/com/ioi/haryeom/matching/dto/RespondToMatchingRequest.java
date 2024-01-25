package com.ioi.haryeom.matching.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RespondToMatchingRequest {

    private String matchingId;
    private Boolean isAccepted;
}