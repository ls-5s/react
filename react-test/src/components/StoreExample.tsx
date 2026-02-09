import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';

/**
 * Zustand Store 使用示例组件
 * 
 * 展示如何使用不同的 store
 */
const StoreExample: React.FC = () => {
  // ==================== Auth Store ====================
  const { isAuthenticated, user, login, logout } = useAuthStore();

  // ==================== App Store ====================
  const { theme, loading, toggleTheme, setLoading } = useAppStore();

  // ==================== User Store ====================
  const { users, addUser, deleteUser, setLoading: setUserLoading } = useUserStore();

  // 示例：添加用户
  const handleAddUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: `用户 ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
    };
    addUser(newUser);
  };

  // 示例：模拟异步操作
  const handleAsyncOperation = async () => {
    setLoading(true);
    setUserLoading(true);
    
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setLoading(false);
    setUserLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Zustand Store 使用示例</h1>

      {/* Auth Store 示例 */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>认证 Store (useAuthStore)</h2>
        <p>状态持久化到 localStorage，刷新页面后状态不会丢失</p>
        <div>
          <p>登录状态: {isAuthenticated ? '已登录' : '未登录'}</p>
          {user && (
            <p>
              用户信息: {user.name} ({user.email})
            </p>
          )}
          <div style={{ marginTop: '1rem' }}>
            {!isAuthenticated ? (
              <button onClick={login} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
                登录
              </button>
            ) : (
              <button onClick={logout} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
                登出
              </button>
            )}
          </div>
        </div>
      </section>

      {/* App Store 示例 */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>应用 Store (useAppStore)</h2>
        <div>
          <p>当前主题: {theme === 'light' ? '浅色' : '深色'}</p>
          <p>加载状态: {loading ? '加载中...' : '空闲'}</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={toggleTheme} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
              切换主题
            </button>
            <button onClick={() => setLoading(!loading)} style={{ padding: '0.5rem 1rem' }}>
              切换加载状态
            </button>
          </div>
        </div>
      </section>

      {/* User Store 示例 */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>用户 Store (useUserStore)</h2>
        <p>支持 Redux DevTools 调试</p>
        <div>
          <p>用户数量: {users.length}</p>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <button onClick={handleAddUser} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
              添加用户
            </button>
            <button onClick={handleAsyncOperation} style={{ padding: '0.5rem 1rem' }}>
              模拟异步操作
            </button>
          </div>
          {users.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>
                    {user.name} - {user.email}
                  </span>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                  >
                    删除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 性能优化提示 */}
      <section style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h3>💡 性能优化提示</h3>
        <p>
          使用选择器只订阅需要的状态，避免不必要的重渲染：
        </p>
        <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
          {`// ❌ 不推荐
const store = useAuthStore();

// ✅ 推荐：只订阅需要的状态
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
const login = useAuthStore((state) => state.login);`}
        </pre>
      </section>
    </div>
  );
};

export default StoreExample;

