package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.Project;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Data Transfer Object for the Project entity.
 * Pipe-separated string fields are split into proper List<String> for the frontend.
 */
public record ProjectDTO(
        Long id,
        String title,
        String subtitle,
        String description,
        String longDescription,
        List<String> stack,
        List<String> features,
        List<String> architecture,
        String githubUrl,
        String demoUrl,
        Integer sortOrder
) {
    /** Maps a Project entity to a ProjectDTO, splitting pipe-delimited fields. */
    public static ProjectDTO from(Project project) {
        return new ProjectDTO(
                project.getId(),
                project.getTitle(),
                project.getSubtitle(),
                project.getDescription(),
                project.getLongDescription(),
                splitPipe(project.getTechStack()),
                splitPipe(project.getFeatures()),
                splitPipe(project.getArchitecture()),
                project.getGithubUrl(),
                project.getDemoUrl(),
                project.getSortOrder()
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
