// 统一导出 API 服务
export { default as request, get, post, put, del, patch, upload, download } from '../utils/request';

// 导出各个 API 模块
export { userApi } from './userApi';
export { postApi } from './postApi';

// 导出类型
export type { User, LoginParams, LoginResponse, Post } from '../types/api';

