package com.ioi.haryeom.member.dto;

import com.ioi.haryeom.member.domain.type.Gender;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TeacherInfoResponse {

    private String profileUrl;
    private String name;
    private String phone;
    private Boolean profileStatus;
    private String college;
    private String collegeEmail;
    private Gender gender;
    private Integer salary;
    private Integer career;

    private List<SubjectResponse> subjects;
    private String introduce;
}
