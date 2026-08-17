package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.SkillDTO;
import com.chaitanya.portfolio.model.Skill;

import java.util.List;

public interface SkillService {
    List<SkillDTO> getAllSkills();
    List<SkillDTO> getSkillsByCategory(String category);
    SkillDTO createSkill(Skill skill);
    SkillDTO updateSkill(Long id, Skill skill);
    void deleteSkill(Long id);
}
