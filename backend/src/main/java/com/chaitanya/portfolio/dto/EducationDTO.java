package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.Education;

/**
 * Data Transfer Object for the Education entity.
 */
public record EducationDTO(
        Long id,
        String degree,
        String institution,
        String location,
        String duration,
        String scoreLabel,
        String score,
        String highlight,
        String description,
        Integer sortOrder
) {
    /** Maps an Education entity to an EducationDTO. */
    public static EducationDTO from(Education education) {
        return new EducationDTO(
                education.getId(),
                education.getDegree(),
                education.getInstitution(),
                education.getLocation(),
                education.getDuration(),
                education.getScoreLabel(),
                education.getScore(),
                education.getHighlight(),
                education.getDescription(),
                education.getSortOrder()
        );
    }
}
