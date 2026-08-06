/**
 * Centralized API service barrel export.
 *
 * This file is the single import point for all API calls in the application.
 * It re-exports from domain-specific service files, keeping concerns separated:
 *
 *   - contactService.js  — POST /api/contact, GET /api/contact/health
 *   - profileService.js  — GET /api/skills, projects, education, experience, certifications
 *
 * Existing imports like:
 *   import { submitContactForm } from '../services/api'
 * continue to work without any changes to Contact.jsx.
 */

// ── Contact ────────────────────────────────────────────────────────
export { submitContactForm, checkContactHealth } from './contactService';

// ── Portfolio Data ─────────────────────────────────────────────────
export { getSkills, getProjects, getEducation, getExperience, getCertifications } from './profileService';

// ── Axios Instance (for direct use if ever needed) ─────────────────
export { default as apiClient } from '../api/axiosInstance';
