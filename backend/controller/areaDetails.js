import pool from "../db.js";

export const areaDetails = async (req, res) => {
    try {
        const areaId = await pool.query("SELECT area_id, constituency FROM area_details");
        res.json(areaId.rows);
    } catch (err) {
        res.json({ error: err.message });
    }
};