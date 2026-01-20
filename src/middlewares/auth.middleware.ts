import jwt from "jsonwebtoken";
import config from "@config/env.js";
import { ERRORS } from "@utils/errors.js";

export const SECRET_KEY = config.JWT_SECRET!;

export function authenticateToken(req: any, res: any, next: any) {
  // Exclude login routes
  if (
    req.path === "/login" ||
    req.path === "/register" ||
    req.path === "/refresh-token"
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: ERRORS.TOKEN_NOT_PROVIDED,
    });
  }

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: ERRORS.INVALID_TOKEN,
      });
    }
    req.user = user;
    next();
  });
}
