import { post, get } from '../utils/request';
import type { ApiResponse, User } from '../types/api';

export const authApi = {
  login: (data: { username: string; password: string }): Promise<ApiResponse<{ token: string; user: User }>> => {
    return post('/auth/login', data);
  },

  register: (data: { username: string; email: string; password: string }): Promise<ApiResponse<{ token: string; user: User }>> => {
    return post('/auth/register', data);
  },

  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return get('/auth/me');
  },
};

