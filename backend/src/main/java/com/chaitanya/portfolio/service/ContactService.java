package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.ContactRequestDTO;
import com.chaitanya.portfolio.dto.ContactResponseDTO;
import com.chaitanya.portfolio.model.ContactMessage;

import java.util.List;

/**
 * Contract for the Contact business logic layer.
 * Replaces direct repository access in ContactController.
 */
public interface ContactService {
    /** Saves a contact message and returns a response DTO. */
    ContactResponseDTO submitMessage(ContactRequestDTO request);

    /** Returns all contact messages ordered by submission date descending. */
    List<ContactMessage> getAllMessages();
}
