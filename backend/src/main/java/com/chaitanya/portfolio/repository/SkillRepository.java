package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    /** Returns all skills sorted by sort_order ascending. */
    List<Skill> findAllByOrderBySortOrderAsc();

    /** Returns skills filtered by category, sorted by sort_order. */
    List<Skill> findByCategoryOrderBySortOrderAsc(String category);
}
