package com.chaitanya.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * Global CORS configuration.
 * Configured using allowedOriginPatterns to support credentialed requests
 * from Vercel (https://portfolio-cmg6.vercel.app, *.vercel.app) and local development.
 */
@Configuration
public class WebSecurityConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);

        // Use allowedOriginPatterns ONLY (Spring Boot prohibits mixing setAllowedOrigins and setAllowedOriginPatterns)
        corsConfiguration.setAllowedOriginPatterns(Arrays.asList(
                "https://portfolio-cmg6.vercel.app",
                "https://*.vercel.app",
                "http://localhost:*",
                "http://127.0.0.1:*",
                "*"
        ));

        corsConfiguration.setAllowedHeaders(Arrays.asList(
                "Origin",
                "Access-Control-Allow-Origin",
                "Content-Type",
                "Accept",
                "Authorization",
                "X-Requested-With",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        corsConfiguration.setExposedHeaders(Arrays.asList(
                "Origin",
                "Content-Type",
                "Accept",
                "Authorization",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"
        ));

        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
        corsConfiguration.setMaxAge(3600L); // Cache preflight OPTIONS for 1 hour

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}
