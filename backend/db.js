import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASS,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB
});

export default pool;