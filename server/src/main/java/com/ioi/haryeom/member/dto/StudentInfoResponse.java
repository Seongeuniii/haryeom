package com.ioi.haryeom.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StudentInfoResponse {

    private String profileUrl;
    private String name;
    private String phone;
    private String grade;
    private String school;
}
