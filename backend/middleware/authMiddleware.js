import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // ── Read Authorization Header ─────────────────────
    // Expect the bearer token to arrive with each protected request.
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // ── Verify Token ──────────────────────────────────
    // Reject requests that do not present a valid JWT.
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ── Attach User Context ───────────────────────────
    // Make the decoded identity available to downstream handlers.
    req.user = decoded;

    next();
  } catch (error) {
    // ── Authentication Failed ──────────────────────────
    // Return the same response for malformed, expired, or invalid tokens.
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
