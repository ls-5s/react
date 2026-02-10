import { get, post, del } from '../utils/request';
import type { ApiResponse, PaginatedResponse, Post } from '../types/api';

export const postApi = {
  getPostList: (params?: {
    page?: number;
    page_size?: number;
    keyword?: string;
  }): Promise<ApiResponse<PaginatedResponse<Post>>> => {
    return get('/post/list', params);
  },

  getPostDetail: (id: number): Promise<ApiResponse<Post>> => {
    return get(`/post/${id}`);
  },

  createPost: (data: {
    title: string;
    content: string;
    author_id?: number;
    author_name?: string;
  }): Promise<ApiResponse<Post>> => {
    return post('/post', data);
  },

  updatePost: (id: number, data: {
    title: string;
    content: string;
  }): Promise<ApiResponse<Post>> => {
    return post(`/post/${id}`, data, 'PUT');
  },

  deletePost: (id: number): Promise<ApiResponse> => {
    return del(`/post/${id}`);
  },
};

