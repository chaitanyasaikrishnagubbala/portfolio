package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.SkillDTO;
import com.chaitanya.portfolio.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Skills section.
 * Endpoint: GET /api/skills
 * Endpoint: GET /api/skills?category={category}
 */
@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    /**
     * Returns all skills, optionally filtered by category.
     * Matches the category IDs used in the frontend Skills component filter tabs:
     * all | backend | frontend | languages | database | tools | core
     *
     * @param category optional query param to filter by category
     * @return 200 OK with ApiResponseDTO wrapping the skill list
     */
    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<SkillDTO>>> getSkills(
            @RequestParam(required = false) String category) {

        List<SkillDTO> skills = (category != null && !category.isBlank())
                ? skillService.getSkillsByCategory(category)
                : skillService.getAllSkills();

        return ResponseEntity.ok(ApiResponseDTO.ok(skills));
    }
}
