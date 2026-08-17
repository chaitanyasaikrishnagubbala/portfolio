package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponseDTO;
import com.chaitanya.portfolio.dto.ProjectDTO;
import com.chaitanya.portfolio.model.Project;
import com.chaitanya.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<ProjectDTO>> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponseDTO.ok(projectService.getProjectById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponseDTO<ProjectDTO>> createProject(@Valid @RequestBody Project project) {
        ProjectDTO created = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok(created, "Project created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<ProjectDTO>> updateProject(@PathVariable Long id, @Valid @RequestBody Project project) {
        ProjectDTO updated = projectService.updateProject(id, project);
        return ResponseEntity.ok(ApiResponseDTO.ok(updated, "Project updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponseDTO.<Void>ok(null, "Project deleted successfully"));
    }
}
