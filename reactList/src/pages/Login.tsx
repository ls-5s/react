import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: { username: string; password: string }) => {
    clearError();
    try {
      await login(data.username, data.password);
      navigate('/blog');
    } catch {
      // 错误已在 store 中处理
    }
  };

  return (
    <AuthForm
      title="登录"
      subtitle="欢迎回来"
      submitText="登录"
      loadingText="登录中..."
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      footerText="还没有账号？"
      footerLink={{ to: '/register', text: '立即注册' }}
    />
  );
};

export default Login;

