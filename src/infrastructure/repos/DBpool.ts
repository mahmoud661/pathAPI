import { Pool } from 'pg';
import { config } from '../../config';

console.log(config.dbHost);

const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
