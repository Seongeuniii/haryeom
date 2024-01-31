package com.ioi.haryeom.auth.dto;

import com.ioi.haryeom.auth.type.LoginType;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OauthAttribute {

    private String oauthId;

    private String profileUrl;

    private LoginType loginType;
}
