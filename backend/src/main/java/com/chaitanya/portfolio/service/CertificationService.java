package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.CertificationDTO;
import com.chaitanya.portfolio.model.Certification;

import java.util.List;

public interface CertificationService {
    List<CertificationDTO> getAllCertifications();
    CertificationDTO createCertification(Certification certification);
    CertificationDTO updateCertification(Long id, Certification certification);
    void deleteCertification(Long id);
}
