import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 认证状态接口
 */
interface AuthState {
  /** 是否已登录 */
  isAuthenticated: boolean;
  /** 用户信息 */
  user: {
    id: string;
    name: string;
    email?: string;
  } | null;
  /** 登录 */
  login: (userInfo?: { id: string; name: string; email?: string }) => void;
  /** 登出 */
  logout: () => void;
  /** 更新用户信息 */
  updateUser: (userInfo: Partial<{ id: string; name: string; email?: string }>) => void;
}

/**
 * 认证 Store
 * 
 * 使用 persist 中间件持久化状态到 localStorage
 * 页面刷新后状态不会丢失
 * 
 * @example
 * ```tsx
 * import { useAuthStore } from '@/store';
 * 
 * function Component() {
 *   const { isAuthenticated, login, logout } = useAuthStore();
 *   return <button onClick={login}>登录</button>;
 * }
 * ```
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (userInfo) => {
        set({
          isAuthenticated: true,
          user: userInfo || {
            id: '1',
            name: '用户',
            email: 'user@example.com',
          },
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },

      updateUser: (userInfo) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userInfo } : null,
        }));
      },
    }),
    {
      name: 'auth-storage', // localStorage 的 key
    }
  )
);

