package com.ioi.haryeom.member.dto;

import com.ioi.haryeom.member.domain.type.Gender;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

@Builder
@Getter
public class TeacherUpdateRequest {

    @URL(message = "프로필 사진의 형식이 URL이 아닙니다.")
    @NotNull(message = "프로필 사진은 필수 항목입니다.")
    private String profileUrl;

    @NotNull(message = "이름은 필수 항목입니다.")
    private String name;

    @Length(min = 7, max = 11, message = "전화번호는 11자리 이하여야합니다.")
    @NotNull(message = "전화번호는 필수 항목입니다.")
    private String phone;

    @NotNull(message = "프로필 공개 여부는 필수 항목입니다.")
    private Boolean profileStatus;

    private String college;

    @Email(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+[.][a-zA-Z]{2,3}$", message = "허용된 이메일 형식이 아닙니다.")
    private String collegeEmail;

    private Gender gender;

    @PositiveOrZero(message = "예상 과외비는 0만원 이상이여야합니다.")
    private Integer salary;

    @PositiveOrZero(message = "과외 경력은 0년 이상이여야 합니다.")
    private Integer career;

    private List<SubjectResponse> subjects;

    @Length(max = 1000, message = "선생님 자기 소개는 1000자 이하여야합니다.")
    private String introduce;
}