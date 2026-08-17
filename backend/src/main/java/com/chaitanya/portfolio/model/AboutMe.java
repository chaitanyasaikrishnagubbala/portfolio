package com.chaitanya.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity for storing About Me section information.
 */
@Entity
@Table(name = "about_me")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AboutMe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "dsa_solved", length = 50)
    private String dsaSolved;

    @Column(length = 20)
    private String cgpa;

    @Column(name = "college_name", length = 200)
    private String collegeName;

    @Column(name = "degree_name", length = 150)
    private String degreeName;

    @Column(name = "avatar_url", length = 300)
    private String avatarUrl;

    @Column(length = 100)
    private String email;

    @Column(name = "github_url", length = 300)
    private String githubUrl;

    @Column(name = "linkedin_url", length = 300)
    private String linkedinUrl;

    @Column(name = "leetcode_url", length = 300)
    private String leetcodeUrl;

    @Column(name = "codechef_url", length = 300)
    private String codechefUrl;
}
