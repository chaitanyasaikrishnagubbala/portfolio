package com.chaitanya.portfolio.config;

import com.chaitanya.portfolio.model.*;
import com.chaitanya.portfolio.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Seeds the database with initial portfolio data on application startup.
 * All data mirrors what was previously hardcoded in the React components.
 * Each seeder checks if data already exists before inserting, so
 * restarting the server never duplicates records.
 */
@Configuration
public class DataInitializer {

    // =========================================================
    // SKILLS — mirrors skillsData[] in Skills.jsx
    // =========================================================
    @Bean
    @Transactional
    public CommandLineRunner seedSkills(SkillRepository repo) {
        return args -> {
            repo.deleteAll();

            repo.saveAll(List.of(
                // Languages
                skill("Java",       "languages", 92, "Core Java, OOPs, Collections, Multithreading", 1),
                skill("Python",     "languages", 80, "Scripting, Automation, Data Structures", 2),
                skill("JavaScript", "languages", 85, "ES6+, Asynchronous JS, DOM Manipulation", 3),
                skill("SQL",        "languages", 88, "Complex Queries, Joins, Indexing, Triggers", 4),

                // Frontend
                skill("React",       "frontend", 88, "Hooks, Component Lifecycle, State Management", 5),
                skill("HTML",        "frontend", 95, "Semantic HTML5, Accessibility, SEO", 6),
                skill("CSS",         "frontend", 90, "Flexbox, Grid, Animations, Responsive Design", 7),
                skill("Tailwind CSS","frontend", 90, "Utility-first styling, Glassmorphic UI", 8),

                // Backend
                skill("Spring Boot", "backend", 90, "REST API, Spring Security, Dependency Injection", 9),
                skill("Spring MVC",  "backend", 85, "Controller Routing, Request Mapping, Handlers", 10),
                skill("REST APIs",   "backend", 92, "Endpoint Design, JSON Payloads, HTTP Verbs", 11),
                skill("Hibernate",   "backend", 84, "ORM Mapping, HQL, Cache Management", 12),
                skill("JPA",         "backend", 86, "Java Persistence API, Custom Repositories", 13),
                skill("JDBC",        "backend", 85, "Direct Database Connectivity, Statement Exec", 14),

                // Database
                skill("MySQL", "database", 90, "Relational DB Design, Normalization, ACID", 15),

                // Tools
                skill("Git",          "tools", 88, "Version Control, Branching, Merging", 16),
                skill("GitHub",       "tools", 90, "Repositories, Pull Requests, Code Reviews", 17),
                skill("Postman",      "tools", 90, "API Testing, Automated Collections, Environment Vars", 18),
                skill("Maven",        "tools", 85, "Dependency Management, Build Automation", 19),
                skill("VS Code",      "tools", 92, "Frontend & Scripting IDE", 20),
                skill("IntelliJ IDEA","tools", 90, "Primary Java & Spring Boot Development IDE", 21)
            ));
        };
    }

    private Skill skill(String name, String category, int level, String desc, int order) {
        Skill s = new Skill();
        s.setName(name);
        s.setCategory(category);
        s.setLevel(level);
        s.setDescription(desc);
        s.setSortOrder(order);
        return s;
    }

