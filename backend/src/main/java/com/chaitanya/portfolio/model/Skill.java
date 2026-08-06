package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a technical skill displayed in the Skills section.
 * Maps to the {@code skills} table.
 */
@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Display name, e.g. "Spring Boot" */
    @Column(nullable = false, length = 100)
    private String name;

    /** Filter category: backend | frontend | languages | database | tools | core */
    @Column(nullable = false, length = 50)
    private String category;

    /** Proficiency percentage 0-100 */
    @Column(nullable = false)
    private Integer level;

    /** Short description shown on the skill card */
    @Column(length = 300)
    private String description;

    /** Display ordering — lower numbers appear first */
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
