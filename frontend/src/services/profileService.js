import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../utils/apiHelpers';

const safeGet = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    const apiResponse = response.data;
    if (apiResponse.success && apiResponse.data) {
      return { data: apiResponse.data, error: null };
    }
    return { data: null, error: apiResponse.message || 'No data returned' };
  } catch (error) {
    return { data: null, error: handleApiError(error) };
  }
};

export const getSkills = () => safeGet('/skills');
export const getProjects = () => safeGet('/projects');
export const getEducation = () => safeGet('/education');
export const getExperience = () => safeGet('/experience');
export const getCertifications = () => safeGet('/certifications');
export const getAchievements = () => safeGet('/achievements');
export const getAboutMe = () => safeGet('/about');
