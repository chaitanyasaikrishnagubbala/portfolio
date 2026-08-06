package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.CertificationDTO;
import com.chaitanya.portfolio.service.CertificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Certifications.
 * Endpoint: GET /api/certifications
 */
@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<CertificationDTO>>> getAllCertifications() {
        return ResponseEntity.ok(ApiResponseDTO.ok(certificationService.getAllCertifications()));
    }
}
