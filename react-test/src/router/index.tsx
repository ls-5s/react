import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/Loading';

// 懒加载组件
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 用户相关页面
const UserLayout = lazy(() => import('../pages/User/UserLayout'));
const UserProfile = lazy(() => import('../pages/User/Profile'));
const UserSettings = lazy(() => import('../pages/User/Settings'));
const UserPosts = lazy(() => import('../pages/User/Posts'));

// 文章相关页面
const PostDetail = lazy(() => import('../pages/Post/PostDetail'));

// 管理后台页面
const AdminLayout = lazy(() => import('../pages/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('../pages/Admin/Users'));
const AdminPosts = lazy(() => import('../pages/Admin/Posts'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      // 首页
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      // 关于页面
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      // 登录页面
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      // 用户中心 - 嵌套路由
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <UserLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/user/profile" replace />,
          },
          {
            path: 'profile',
            element: (
              <Suspense fallback={<Loading />}>
                <UserProfile />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<Loading />}>
                <UserSettings />
              </Suspense>
            ),
          },
          {
            path: 'posts',
            element: (
              <Suspense fallback={<Loading />}>
                <UserPosts />
              </Suspense>
            ),
          },
        ],
      },
      // 动态路由 - 查看其他用户资料
      {
        path: 'user/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <UserProfile />
          </Suspense>
        ),
      },
      // 文章详情 - 多参数动态路由
      {
        path: 'posts/:id/:slug',
        element: (
          <Suspense fallback={<Loading />}>
            <PostDetail />
          </Suspense>
        ),
      },
      // 管理后台 - 嵌套路由，需要管理员权限
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminUsers />
              </Suspense>
            ),
          },
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
      // 404 页面
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
