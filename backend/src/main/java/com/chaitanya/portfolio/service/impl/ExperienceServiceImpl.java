package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.ExperienceDTO;
import com.chaitanya.portfolio.exception.ResourceNotFoundException;
import com.chaitanya.portfolio.model.Experience;
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

    @Override
    @Transactional
    public ExperienceDTO createExperience(Experience experience) {
        Experience saved = experienceRepository.save(experience);
        return ExperienceDTO.from(saved);
    }

    @Override
    @Transactional
    public ExperienceDTO updateExperience(Long id, Experience details) {
        Experience existing = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));

        existing.setTitle(details.getTitle());
        existing.setType(details.getType());
        existing.setDetails(details.getDetails());
        existing.setColor(details.getColor());
        if (details.getSortOrder() != null) {
            existing.setSortOrder(details.getSortOrder());
        }

        Experience updated = experienceRepository.save(existing);
        return ExperienceDTO.from(updated);
    }

    @Override
    @Transactional
    public void deleteExperience(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found with id: " + id);
        }
        experienceRepository.deleteById(id);
    }
}
