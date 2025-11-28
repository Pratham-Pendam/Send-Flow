import jwt from "jsonwebtoken";
import type { Response, Request } from "express";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// -------- Generate tokens --------
export const createTokens = (userId: string) => ({
  accessToken: jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" }),
  refreshToken: jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" }),
});

// -------- Send tokens --------
export const sendTokens = (res: Response, userId: string) => {
  const { accessToken, refreshToken } = createTokens(userId);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,     
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

// -------- Verify Refresh Token --------
export const verifyRefreshToken = (req: Request) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new Error("No refresh token");

  return jwt.verify(token, JWT_REFRESH_SECRET) as { sub: string };
};
