import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>欢迎</h1>
      <p>这是首页</p>
      <div style={{ marginTop: '2rem' }}>
        {!isAuthenticated ? (
          <button onClick={login} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
            登录
          </button>
        ) : (
          <Link to="/admin/dashboard" style={{ marginRight: '1rem' }}>
            管理后台
          </Link>
        )}
        <Link to="/store-example" style={{ marginRight: '1rem' }}>
          Zustand Store 示例
        </Link>
      </div>
    </div>
  );
};

export default Home;

