package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.SkillDTO;

import java.util.List;

/**
 * Contract for the Skills business logic layer.
 * Controllers depend on this interface, not on the implementation,
 * following the Dependency Inversion principle.
 */
public interface SkillService {
    /** Returns all skills ordered by sort_order. */
    List<SkillDTO> getAllSkills();

    /** Returns skills filtered by category. */
    List<SkillDTO> getSkillsByCategory(String category);
}
