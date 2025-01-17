import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AuthenticatedRequest from '../types/AuthenticatedRequest';

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Not authorized, token not found' });
    return;
  }

  try {
    const jwtSecret = config.jwtSecret;
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.user) {
      res.status(401).json({ message: 'Not authorized, userId not found' });
      return;
    }

    req.user = decoded.user;
    req.tokenType = decoded.tokenType;
    req.isEditor = decoded.isEditor;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
    return;
  }
};

export { authenticate };
