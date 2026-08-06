package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.EducationDTO;
import com.chaitanya.portfolio.repository.EducationRepository;
import com.chaitanya.portfolio.service.EducationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    public EducationServiceImpl(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Override
    public List<EducationDTO> getAllEducation() {
        return educationRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(EducationDTO::from)
                .toList();
    }
}
