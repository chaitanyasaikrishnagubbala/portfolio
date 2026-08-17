package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.Achievement;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public record AchievementDTO(
        Long id,
        String title,
        String category,
        String description,
        String year,
        List<String> highlights,
        String color,
        Integer sortOrder
) {
    public static AchievementDTO from(Achievement achievement) {
        return new AchievementDTO(
                achievement.getId(),
                achievement.getTitle(),
                achievement.getCategory(),
                achievement.getDescription(),
                achievement.getYear(),
                splitPipe(achievement.getHighlights()),
                achievement.getColor(),
                achievement.getSortOrder()
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
