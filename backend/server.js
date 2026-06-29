import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import propertyRoutes from "./routes/propertyRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────
app.use(cors());
app.use(express.json()); // parses incoming JSON bodies into req.body

// ── Routes ───────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "LetsStay Backend Running" });
});

// All property routes are mounted at /api/properties
// e.g. GET /api/properties → getAllProperties
//      GET /api/properties/:id → getPropertyById
app.use("/api/properties", propertyRoutes);

// ── 404 catch-all ────────────────────────────
// Registered after all routes. Catches any URL that didn't match above.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ── Error handler ────────────────────────────
// Must be last. The 4-argument signature tells Express this is an error handler.
app.use(errorHandler);

// ── Start server ─────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});