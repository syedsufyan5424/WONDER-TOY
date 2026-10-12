import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'toyverse_super_secret_jwt_key_2026_secure';
      const decoded = jwt.verify(token, secret) as { id: string; role: string };

      const foundUser = await User.findById(decoded.id).select('-password');
      if (!foundUser) {
        res.status(401).json({ success: false, message: 'User no longer exists' });
        return;
      }

      req.user = foundUser;
      next();
      return;
    } catch (error) {
      res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    return;
  }
};

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin privileges required' });
  }
};
