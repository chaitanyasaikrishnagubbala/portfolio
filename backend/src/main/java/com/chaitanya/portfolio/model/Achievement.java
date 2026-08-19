package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents key achievements and competitive coding milestones.
 */
@Entity
@Table(name = "achievements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 100)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "achievement_year", length = 50)
    private String year;

    /** Pipe-separated highlights list */
    @Column(columnDefinition = "TEXT")
    private String highlights;

    @Column(length = 100)
    private String color;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
