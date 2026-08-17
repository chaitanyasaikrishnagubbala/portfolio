package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.AboutMeDTO;
import com.chaitanya.portfolio.model.AboutMe;
import com.chaitanya.portfolio.service.AboutMeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/about")
public class AboutMeController {

    private final AboutMeService aboutMeService;

    public AboutMeController(AboutMeService aboutMeService) {
        this.aboutMeService = aboutMeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<AboutMeDTO>> getAboutMe() {
        return ResponseEntity.ok(ApiResponseDTO.ok(aboutMeService.getAboutMe()));
    }

    @PutMapping
    public ResponseEntity<ApiResponseDTO<AboutMeDTO>> updateAboutMe(@Valid @RequestBody AboutMe aboutMe) {
        AboutMeDTO updated = aboutMeService.updateAboutMe(aboutMe);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "About Me updated successfully"));
    }
}
