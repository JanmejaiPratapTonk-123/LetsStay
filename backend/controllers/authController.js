import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ── Validate Request ─────────────────────────────
    // Require all fields before creating a new account.
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ── Check Existing User ──────────────────────────
    // Prevent duplicate accounts for the same email address.
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    // ── Hash Password ─────────────────────────────────
    // Store credentials securely before persisting the user.
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Create User ───────────────────────────────────
    // Save the new account and return only safe profile fields.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Validate Request ─────────────────────────────
    // Require credentials before attempting authentication.
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // ── Look Up User ──────────────────────────────────
    // Fail fast when the email does not match an account.
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── Verify Password ───────────────────────────────
    // Compare the submitted password against the stored hash.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── Generate JWT ──────────────────────────────────
    // Issue a signed token for subsequent protected requests.
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const profile = async (req, res) => {
  try {
    // ── Load Current User ──────────────────────────────
    // Refresh the profile from the database for the active session.
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ── Return Profile ─────────────────────────────────
    // Send only the fields required by the client.
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const logout = async (req, res) => {
  // ── Logout Response ────────────────────────────────
  // Token invalidation is handled client-side in this setup.
  return res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
};
