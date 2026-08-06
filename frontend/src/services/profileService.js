import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../utils/apiHelpers';

/**
 * Profile service.
 * Handles all GET API calls for portfolio data sections.
 *
 * All functions return { data: T | null, error: string | null }
 * so hooks can differentiate between "no data" and "errored".
 * On network failure the function resolves successfully with error set,
 * allowing components to fall back to static data gracefully.
 */

const safeGet = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    // Backend wraps all responses in ApiResponseDTO: { success, message, data }
    const apiResponse = response.data;
    if (apiResponse.success && apiResponse.data) {
      return { data: apiResponse.data, error: null };
    }
    return { data: null, error: apiResponse.message || 'No data returned' };
  } catch (error) {
    return { data: null, error: handleApiError(error) };
  }
};

/**
 * GET /api/skills
 * Returns all skills ordered by sort_order.
 * @returns {{ data: SkillDTO[] | null, error: string | null }}
 */
export const getSkills = () => safeGet('/skills');

/**
 * GET /api/projects
 * Returns all projects ordered by sort_order.
 * @returns {{ data: ProjectDTO[] | null, error: string | null }}
 */
export const getProjects = () => safeGet('/projects');

/**
 * GET /api/education
 * Returns all education records ordered by sort_order.
 * @returns {{ data: EducationDTO[] | null, error: string | null }}
 */
export const getEducation = () => safeGet('/education');

/**
 * GET /api/experience
 * Returns all experience cards ordered by sort_order.
 * @returns {{ data: ExperienceDTO[] | null, error: string | null }}
 */
export const getExperience = () => safeGet('/experience');

/**
 * GET /api/certifications
 * Returns all certifications ordered by sort_order.
 * @returns {{ data: CertificationDTO[] | null, error: string | null }}
 */
export const getCertifications = () => safeGet('/certifications');
