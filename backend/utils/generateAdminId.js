import pool from "../db.js";

const generateAdminId = async () => {
    const result = await pool.query("SELECT admin_id FROM admin_register ORDER BY admin_id DESC LIMIT 1");
    const lastId = result.rows.length ? parseInt(result.rows[0].admin_id.slice(5)) : 0;
    return `BMCAD${String(lastId + 1).padStart(5, "0")}`;
};

export default generateAdminId;