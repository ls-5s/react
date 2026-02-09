import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App">
      <nav>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/about">关于</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/user">用户中心</NavLink>
            <NavLink to="/admin">管理后台</NavLink>
            <button onClick={logout} style={{ marginLeft: 'auto' }}>
              登出
            </button>
          </>
        ) : (
          <NavLink to="/login" style={{ marginLeft: 'auto' }}>
            登录
          </NavLink>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

