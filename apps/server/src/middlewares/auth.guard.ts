// import jwt from "jsonwebtoken";
// import type { Request, Response, NextFunction } from "express";

// const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

// export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token" });
//     const user = jwt.verify(token, JWT_ACCESS_SECRET) as { sub: string };

//     req.userId = user.sub;   // <---- store userId in request
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { verifyRefreshToken, sendTokens } from "utils/token";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      // Try to refresh using refresh token
      try {
        const decoded = verifyRefreshToken(req);
        token = sendTokens(res, decoded.sub); // Get new access token
      } catch (refreshError) {
        return res.status(401).json({ message: "No token" });
      }
    }

    const user = jwt.verify(token, JWT_ACCESS_SECRET) as { sub: string };
    req.userId = user.sub;
    next();
  } catch (error) {
    // If access token is expired, try refresh
    if (error instanceof jwt.TokenExpiredError) {
      try {
        const decoded = verifyRefreshToken(req);
        const newToken = sendTokens(res, decoded.sub);
        const user = jwt.verify(newToken, JWT_ACCESS_SECRET) as { sub: string };
        req.userId = user.sub;
        next();
      } catch (refreshError) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

