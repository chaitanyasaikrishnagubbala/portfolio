package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.ExperienceDTO;
import com.chaitanya.portfolio.repository.ExperienceRepository;
import com.chaitanya.portfolio.service.ExperienceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceServiceImpl(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Override
    public List<ExperienceDTO> getAllExperience() {
        return experienceRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(ExperienceDTO::from)
                .toList();
    }
}
