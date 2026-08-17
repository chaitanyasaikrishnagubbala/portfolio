import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../utils/apiHelpers';

const request = async (method, endpoint, payload = null) => {
  try {
    const config = { method, url: endpoint };
    if (payload) config.data = payload;
    
    const response = await axiosInstance(config);
    const apiResponse = response.data;
    if (apiResponse.success) {
      return { success: true, data: apiResponse.data, message: apiResponse.message, error: null };
    }
    return { success: false, data: null, message: null, error: apiResponse.message || 'Operation failed' };
  } catch (error) {
    return { success: false, data: null, message: null, error: handleApiError(error) };
  }
};

// ── PROJECTS ──
export const createProject = (data) => request('post', '/projects', data);
export const updateProject = (id, data) => request('put', `/projects/${id}`, data);
export const deleteProject = (id) => request('delete', `/projects/${id}`);

// ── EDUCATION ──
export const createEducation = (data) => request('post', '/education', data);
export const updateEducation = (id, data) => request('put', `/education/${id}`, data);
export const deleteEducation = (id) => request('delete', `/education/${id}`);

// ── SKILLS ──
export const createSkill = (data) => request('post', '/skills', data);
export const updateSkill = (id, data) => request('put', `/skills/${id}`, data);
export const deleteSkill = (id) => request('delete', `/skills/${id}`);

// ── CERTIFICATIONS ──
export const createCertification = (data) => request('post', '/certifications', data);
export const updateCertification = (id, data) => request('put', `/certifications/${id}`, data);
export const deleteCertification = (id) => request('delete', `/certifications/${id}`);

// ── ACHIEVEMENTS ──
export const createAchievement = (data) => request('post', '/achievements', data);
export const updateAchievement = (id, data) => request('put', `/achievements/${id}`, data);
export const deleteAchievement = (id) => request('delete', `/achievements/${id}`);

// ── EXPERIENCE ──
export const createExperience = (data) => request('post', '/experience', data);
export const updateExperience = (id, data) => request('put', `/experience/${id}`, data);
export const deleteExperience = (id) => request('delete', `/experience/${id}`);

// ── ABOUT ME ──
export const getAboutMe = () => request('get', '/about');
export const updateAboutMe = (data) => request('put', '/about', data);
