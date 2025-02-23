import pool from "../db.js";
import bcrypt from "bcrypt";

export const loginAdmin = async (req, res) => {
    try {
        const { admin_id, password } = req.body;

        const adminQuery = await pool.query(
            `SELECT ar.admin_id, ar.email, ar.password_hash, ar.failed_login_attempts, 
                    ad.constituency
             FROM admin_register ar
             JOIN admin a ON ar.admin_id = a.admin_id
             JOIN area_details ad ON a.area_id = ad.area_id
             WHERE ar.admin_id = $1`,
            [admin_id]
        );

        if (adminQuery.rows.length === 0) {
            return res.status(401).json({ error: "Invalid admin ID or password" });
        }

        const admin = adminQuery.rows[0];

        if (admin.failed_login_attempts >= 5) {
            return res.status(403).json({ error: "Account locked due to multiple failed login attempts. Contact support." });
        }

        const validPassword = await bcrypt.compare(password, admin.password_hash);

        if (!validPassword) {
            await pool.query(
                "UPDATE admin_register SET failed_login_attempts = failed_login_attempts + 1 WHERE admin_id = $1",
                [admin_id]
            );
            return res.status(401).json({ error: "Invalid admin ID or password" });
        }

        await pool.query(
            "UPDATE admin_register SET failed_login_attempts = 0, last_login_timestamp = NOW() WHERE admin_id = $1",
            [admin_id]
        );

        res.status(200).json({ message: "Login successful", admin_id: admin.admin_id, constituency: admin.constituency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};