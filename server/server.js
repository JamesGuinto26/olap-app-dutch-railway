
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import analyticsRouter from "./routes/analytics.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");

    res.json({
      status: "connected",
      database: "railway_dw",
      mysql: rows[0].connected === 1,
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
        status: "error",
        message: error.message,
    });
  }
});

app.use("/api/analytics", analyticsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
