package com.ioi.haryeom.member.dto;

import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

@Builder
@Getter
public class StudentUpdateRequest {

    @URL(message = "프로필 사진의 형식이 URL이 아닙니다.")
    @NotNull(message = "프로필 사진은 필수 항목입니다.")
    private String profileUrl;

    @NotNull(message = "이름은 필수 항목입니다.")
    private String name;

    @Length(min = 7, max = 11, message = "전화번호는 11자리 이하여야합니다.")
    @NotNull(message = "전화번호는 필수 항목입니다.")
    private String phone;

    @NotNull(message = "학년은 필수 항목입니다.")
    private String grade;

    @NotNull(message = "학교는 필수 항목입니다.")
    private String school;
}
