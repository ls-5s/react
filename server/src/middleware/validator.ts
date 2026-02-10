import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

  if (!title || typeof title !== 'string') {
    const error: AppError = new Error('标题不能为空且必须是字符串');
    error.statusCode = 400;
    return next(error);
  }

  if (title.trim().length === 0) {
    const error: AppError = new Error('标题不能为空');
    error.statusCode = 400;
    return next(error);
  }

  if (title.length > 200) {
    const error: AppError = new Error('标题长度不能超过200个字符');
    error.statusCode = 400;
    return next(error);
  }

  if (!content || typeof content !== 'string') {
    const error: AppError = new Error('内容不能为空且必须是字符串');
    error.statusCode = 400;
    return next(error);
  }

  if (content.trim().length === 0) {
    const error: AppError = new Error('内容不能为空');
    error.statusCode = 400;
    return next(error);
  }

  if (content.length > 10000) {
    const error: AppError = new Error('内容长度不能超过10000个字符');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    const error: AppError = new Error('无效的文章ID');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    const error: AppError = new Error('用户名不能为空');
    error.statusCode = 400;
    return next(error);
  }

  if (username.length < 3 || username.length > 20) {
    const error: AppError = new Error('用户名长度必须在3-20个字符之间');
    error.statusCode = 400;
    return next(error);
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    const error: AppError = new Error('邮箱不能为空');
    error.statusCode = 400;
    return next(error);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error: AppError = new Error('邮箱格式不正确');
    error.statusCode = 400;
    return next(error);
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    const error: AppError = new Error('密码不能为空');
    error.statusCode = 400;
    return next(error);
  }

  if (password.length < 6 || password.length > 50) {
    const error: AppError = new Error('密码长度必须在6-50个字符之间');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    const error: AppError = new Error('用户名不能为空');
    error.statusCode = 400;
    return next(error);
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    const error: AppError = new Error('密码不能为空');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

