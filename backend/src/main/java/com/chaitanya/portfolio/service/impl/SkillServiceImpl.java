package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.SkillDTO;
import com.chaitanya.portfolio.repository.SkillRepository;
import com.chaitanya.portfolio.service.SkillService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementation of SkillService.
 * All database reads are wrapped in a read-only transaction
 * for optimal performance and connection pool usage.
 */
@Service
@Transactional(readOnly = true)
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public List<SkillDTO> getAllSkills() {
        return skillRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(SkillDTO::from)
                .toList();
    }

    @Override
    public List<SkillDTO> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryOrderBySortOrderAsc(category)
                .stream()
                .map(SkillDTO::from)
                .toList();
    }
}
