package com.ioi.haryeom.video.dto;

import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class VideoResponse {
    private Long videoId;
    private String title;
    private LocalDate scheduleDate;
    private String duration;
}
