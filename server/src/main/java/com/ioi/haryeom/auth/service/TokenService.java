package com.ioi.haryeom.auth.service;

import static com.ioi.haryeom.auth.type.ErrorCode.EMPTY_TOKEN;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import com.ioi.haryeom.advice.exception.NotFoundException;
import com.ioi.haryeom.advice.exception.UnauthorizedException;
import com.ioi.haryeom.auth.exception.FilterException;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class TokenService {

    @Value("${spring.jwt.token.secret-key}")
    private String secretKey;

    @Value("${spring.jwt.token.refresh-secret-key}")
    private String refreshSecretKey;

    private final MemberRepository memberRepository;

    private final RedisTemplate<Long, Object> redisTemplate;
    private final long TOKEN_PERIOD = 30 * 60 * 1000L;
    private final long REFRESH_PERIOD = 14 * 24 * 60 * 60 * 1000L;
    private final String REDIS_REFRESH_TOKEN_KEY = "refreshToken";

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        refreshSecretKey = Base64.getEncoder().encodeToString(refreshSecretKey.getBytes());
    }

    public String createToken(Member member) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(member.getId()));
        Date now = new Date();

        return Jwts.builder().setClaims(claims).setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + TOKEN_PERIOD))
            .signWith(SignatureAlgorithm.HS256, secretKey).compact();
    }

    public String createRefreshToken(Member member) {
        Long memberId = member.getId();
        Claims claims = Jwts.claims().setSubject(String.valueOf(memberId));
        Date now = new Date();

        String refreshToken = Jwts.builder().setClaims(claims).setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + REFRESH_PERIOD))
            .signWith(SignatureAlgorithm.HS256, refreshSecretKey).compact();

        // redis refreshToken 저장
        HashOperations<Long, Object, Object> hashOperations = redisTemplate.opsForHash();
        hashOperations.put(memberId, REDIS_REFRESH_TOKEN_KEY, refreshToken);
        redisTemplate.expire(memberId, REFRESH_PERIOD, MILLISECONDS);

        return refreshToken;
    }

    public Authentication getAuthentication(String token) {
        Long memberId = getMemberId(token);

        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new NotFoundException("해당 유저가 존재하지 않습니다."));

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(member.getRole().name()));

        return new UsernamePasswordAuthenticationToken(member, "", grantedAuthorities);
    }


    public String resolveToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if(cookies == null){
            throw new FilterException(EMPTY_TOKEN, UNAUTHORIZED);
        }

        String accessToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    accessToken = cookie.getValue();
                }
            }
        }

        if (accessToken == null) {
            throw new FilterException(EMPTY_TOKEN, UNAUTHORIZED);
        }

        return accessToken;
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
            return claims.getExpiration().after(new Date());

        } catch (ExpiredJwtException e) {
            return false;
        }
    }

    public String reissueAccessToken(HttpServletRequest request, HttpServletResponse response) {
        try {
            String refreshToken = getRefreshToken(request);
            Long memberId = getMemberIdFromRefreshToken(refreshToken);
            String redisRefreshToken = Objects.requireNonNull(
                redisTemplate.opsForHash().get(memberId, REDIS_REFRESH_TOKEN_KEY)).toString();

            Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("해당 유저가 존재하지 않습니다."));

            if (!redisRefreshToken.equals(refreshToken)) {
                resetHeader(response);
                throw new UnauthorizedException("만료된 refresh 토큰입니다.");
            }

            return createToken(member);

        } catch (NullPointerException e) {
            resetHeader(response);
            throw new UnauthorizedException("만료된 refresh 토큰입니다.");
        }
    }

    public Long getMemberId(String token) {
        String memberId = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody()
            .getSubject();
        return Long.valueOf(memberId);
    }

    public Long getMemberIdFromRefreshToken(String refreshToken) {
        String memberId = Jwts.parser().setSigningKey(refreshSecretKey).parseClaimsJws(refreshToken)
            .getBody().getSubject();
        return Long.valueOf(memberId);
    }

    private String getRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    // 만료된 access, refresh token 정보 삭제
    public void resetHeader(HttpServletResponse response) {

//        헤더 초기화
//        response.setHeader("Authorization", null);

        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(0);

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
    }
}
