package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class StudentTutoringListResponse {

    private final List<StudentTutoringResponse> tutorings;

    public StudentTutoringListResponse(List<StudentTutoringResponse> tutorings) {
        this.tutorings = tutorings;
    }
}