import { Router, Request, Response, NextFunction } from 'express';
import { users, User } from '../data/users.js';
import { generateToken } from '../utils/jwt.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { validateRegister, validateLogin } from '../middleware/validator.js';
import { AppError } from '../middleware/errorHandler.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// 生成用户响应数据（不包含密码）
const getUserResponse = (user: User) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  created_at: user.created_at,
});

// 生成 token 和用户响应
const createAuthResponse = (user: User) => {
  const token = generateToken({
    user_id: user.id,
    username: user.username,
    email: user.email,
  });
  return { token, user: getUserResponse(user) };
};

// 注册
router.post('/register', validateRegister, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    if (users.find((u) => u.username === username)) {
      const error: AppError = new Error('用户名已存在');
      error.statusCode = 400;
      return next(error);
    }

    if (users.find((u) => u.email === email)) {
      const error: AppError = new Error('邮箱已被注册');
      error.statusCode = 400;
      return next(error);
    }

    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    const now = new Date().toISOString();

    const newUser: User = {
      id: newId,
      username,
      email,
      password: await hashPassword(password),
      created_at: now,
      updated_at: now,
    };

    users.push(newUser);

    res.json({
      code: 200,
      message: '注册成功',
      success: true,
      data: createAuthResponse(newUser),
    });
  } catch (err) {
    next(err);
  }
});

// 登录
router.post('/login', validateLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username || u.email === username);
    if (!user || !(await comparePassword(password, user.password))) {
      const error: AppError = new Error('用户名或密码错误');
      error.statusCode = 401;
      return next(error);
    }

    res.json({
      code: 200,
      message: '登录成功',
      success: true,
      data: createAuthResponse(user),
    });
  } catch (err) {
    next(err);
  }
});

// 获取当前用户信息
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = users.find((u) => u.id === req.user?.user_id);

  if (!user) {
    return res.status(404).json({
      code: 404,
      message: '用户不存在',
      success: false,
      data: null,
    });
  }

  res.json({
    code: 200,
    message: 'success',
    success: true,
    data: getUserResponse(user),
  });
});

export default router;

