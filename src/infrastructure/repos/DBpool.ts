import { Pool } from 'pg';
import { config } from '../../config';
import Logger from '../logger/consoleLogger';

const pool = new Pool({
  connectionString: config.dbHost,
  ssl: {
    rejectUnauthorized: false,
  },
});


pool.on('connect', () => {
  Logger.Info('Database connection established successfully')
});

pool.on('error', (err) => {
  Logger.Error('Unexpected error on idle client', 'DBpool');
});

export default pool;
