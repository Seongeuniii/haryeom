package com.ioi.haryeom.auth.dto;

import com.ioi.haryeom.member.domain.type.Role;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfoResponse {

    private Long memberId;

    private String profileUrl;

    private String name;

    private Role role;
}
