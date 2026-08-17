package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.EducationDTO;
import com.chaitanya.portfolio.model.Education;
import com.chaitanya.portfolio.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<ApiResponseDTO<EducationDTO>> createEducation(@Valid @RequestBody Education education) {
        EducationDTO created = educationService.createEducation(education);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(created, "Education record created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<EducationDTO>> updateEducation(@PathVariable Long id, @Valid @RequestBody Education education) {
        EducationDTO updated = educationService.updateEducation(id, education);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "Education record updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.ok(ApiResponseDTO.<Void>ok(null, "Education record deleted successfully"));
    }
}
