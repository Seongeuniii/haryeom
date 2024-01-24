package com.ioi.haryeom.member.dto;

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
public class StudentInfoResponse {

    private String profileUrl;
    private String name;
    private String phone;
    private String grade;
    private String school;
}
