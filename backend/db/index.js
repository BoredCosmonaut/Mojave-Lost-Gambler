import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Use DATABASE_URL for production (Render), fallback to local variables for dev
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

pool.on('connect', () => {
  console.log('✅ [DATABASE_CONNECTED]');
});

pool.on('error', err => {
  console.error('❌ [DATABASE_ERROR]:', err);
});