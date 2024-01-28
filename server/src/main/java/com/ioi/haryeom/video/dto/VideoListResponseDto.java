package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VideoListResponseDto {
    private Long videoId;
    private String title;
    private LocalDate scheduleDate;
    private String duration;
}
