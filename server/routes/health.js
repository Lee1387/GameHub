import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.json({
    message: "GameHub API is running",
    status: "healthy",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

export default router;
