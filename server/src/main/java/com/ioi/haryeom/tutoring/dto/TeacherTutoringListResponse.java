package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class TeacherTutoringListResponse {

    private final List<TeacherTutoringResponse> tutorings;

    public TeacherTutoringListResponse(List<TeacherTutoringResponse> tutorings) {
        this.tutorings = tutorings;
    }
}