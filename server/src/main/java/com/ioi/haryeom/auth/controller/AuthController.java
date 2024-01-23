package com.ioi.haryeom.auth.controller;

import com.ioi.haryeom.auth.dto.AccessTokenResponse;
import com.ioi.haryeom.auth.dto.LoginResponse;
import com.ioi.haryeom.auth.dto.UserInfoResponse;
import com.ioi.haryeom.auth.service.AuthService;
import com.ioi.haryeom.auth.service.TokenService;
import com.ioi.haryeom.member.domain.Member;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;

    @GetMapping("/{provider}/login")
    public ResponseEntity<LoginResponse> oauthLogin(@RequestParam String code,
        @PathVariable("provider") String provider)
        throws IOException, ParseException {

        return ResponseEntity.ok().body(authService.oauthLogin(code, provider));
    }

    @PostMapping("/{provider}/logout")
    private ResponseEntity<Void> oauthLogout(@AuthenticationPrincipal Member member,
        @PathVariable("provider") String provider, HttpServletResponse response)
        throws IOException {

        authService.oauthLogout(member.getId(), provider);
        tokenService.resetHeader(response);

        return ResponseEntity.ok().build();
    }
}
