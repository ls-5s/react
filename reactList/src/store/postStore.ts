import { create } from 'zustand';
import type { Post, PaginatedResponse } from '../types/api';
import { postApi } from '../api/postApi';

interface PostState {
  postList: Post[];
  currentPost: Post | null;
  total: number;
  page: number;
  page_size: number;
  loading: boolean;
  error: string | null;
  fetchPostList: (params?: { page?: number; page_size?: number; keyword?: string }) => Promise<void>;
  fetchPostDetail: (id: number) => Promise<void>;
  createPost: (data: { title: string; content: string; author_id?: number; author_name?: string }) => Promise<void>;
  updatePost: (id: number, data: { title: string; content: string }) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  clearError: () => void;
}

const ERROR_MESSAGES = {
  fetch: '加载失败',
  create: '创建失败',
  update: '更新失败',
  delete: '删除失败',
};

const handleAsync = async <T>(
  set: (state: Partial<PostState>) => void,
  action: () => Promise<T>,
  errorMessage: string,
  shouldThrow = false
): Promise<T | void> => {
  set({ loading: true, error: null });
  try {
    const result = await action();
    set({ loading: false });
    return result;
  } catch (err) {
    set({
      error: err instanceof Error ? err.message : errorMessage,
      loading: false,
    });
    if (shouldThrow) throw err;
  }
};

export const usePostStore = create<PostState>((set) => ({
  postList: [],
  currentPost: null,
  total: 0,
  page: 1,
  page_size: 10,
  loading: false,
  error: null,

  fetchPostList: async (params) => {
    await handleAsync(set, async () => {
      const res = await postApi.getPostList(params);
      const { list, total, page, page_size } = res.data as PaginatedResponse<Post>;
      set({ postList: list, total, page, page_size });
    }, ERROR_MESSAGES.fetch);
  },

  fetchPostDetail: async (id) => {
    await handleAsync(set, async () => {
      const res = await postApi.getPostDetail(id);
      set({ currentPost: res.data as Post });
    }, ERROR_MESSAGES.fetch);
  },

  createPost: async (data) => {
    await handleAsync(set, () => postApi.createPost(data), ERROR_MESSAGES.create, true);
  },

  updatePost: async (id, data) => {
    await handleAsync(set, () => postApi.updatePost(id, data), ERROR_MESSAGES.update, true);
  },

  deletePost: async (id) => {
    await handleAsync(set, () => postApi.deletePost(id), ERROR_MESSAGES.delete);
  },

  clearError: () => set({ error: null }),
}));

