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

const router = Router();

// GET /api/properties — return all properties
router.get("/", getAllProperties);

// GET /api/properties/search?q= — keyword search
// IMPORTANT: registered BEFORE /:id so Express does not treat
// the word "search" as a dynamic id parameter.
router.get("/search", searchProperties);

// GET /api/properties/:id — return one property
router.get("/:id", getPropertyById);

// POST /api/properties — add a new property
router.post("/", createProperty);

// PUT /api/properties/:id — update an existing property
router.put("/:id", updateProperty);

// DELETE /api/properties/:id — remove a property
router.delete("/:id", deleteProperty);

export default router;
