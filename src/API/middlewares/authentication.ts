import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import Token from '../../application/types/token';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
  tokenType?: string; // The type of the token (confirm, access, etc.)
  isEditor?: boolean; // The user's editor flag
}

export const authMiddleware = (...allowedTokenTypes: Token[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as {
        user: {
          id: string;
          email: string;
          tokenType: string;
          isEditor?: boolean;
        };
      };

      // Ensure the token type matches one of the allowed token types
      if (!allowedTokenTypes.includes(decoded.user.tokenType as Token)) {
        return res.status(403).json({ message: 'Invalid token type' });
      }

      // Attach user details and token-related properties to the request
      req.user = decoded.user; // The user object (id, email)
      req.tokenType = decoded.user.tokenType; // Token type (confirm, access, etc.)
      req.isEditor = decoded.user.isEditor; // The editor flag (optional)

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};
