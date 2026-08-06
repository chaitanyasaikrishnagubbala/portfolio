package com.chaitanya.portfolio.dto;

/**
 * Generic API response wrapper.
 * All REST endpoints return this structure for consistency.
 *
 * @param success Whether the operation succeeded
 * @param message Human-readable status message
 * @param data    The actual payload (nullable for error responses)
 */
public record ApiResponseDTO<T>(
        boolean success,
        String message,
        T data
) {
    /** Convenience factory for successful responses with data. */
    public static <T> ApiResponseDTO<T> ok(T data) {
        return new ApiResponseDTO<>(true, "Success", data);
    }

    /** Convenience factory for successful responses with a custom message. */
    public static <T> ApiResponseDTO<T> ok(String message, T data) {
        return new ApiResponseDTO<>(true, message, data);
    }

    /** Convenience factory for error responses. */
    public static <T> ApiResponseDTO<T> error(String message) {
        return new ApiResponseDTO<>(false, message, null);
    }
}
