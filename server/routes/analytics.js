
import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        SUM(stop_count) AS totalStops,
        COUNT(DISTINCT station_key) AS totalStations,
        COUNT(DISTINCT service_key) AS totalServices
      FROM fact_station_stop
    `);

    res.json({
      year: 2023,
      kpis: {
        totalStops: Number(rows[0].totalStops || 0),
        totalStations: Number(rows[0].totalStations || 0),
        totalServices: Number(rows[0].totalServices || 0),
      },
    });
  } catch (error) {
    console.error("Overview query failed:", error);

    res.status(500).json({
      error: "Failed to load overview analytics",
    });
  }
});

router.get("/stations", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        s.station_key,
        s.station_name,
        COUNT(*) AS totalStops
      FROM fact_station_stop f
      JOIN dim_station s ON f.station_key = s.station_key
      GROUP BY s.station_key, s.station_name
      ORDER BY totalStops DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (error) {
    console.error("Stations query failed:", error);
    res.status(500).json({
      error: "Failed to load station analytics",
    });
  }
});


router.get("/services", async (req, res) => {
  try {
    const [summary] = await pool.query(`
      SELECT
        COUNT(DISTINCT service_key) AS totalServices,
        COUNT(DISTINCT company) AS totalCompanies,
        COUNT(DISTINCT service_type) AS totalTypes
      FROM dim_service
    `);

    const [rows] = await pool.query(`
      SELECT
        COALESCE(service_type, 'Unknown') AS serviceType,
        COUNT(DISTINCT service_key) AS totalServices
      FROM dim_service
      GROUP BY service_type
      ORDER BY totalServices DESC
      LIMIT 10
    `);

    res.json({
      summary: {
        totalServices: Number(summary[0].totalServices || 0),
        totalCompanies: Number(summary[0].totalCompanies || 0),
        totalTypes: Number(summary[0].totalTypes || 0),
      },
      serviceTypes: rows,
    });
  } catch (error) {
    console.error("Services query failed:", error);
    res.status(500).json({
      error: "Failed to load service analytics",
    });
  }
});



router.get("/time", async (req, res) => {
  try {
    const year = Number(req.query.year || 2023);
    const quarter = req.query.quarter || "all";
    const month = req.query.month || "all";

    if (year !== 2023) {
      return res.status(400).json({ error: "Only 2023 data is available" });
    }

    const conditions = ["d.year_number = ?"];
    const params = [year];

    if (quarter !== "all") {
      const q = Number(quarter);
      if (![1, 2, 3, 4].includes(q)) {
        return res.status(400).json({ error: "Invalid quarter" });
      }
      conditions.push("d.quarter_number = ?");
      params.push(q);
    }

    if (month !== "all") {
      const m = Number(month);
      if (!Number.isInteger(m) || m < 1 || m > 12) {
        return res.status(400).json({ error: "Invalid month" });
      }
      conditions.push("d.month_number = ?");
      params.push(m);
    }

    const where = conditions.join(" AND ");

    const [summary] = await pool.query(
      `SELECT COALESCE(SUM(f.stop_count), 0) AS totalStops
       FROM fact_station_stop f
       JOIN dim_date d ON d.date_key = f.date_key
       WHERE ${where}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT d.month_number AS monthNumber,
              d.month_name AS monthName,
              SUM(f.stop_count) AS totalStops
       FROM fact_station_stop f
       JOIN dim_date d ON d.date_key = f.date_key
       WHERE ${where}
       GROUP BY d.month_number, d.month_name
       ORDER BY d.month_number`,
      params
    );

    res.json({
      filters: { year, quarter, month },
      totalStops: Number(summary[0].totalStops),
      monthlyStops: rows.map((row) => ({
        monthNumber: row.monthNumber,
        monthName: row.monthName,
        totalStops: Number(row.totalStops),
      })),
    });
  } catch (error) {
    console.error("Time analysis query failed:", error);
    res.status(500).json({ error: "Failed to load time analytics" });
  }
});


export default router;
