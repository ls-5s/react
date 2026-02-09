/**
 * 文章相关 API
 */

import { get, post, put, del } from '../utils/request';
import { ApiResponse, PaginatedResponse } from '../types/api';
import { Post } from '../types/api';

/**
 * 文章 API
 */
export const postApi = {
  /**
   * 获取文章列表
   */
  getPostList: (params?: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    authorId?: number;
  }): Promise<ApiResponse<PaginatedResponse<Post>>> => {
    return get('/post/list', params);
  },

  /**
   * 获取文章详情
   */
  getPostDetail: (id: number, slug?: string): Promise<ApiResponse<Post>> => {
    return get(`/post/${id}`, { slug });
  },

  /**
   * 创建文章
   */
  createPost: (data: Partial<Post>): Promise<ApiResponse<Post>> => {
    return post('/post', data);
  },

  /**
   * 更新文章
   */
  updatePost: (id: number, data: Partial<Post>): Promise<ApiResponse<Post>> => {
    return put(`/post/${id}`, data);
  },

  /**
   * 删除文章
   */
  deletePost: (id: number): Promise<ApiResponse> => {
    return del(`/post/${id}`);
  },
};

