import { API_URL } from '@/config/constants/env';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     // Modify the request config here
//     const token = await auth.currentUser?.getIdToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       config.headers['Content-Type'] = 'application/json';
//     }
//     return config;
//   },
//   (error: any) => {
//     // Handle request error here
//     return Promise.reject(error);
//   },
// );

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify the response data here
    return response && response.data;
  },
  (error: any) => {
    // Handle response error here
    return Promise.reject(error);
  },
);

export default api;
