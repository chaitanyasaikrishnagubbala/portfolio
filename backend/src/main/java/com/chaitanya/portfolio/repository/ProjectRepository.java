package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    /** Returns all projects sorted by sort_order ascending. */
    List<Project> findAllByOrderBySortOrderAsc();
}
