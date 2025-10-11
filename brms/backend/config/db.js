// backend/config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,             // e.g., mysql-8f14923-opboy4885-ed90.e.aivencloud.com
  port: Number(process.env.DB_PORT),     // 15362
  user: process.env.DB_USER,             // avnadmin
  password: process.env.DB_PASSWORD,     // your password
  database: process.env.DB_NAME,         // defaultdb
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: process.env.DB_CA.replace(/\\n/g, '\n'),
    rejectUnauthorized: true             // ensures SSL verification
  }
});

// Optional: Verify CA is loaded
console.log(process.env.DB_CA);

export default pool;
