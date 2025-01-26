import { Pool } from 'pg';
import { config } from '../../config';
import Logger from '../logger/consoleLogger';

const pool = new Pool({
  connectionString: config.dbHost,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 100, // Maximum number of connections in the pool
  min: 20,  // Minimum number of idle connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // Wait up to 2 seconds for a connection
});



pool.on('connect', () => {
  Logger.Info('Database connection established successfully')
});

pool.on('error', (err) => {
  Logger.Error('Unexpected error on idle client', 'DBpool');
});

export default pool;
