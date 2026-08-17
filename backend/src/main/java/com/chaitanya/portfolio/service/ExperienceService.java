package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.ExperienceDTO;
import com.chaitanya.portfolio.model.Experience;

import java.util.List;

public interface ExperienceService {
    List<ExperienceDTO> getAllExperience();
    ExperienceDTO createExperience(Experience experience);
    ExperienceDTO updateExperience(Long id, Experience experience);
    void deleteExperience(Long id);
}
