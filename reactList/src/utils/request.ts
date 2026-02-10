import axios from 'axios';
import type { ApiResponse } from '../types/api';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器 - 添加 token
instance.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const authData = JSON.parse(stored);
        if (authData?.token) {
          config.headers.Authorization = `Bearer ${authData.token}`;
        }
      }
    } catch {
      // 忽略解析错误
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === 200 || data.code === 0) {
      return response;
    }
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error) => {
    // 401 未授权，清除 token
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
    }
    return Promise.reject(new Error(error.response?.data?.message || error.message || '网络错误'));
  }
);

export const get = <T = unknown>(
  url: string,
  params?: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  return instance.get(url, { params }).then((res) => res.data as ApiResponse<T>);
};

const METHOD_MAP = {
  POST: (url: string, data?: unknown) => instance.post(url, data),
  PUT: (url: string, data?: unknown) => instance.put(url, data),
};

export const post = <T = unknown>(
  url: string,
  data?: unknown,
  method: 'POST' | 'PUT' = 'POST'
): Promise<ApiResponse<T>> => {
  return METHOD_MAP[method](url, data).then((res) => res.data as ApiResponse<T>);
};

export const del = <T = unknown>(
  url: string
): Promise<ApiResponse<T>> => {
  return instance.delete(url).then((res) => res.data as ApiResponse<T>);
};

