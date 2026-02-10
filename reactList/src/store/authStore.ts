import { create } from 'zustand';
import type { User } from '../types/api';
import { authApi } from '../api/authApi';

const STORAGE_KEY = 'auth-storage';

const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setStoredAuth = (data: { token: string | null; user: User | null }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 忽略存储错误
  }
};

const clearStoredAuth = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 忽略清除错误
  }
};

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  clearError: () => void;
}

const ERROR_MESSAGES = {
  login: '登录失败',
  register: '注册失败',
  fetchUser: '获取用户信息失败',
};

const handleAuth = async (
  set: (state: Partial<AuthState>) => void,
  action: () => Promise<{ token: string; user: User }>,
  errorMessage: string
) => {
  set({ loading: true, error: null });
  try {
    const { token, user } = await action();
    set({ user, token, loading: false });
    setStoredAuth({ token, user });
  } catch (err) {
    set({
      error: err instanceof Error ? err.message : errorMessage,
      loading: false,
    });
    throw err;
  }
};

const stored = getStoredAuth();

export const useAuthStore = create<AuthState>((set) => ({
  user: stored?.user || null,
  token: stored?.token || null,
  loading: false,
  error: null,

  login: async (username, password) => {
    await handleAuth(set, () => authApi.login({ username, password }).then((res) => res.data as { token: string; user: User }), ERROR_MESSAGES.login);
  },

  register: async (username, email, password) => {
    await handleAuth(set, () => authApi.register({ username, email, password }).then((res) => res.data as { token: string; user: User }), ERROR_MESSAGES.register);
  },

  logout: () => {
    set({ user: null, token: null });
    clearStoredAuth();
  },

  fetchCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await authApi.getCurrentUser();
      const user = res.data as User;
      set({ user, loading: false });
      const currentToken = useAuthStore.getState().token;
      if (currentToken) {
        setStoredAuth({ token: currentToken, user });
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : ERROR_MESSAGES.fetchUser,
        loading: false,
      });
      set({ user: null, token: null });
      clearStoredAuth();
    }
  },

  clearError: () => set({ error: null }),
}));

