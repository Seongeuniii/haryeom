package com.ioi.haryeom.config;


import static org.springframework.http.HttpMethod.POST;

import com.ioi.haryeom.auth.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final TokenService tokenService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable)
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin().disable()
            .authorizeRequests()
            .antMatchers("/api/auth/**/login", "/api/auth/refresh")
            .permitAll()
            .antMatchers("/api/auth/")
            .hasRole("GUEST")
            .antMatchers(POST, " /api/members/students", "/api/members/teachers")
            .hasRole("GUEST")
            .antMatchers("/api/members/students", "/api/members/students/**")
            .hasRole("STUDENT")
            .antMatchers("/api/members/teachers", "/api/members/teachers/**")
            .hasRole("TEACHER")
            .anyRequest()
            .authenticated()
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(tokenService),
                UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
            .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
            .accessDeniedHandler(new CustomAccessDeniedHanler());

//        http.addFilterBefore(new JwtAuthenticationFilter(tokenService),
//            UsernamePasswordAuthenticationFilter.class);
//        http.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());

        return http.build();
    }
}
