package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutoringScheduleListRequest {

    @Positive(message = "과외 ID는 양수입니다.")
    @NotNull(message = "과외 ID는 필수입니다.")
    private Long tutoringId;

    @NotEmpty(message = "과외 일정은 1건 이상 있어야 합니다.")
    private List<@Valid TutoringScheduleRequest> schedules;

}
