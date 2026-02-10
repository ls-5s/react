import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Loading, ProtectedRoute } from '../components';

// 懒加载所有页面组件
const Index = lazy(() => import('../pages/Index'));
const Home = lazy(() => import('../pages/Home'));
const PostDetail = lazy(() => import('../pages/PostDetail'));
const CreatePost = lazy(() => import('../pages/CreatePost'));
const EditPost = lazy(() => import('../pages/EditPost'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Suspense 包装组件
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <LazyWrapper>
            <Index />
          </LazyWrapper>
        ),
      },
      {
        path: '/blog',
        element: (
          <LazyWrapper>
            <Home />
          </LazyWrapper>
        ),
      },
      {
        path: '/post/:id',
        element: (
          <LazyWrapper>
            <PostDetail />
          </LazyWrapper>
        ),
      },
      {
        path: '/login',
        element: (
          <LazyWrapper>
            <Login />
          </LazyWrapper>
        ),
      },
      {
        path: '/register',
        element: (
          <LazyWrapper>
            <Register />
          </LazyWrapper>
        ),
      },
      {
        path: '/create',
        element: (
          <LazyWrapper>
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          </LazyWrapper>
        ),
      },
      {
        path: '/post/:id/edit',
        element: (
          <LazyWrapper>
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          </LazyWrapper>
        ),
      },
      {
        path: '/about',
        element: (
          <LazyWrapper>
            <About />
          </LazyWrapper>
        ),
      },
      {
        path: '*',
        element: (
          <LazyWrapper>
            <NotFound />
          </LazyWrapper>
        ),
      },
    ],
  },
]);

