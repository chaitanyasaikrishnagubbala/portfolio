package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.SkillDTO;
import com.chaitanya.portfolio.exception.ResourceNotFoundException;
import com.chaitanya.portfolio.model.Skill;
import com.chaitanya.portfolio.repository.SkillRepository;
import com.chaitanya.portfolio.service.SkillService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Override
    @Transactional
    public SkillDTO createSkill(Skill skill) {
        Skill saved = skillRepository.save(skill);
        return SkillDTO.from(saved);
    }

    @Override
    @Transactional
    public SkillDTO updateSkill(Long id, Skill details) {
        Skill existing = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));

        existing.setName(details.getName());
        existing.setCategory(details.getCategory());
        existing.setLevel(details.getLevel());
        existing.setDescription(details.getDescription());
        if (details.getSortOrder() != null) {
            existing.setSortOrder(details.getSortOrder());
        }

        Skill updated = skillRepository.save(existing);
        return SkillDTO.from(updated);
    }

    @Override
    @Transactional
    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }
}
