import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import errorHandler from "./middleware/errorHandler.js";


dotenv.config();

const app = express();

// ── Core Middleware ───────────────────────────────
// Enable CORS and JSON parsing before any route handling.
app.use(cors());
app.use(express.json());

// ── Health Check ──────────────────────────────────
// Provide a simple response for uptime checks and quick verification.
app.get("/", (req, res) => {
  res.json({ success: true, message: "LetsStay Backend Running" });
});

// ── API Routes ────────────────────────────────────
// Mount resource routers under stable prefixes for the frontend.
app.use("/api/properties", propertyRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/bookings", bookingRoutes);


// ── Not Found ─────────────────────────────────────
// Keep unmatched requests explicit instead of falling through silently.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ── Error Handler ─────────────────────────────────
// Express identifies this middleware by the four-argument signature.
app.use(errorHandler);

// ── Start Server ──────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
