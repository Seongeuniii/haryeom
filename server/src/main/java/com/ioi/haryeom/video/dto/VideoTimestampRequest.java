package com.ioi.haryeom.video.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class VideoTimestampRequest {
    @NotNull(message="타임스탬프 시간이 반드시 지정되어야 합니다.")
    @Pattern(regexp="^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$", message = "시간 형식은 HH:mm:ss 여야 합니다.")
    private String stampTime;

    @NotNull(message="타임스탬프 내용이 반드시 작성되어야 합니다.")
    private String content;
}
