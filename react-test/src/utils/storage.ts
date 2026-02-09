/**
 * 本地存储工具函数
 */

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'userInfo';

/**
 * Token 管理
 */
export const tokenStorage = {
  get: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  set: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  remove: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};

/**
 * 用户信息管理
 */
export const userStorage = {
  get: <T = unknown>(): T | null => {
    const data = localStorage.getItem(USER_INFO_KEY);
    return data ? JSON.parse(data) : null;
  },
  set: <T = unknown>(userInfo: T): void => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  },
  remove: (): void => {
    localStorage.removeItem(USER_INFO_KEY);
  },
};

/**
 * 清除所有存储
 */
export const clearStorage = (): void => {
  localStorage.clear();
};

