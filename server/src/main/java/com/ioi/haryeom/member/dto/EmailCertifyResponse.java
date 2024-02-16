package com.ioi.haryeom.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EmailCertifyResponse {

    private Integer status;
    private Boolean success;
    private String message;
}
