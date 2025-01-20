import { NextFunction, Request, Response } from 'express';
import Logger from '../../infrastructure/logger/consoleLogger';

function notEmpty(...keys: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    for (const key of keys) {
      if (!body[key]) {
        Logger.Error(
          `request refused, ${key} is required`,
          'notEmpty middleware',
        );
        res.status(400).json({ message: `${key} is required` });
        return;
      }
    }
    next();
  };
}

export default notEmpty;
