package com.ioi.haryeom.config;


import static com.ioi.haryeom.auth.type.ErrorCode.EMPTY_TOKEN;
import static com.ioi.haryeom.auth.type.ErrorCode.INVALID_TOKEN;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import com.ioi.haryeom.auth.exception.FilterException;
import com.ioi.haryeom.auth.service.TokenService;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        try {
            String token = tokenService.resolveToken((HttpServletRequest) request);
            if (tokenService.validateToken(token)) { // accessToken 유효할 때
                Authentication authentication = tokenService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else { // accessToken이 유효하지 않을 때 예외 던짐  (access_token 유효하지 않을 때 재발급)
                throw new FilterException(INVALID_TOKEN, UNAUTHORIZED);
            }
        } catch (FilterException e) {
            request.setAttribute("errorCode", e.getErrorCode());
            request.setAttribute("httpStatus", e.getHttpStatus());
        } catch (SignatureException | MalformedJwtException e) {
            request.setAttribute("errorCode", INVALID_TOKEN);
            request.setAttribute("httpStatus", UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            request.setAttribute("errorCode", EMPTY_TOKEN);
            request.setAttribute("httpStatus", BAD_REQUEST);
        }

        chain.doFilter(request, response);
    }
}
