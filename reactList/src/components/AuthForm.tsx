import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  title: string;
  subtitle: string;
  submitText: string;
  loadingText: string;
  loading: boolean;
  error: string | null;
  onSubmit: (data: { username: string; email?: string; password: string }) => Promise<void>;
  showEmail?: boolean;
  showConfirmPassword?: boolean;
  footerText: string;
  footerLink: { to: string; text: string };
}

const AuthForm = ({
  title,
  subtitle,
  submitText,
  loadingText,
  loading,
  error,
  onSubmit,
  showEmail = false,
  showConfirmPassword = false,
  footerText,
  footerLink,
}: AuthFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    if (!trimmedUsername || !trimmedPassword) return;
    if (showEmail && !email.trim()) return;
    if (showConfirmPassword && trimmedPassword !== confirmPassword) return;

    await onSubmit({
      username: trimmedUsername,
      ...(showEmail && { email: email.trim() }),
      password: trimmedPassword,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {showEmail ? '用户名' : '用户名或邮箱'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={showEmail ? '输入用户名（3-20个字符）' : '输入用户名或邮箱'}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              {...(showEmail && { minLength: 3, maxLength: 20 })}
            />
          </div>

          {showEmail && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入邮箱地址"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={showEmail ? '输入密码（至少6个字符）' : '输入密码'}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              {...(showEmail && { minLength: 6 })}
            />
          </div>

          {showConfirmPassword && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-600">两次输入的密码不一致</p>
              )}
            </div>
          )}

          {!showConfirmPassword && <div className="mb-6" />}

          <button
            type="submit"
            disabled={loading || (showConfirmPassword && password !== confirmPassword && confirmPassword.length > 0)}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? loadingText : submitText}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {footerText}{' '}
          <Link to={footerLink.to} className="text-blue-600 hover:text-blue-700 font-medium">
            {footerLink.text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

