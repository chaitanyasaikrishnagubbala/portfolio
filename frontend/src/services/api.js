// ── Contact ────────────────────────────────────────────────────────
export { submitContactForm, checkContactHealth } from './contactService';

// ── Portfolio Data ─────────────────────────────────────────────────
export { getSkills, getProjects, getEducation, getExperience, getCertifications, getAchievements, getAboutMe } from './profileService';

// ── Axios Instance ─────────────────────────────────────────────────
export { default as apiClient } from '../api/axiosInstance';
