import prisma from "../lib/prisma.js";

export const getAllProperties = async (req, res) => {
  try {
    // ── Database Lookup ───────────────────────────────
    // Load the full listing set for browse views and integrations.
    const properties = await prisma.property.findMany();

    // ── Response ──────────────────────────────────────
    // Return the count alongside the property collection for the client.
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // ── Database Lookup ───────────────────────────────
    // Fetch a single property by id so the client can render details.
    const property = await prisma.property.findUnique({
      where: { id },
    });

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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, image } = req.body;

    // ── Validate Request ─────────────────────────────
    // Require the full record before writing a new property.
    if (!title || !description || !location || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ── Create Property ───────────────────────────────
    // Persist the new listing with the supplied owner reference.
    const property = await prisma.property.create({
      data: {
        title,
        description,
        location,
        price,
        image,
        ownerId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // ── Verify Record Exists ──────────────────────────
    // Avoid updating a property that has already been removed.
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: `Property with id ${id} not found`,
      });
    }

    if (req.user.role !== "ADMIN" && existingProperty.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to update this property.",
      });
    }

    const { title, description, location, price, image } = req.body;

    // ── Validate Request ─────────────────────────────
    // Keep updates complete so the record stays internally consistent.
    if (!title || !description || !location || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ── Update Property ───────────────────────────────
    // Replace the existing listing values with the submitted payload.
    const property = await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        price,
        image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // ── Verify Record Exists ──────────────────────────
    // Prevent a delete call from succeeding on a missing record.
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: `Property with id ${id} not found`,
      });
    }

    if (req.user.role !== "ADMIN" && existingProperty.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to delete this property.",
      });
    }

    // ── Delete Property ───────────────────────────────
    // Remove the listing once the record has been confirmed.
    await prisma.property.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchProperties = async (req, res) => {
  try {
    const q = req.query.q;

    // ── Fallback To Full List ─────────────────────────
    // Keep the endpoint useful even when no search term is supplied.
    if (!q) {
      const properties = await prisma.property.findMany();

      return res.status(200).json({
        success: true,
        count: properties.length,
        data: properties,
      });
    }

    // ── Search Query ──────────────────────────────────
    // Match title and location so users can find listings by intent.
    const properties = await prisma.property.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
