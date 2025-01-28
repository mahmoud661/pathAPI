import { config as _config } from 'dotenv';
import Role from './application/types/role';

_config();
if (process.env.NODE_ENV === 'production') {
  _config({ path: '.env.prod' });
}

export const config = {
  port: process.env.PORT || 3001,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET as string,
  postmarkToken: process.env.POSTMARK_TOKEN as string,
  devPathUrl: process.env.DEVPATH_URL,
};
