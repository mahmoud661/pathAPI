import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import Logger from '../../infrastructure/logger/consoleLogger';
import Token from '../../application/types/token';

const editorPermission = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const { isEditor } = req;
  if (!isEditor) {
    res
      .status(401)
      .json({ message: 'Not authorized, you do not have permission.' });
    Logger.Warn(
      'request refused, requester is not an editor',
      'editorPermission guard',
    );
    return;
  }
  next();
};

export { editorPermission };
