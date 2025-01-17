import { Request } from 'express';
import Token from '../../application/types/token';

interface AuthenticatedRequest extends Request {
  user?: any;
  tokenType?: Token;
  isEditor?: boolean;
}

export default AuthenticatedRequest;
