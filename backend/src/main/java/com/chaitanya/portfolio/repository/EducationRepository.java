package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    /** Returns all education records sorted by sort_order ascending (most recent first). */
    List<Education> findAllByOrderBySortOrderAsc();
}
