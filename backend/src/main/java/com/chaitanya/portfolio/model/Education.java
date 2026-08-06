package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents an education record displayed in the Education section.
 * Maps to the {@code education} table.
 */
@Entity
@Table(name = "education")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** e.g. "B.Tech in Computer Science Engineering" */
    @Column(nullable = false, length = 200)
    private String degree;

    /** e.g. "Lakireddy Bali Reddy College of Engineering" */
    @Column(nullable = false, length = 200)
    private String institution;

    @Column(length = 100)
    private String location;

    /** e.g. "2022 - 2026" */
    @Column(length = 50)
    private String duration;

    /** Label for the score field, e.g. "CGPA" or "Percentage" */
    @Column(name = "score_label", length = 50)
    private String scoreLabel;

    /** The actual score value, e.g. "9.16 / 10.0" */
    @Column(length = 50)
    private String score;

    /** One-line highlight shown at the bottom of the card */
    @Column(length = 300)
    private String highlight;

    @Column(columnDefinition = "TEXT")
    private String description;

    /** Display ordering — lower numbers appear first (most recent first) */
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
