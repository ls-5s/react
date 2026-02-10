// 用户数据 - 直接使用后端字段名
export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // 存储加密后的密码
  created_at: string;
  updated_at: string;
}

// 初始用户数据 - 密码会在服务器启动时加密
// 默认密码: admin123
export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '', // 将在 initDefaultUser 中设置
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// 初始化默认用户密码
export const initDefaultUser = async () => {
  const { hashPassword } = await import('../utils/password.js');
  if (users[0] && !users[0].password) {
    users[0].password = await hashPassword('admin123');
  }
};

