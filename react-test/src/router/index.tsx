/**
 * 路由配置文件
 * 
 * 功能特性：
 * 1. 懒加载：使用 React.lazy() 实现代码分割，提升首屏加载速度
 * 2. 嵌套路由：支持多层级路由结构
 * 3. 路由守卫：使用 ProtectedRoute 保护需要登录的路由
 * 4. 路由重定向：使用 Navigate 实现自动跳转
 * 5. 404 处理：捕获所有未匹配的路由
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import { ProtectedRoute, Loading } from '../components';

// ==================== 懒加载组件 ====================
// 使用 React.lazy() 实现代码分割，只有在访问对应路由时才加载组件
// 这样可以减少初始包大小，提升首屏加载速度

// 基础页面
const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 管理后台页面
const AdminLayout = lazy(() => import('../pages/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('../pages/Admin/Users'));
const AdminPosts = lazy(() => import('../pages/Admin/Posts'));

/**
 * 创建路由配置
 * createBrowserRouter 使用 HTML5 History API，URL 更清晰（无 # 号）
 */
export const router = createBrowserRouter([
  {
    // 根路由，所有子路由都会在 App 组件中渲染
    path: '/',
    element: <App />,
    // 错误边界：当路由出错时显示 404 页面
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    // 子路由配置
    children: [
      // ==================== 公开路由（无需登录） ====================
      
      /**
       * 首页
       * 路径: /
       * index: true 表示这是父路由的默认子路由
       */
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      
      // ==================== 受保护路由（需要登录） ====================
      
      /**
       * 管理后台 - 嵌套路由，需要登录权限
       * 路径: /admin
       * 
       * ProtectedRoute 会检查用户是否已登录
       * - 未登录：自动跳转到首页，并保存当前路径
       * - 已登录：正常显示页面
       * 
       * 如果需要更细粒度的权限控制（如管理员权限），
       * 可以在 ProtectedRoute 组件中添加角色检查逻辑
       */
      {
        path: 'admin',
        element: (
          <ProtectedRoute redirectTo="/">
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          /**
           * 默认路由：访问 /admin 时自动重定向到 /admin/dashboard
           * replace: true 表示替换历史记录，而不是添加新记录
           */
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          /**
           * 仪表盘
           * 路径: /admin/dashboard
           */
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          /**
           * 用户管理
           * 路径: /admin/users
           */
          {
            path: 'users',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminUsers />
              </Suspense>
            ),
          },
          /**
           * 文章管理
           * 路径: /admin/posts
           */
          {
            path: 'posts',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminPosts />
              </Suspense>
            ),
          },
        ],
      },
      
      // ==================== 404 处理 ====================
      
      /**
       * 404 页面 - 捕获所有未匹配的路由
       * 路径: * (通配符，匹配所有路径)
       * 
       * 这个路由必须放在最后，因为它会匹配所有路径
       * 如果放在前面，会拦截所有其他路由
       */
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
