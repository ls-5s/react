import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './App.css';

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App">
      <nav>
        <NavLink to="/">首页</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/admin">管理后台</NavLink>
            <button onClick={logout} style={{ marginLeft: 'auto' }}>登出</button>
          </>
        ) : null}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
