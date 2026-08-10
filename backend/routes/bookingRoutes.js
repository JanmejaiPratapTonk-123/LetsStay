import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  getHostBookings,
  getBookingById,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getMyBookings);
router.get(
  "/host-bookings",
  authMiddleware,
  roleMiddleware(["HOST", "ADMIN"]),
  getHostBookings,
);
router.get("/:id", authMiddleware, getBookingById);

export default router;
