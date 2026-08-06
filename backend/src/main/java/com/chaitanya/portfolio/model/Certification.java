package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a certification or award.
 * Maps to the {@code certifications} table.
 */
@Entity
@Table(name = "certifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 150)
    private String issuer;

    @Column(length = 50)
    private String date;

    @Column(name = "credential_url", length = 300)
    private String credentialUrl;

    /** Display ordering */
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}
