// controllers/propertyController.js
//
// One function per endpoint. Reads/writes the properties array, sends res.json().
//
// ── WEEK 5 MIGRATION NOTE ───────────────────────────────────────────────────
// Every array operation in this file maps directly to a SQL query:
//
//   properties (array)             →  properties (PostgreSQL table)
//   array.find(p => p.id === id)   →  SELECT * FROM properties WHERE id = $1
//   array.push(newProperty)        →  INSERT INTO properties (...) VALUES (...)
//   array[index] = { ...merged }   →  UPDATE properties SET ... WHERE id = $1
//   array.splice(index, 1)         →  DELETE FROM properties WHERE id = $1
//
// Function names, signatures, and the route file will NOT change in Week 5.
// Only the bodies of these six functions change.
// ────────────────────────────────────────────────────────────────────────────

import properties from "../data/properties.js";

// ── GET /api/properties ───────────────────────
export const getAllProperties = (req, res) => {
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

// ── GET /api/properties/search?q= ────────────
// Case-insensitive keyword search across title, location, type, category.
// No ?q= provided → returns all properties.
export const searchProperties = (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  }

  const term = q.toLowerCase();

  const results = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
};

// ── GET /api/properties/:id ───────────────────
export const getPropertyById = (req, res) => {
  const id = Number(req.params.id);

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return res.status(404).json({
      success: false,
      message: `Property with id ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: property,
  });
};

// ── POST /api/properties ──────────────────────
// Requires: title, price in req.body.
export const createProperty = (req, res) => {
  const { title, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({
      success: false,
      message: "Title and price are required",
    });
  }

  const id =
    properties.length > 0
      ? properties[properties.length - 1].id + 1
      : 1;

  // Client data spread first, then server-generated id last — id always wins
  const newProperty = {
    ...req.body,
    id,
  };

  properties.push(newProperty);

  res.status(201).json({
    success: true,
    data: newProperty,
  });
};

// ── PUT /api/properties/:id ───────────────────
// Merges req.body into the existing property. id is always preserved.
export const updateProperty = (req, res) => {
  const id = Number(req.params.id);

  const index = properties.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Property with id ${id} not found`,
    });
  }

  // Three-layer merge: existing → client updates → protected id
  properties[index] = {
    ...properties[index],
    ...req.body,
    id,
  };

  res.status(200).json({
    success: true,
    data: properties[index],
  });
};

// ── DELETE /api/properties/:id ────────────────
export const deleteProperty = (req, res) => {
  const id = Number(req.params.id);

  const index = properties.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Property with id ${id} not found`,
    });
  }

  properties.splice(index, 1);

  res.status(200).json({
    success: true,
    message: `Property with id ${id} deleted successfully`,
  });
};
