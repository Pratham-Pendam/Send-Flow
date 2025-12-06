import axios from "axios";

let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

// Axios interceptor to automatically add access token to requests
axios.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Use refresh token to get new access token
        const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
          withCredentials: true,
        });
        
        // The server sets new access token via cookie, we need to extract it
        // For now, we'll rely on the refresh flow
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
