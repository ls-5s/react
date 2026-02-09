# Zustand Store 使用指南

本项目使用 [Zustand](https://github.com/pmndrs/zustand) 进行状态管理。

## Store 列表

### 1. `useAuthStore` - 认证状态管理

管理用户登录状态和用户信息，支持持久化到 localStorage。

```tsx
import { useAuthStore } from '@/store';

function LoginButton() {
  const { isAuthenticated, login, logout, user } = useAuthStore();

  if (isAuthenticated) {
    return (
      <div>
        <p>欢迎, {user?.name}</p>
        <button onClick={logout}>登出</button>
      </div>
    );
  }

  return <button onClick={login}>登录</button>;
}
```

### 2. `useAppStore` - 应用状态管理

管理应用级别的状态，如主题、加载状态、侧边栏等。

```tsx
import { useAppStore } from '@/store';

function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button onClick={toggleTheme}>
      当前主题: {theme === 'light' ? '浅色' : '深色'}
    </button>
  );
}
```

### 3. `useUserStore` - 用户数据管理

管理用户列表和相关操作，支持 Redux DevTools 调试。

```tsx
import { useUserStore } from '@/store';

function UserList() {
  const { users, loading, addUser, deleteUser } = useUserStore();

  return (
    <div>
      {loading && <p>加载中...</p>}
      {users.map((user) => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => deleteUser(user.id)}>删除</button>
        </div>
      ))}
    </div>
  );
}
```

## 中间件说明

### persist 中间件

`useAuthStore` 使用了 `persist` 中间件，状态会自动保存到 localStorage，页面刷新后不会丢失。

### devtools 中间件

`useUserStore` 使用了 `devtools` 中间件，可以在浏览器 Redux DevTools 扩展中查看状态变化。

## 最佳实践

1. **按功能拆分 Store**：不要把所有状态放在一个 store 中
2. **使用 TypeScript**：为每个 store 定义清晰的类型接口
3. **选择性订阅**：使用选择器只订阅需要的状态，避免不必要的重渲染

```tsx
// ❌ 不推荐：订阅整个 store
const store = useAuthStore();

// ✅ 推荐：只订阅需要的状态
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
const login = useAuthStore((state) => state.login);
```

4. **异步操作**：可以在 store 中直接处理异步逻辑

```tsx
const useDataStore = create((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    const data = await fetch('/api/data').then((r) => r.json());
    set({ data, loading: false });
  },
}));
```

## 与 Context API 的对比

- **Zustand**：更轻量，无需 Provider，性能更好，适合全局状态
- **Context API**：React 内置，适合主题、语言等不常变化的状态

本项目同时使用两者：
- Zustand：用于需要频繁更新的状态（如用户数据、应用状态）
- Context API：用于认证上下文（可考虑迁移到 Zustand）

