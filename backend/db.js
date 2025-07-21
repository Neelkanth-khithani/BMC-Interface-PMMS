import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

/*
const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASS,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB
});
*/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Important for NeonDB SSL
    }
});

export default pool;