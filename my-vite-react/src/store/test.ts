import { create } from "zustand";
import { persist } from "zustand/middleware";

interface op {
  count: number;
  increment: () => void;
  reset: () => void;
}

export const usea = create<op>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "test-storage", // localStorage 的 key
    },
  ),
);
