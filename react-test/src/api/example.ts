/**
 * API 使用示例
 * 
 * 这个文件展示了如何使用封装的 axios 请求方法
 */

import { get, post, put, del, upload, download } from '../utils/request';
import { userApi, postApi } from './index';

// ==================== 基础请求方法使用 ====================

/**
 * GET 请求示例
 */
export const exampleGet = async () => {
  try {
    // 基础 GET 请求
    const response = await get('/user/list', { page: 1, pageSize: 10 });
    console.log('用户列表:', response.data);

    // 带自定义配置的 GET 请求
    const response2 = await get('/user/list', { page: 1 });
    console.log('用户列表:', response2.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

/**
 * POST 请求示例
 */
export const examplePost = async () => {
  try {
    const response = await post('/user', {
      username: 'test',
      email: 'test@example.com',
    });
    console.log('创建用户成功:', response.data);
  } catch (error) {
    console.error('创建用户失败:', error);
  }
};

/**
 * PUT 请求示例
 */
export const examplePut = async () => {
  try {
    const response = await put('/user/1', {
      username: 'updated',
    });
    console.log('更新用户成功:', response.data);
  } catch (error) {
    console.error('更新用户失败:', error);
  }
};

/**
 * DELETE 请求示例
 */
export const exampleDelete = async () => {
  try {
    await del('/user/1');
    console.log('删除用户成功');
  } catch (error) {
    console.error('删除用户失败:', error);
  }
};

/**
 * 文件上传示例
 */
export const exampleUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await upload('/upload', formData);
    console.log('上传成功:', response.data);
  } catch (error) {
    console.error('上传失败:', error);
  }
};

/**
 * 文件下载示例
 */
export const exampleDownload = async () => {
  try {
    await download('/export/users', { format: 'excel' }, 'users.xlsx');
    console.log('下载成功');
  } catch (error) {
    console.error('下载失败:', error);
  }
};

// ==================== API 方法使用 ====================

/**
 * 用户 API 使用示例
 */
export const exampleUserApi = async () => {
  try {
    // 登录
    const loginRes = await userApi.login({
      username: 'test',
      password: '123456',
    });
    console.log('登录成功:', loginRes.data);

    // 获取当前用户信息
    const userRes = await userApi.getCurrentUser();
    console.log('当前用户:', userRes.data);

    // 获取用户列表
    const listRes = await userApi.getUserList({
      page: 1,
      pageSize: 10,
      keyword: 'test',
    });
    console.log('用户列表:', listRes.data);

    // 获取用户详情
    const detailRes = await userApi.getUserDetail(1);
    console.log('用户详情:', detailRes.data);
  } catch (error) {
    console.error('用户 API 调用失败:', error);
  }
};

/**
 * 文章 API 使用示例
 */
export const examplePostApi = async () => {
  try {
    // 获取文章列表
    const listRes = await postApi.getPostList({
      page: 1,
      pageSize: 10,
    });
    console.log('文章列表:', listRes.data);

    // 获取文章详情
    const detailRes = await postApi.getPostDetail(1, 'my-article');
    console.log('文章详情:', detailRes.data);

    // 创建文章
    const createRes = await postApi.createPost({
      title: '新文章',
      content: '文章内容',
      slug: 'new-article',
    });
    console.log('创建文章成功:', createRes.data);
  } catch (error) {
    console.error('文章 API 调用失败:', error);
  }
};

// ==================== React Hook 中使用示例 ====================

/**
 * 在 React 组件中使用示例：
 * 
 * import { useState, useEffect } from 'react';
 * import { userApi } from '@/api';
 * 
 * function UserList() {
 *   const [users, setUsers] = useState([]);
 *   const [loading, setLoading] = useState(false);
 * 
 *   useEffect(() => {
 *     const fetchUsers = async () => {
 *       setLoading(true);
 *       try {
 *         const res = await userApi.getUserList({ page: 1, pageSize: 10 });
 *         setUsers(res.data.list);
 *       } catch (error) {
 *         console.error('获取用户列表失败:', error);
 *       } finally {
 *         setLoading(false);
 *       }
 *     };
 *     fetchUsers();
 *   }, []);
 * 
 *   return (
 *     <div>
 *       {loading ? '加载中...' : users.map(user => <div key={user.id}>{user.username}</div>)}
 *     </div>
 *   );
 * }
 */

