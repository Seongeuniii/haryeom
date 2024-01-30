package com.ioi.haryeom.config;


import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

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
    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin().disable()
            .authorizeRequests()

            // 이태호
            .antMatchers("/api/auth").authenticated()
            .antMatchers("/api/auth/kakao/login").permitAll()
            .antMatchers(POST, "/api/auth/refresh").permitAll()
            .antMatchers(POST, "/api/auth/kakao/logout").authenticated()
            .antMatchers("/api/members/emails/**").hasRole("GUEST")
            .antMatchers(POST, "/api/members/students").hasRole("GUEST")
            .antMatchers(GET, "/api/members/students/{memberId}").hasRole("STUDENT")
            .antMatchers(PUT, "/api/members/students").hasRole("STUDENT")
            .antMatchers(POST, "/api/members/teacher").hasRole("GUEST")
            .antMatchers(GET, "/api/members/teachers/{memberId}").hasRole("TEACHER")
            .antMatchers(PUT, "/api/members/teachers").hasRole("TEACHER")
            .antMatchers(DELETE, "/api/members").authenticated()
            .antMatchers(GET, "/api/members/students/mypage").hasRole("STUDENT")
            .antMatchers(GET, "/api/members/teachers/mypage").hasRole("TEACHER")

            // 이외의 모든 API 접근을 모두 허용
            .anyRequest()
            .permitAll()

            /*
             * 권한 예외가 나는 경우 아래 부분 주석 처리
             */

//            // 허준혁
//            .antMatchers(GET, "/api/tutoring/teachers").hasRole("TEACHER")
//            .antMatchers(GET, "/api/tutoring/students").hasRole("STUDENT")
//            .antMatchers(GET, "/api/tutoring/schedule/teacher").hasRole("TEACHER")
//            .antMatchers(GET, "/api/tutoring/schedule/student").hasRole("STUDENT")
//            .antMatchers(POST, "/api/tutoring/schedule").hasRole("TEACHER")
//            .antMatchers(GET, "/api/tutoring/schedule/{tutoringScheduleId}")
//            .hasRole("TEACHER")
//            .antMatchers(PUT, "/api/tutoring/schedule/{tutoringScheduleId}")
//            .hasRole("TEACHER")
//            .antMatchers(DELETE, "/api/tutoring/schedule/{tutoringScheduleId}")
//            .hasRole("TEACHER")
//
//            // 이상영
//            .antMatchers(GET, "/api/matching/teachers").hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(GET, "/api/matching/teachers/{teacherId}")
//            .hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(POST, "/api/matching/request").hasRole("STUDENT")
//            .antMatchers(POST, "/api/matching/response").hasRole("TEACHER")
//            .antMatchers(DELETE, "/api/matching/end").hasRole("TEACHER")
//            .antMatchers(POST, "/api/chatrooms").hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(DELETE, "/api/chatrooms/{chatRoomId}")
//            .hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(GET, "/api/chatrooms/{chatRoomId}/subjects").hasRole("STUDENT")
//            .antMatchers(GET, "/api/chatrooms/{chatRoomId}/tutoring").hasRole("TEACHER")
//            .antMatchers(GET, "/api/chatrooms").hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(GET, "/api/chatrooms/{chatRoomId}/messages")
//            .hasAnyRole("STUDENT", "TEACHER")
//
//            // 김태윤
//            .antMatchers(GET, "/api/room/{scheduleId}").hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(POST, "/api/lesson/video").hasRole("TEACHER")
//            .antMatchers(PATCH, "/api/lesson/video/{videoId}/end").hasRole("TEACHER")
//            .antMatchers(POST, "/api/lesson/video/{videoId}").hasRole("TEACHER")
//            .antMatchers(GET, "/api/lesson/timestamp/{tutoringScheduleId}")
//            .hasRole("STUDENT")
//            .antMatchers(POST, "/api/lesson/timestamp/{tutoringScheduleId}")
//            .hasRole("STUDENT")
//            .antMatchers(PUT, "/api/lesson/timestamp/{timestampId}").hasRole("STUDENT")
//            .antMatchers(DELETE, "/api/lesson/timestamp/{timestampId}")
//            .hasRole("STUDENT")
//
//            // 하재률
//            .antMatchers(GET, "/api/textbook/tutoring/{tutoringId}")
//            .hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(GET, "/api/textbook/teachers/{memberId}").hasRole("TEACHER")
//            .antMatchers(POST, "/api/textbook").hasRole("TEACHER")
//            .antMatchers(DELETE, "/api/textbook/{textbookId}").hasRole("TEACHER")
//            .antMatchers(GET, "/api/textbook/{textbookId}/students").hasRole("TEACHER")
//            .antMatchers(PUT, "/api/textbook/{textbookId}/students").hasRole("TEACHER")
//            .antMatchers(GET, "/api/textbook/{textbookId}")
//            .hasAnyRole("STUDENT", "TEACHER")
//
//            // 김태윤
//            .antMatchers(GET, "/api/review/homework").hasRole("STUDENT")
//            .antMatchers(GET, "/api/review/homework/{textbookId}").hasRole("STUDENT")
//            .antMatchers(GET, "/api/review/video").hasRole("STUDENT")
//            .antMatchers(GET, "/api/review/video/{subjectId}").hasRole("STUDENT")
//            .antMatchers(GET, "/api/review/video/detail/{videoId}").hasRole("STUDENT")
//
//            // 하재률
//            .antMatchers(GET, "/api/homework/{homeworkId}").hasRole("STUDENT")
//            .antMatchers(GET, "/api/homework/review/{homeworkId}").hasRole("STUDENT")
//            .antMatchers(PATCH, "/api/homework/{homeworkId}").hasRole("STUDENT")
//            .antMatchers(POST, "/api/homework/{homeworkId}").hasRole("STUDENT")
//            .antMatchers(POST, "/api/homework/{homeworkId}/review").hasRole("STUDENT")
//
//            // 이상영
//            .antMatchers(GET, "/api/tutoring/{tutoringId}/homework")
//            .hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(POST, "/api/tutoring/{tutoringId}/homework").hasRole("TEACHER")
//            .antMatchers(GET, "/api/tutoring/{tutoringId}/homework/{homeworkId}")
//            .hasAnyRole("STUDENT", "TEACHER")
//            .antMatchers(PUT, "/api/tutoring/{tutoringId}/homework/{homeworkId}")
//            .hasRole("TEACHER")
//            .antMatchers(DELETE, "/api/tutoring/{tutoringId}/homework/{homeworkId}")
//            .hasRole("TEACHER")

            // 여기까지 주석 처리

            .and()
            .addFilter(corsConfig.corsFilter())
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
