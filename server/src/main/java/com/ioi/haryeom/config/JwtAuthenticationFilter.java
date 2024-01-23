package com.ioi.haryeom.config;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import com.ioi.haryeom.advice.exception.BusinessException;
import com.ioi.haryeom.auth.service.TokenService;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.GenericFilter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
        FilterChain chain) throws IOException, ServletException {
        try {
            String token = tokenService.resolveToken((HttpServletRequest) request);

            if (tokenService.validateToken(token)) { // access_token 유효할 때
                Authentication authentication = tokenService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else { // access_token 유효하지 않을 때 재발급
                String accessToken =
                    tokenService.reissueAccessToken((HttpServletRequest) request,
                        (HttpServletResponse) response);

                Cookie accessCookie = new Cookie("accesToken", accessToken);
                accessCookie.setHttpOnly(true);
                accessCookie.setPath("/");

                ((HttpServletResponse) response).addCookie(accessCookie);

//                헤더에 액세스 토큰 설정
//                ((HttpServletResponse) response).setHeader("Authorization", accessToken);
                Authentication authentication = tokenService.getAuthentication(accessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (BusinessException e) {
//            request.setAttribute("errorMessage", e.getHttpStatus());
            request.setAttribute("httpStatus", e.getClass().getSimpleName());
        } catch (SignatureException | MalformedJwtException e) {
            request.setAttribute("errorMessage", "유효하지 않은 토큰입니다.");
            request.setAttribute("httpStatus", UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            request.setAttribute("errorMessage", "토큰이 존재하지 않습니다.");
            request.setAttribute("httpStatus", BAD_REQUEST);
        }

        chain.doFilter(request, response);
    }
}
