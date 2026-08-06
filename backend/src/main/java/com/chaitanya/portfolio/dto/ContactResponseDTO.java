package com.chaitanya.portfolio.dto;

import java.time.LocalDateTime;

/**
 * Outbound DTO for the contact submission response.
 * Returns only what the frontend needs — no JPA internals exposed.
 */
public record ContactResponseDTO(
        Long id,
        String name,
        String message,
        LocalDateTime timestamp
) {}
