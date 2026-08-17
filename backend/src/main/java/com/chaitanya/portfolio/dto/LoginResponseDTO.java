package com.chaitanya.portfolio.dto;

public record LoginResponseDTO(
        String token,
        String tokenType,
        String username,
        String role
) {
    public static LoginResponseDTO of(String token, String username, String role) {
        return new LoginResponseDTO(token, "Bearer", username, role);
    }
}
