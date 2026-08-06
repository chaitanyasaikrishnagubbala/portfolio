package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.ProjectDTO;

import java.util.List;

/**
 * Contract for the Projects business logic layer.
 */
public interface ProjectService {
    /** Returns all projects ordered by sort_order. */
    List<ProjectDTO> getAllProjects();
}
