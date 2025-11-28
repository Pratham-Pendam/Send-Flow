import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    const user = jwt.verify(token, JWT_ACCESS_SECRET) as { sub: string };

    req.userId = user.sub;   // <---- store userId in request
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
