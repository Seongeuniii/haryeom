package com.ioi.haryeom.matching.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMatchingRequest {

    @Positive
    @NotNull(message = "채팅방 ID는 필수 항목입니다.")
    private Long chatRoomId;

    @Positive
    @NotNull(message = "과목 ID는 필수 항목입니다.")
    private Long subjectId;

    @PositiveOrZero(message = "시급은 0원 이상이여야 합니다.")
    @NotNull(message = "시급은 필수 항목입니다.")
    private Integer hourlyRate;
}