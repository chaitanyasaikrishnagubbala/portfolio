package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.CertificationDTO;

import java.util.List;

/**
 * Contract for the Certifications business logic layer.
 */
public interface CertificationService {
    /** Returns all certifications ordered by sort_order. */
    List<CertificationDTO> getAllCertifications();
}
