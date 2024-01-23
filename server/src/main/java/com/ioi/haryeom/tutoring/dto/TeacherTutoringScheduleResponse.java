package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class TeacherTutoringScheduleResponse {

    private Long tutoringScheduleId;

    private Long tutoringId;
    private Long studentMemberId;
    private String studentName;
    private String studentProfileUrl;

    private LocalTime startTime;
    private Integer duration;
    private String title;

    public TeacherTutoringScheduleResponse(TutoringSchedule tutoringSchedule) {
        this.tutoringScheduleId = tutoringSchedule.getId();
        this.tutoringId = tutoringSchedule.getTutoring().getId();
        this.studentMemberId = tutoringSchedule.getTutoring().getStudent().getId();
        this.studentName = tutoringSchedule.getTutoring().getTeacher().getName();
        this.studentProfileUrl = tutoringSchedule.getTutoring().getTeacher().getProfileUrl();
        this.startTime = tutoringSchedule.getStartTime();
        this.duration = tutoringSchedule.getDuration();
        this.title = tutoringSchedule.getTitle();
    }

}
