package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.LoginRequestDTO;
import com.chaitanya.portfolio.dto.LoginResponseDTO;
import com.chaitanya.portfolio.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<LoginResponseDTO>> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponseDTO.ok(response, "Login successful"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDTO<Map<String, Object>>> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(ApiResponseDTO.error("Not authenticated", 401));
        }
        Map<String, Object> userData = Map.of(
                "username", authentication.getName(),
                "role", "ROLE_ADMIN",
                "authenticated", true
        );
        return ResponseEntity.ok(ApiResponseDTO.ok(userData));
    }
}
