import type { Request, Response, NextFunction } from "express";
import { ERRORS } from "@utils/errors.js";

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (e: any) {
      res.status(400).json({ success: false, error: ERRORS.VALIDATION_ERROR });
    }
  };
