package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.Skill;

/**
 * Data Transfer Object for the Skill entity.
 * Exposes only the fields the frontend needs — excludes the internal DB id.
 */
public record SkillDTO(
        Long id,
        String name,
        String category,
        Integer level,
        String description,
        Integer sortOrder
) {
    /** Maps a Skill entity to a SkillDTO. */
    public static SkillDTO from(Skill skill) {
        return new SkillDTO(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel(),
                skill.getDescription(),
                skill.getSortOrder()
        );
    }
}
