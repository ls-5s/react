import { create } from "zustand";
import { persist } from "zustand/middleware";
interface op {
  count: number;
  increment: () => void;
  add: () => void;
  reset: () => void;
}
export const use = create<op>()(
  persist(
    (set) => ({
      count: 0,
      // 用法1：直接传对象更新状态（简单场景）
      increment: () => set({ count: 1 }), // 直接把 count 改成 1

      // 用法2：函数式更新（依赖当前状态，推荐）
      add: () => set((state) => ({ count: state.count + 1 })), // 基于当前 count +1

      // 用法3：合并状态（多状态时，只改需要改的，其他保留）
      reset: () => set({ count: 0 }),
    }),
    {
      name: "auth-storage", // localStorage 的 key
    },
  ),
);
