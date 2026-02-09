import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute 组件 Props
 */
export interface ProtectedRouteProps {
  /** 需要保护的路由内容 */
  children: React.ReactNode;
  /** 未登录时重定向的路径，默认为 /login */
  redirectTo?: string;
}

/**
 * ProtectedRoute 路由保护组件
 * 
 * 用于保护需要登录才能访问的路由
 * 如果用户未登录，会自动重定向到登录页
 * 
 * @example
 * ```tsx
 * <Route
 *   path="/profile"
 *   element={
 *     <ProtectedRoute>
 *       <Profile />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // 保存当前路径，登录后可以跳转回来
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

