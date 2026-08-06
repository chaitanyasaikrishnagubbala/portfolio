package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    /** Returns all certifications sorted by sort_order ascending. */
    List<Certification> findAllByOrderBySortOrderAsc();
}
