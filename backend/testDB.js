import pool from "./db.js";

const testDB = async () => {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log(" DB Connected Successfully:", res.rows[0]);
    } catch (err) {
        console.error(" Connection Error:", err.message);
    } finally {
        pool.end(); // Close the connection pool
    }
};

testDB();
