package com.ioi.haryeom.matching.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RespondToMatchingRequest {

    @NotBlank(message = "매칭 ID는 필수 항목입니다.")
    private String matchingId;

    @NotNull(message = "수락 여부는 필수 항목입니다.")
    private Boolean isAccepted;
}