import axios from 'axios';
import type { ApiResponse } from '../types/api';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === 200 || data.code === 0) {
      return response;
    }
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error) => {
    return Promise.reject(new Error(error.message || '网络错误'));
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

