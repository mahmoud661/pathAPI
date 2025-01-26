import { NextFunction, Request, Response } from 'express';
import Logger from '../../infrastructure/logger/consoleLogger';

function doNotAllow(...keys: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    for (const key of keys) {
      if (body[key]) {
        Logger.Error(
          `request refused, ${key} is restricted`,
          'Data Restriction middleware',
        );
        res
          .status(423)
          .json({
            message: `${key} is restricted, you cannot post or update it.`,
          });
        return;
      }
    }
    next();
  };
}

export default doNotAllow;
