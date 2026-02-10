import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt.js';
import { AppError } from './errorHandler.js';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    const error: AppError = new Error('未提供认证 token');
    error.statusCode = 401;
    return next(error);
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    const error: AppError = new Error('无效的 token');
    error.statusCode = 401;
    return next(error);
  }
};

