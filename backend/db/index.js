import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  ssl: process.env.PG_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', err => {
  console.error('PostgreSQL error:', err);
});

