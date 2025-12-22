import jwt from "jsonwebtoken";
import config from "@config/env.js";

export const SECRET_KEY = config.JWT_SECRET!;

const ERROR_CODES = {
  TOKEN_NOT_PROVIDED: 401,
  INVALID_TOKEN: 403,
};

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
    return res.status(ERROR_CODES.TOKEN_NOT_PROVIDED).json({
      success: false,
      data: {
        errors: {
          code: ERROR_CODES.TOKEN_NOT_PROVIDED,
          message: "Token not provided",
        },
      },
    });
  }

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.status(ERROR_CODES.INVALID_TOKEN).json({
        success: false,
        data: {
          errors: {
            code: ERROR_CODES.INVALID_TOKEN,
            message: "Invalid token",
          },
        },
      });
    }
    req.user = user;
    next();
  });
}
