package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    /** Returns all experience cards sorted by sort_order ascending. */
    List<Experience> findAllByOrderBySortOrderAsc();
}
