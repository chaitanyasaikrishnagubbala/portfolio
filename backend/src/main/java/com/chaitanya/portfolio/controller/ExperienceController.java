package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.ExperienceDTO;
import com.chaitanya.portfolio.model.Experience;
import com.chaitanya.portfolio.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<ApiResponseDTO<ExperienceDTO>> createExperience(@Valid @RequestBody Experience experience) {
        ExperienceDTO created = experienceService.createExperience(experience);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(created, "Experience record created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<ExperienceDTO>> updateExperience(@PathVariable Long id, @Valid @RequestBody Experience experience) {
        ExperienceDTO updated = experienceService.updateExperience(id, experience);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "Experience record updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.ok(ApiResponseDTO.<Void>ok(null, "Experience record deleted successfully"));
    }
}
