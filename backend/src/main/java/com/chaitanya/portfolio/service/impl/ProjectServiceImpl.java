package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.ProjectDTO;
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
}
