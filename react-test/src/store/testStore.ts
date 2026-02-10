import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface TestState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useTestStore = create<TestState>()(
  persist((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }), {
    name: 'test-store',
  })
);