import { create } from 'zustand';

/**
 * 应用状态接口
 */
interface AppState {
  /** 加载状态 */
  loading: boolean;
  /** 主题模式 */
  theme: 'light' | 'dark';
  /** 侧边栏是否展开 */
  sidebarOpen: boolean;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 切换主题 */
  toggleTheme: () => void;
  /** 设置侧边栏状态 */
  setSidebarOpen: (open: boolean) => void;
  /** 切换侧边栏 */
  toggleSidebar: () => void;
}

/**
 * 应用 Store
 * 
 * 用于管理应用级别的状态，如主题、加载状态等
 * 
 * @example
 * ```tsx
 * import { useAppStore } from '@/store';
 * 
 * function Component() {
 *   const { theme, toggleTheme, loading } = useAppStore();
 *   return <div>当前主题: {theme}</div>;
 * }
 * ```
 */
export const useAppStore = create<AppState>((set) => ({
  loading: false,
  theme: 'light',
  sidebarOpen: true,

  setLoading: (loading) => set({ loading }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
}));

