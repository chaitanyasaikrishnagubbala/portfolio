import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../utils/apiHelpers';

const TOKEN_KEY = 'portfolio_admin_token';
const USER_KEY = 'portfolio_admin_user';

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { username, password });
    const apiResponse = response.data;
    
    if (apiResponse.success && apiResponse.data) {
      const { token, username, role } = apiResponse.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify({ username, role }));
      return { success: true, data: apiResponse.data, error: null };
    }
    return { success: false, data: null, error: apiResponse.message || 'Login failed' };
  } catch (error) {
    return { success: false, data: null, error: handleApiError(error) };
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
