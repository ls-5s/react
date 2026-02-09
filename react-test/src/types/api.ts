/**
 * API 响应类型定义
 */

// 标准 API 响应结构
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 分页响应结构
export interface PaginatedResponse<T = unknown> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 请求配置扩展
export interface RequestConfig {
  showLoading?: boolean; // 是否显示加载中
  showError?: boolean; // 是否显示错误提示
  needAuth?: boolean; // 是否需要认证
}

// ==================== 用户相关类型 ====================

/**
 * 用户信息类型
 */
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

/**
 * 登录参数
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string;
  user: User;
}

// ==================== 文章相关类型 ====================

/**
 * 文章类型
 */
export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  authorId: number;
  author?: User;
  createdAt?: string;
  updatedAt?: string;
}

