package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.Experience;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Data Transfer Object for the Experience entity.
 * Pipe-separated details are split into a List<String>.
 */
public record ExperienceDTO(
        Long id,
        String title,
        String type,
        List<String> details,
        String color,
        Integer sortOrder
) {
    /** Maps an Experience entity to an ExperienceDTO. */
    public static ExperienceDTO from(Experience experience) {
        return new ExperienceDTO(
                experience.getId(),
                experience.getTitle(),
                experience.getType(),
                splitPipe(experience.getDetails()),
                experience.getColor(),
                experience.getSortOrder()
        );
    }

    private static List<String> splitPipe(String value) {
        if (value == null || value.isBlank()) return Collections.emptyList();
        return Arrays.stream(value.split("\\|"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
