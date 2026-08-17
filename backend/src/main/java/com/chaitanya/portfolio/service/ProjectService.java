package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.ProjectDTO;
import com.chaitanya.portfolio.model.Project;

import java.util.List;

/**
 * Contract for the Projects business logic layer.
 */
public interface ProjectService {
    List<ProjectDTO> getAllProjects();
    ProjectDTO getProjectById(Long id);
    ProjectDTO createProject(Project project);
    ProjectDTO updateProject(Long id, Project project);
    void deleteProject(Long id);
}
