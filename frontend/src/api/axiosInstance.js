import axios from 'axios';

/**
 * Centralized Axios instance.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://portfolio-1ckx.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// ──────────────────────────────────────────────
// REQUEST INTERCEPTOR
// ──────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized response on admin path, clean token
      if (window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_user');
      }
    }
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
