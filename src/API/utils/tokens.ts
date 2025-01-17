import { sign } from 'jsonwebtoken';
import Token from '../../application/types/token';
import { config } from '../../config';

export const generateAccess = (
  id: number | string,
  email: string,
  isEditor: boolean,
): string => {
  const accessToken = sign(
    {
      user: { id, email },
      tokenType: Token.ACCESS_TOKEN,
      isEditor: isEditor,
    },
    config.jwtSecret,
    { expiresIn: '5d' },
  );

  return accessToken;
};

export const generateConfirm = (
  id: number | string,
  email: string,
  isEditor: boolean,
): string => {
  const confirmToken = sign(
    {
      user: { id, email },
      tokenType: Token.CONFIRM_TOKEN,
      isEditor: isEditor,
    },
    config.jwtSecret,
    { expiresIn: '1d' },
  );

  return confirmToken;
};

export const generateRecovery = (
  id: number | string,
  email: string,
  isEditor: boolean,
): string => {
  const recoveryToken = sign(
    {
      user: { id, email },
      tokenType: Token.RECOVERY_TOKEN,
      isEditor: isEditor,
    },
    config.jwtSecret,
    { expiresIn: '1d' },
  );

  return recoveryToken;
};