    // =========================================================
    // PROJECTS — mirrors projects[] in Projects.jsx
    // =========================================================
    @Bean
    @Transactional
    public CommandLineRunner seedProjects(ProjectRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            repo.saveAll(List.of(
                project(
                    "Movie Ticket Booking System",
                    "Full-Stack Cinema Reservation Engine",
                    "A complete end-to-end cinema ticketing platform featuring real-time seat allocation, showtime scheduling, JWT authentication, and MySQL backend transactions.",
                    "Built using Java Spring Boot REST services and React.js frontend, this enterprise application handles complex cinema booking workflows. Users can browse movies by genre, choose showtimes, select interactively rendered theater seats, apply promo codes, and complete ticket bookings stored in normalized MySQL database tables.",
                    "Java|Spring Boot|React|MySQL|Spring Data JPA|REST API|Tailwind CSS",
                    "User Authentication (JWT & Session)|Dynamic Movie Listing & Search|Interactive Seat Selection Grid|Transactional Booking Engine|REST APIs with Spring MVC|MySQL Database Integration",
                    "POST /api/v1/auth/login & /register|GET /api/v1/movies & GET /api/v1/shows/{id}/seats|POST /api/v1/bookings with @Transactional ACID safety|JPA Repositories with Hibernate lazy-loading optimizations",
                    "https://github.com", "https://github.com", 1
                ),
                project(
                    "Student Management Portal",
                    "Academic Administrative Platform",
                    "A robust educational management system enabling administrators and faculty to perform seamless CRUD operations on student academic records and attendance.",
                    "A production-grade web portal designed for educational institutions. Provides high-throughput Spring Boot REST API endpoints, responsive React data tables with client-side sorting and filtering, and automated MySQL database cascade operations.",
                    "Java|Spring Boot|React|MySQL|Hibernate|REST API|Tailwind CSS",
                    "Complete CRUD Operations for Records|High-Performance REST APIs|Student Profiles & Grade Tracking|Responsive Glassmorphism UI|MySQL Relational Database Schema|Real-time Search & Filter Controls",
                    "GET /api/v1/students?page=0&size=10 (Paginated)|POST /api/v1/students & PUT /api/v1/students/{id}|DELETE /api/v1/students/{id} with integrity validation|Custom Spring Data JPA Query Methods for dynamic filtering",
                    "https://github.com", "https://github.com", 2
                )
            ));
        };
    }

    private Project project(String title, String subtitle, String desc, String longDesc,
                            String stack, String features, String arch,
                            String github, String demo, int order) {
        Project p = new Project();
        p.setTitle(title);
        p.setSubtitle(subtitle);
        p.setDescription(desc);
        p.setLongDescription(longDesc);
        p.setTechStack(stack);
        p.setFeatures(features);
        p.setArchitecture(arch);
        p.setGithubUrl(github);
        p.setDemoUrl(demo);
        p.setSortOrder(order);
        return p;
    }

    // =========================================================
    // EDUCATION — mirrors educationData[] in Education.jsx
    // =========================================================
    @Bean
    @Transactional
    public CommandLineRunner seedEducation(EducationRepository repo) {
        return args -> {
            repo.deleteAll();

            repo.saveAll(List.of(
                education(
                    "B.Tech in Computer Science Engineering",
                    "Lakireddy Bali Reddy College of Engineering (LBRCE)",
                    "Mylavaram, Andhra Pradesh", "2022 - 2026",
                    "CGPA", "9.16 / 10.0",
                    "Top Ranker | Specialization in Java Backend, Data Structures & Database Systems",
                    "Pursuing Bachelor of Technology in Computer Science & Engineering with distinction. Active participant in coding challenges, hackathons, and technical projects.",
                    1
                ),
                education(
                    "Intermediate (MPC - Maths, Physics, Chemistry)",
                    "Junior College / State Board of Intermediate Education",
                    "Andhra Pradesh", "2020 - 2022",
                    "Percentage", "95%",
                    "Strong Mathematical & Analytical Foundation",
                    "Completed Higher Secondary Education focusing on Advanced Mathematics, Physics, and Analytical Logic with academic excellence.",
                    2
                ),
                education(
                    "Secondary School Certificate (SSC)",
                    "State Board of Secondary Education",
                    "Andhra Pradesh", "2019 - 2020",
                    "Percentage", "85%",
                    "Academic Distinction",
                    "Graduated secondary school with top honors across all academic disciplines, building the core foundation for science and technology.",
                    3
                )
            ));
        };
    }

    private Education education(String degree, String institution, String location,
                                String duration, String scoreLabel, String score,
                                String highlight, String desc, int order) {
        Education e = new Education();
        e.setDegree(degree);
        e.setInstitution(institution);
        e.setLocation(location);
        e.setDuration(duration);
        e.setScoreLabel(scoreLabel);
        e.setScore(score);
        e.setHighlight(highlight);
        e.setDescription(desc);
        e.setSortOrder(order);
        return e;
    }

    // =========================================================
    // EXPERIENCE — mirrors opportunityRoles[] in Experience.jsx
    // =========================================================
    @Bean
    @Transactional
    public CommandLineRunner seedExperience(ExperienceRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            repo.saveAll(List.of(
                experience(
                    "Software Engineering Internship",
                    "Full-time / Summer Internship",
                    "Available for 2026 / 2025 schedules|Algorithmic Problem Solving|Full Stack Feature Delivery",
                    "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/40",
                    1
                ),
                experience(
                    "Java Backend Developer",
                    "Entry Level / Associate Engineer",
                    "Spring Boot Microservices & REST|MySQL Schema & ORM Hibernate|Scalable Architecture & APIs",
                    "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/40",
                    2
                ),
                experience(
                    "Full Stack Developer Opportunities",
                    "Full-Time Roles",
                    "React.js Modern Frontends|Spring Boot Backend APIs|End-to-end Application Lifecycle",
                    "from-purple-500/20 to-cyan-500/20 text-purple-400 border-purple-500/40",
                    3
                )
            ));
        };
    }

    private Experience experience(String title, String type, String details,
                                  String color, int order) {
        Experience e = new Experience();
        e.setTitle(title);
        e.setType(type);
        e.setDetails(details);
        e.setColor(color);
        e.setSortOrder(order);
        return e;
    }

    // =========================================================
    // CERTIFICATIONS — placeholder data ready for future use
    // =========================================================
    @Bean
    @Transactional
    public CommandLineRunner seedCertifications(CertificationRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            Certification cert = new Certification();
            cert.setTitle("Java SE 21 Fundamentals");
            cert.setIssuer("Oracle");
            cert.setDate("2025");
            cert.setCredentialUrl("https://oracle.com");
            cert.setSortOrder(1);
            repo.save(cert);
        };
    }
}
