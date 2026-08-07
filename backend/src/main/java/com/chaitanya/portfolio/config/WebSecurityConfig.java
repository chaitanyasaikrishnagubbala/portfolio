package com.chaitanya.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Global CORS configuration.
 * Configured to allow Vercel production deployment (https://portfolio-cmg6.vercel.app),
 * Vercel preview deployments (*.vercel.app), and local development hosts.
 */
@Configuration
public class WebSecurityConfig {

    @Value("${portfolio.cors.allowed-origins:http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,https://portfolio-cmg6.vercel.app}")
    private String[] allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);

        List<String> originsList = new ArrayList<>(Arrays.asList(allowedOrigins));
        if (!originsList.contains("https://portfolio-cmg6.vercel.app")) {
            originsList.add("https://portfolio-cmg6.vercel.app");
        }

        corsConfiguration.setAllowedOrigins(originsList);

        // Pattern matching for dynamic Vercel deployments and localhost ports
        corsConfiguration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:*",
                "http://127.0.0.1:*",
                "https://*.vercel.app",
                "https://portfolio-cmg6.vercel.app"
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
