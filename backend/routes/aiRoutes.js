import express from "express";
import { generateTrip } from "../controllers/aiController.js";

const router = express.Router();

router.post("/trip-planner", generateTrip);

export default router;