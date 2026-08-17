package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.AchievementDTO;
import com.chaitanya.portfolio.model.Achievement;
import com.chaitanya.portfolio.service.AchievementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<AchievementDTO>>> getAllAchievements() {
        return ResponseEntity.ok(ApiResponseDTO.ok(achievementService.getAllAchievements()));
    }

    @PostMapping
    public ResponseEntity<ApiResponseDTO<AchievementDTO>> createAchievement(@Valid @RequestBody Achievement achievement) {
        AchievementDTO created = achievementService.createAchievement(achievement);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(created, "Achievement created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<AchievementDTO>> updateAchievement(@PathVariable Long id, @Valid @RequestBody Achievement achievement) {
        AchievementDTO updated = achievementService.updateAchievement(id, achievement);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "Achievement updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteAchievement(@PathVariable Long id) {
        achievementService.deleteAchievement(id);
        return ResponseEntity.ok(ApiResponseDTO.<Void>ok(null, "Achievement deleted successfully"));
    }
}
