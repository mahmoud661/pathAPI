import Role from '../../application/types/role';
import Token from '../../application/types/token';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
  tokenType: Token | number;
  isEditor?: boolean;
}

export default AuthenticatedRequest;
