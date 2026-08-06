package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.ProjectDTO;
import com.chaitanya.portfolio.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the Projects section.
 * Endpoint: GET /api/projects
 */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<ProjectDTO>>> getAllProjects() {
        return ResponseEntity.ok(ApiResponseDTO.ok(projectService.getAllProjects()));
    }
}
