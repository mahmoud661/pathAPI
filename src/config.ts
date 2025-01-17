import { config as _config } from 'dotenv';
import Role from './application/types/role';

_config(); // Load .env for development
// If in production, load .env.prod
if (process.env.NODE_ENV === 'production') {
  _config({ path: '.env.prod' });
}

export const config = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET as string,
  postmarkToken: process.env.POSTMARK_TOKEN as string,
  devpathUrl: process.env.DEVPATH_URL,
};
