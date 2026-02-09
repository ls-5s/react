import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // 获取重定向路径，如果没有则默认到首页
  const from = (location.state as { from?: string })?.from || '/';

  // 如果已经登录，直接跳转
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleLogin = () => {
    login();
    // 登录成功后跳转到之前想访问的页面
    navigate(from, { replace: true });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>登录</h2>
      <button onClick={handleLogin}>模拟登录</button>
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
        这是一个演示，点击按钮即可登录
      </p>
    </div>
  );
}

export default Login;

