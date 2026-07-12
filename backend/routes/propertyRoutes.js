// routes/propertyRoutes.js
//
// The router maps HTTP method + path combinations to controller functions.
// No logic lives here — this file is purely a table of mappings.
//
// The /api/properties prefix is set in server.js.
// This router only sees what comes after that prefix.

import { Router } from "express";
import {
  getAllProperties,
  searchProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

// ── Browse Properties ──────────────────────────────
// Keep the public listing and search routes easy to reach from the client.
router.get("/", getAllProperties);

// ── Search Properties ──────────────────────────────
// Register this before /:id so Express does not treat "search" as a route param.
router.get("/search", searchProperties);

// ── Property Detail ─────────────────────────────────
// Expose individual listings by id for detail pages and edits.
router.get("/:id", getPropertyById);

// ── Protected Mutations ────────────────────────────
// Require authentication for create, update, and delete operations.
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["HOST", "ADMIN"]),
  createProperty,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["HOST", "ADMIN"]),
  updateProperty,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["HOST", "ADMIN"]),
  deleteProperty,
);

export default router;
