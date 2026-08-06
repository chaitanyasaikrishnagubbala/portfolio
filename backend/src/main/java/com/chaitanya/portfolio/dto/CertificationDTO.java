package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.Certification;

/**
 * Data Transfer Object for the Certification entity.
 */
public record CertificationDTO(
        Long id,
        String title,
        String issuer,
        String date,
        String credentialUrl,
        Integer sortOrder
) {
    /** Maps a Certification entity to a CertificationDTO. */
    public static CertificationDTO from(Certification certification) {
        return new CertificationDTO(
                certification.getId(),
                certification.getTitle(),
                certification.getIssuer(),
                certification.getDate(),
                certification.getCredentialUrl(),
                certification.getSortOrder()
        );
    }
}
