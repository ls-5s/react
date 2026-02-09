import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { tokenStorage } from './storage';
import { ApiResponse } from '../types/api';

const HTTP_ERROR_MAP: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
};

const handleErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== 'object') return '请求失败，请稍后重试';
  
  const response = (error as { response?: { data?: { message?: string } } })?.response;
  if (response?.data?.message) return response.data.message;
  
  const message = (error as { message?: string })?.message;
  return typeof message === 'string' ? message : '请求失败，请稍后重试';
};

const handleHttpError = (status: number): string => {
  return HTTP_ERROR_MAP[status] || `请求失败 (${status})`;
};

const handleUnauthorized = () => {
  tokenStorage.remove();
  window.location.href = '/login';
};

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});

instance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || ({} as typeof config.headers);
    
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const isFormData = (config.method === 'post' || config.method === 'put') && config.data instanceof FormData;
    if (isFormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data, config } = response;
    const isBlob = config.responseType === 'blob' || config.responseType === 'arraybuffer';
    
    if (isBlob) return response;

    const hasCode = data && typeof data === 'object' && 'code' in data;
    if (!hasCode) return response;

    const isSuccess = data.code === 200 || data.code === 0;
    if (isSuccess) {
      return { ...response, data: data as ApiResponse };
    }

    if (data.code === 401) handleUnauthorized();
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) handleUnauthorized();
      const errorMessage = handleHttpError(status) || handleErrorMessage(error);
      return Promise.reject(new Error(errorMessage));
    }

    if (error.request) {
      return Promise.reject(new Error('网络连接失败，请检查网络'));
    }

    return Promise.reject(new Error(handleErrorMessage(error)));
  }
);

export const get = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.get(url, { params, ...config }).then((response) => response.data as ApiResponse<T>);
};

export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.post(url, data, config).then((response) => response.data as ApiResponse<T>);
};

export const put = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.put(url, data, config).then((response) => response.data as ApiResponse<T>);
};

export const del = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.delete(url, { params, ...config }).then((response) => response.data as ApiResponse<T>);
};

export const patch = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.patch(url, data, config).then((response) => response.data as ApiResponse<T>);
};

export const upload = <T = unknown>(
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return instance.post(url, formData, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data', ...config?.headers },
  }).then((response) => response.data as ApiResponse<T>);
};

export const download = (
  url: string,
  params?: Record<string, unknown>,
  filename?: string
): Promise<void> => {
  return instance.get(url, { params, responseType: 'blob' }).then((response) => {
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  });
};

export { handleErrorMessage, handleHttpError };
export default instance;
