package com.ioi.haryeom.auth.dto;

import lombok.Getter;

// 임시 구현
@Getter
public class AuthInfo {

    private Long memberId;
    private String role;

    public AuthInfo(Long memberId, String role) {
        this.memberId = memberId;
        this.role = role;
    }
}
