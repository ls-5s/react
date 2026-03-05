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

// export default function Counter() {
//   const { count, increment, reset } = usea();

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={increment}>+1</button>
//       <button onClick={reset}>重置</button>
//     </div>
//   );
// }
