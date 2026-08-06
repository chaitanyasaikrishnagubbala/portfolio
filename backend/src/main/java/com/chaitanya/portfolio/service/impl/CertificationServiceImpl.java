package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.CertificationDTO;
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
}
