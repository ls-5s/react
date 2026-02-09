import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 用户数据接口
 */
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

/**
 * 用户列表状态接口
 */
interface UserState {
  /** 用户列表 */
  users: User[];
  /** 当前选中的用户 */
  selectedUser: User | null;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 设置用户列表 */
  setUsers: (users: User[]) => void;
  /** 添加用户 */
  addUser: (user: User) => void;
  /** 更新用户 */
  updateUser: (id: string, user: Partial<User>) => void;
  /** 删除用户 */
  deleteUser: (id: string) => void;
  /** 选择用户 */
  selectUser: (user: User | null) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 设置错误信息 */
  setError: (error: string | null) => void;
  /** 重置状态 */
  reset: () => void;
}

/**
 * 用户 Store
 * 
 * 使用 devtools 中间件，可以在 Redux DevTools 中查看状态变化
 * 
 * @example
 * ```tsx
 * import { useUserStore } from '@/store';
 * 
 * function UserList() {
 *   const { users, loading, fetchUsers } = useUserStore();
 *   // ...
 * }
 * ```
 */
export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      users: [],
      selectedUser: null,
      loading: false,
      error: null,

      setUsers: (users) => set({ users }),

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUser: (id, userData) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...userData } : user
          ),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          selectedUser:
            state.selectedUser?.id === id ? null : state.selectedUser,
        })),

      selectUser: (user) => set({ selectedUser: user }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      reset: () =>
        set({
          users: [],
          selectedUser: null,
          loading: false,
          error: null,
        }),
    }),
    {
      name: 'user-store', // Redux DevTools 中显示的名称
    }
  )
);

