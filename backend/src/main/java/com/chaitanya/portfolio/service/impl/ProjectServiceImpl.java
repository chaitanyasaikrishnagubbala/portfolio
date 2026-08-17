package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.ProjectDTO;
import com.chaitanya.portfolio.exception.ResourceNotFoundException;
import com.chaitanya.portfolio.model.Project;
import com.chaitanya.portfolio.repository.ProjectRepository;
import com.chaitanya.portfolio.service.ProjectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(ProjectDTO::from)
                .toList();
    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return ProjectDTO.from(project);
    }

    @Override
    @Transactional
    public ProjectDTO createProject(Project project) {
        Project saved = projectRepository.save(project);
        return ProjectDTO.from(saved);
    }

    @Override
    @Transactional
    public ProjectDTO updateProject(Long id, Project details) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        existing.setTitle(details.getTitle());
        existing.setSubtitle(details.getSubtitle());
        existing.setDescription(details.getDescription());
        existing.setLongDescription(details.getLongDescription());
        existing.setTechStack(details.getTechStack());
        existing.setFeatures(details.getFeatures());
        existing.setArchitecture(details.getArchitecture());
        existing.setGithubUrl(details.getGithubUrl());
        existing.setDemoUrl(details.getDemoUrl());
        existing.setImageUrl(details.getImageUrl());
        existing.setStatus(details.getStatus());
        if (details.getSortOrder() != null) {
            existing.setSortOrder(details.getSortOrder());
        }

        Project updated = projectRepository.save(existing);
        return ProjectDTO.from(updated);
    }

    @Override
    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}
