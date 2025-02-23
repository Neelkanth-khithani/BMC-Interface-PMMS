import pool from "../db.js";
import bcrypt from "bcrypt";
import generateAdminId from "../utils/generateAdminId.js";

export const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin_id = await generateAdminId();

        const newAdmin = await pool.query(
            "INSERT INTO admin_register (admin_id, email, password_hash) VALUES ($1, $2, $3) RETURNING admin_id, email",
            [admin_id, email, hashedPassword]
        );

        res.json(newAdmin.rows[0]);
    } catch (err) {
        res.json({ error: err.message });
    }
};