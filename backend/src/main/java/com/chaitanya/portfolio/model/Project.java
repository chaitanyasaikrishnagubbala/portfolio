package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a portfolio project displayed in the Projects section.
 * Maps to the {@code projects} table.
 * Tech stack tags and features are stored as pipe-separated strings
 * to avoid a join table while keeping the schema simple.
 */
@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 200)
    private String subtitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    /**
     * Pipe-separated tech stack tags, e.g. "Java|Spring Boot|React|MySQL"
     * Parsed back to a List in the DTO mapper.
     */
    @Column(name = "tech_stack", columnDefinition = "TEXT")
    private String techStack;

    /**
     * Pipe-separated feature list, e.g. "JWT Auth|Seat Selection|REST API"
     */
    @Column(columnDefinition = "TEXT")
    private String features;

    /**
     * Pipe-separated architecture notes for the project modal.
     */
    @Column(columnDefinition = "TEXT")
    private String architecture;

    @Column(name = "github_url", length = 300)
    private String githubUrl;

    @Column(name = "demo_url", length = 300)
    private String demoUrl;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 50)
    private String status = "Completed";

    /** Display ordering — lower numbers appear first */
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
