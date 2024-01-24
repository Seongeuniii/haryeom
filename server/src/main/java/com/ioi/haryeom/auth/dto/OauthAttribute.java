package com.ioi.haryeom.auth.dto;

import com.ioi.haryeom.auth.type.LoginType;
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
public class OauthAttribute {

    private String oauthId;

    private String profileUrl;

    private LoginType loginType;
}
