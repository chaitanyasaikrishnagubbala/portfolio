import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../utils/apiHelpers';

/**
 * Contact form service.
 * Handles all API calls related to the contact section.
 *
 * Used by: Contact.jsx (via the existing import in services/api.js)
 */

/**
 * Submits the contact form to the backend.
 * POST /api/contact
 *
 * @param {{ name: string, email: string, subject?: string, message: string }} formData
 * @returns {{ success: boolean, message: string, data?: object }}
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post('/contact', formData);
    // Backend returns: { success: true, message: "...", data: { id, name, message, timestamp } }
    const apiResponse = response.data;
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: apiResponse.data,
    };
  } catch (error) {
    const message = handleApiError(error);
    return {
      success: false,
      message,
    };
  }
};

/**
 * Health check for the contact API.
 * GET /api/contact/health
 *
 * @returns {{ status: string, service: string }}
 */
export const checkContactHealth = async () => {
  try {
    const response = await axiosInstance.get('/contact/health');
    return response.data?.data || { status: 'UP' };
  } catch (error) {
    return { status: 'OFFLINE', message: handleApiError(error) };
  }
};
