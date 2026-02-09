/**
 * 用户相关 API
 */

import { get, post, put, del } from '../utils/request';
import { ApiResponse, PaginatedResponse } from '../types/api';
import { User, LoginParams, LoginResponse } from '../types/api';

/**
 * 用户 API
 */
export const userApi = {
  /**
   * 登录
   */
  login: (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
    return post('/auth/login', params);
  },

  /**
   * 登出
   */
  logout: (): Promise<ApiResponse> => {
    return post('/auth/logout');
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return get('/user/info');
  },

  /**
   * 获取用户列表
   */
  getUserList: (params?: {
    page?: number;
    pageSize?: number;
    keyword?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    return get('/user/list', params);
  },

  /**
   * 获取用户详情
   */
  getUserDetail: (id: number): Promise<ApiResponse<User>> => {
    return get(`/user/${id}`);
  },

  /**
   * 更新用户信息
   */
  updateUser: (id: number, data: Partial<User>): Promise<ApiResponse<User>> => {
    return put(`/user/${id}`, data);
  },

  /**
   * 删除用户
   */
  deleteUser: (id: number): Promise<ApiResponse> => {
    return del(`/user/${id}`);
  },
};

