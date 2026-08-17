package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.ContactRequestDTO;
import com.chaitanya.portfolio.dto.ContactResponseDTO;
import com.chaitanya.portfolio.model.ContactMessage;
import com.chaitanya.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for contact form operations.
 * CORS is handled globally by WebSecurityConfig — no @CrossOrigin needed here.
 *
 * POST /api/contact  — Submit a contact message
 * GET  /api/contact  — Retrieve all messages (admin use)
 * GET  /api/contact/health — Health check endpoint
 */
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * Accepts a contact form submission.
     * Validates the request body via @Valid, delegates to ContactService,
     * and returns 201 Created with the saved message details.
     */
    @PostMapping
    public ResponseEntity<ApiResponseDTO<ContactResponseDTO>> submitMessage(
            @Valid @RequestBody ContactRequestDTO request) {

        ContactResponseDTO response = contactService.submitMessage(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(response, response.message()));
    }

    /**
     * Returns all saved contact messages ordered by submission date (newest first).
     * Intended for admin/dashboard use.
     */
    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<ContactMessage>>> getAllMessages() {
        return ResponseEntity.ok(ApiResponseDTO.ok(contactService.getAllMessages()));
    }

    /**
     * Simple health check for the contact API.
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> healthCheck() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "Portfolio Contact API");
        status.put("developer", "Gubbala Chaitanya Sai Krishna");
        return ResponseEntity.ok(ApiResponseDTO.ok(status));
    }
}
