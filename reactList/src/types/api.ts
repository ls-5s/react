// 直接使用后端返回的字段名，不做映射
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export interface PaginatedResponse<T = unknown> {
  list: T[];
  total: number;
  page: number;
  page_size: number;
}

// 文章类型 - 直接使用后端字段
export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  author_id: number;
  author_name?: string;
  created_at: string;
  updated_at?: string;
}

