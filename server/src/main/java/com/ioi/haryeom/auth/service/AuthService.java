package com.ioi.haryeom.auth.service;

import static com.ioi.haryeom.auth.type.LoginType.KAKAO;
import static com.ioi.haryeom.member.domain.type.Role.GUEST;

import com.ioi.haryeom.advice.exception.BadRequestException;
import com.ioi.haryeom.auth.dto.LoginResponse;
import com.ioi.haryeom.auth.dto.OauthAttribute;
import com.ioi.haryeom.auth.dto.UserInfoResponse;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.type.MemberStatus;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final KakaoService kakaoService;
    private final TokenService tokenService;

    private final RedisTemplate<String, Object> stringKeyRedisTemplate;
    private static final String AUTH_TOKEN = "auth:token:";

    public UserInfoResponse getUser(Member member) {
        return UserInfoResponse.builder()
            .id(member.getId())
            .name(member.getName())
            .role(member.getRole())
            .profileUrl(member.getProfileUrl())
            .build();
    }

    public LoginResponse oauthLogin(String code, String provider)
        throws IOException, ParseException {
        String oauthAccessToken;
        OauthAttribute oauthAttribute;
        Member member;

        if (KAKAO.getProvider().equals(provider)) {
            oauthAccessToken = kakaoService.getToken(code);
            oauthAttribute = kakaoService.getUserInfo(oauthAccessToken);
            member = updateMember(oauthAttribute);
        } else {
            throw new BadRequestException("지원되지 않는 OAuth 공급자: " + provider);
        }

        // redis oauthAccessToken 저장
        stringKeyRedisTemplate.opsForHash()
            .put(AUTH_TOKEN + member.getId(), "oauthAccessToken", oauthAccessToken);

        return LoginResponse.builder()
            .accessToken(tokenService.createToken(member))
            .refreshToken(tokenService.createRefreshToken(member))
            .build();
    }

    public void oauthLogout(Long memberId, String provider) throws IOException {
        Object oauthAccessToken = stringKeyRedisTemplate.opsForHash()
            .get(AUTH_TOKEN + memberId, "oauthAccessToken");

        if (oauthAccessToken == null) {
            return;
        }

        if (KAKAO.getProvider().equals(provider)) {
            kakaoService.logout(oauthAccessToken);
            stringKeyRedisTemplate.delete(AUTH_TOKEN + memberId);
            return;
        }

        throw new BadRequestException("지원되지 않는 provider입니다.");
    }

    public Member updateMember(OauthAttribute oauthAttribute) {
        String oauthId = oauthAttribute.getOauthId();
        String profileUrl = oauthAttribute.getProfileUrl();

        Optional<Member> optionalMember = memberRepository.findByOauthId(oauthId);

        Member member;
        member = optionalMember.orElseGet(() -> memberRepository.save(Member.builder()
            .oauthId(oauthId)
            .profileUrl(profileUrl)
            .role(GUEST)
            .status(MemberStatus.ACTIVATED)
            .build()));

        return member;
    }

    public LoginResponse testLogin(String role) {
        if (role.equals("teacher")) {
            Member testTeacher = memberRepository.findById(46L).orElseThrow(
                () -> new MemberNotFoundException(46L)
            );
            return LoginResponse.builder()
                .accessToken(tokenService.createToken(testTeacher))
                .refreshToken(tokenService.createRefreshToken(testTeacher))
                .build();
        } else if (role.equals("student")) {
            Member testStudent = memberRepository.findById(47L).orElseThrow(
                () -> new MemberNotFoundException(47L)
            );
            return LoginResponse.builder()
                .accessToken(tokenService.createToken(testStudent))
                .refreshToken(tokenService.createRefreshToken(testStudent))
                .build();
        } else {
            throw new BadRequestException("테스트 로그인 API 경로를 다시 확인해주세요.");
        }
    }
}
