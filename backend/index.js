import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);

app.listen(port, () => console.log(`Server running on port ${port}.`));