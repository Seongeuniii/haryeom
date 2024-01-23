package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import lombok.Getter;

@Getter
public class StudentTutoringResponse {

    private Long tutoringId;

    private Long teacherMemberId;
    private String teacherName;
    private String teacherProfileUrl;

    private SubjectResponse subject;

    public StudentTutoringResponse(Tutoring tutoring) {
        this.tutoringId = tutoring.getId();
        this.teacherMemberId = tutoring.getTeacher().getId();
        this.teacherName = tutoring.getTeacher().getName();
        this.teacherProfileUrl = tutoring.getTeacher().getProfileUrl();
        this.subject = new SubjectResponse(tutoring.getSubject());
    }
}