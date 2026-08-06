package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.EducationDTO;
import com.chaitanya.portfolio.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Education section.
 * Endpoint: GET /api/education
 */
@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<EducationDTO>>> getAllEducation() {
        return ResponseEntity.ok(ApiResponseDTO.ok(educationService.getAllEducation()));
    }
}
