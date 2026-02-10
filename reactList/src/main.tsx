import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useAuthStore } from './store/authStore';
import './index.css';

// 初始化时检查 token 并获取用户信息
const initAuth = async () => {
  const { token, fetchCurrentUser } = useAuthStore.getState();
  if (token) {
    try {
      await fetchCurrentUser();
    } catch {
      // 忽略错误，token 可能已过期
    }
  }
};

initAuth();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

