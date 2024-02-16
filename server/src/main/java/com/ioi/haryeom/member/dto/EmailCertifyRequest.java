package com.ioi.haryeom.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EmailCertifyRequest {

    @Email(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+[.][a-zA-Z]{2,3}$", message = "허용된 이메일 형식이 아닙니다.")
    @NotNull(message = "이메일은 필수 항목 입니다.")
    private String email;

    @NotNull(message = "대학명은 필수 항목 입니다.")
    private String univName;
}
