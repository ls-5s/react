import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: { username: string; email?: string; password: string }) => {
    clearError();
    if (!data.email) return;
    try {
      await register(data.username, data.email, data.password);
      navigate('/blog');
    } catch {
      // 错误已在 store 中处理
    }
  };

  return (
    <AuthForm
      title="注册"
      subtitle="创建新账号"
      submitText="注册"
      loadingText="注册中..."
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      showEmail
      showConfirmPassword
      footerText="已有账号？"
      footerLink={{ to: '/login', text: '立即登录' }}
    />
  );
};

export default Register;

