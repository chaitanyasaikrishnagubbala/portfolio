package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.ContactRequestDTO;
import com.chaitanya.portfolio.dto.ContactResponseDTO;
import com.chaitanya.portfolio.model.ContactMessage;
import com.chaitanya.portfolio.repository.ContactMessageRepository;
import com.chaitanya.portfolio.service.ContactService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementation of ContactService.
 * Handles business logic for contact form submissions.
 * Maps the DTO to the ContactMessage entity and persists it.
 */
@Service
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactServiceImpl(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    @Transactional
    public ContactResponseDTO submitMessage(ContactRequestDTO request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setSubject(request.subject());
        message.setMessage(request.message());
        // submittedAt is set automatically by @PrePersist

        ContactMessage saved = contactMessageRepository.save(message);

        return new ContactResponseDTO(
                saved.getId(),
                saved.getName(),
                "Thank you, " + saved.getName() + "! Your message has been saved successfully.",
                saved.getSubmittedAt()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderBySubmittedAtDesc();
    }
}
