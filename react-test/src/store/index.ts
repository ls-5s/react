/**
 * Store 统一导出
 * 
 * 所有 Zustand store 都在这里统一导出，方便使用
 * 
 * @example
 * ```tsx
 * // 方式1：统一导入
 * import { useAuthStore, useAppStore } from '@/store';
 * 
 * // 方式2：单独导入
 * import { useAuthStore } from '@/store/authStore';
 * ```
 */

// 导出认证 Store
export { useAuthStore } from './authStore';

// 导出应用 Store
export { useAppStore } from './appStore';

// 导出用户 Store
export { useUserStore } from './userStore';

