package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.EducationDTO;
import com.chaitanya.portfolio.exception.ResourceNotFoundException;
import com.chaitanya.portfolio.model.Education;
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

    @Override
    @Transactional
    public EducationDTO createEducation(Education education) {
        Education saved = educationRepository.save(education);
        return EducationDTO.from(saved);
    }

    @Override
    @Transactional
    public EducationDTO updateEducation(Long id, Education details) {
        Education existing = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education record not found with id: " + id));

        existing.setDegree(details.getDegree());
        existing.setInstitution(details.getInstitution());
        existing.setLocation(details.getLocation());
        existing.setDuration(details.getDuration());
        existing.setScoreLabel(details.getScoreLabel());
        existing.setScore(details.getScore());
        existing.setHighlight(details.getHighlight());
        existing.setDescription(details.getDescription());
        if (details.getSortOrder() != null) {
            existing.setSortOrder(details.getSortOrder());
        }

        Education updated = educationRepository.save(existing);
        return EducationDTO.from(updated);
    }

    @Override
    @Transactional
    public void deleteEducation(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education record not found with id: " + id);
        }
        educationRepository.deleteById(id);
    }
}
