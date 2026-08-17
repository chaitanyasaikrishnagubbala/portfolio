package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.CertificationDTO;
import com.chaitanya.portfolio.exception.ResourceNotFoundException;
import com.chaitanya.portfolio.model.Certification;
import com.chaitanya.portfolio.repository.CertificationRepository;
import com.chaitanya.portfolio.service.CertificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class CertificationServiceImpl implements CertificationService {

    private final CertificationRepository certificationRepository;

    public CertificationServiceImpl(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    @Override
    public List<CertificationDTO> getAllCertifications() {
        return certificationRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(CertificationDTO::from)
                .toList();
    }

    @Override
    @Transactional
    public CertificationDTO createCertification(Certification certification) {
        Certification saved = certificationRepository.save(certification);
        return CertificationDTO.from(saved);
    }

    @Override
    @Transactional
    public CertificationDTO updateCertification(Long id, Certification details) {
        Certification existing = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));

        existing.setTitle(details.getTitle());
        existing.setIssuer(details.getIssuer());
        existing.setDate(details.getDate());
        existing.setCredentialUrl(details.getCredentialUrl());
        if (details.getSortOrder() != null) {
            existing.setSortOrder(details.getSortOrder());
        }

        Certification updated = certificationRepository.save(existing);
        return CertificationDTO.from(updated);
    }

    @Override
    @Transactional
    public void deleteCertification(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certification not found with id: " + id);
        }
        certificationRepository.deleteById(id);
    }
}
