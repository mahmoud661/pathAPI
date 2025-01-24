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

/**
 * Returns the name of the token based on its type.
 *
 * @param {Token} tokenType - The type of the token.
 * @returns {string} The name of the token type, such as 'Access', 'Email Confirm', or 'Password Recovery'.
 *                   Returns 'Unknown Type' if the type is not recognized.
 */
export const getTokenName = (tokenType: Token): string => {
  switch (tokenType) {
    case Token.ACCESS_TOKEN:
      return 'Access';
    case Token.CONFIRM_TOKEN:
      return 'Email Confirm';
    case Token.RECOVERY_TOKEN:
      return 'Password Recovery';
    default:
      return 'Unknown Type';
  }
};
