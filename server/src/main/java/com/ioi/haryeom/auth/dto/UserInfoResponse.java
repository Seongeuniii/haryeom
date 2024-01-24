package com.ioi.haryeom.auth.dto;

import com.ioi.haryeom.member.domain.type.Role;
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
public class UserInfoResponse {

    private Long id;

    private String profileUrl;

    private String name;

    private Role role;
}
