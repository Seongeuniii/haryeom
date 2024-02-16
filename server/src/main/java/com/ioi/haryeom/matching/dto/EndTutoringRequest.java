package com.ioi.haryeom.matching.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndTutoringRequest {

    @Positive
    @NotNull(message = "과외 ID는 필수 항목입니다.")
    private Long tutoringId;
}
