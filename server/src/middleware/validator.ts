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

