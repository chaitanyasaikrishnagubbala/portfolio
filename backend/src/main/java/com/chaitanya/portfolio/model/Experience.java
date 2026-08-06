package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a career opportunity / experience card shown in the Experience section.
 * Maps to the {@code experiences} table.
 * Details bullet points are stored as a pipe-separated string.
 */
@Entity
@Table(name = "experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** e.g. "Software Engineering Internship" */
    @Column(nullable = false, length = 150)
    private String title;

    /** e.g. "Full-time / Summer Internship" */
    @Column(length = 100)
    private String type;

    /**
     * Pipe-separated detail bullet points.
     * e.g. "Spring Boot REST|MySQL ORM|Scalable APIs"
     * Parsed back to a List<String> in the DTO.
     */
    @Column(columnDefinition = "TEXT")
    private String details;

    /** Tailwind CSS class fragment used for card accent color */
    @Column(length = 200)
    private String color;

    /** Display ordering */
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
