import prisma from "../lib/prisma.js";

export const getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany();

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
    const { title, description, location, price, image, ownerId } = req.body;

    if (!title || !description || !location || !price || !image || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        location,
        price,
        image,
        ownerId,
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
    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: `Property with id ${id} not found`,
      });
    }

    const { title, description, location, price, image, ownerId } = req.body;

    if (!title || !description || !location || !price || !image || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const property = await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        price,
        image,
        ownerId,
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

    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: `Property with id ${id} not found`,
      });
    }

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

    if (!q) {
      const properties = await prisma.property.findMany();

      return res.status(200).json({
        success: true,
        count: properties.length,
        data: properties,
      });
    }

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
