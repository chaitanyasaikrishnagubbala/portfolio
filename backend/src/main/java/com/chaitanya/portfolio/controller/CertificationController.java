package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.CertificationDTO;
import com.chaitanya.portfolio.model.Certification;
import com.chaitanya.portfolio.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<ApiResponseDTO<CertificationDTO>> createCertification(@Valid @RequestBody Certification certification) {
        CertificationDTO created = certificationService.createCertification(certification);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(created, "Certification created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<CertificationDTO>> updateCertification(@PathVariable Long id, @Valid @RequestBody Certification certification) {
        CertificationDTO updated = certificationService.updateCertification(id, certification);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "Certification updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.ok(ApiResponseDTO.<Void>ok(null, "Certification deleted successfully"));
    }
}
