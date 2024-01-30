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
public class EmailCertifyResponse {

    private Integer status;
    private Boolean success;
    private String message;
}
