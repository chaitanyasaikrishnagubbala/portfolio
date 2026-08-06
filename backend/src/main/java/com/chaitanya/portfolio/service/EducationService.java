package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.EducationDTO;

import java.util.List;

/**
 * Contract for the Education business logic layer.
 */
public interface EducationService {
    /** Returns all education records ordered by sort_order. */
    List<EducationDTO> getAllEducation();
}
