package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.SkillDTO;
import com.chaitanya.portfolio.model.Skill;
import com.chaitanya.portfolio.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<SkillDTO>>> getSkills(
            @RequestParam(required = false) String category) {
        List<SkillDTO> skills = (category != null && !category.isBlank())
                ? skillService.getSkillsByCategory(category)
                : skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponseDTO.ok(skills));
    }

    @PostMapping
    public ResponseEntity<ApiResponseDTO<SkillDTO>> createSkill(@Valid @RequestBody Skill skill) {
        SkillDTO created = skillService.createSkill(skill);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(created, "Skill created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<SkillDTO>> updateSkill(@PathVariable Long id, @Valid @RequestBody Skill skill) {
        SkillDTO updated = skillService.updateSkill(id, skill);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "Skill updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponseDTO.<Void>ok(null, "Skill deleted successfully"));
    }
}
