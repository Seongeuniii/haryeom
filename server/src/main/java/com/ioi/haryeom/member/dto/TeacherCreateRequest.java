package com.ioi.haryeom.member.dto;

import com.ioi.haryeom.member.domain.type.Gender;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TeacherCreateRequest {

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
