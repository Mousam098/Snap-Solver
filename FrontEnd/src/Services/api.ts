/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestHeaders, Method } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    axiosInstance.post('/auth/register', userData),
    
  login: (credentials: { email: string; password: string }) =>
    axiosInstance.post('/auth/login', credentials),
    
  verify: () => axiosInstance.post('/auth/verify'),
  
  getProfile: () => axiosInstance.get('/auth/me'),
  
  updateProfile: (data: { name?: string }) => 
    axiosInstance.patch('/auth/update-profile', data),
};

// Calculator API
export const calculatorAPI = {
  processImage: (imageData: string, dictOfVars: Record<string, any>) =>
    axiosInstance.post('/calculate', {
      image: imageData,
      dict_of_vars: dictOfVars,
    }),
};

// Generic API connector (kept for backward compatibility)
interface ApiConnectorParams {
  method: Method;
  endpoint: string;
  body?: Record<string, any> | null;
  headers?: AxiosRequestHeaders | undefined;
  params?: Record<string, any> | null;
}

export const apiConnector = ({ 
  method, 
  endpoint, 
  body, 
  headers, 
  params 
}: ApiConnectorParams) => {
  return axiosInstance({
    method,
    url: endpoint,
    data: body || undefined,
    headers: headers || undefined,
    params: params || undefined,
  });
};

export default axiosInstance;
