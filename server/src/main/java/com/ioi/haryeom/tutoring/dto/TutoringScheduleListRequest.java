package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutoringScheduleListRequest {

    @NotNull
    private Long tutoringId;

    @Valid
    @NotNull(message = "Schedules cannot be null")
    private List<@Valid TutoringScheduleRequest> schedules;

}
