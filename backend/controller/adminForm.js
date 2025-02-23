import pool from "../db.js";

export const formDetails = async (req, res) => {
    const { admin_id, first_name, middle_name, last_name, designation, area_id, contact, email, employee_code, aadhaar_no, office_address } = req.body;

    try {
        const values = [admin_id, first_name, middle_name, last_name, designation, area_id, contact, email, employee_code, aadhaar_no, office_address];

        const newAdmin = await pool.query(
            `INSERT INTO admin (admin_id, first_name, middle_name, last_name, designation, area_id, contact, email, employee_code, aadhaar_no, office_address) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;`, 
            values
        );

        res.json(newAdmin.rows[0]);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message });
    }
};