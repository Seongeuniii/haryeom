package com.ioi.haryeom.video.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VideoResponseForQuery {
    private Long videoId;
    private String title;
    private LocalDate scheduleDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Long tutoringScheduleId;
    private Long teacherMemberId;
}
