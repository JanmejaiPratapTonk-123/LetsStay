import { Router } from "express";
import {
  register,
  login,
  profile,
  logout,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// ── Public Auth Routes ─────────────────────────────
// Registration and login stay open so users can create and access accounts.
router.post("/register", register);

router.post("/login", login);

// ── Protected Session Route ────────────────────────
// The profile endpoint relies on a verified JWT to identify the user.
router.get("/profile", authMiddleware, profile);

// ── Session Cleanup ────────────────────────────────
// Logout is intentionally lightweight and handled without server state.
router.post("/logout", logout);

export default router;
