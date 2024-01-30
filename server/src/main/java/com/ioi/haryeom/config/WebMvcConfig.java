package com.ioi.haryeom.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedOrigins("http://localhost:3000", "https://localhost:3000",
                "https://i10a807.p.ssafy.io:3000",
                "http://i10a807.p.ssafy.io:3000", "http://localhost:8080", "https://localhost:8080",
                "http://i10a807.p.ssafy.io:8080", "https://i10a807.p.ssafy.io:8080")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3000);
//            .exposedHeaders(HttpHeaders.LOCATION);
    }
}
