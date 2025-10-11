import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: process.env.DB_CA.replace(/\\n/g, '\n')
  }
});

// Optional: verify CA string
console.log("CA loaded for MySQL connection:", process.env.DB_CA ? "✅ yes" : "❌ no");

// Optional: test connection
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL connected!");
    conn.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
}

testConnection();

export default pool;
