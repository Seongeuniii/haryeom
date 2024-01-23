package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class TutoringScheduleResponse {

    private Long tutoringScheduleId;

    private Long tutoringId;
    private Long studentMemberId;
    private String studentName;
    private SubjectResponse subject;

    private LocalDate scheduleDate;
    private LocalTime startTime;
    private Integer duration;
    private String title;

    public TutoringScheduleResponse(TutoringSchedule tutoringSchedule) {
        this.tutoringScheduleId = tutoringSchedule.getId();
        this.tutoringId = tutoringSchedule.getTutoring().getId();
        this.studentMemberId = tutoringSchedule.getTutoring().getStudent().getId();
        this.studentName = tutoringSchedule.getTutoring().getStudent().getName();
        this.subject = new SubjectResponse(tutoringSchedule.getTutoring().getSubject());
        this.scheduleDate = tutoringSchedule.getScheduleDate();
        this.startTime = tutoringSchedule.getStartTime();
        this.duration = tutoringSchedule.getDuration();
        this.title = tutoringSchedule.getTitle();
    }

}
