import pool from "../db.js";

export const getLastLogin = async (req, res) => {
    try {
        const { constituency } = req.params;

        const result = await pool.query(
            `SELECT ar.last_login_timestamp 
             FROM admin_register ar
             JOIN admin a ON ar.admin_id = a.admin_id
             JOIN area_details ad ON a.area_id = ad.area_id
             WHERE ad.constituency = $1`,
            [constituency]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No last login data found for this constituency" });
        }

        res.json({ last_login_timestamp: result.rows[0].last_login_timestamp });
    } catch (err) {
        res.json({ error: err.message });
    }
};