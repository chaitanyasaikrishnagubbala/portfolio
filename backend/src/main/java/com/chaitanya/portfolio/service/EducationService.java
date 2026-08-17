package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.EducationDTO;
import com.chaitanya.portfolio.model.Education;

import java.util.List;

public interface EducationService {
    List<EducationDTO> getAllEducation();
    EducationDTO createEducation(Education education);
    EducationDTO updateEducation(Long id, Education education);
    void deleteEducation(Long id);
}
