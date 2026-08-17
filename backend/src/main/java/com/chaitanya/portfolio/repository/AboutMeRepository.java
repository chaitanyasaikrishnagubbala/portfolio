package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.AboutMe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AboutMeRepository extends JpaRepository<AboutMe, Long> {
    Optional<AboutMe> findFirstByOrderByIdAsc();
}
