import { Pool } from 'pg';
import { config } from '../../config';

const pool = new Pool({
  connectionString: config.dbHost,
  ssl: {
    rejectUnauthorized: false,
  },
});


pool.on('connect', () => {
  console.log('Database connection established successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
