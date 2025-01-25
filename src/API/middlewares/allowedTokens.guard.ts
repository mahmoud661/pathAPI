import { NextFunction, Response } from 'express';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import Token from '../../application/types/token';
import Logger from '../../infrastructure/logger/consoleLogger';
import { getTokenName } from '../utils/tokens';

function allowedTokens(...allowedTokens: Token[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { tokenType } = req;
    if (!allowedTokens.length) allowedTokens = [Token.ACCESS_TOKEN];

    if (!allowedTokens.includes(tokenType!)) {
      Logger.Warn(
        `request refused, ${getTokenName(tokenType!)} type is not allowed`,
        'allowedTokens middleware',
      );
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }
    next();
  };
}

export default allowedTokens;
