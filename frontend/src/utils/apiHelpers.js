/**
 * Utility functions for normalizing API errors across the application.
 * Import and use handleApiError() in any catch block.
 */

/**
 * Converts an Axios error into a user-friendly error message string.
 *
 * Priority order:
 * 1. Backend ApiResponseDTO.message (structured error from GlobalExceptionHandler)
 * 2. HTTP status-specific fallback messages
 * 3. Network/timeout fallback
 * 4. Generic fallback
 *
 * @param {Error} error - The error caught in a catch block
 * @returns {string} A human-readable error message
 */
export function handleApiError(error) {
  // The backend responded with a structured error (4xx / 5xx)
  if (error.response) {
    const { status, data } = error.response;

    // Use the backend's ApiResponseDTO.message if available
    if (data?.message) {
      return data.message;
    }

    // HTTP status-specific fallbacks
    switch (status) {
      case 400: return 'Invalid request. Please check your inputs.';
      case 401: return 'Unauthorized. Please log in.';
      case 403: return 'You do not have permission to perform this action.';
      case 404: return 'The requested resource was not found.';
      case 422: return 'Validation failed. Please check your inputs.';
      case 500: return 'Server error. Please try again later.';
      default:  return `Request failed with status ${status}.`;
    }
  }

  // No response — network error or server is down
  if (error.request) {
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. The server may be starting up — please try again.';
    }
    return 'Cannot connect to the server. Please check your connection.';
  }

  // Axios setup error (rare)
  return error.message || 'An unexpected error occurred.';
}

/**
 * Checks whether an Axios error was caused by the server being offline
 * (no response received at all).
 *
 * @param {Error} error
 * @returns {boolean}
 */
export function isNetworkError(error) {
  return !error.response && !!error.request;
}
