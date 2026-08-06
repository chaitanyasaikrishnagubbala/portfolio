package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.ExperienceDTO;

import java.util.List;

/**
 * Contract for the Experience business logic layer.
 */
public interface ExperienceService {
    /** Returns all experience cards ordered by sort_order. */
    List<ExperienceDTO> getAllExperience();
}
