package com.chaitanya.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Inbound DTO for POST /api/contact requests.
 * Replaces the direct use of the ContactMessage entity in the controller,
 * decoupling the API contract from the persistence model.
 */
public record ContactRequestDTO(

        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must not exceed 100 characters")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "A valid email address is required")
        @Size(max = 150, message = "Email must not exceed 150 characters")
        String email,

        @Size(max = 200, message = "Subject must not exceed 200 characters")
        String subject,

        @NotBlank(message = "Message is required")
        String message
) {}
