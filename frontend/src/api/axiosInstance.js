import axios from 'axios';

/**
 * Centralized Axios instance.
 *
 * Base URL strategy:
 * - In development: Vite's dev-server proxy forwards /api → localhost:8081
 *   so we use the relative path '/api' (no CORS issues, works out of the box)
 * - In production: set VITE_API_BASE_URL to your deployed backend URL in .env
 *
 * This single instance is imported by all service files.
 * Never create a second axios.create() elsewhere in the project.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds — generous enough for cold H2 startup
});

// ──────────────────────────────────────────────
// REQUEST INTERCEPTOR
// ──────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    // Future: inject JWT token here if authentication is added
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ──────────────────────────────────────────────
// RESPONSE INTERCEPTOR
// ──────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => {
    // Unwrap the ApiResponseDTO envelope so callers get response.data.data
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.warn('[API] Request timed out.');
    } else if (!error.response) {
      console.warn('[API] Network error — Spring Boot server may be offline.');
    } else {
      const status = error.response?.status;
      console.warn(`[API] HTTP ${status}:`, error.response?.data?.message || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
