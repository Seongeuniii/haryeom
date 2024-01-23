package com.ioi.haryeom.tutoring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutoringScheduleRequest {

    @NotNull
    private LocalDate scheduleDate;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private Integer duration;

    @NotNull
    private String titile;

}
