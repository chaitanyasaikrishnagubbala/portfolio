package com.chaitanya.portfolio.exception;

/**
 * Thrown when a requested resource does not exist in the database.
 * The GlobalExceptionHandler converts this to a 404 Not Found response.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, Long id) {
        super(resourceName + " with id " + id + " not found.");
    }
}
