import express from "express";
import { registerAdmin } from "../controller/registerAdmin.js";
import { areaDetails } from "../controller/areaDetails.js";
import { formDetails } from "../controller/adminForm.js";
import { loginAdmin } from "../controller/loginAdmin.js";
import { getLastLogin } from "../controller/getTimestamp.js";
import { getAdminDetails } from "../controller/getAdminDetails.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.get("/constituency", areaDetails);
router.post("/form", formDetails);
router.post("/login", loginAdmin);
router.get("/dashboard/:constituency", getLastLogin); 
router.get("/admin/:constituency", getAdminDetails);

export default router;