package com.ioi.haryeom.video.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class LessonStart {
    @NotNull
    private Long tutoringScheduleId;
    @NotNull
    @Pattern(regexp="^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$", message = "시간 형식은 HH:mm:ss 여야 합니다.")
    private String startTime;
}
