import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import Logger from '../../infrastructure/logger/consoleLogger';
import Token from '../../application/types/token';

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Not authorized, token not found' });
    Logger.Info('request refused, token not found', 'authenticate middleware');
    return;
  }

  try {
    const jwtSecret = config.jwtSecret;
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.user) {
      Logger.Info(
        'request refused, userId not exist in the token',
        'authenticate middleware',
      );
      res.status(401).json({ message: 'Not authorized, userId not found' });
      return;
    }

    req.user = decoded.user;
    req.tokenType = decoded.tokenType;
    req.isEditor = decoded.isEditor;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
    Logger.Info('request refused, invalid token', 'authenticate middleware');
    return;
  }
};

export { authenticate };
