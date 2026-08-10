import prisma from "../lib/prisma.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    if (!propertyId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "propertyId, checkIn, and checkOut are required.",
      });
    }

    const numPropertyId = Number(propertyId);
    if (!Number.isInteger(numPropertyId) || numPropertyId <= 0) {
      return res.status(400).json({
        success: false,
        message: "propertyId must be a valid positive integer.",
      });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out date format.",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDay = new Date(start);
    startDay.setHours(0, 0, 0, 0);

    if (startDay < today) {
      return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past.",
      });
    }

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: numPropertyId },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property with id ${numPropertyId} not found`,
      });
    }

    // Check for date overlap on existing PENDING or CONFIRMED bookings
    const overlapping = await prisma.booking.findFirst({
      where: {
        propertyId: numPropertyId,
        status: { in: ["PENDING", "CONFIRMED"] },
        AND: [{ checkIn: { lt: end } }, { checkOut: { gt: start } }],
      },
    });

    if (overlapping) {
      return res.status(409).json({
        success: false,
        message: "This property is already booked for the selected dates.",
      });
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId: numPropertyId,
        userId: req.user.id,
        checkIn: start,
        checkOut: end,
        status: "PENDING",
      },
      include: {
        property: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        property: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getHostBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          ownerId: req.user.id,
        },
      },
      include: {
        property: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get Host Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Booking id must be a valid positive integer.",
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        property: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with id ${id} not found`,
      });
    }

    if (
      req.user.role !== "ADMIN" &&
      booking.userId !== req.user.id &&
      booking.property.ownerId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to view this booking.",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get Booking By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
