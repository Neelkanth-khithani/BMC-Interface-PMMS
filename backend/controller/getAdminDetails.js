import pool from "../db.js";

export const getAdminDetails = async (req, res) => {
    try {
        const { constituency } = req.params;

        const result = await pool.query(
            `SELECT a.admin_id, a.first_name, a.middle_name, a.last_name, 
                    a.designation, a.contact, a.email, a.employee_code, 
                    a.office_address, ar.last_login_timestamp
             FROM admin a
             JOIN admin_register ar ON a.admin_id = ar.admin_id
             JOIN area_details ad ON a.area_id = ad.area_id
             WHERE ad.constituency = $1`,
            [constituency]
        );

        if (result.rows.length === 0) {
            return res.json({ error: "No admin details found for this constituency" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching admin details:", err);
        res.json({ error: "Internal Server Error" });
    }
};