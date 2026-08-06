package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.ExperienceDTO;
import com.chaitanya.portfolio.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Experience / Career Opportunities section.
 * Endpoint: GET /api/experience
 */
@RestController
@RequestMapping("/api/experience")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<ExperienceDTO>>> getAllExperience() {
        return ResponseEntity.ok(ApiResponseDTO.ok(experienceService.getAllExperience()));
    }
}
