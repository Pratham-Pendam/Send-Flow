import { sendResponse } from "utils/helper";
import { signInSchema, signUpSchema } from "@send-flow/validation";
import { sendTokens, verifyRefreshToken } from "utils/token";
import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { 
  signup as signupService, 
  signin as signinService, 
  googleAuth as googleAuthService, 
  verifyEmailService, 
  getMeService
} from "@/services/auth/auth.service";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "");

/* =======================
   AUTH CONTROLLER EXPORTED AS ARROW FUNCTIONS
   ======================= */

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = signUpSchema.parse(req.body);
    const user = await signupService(data);

    sendTokens(res, user.id); // refresh cookie + access token

    return sendResponse(res, 201, "Signup successful", { user });
  } catch (err: any) {
    return sendResponse(res, 400, "Signup failed", null, err.errors ?? err.message);
  }
};

export const signin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = signInSchema.parse(req.body);
    const user = await signinService(data);

    sendTokens(res, user.id);

    return sendResponse(res, 200, "Signin successful", { user });
  } catch (err: any) {
    return sendResponse(res, 400, "Signin failed", null, err.errors ?? err.message);
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Google Auth failed");

    const user = await googleAuthService({
      email: payload.email!,
      name: payload.name ?? payload.given_name ?? "New User"
    });

    sendTokens(res, user.id);
    return sendResponse(res, 200, "Google login successful", { user });
  } catch (err: any) {
    return sendResponse(res, 400, "Google login failed", null, err.message);
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const decoded = verifyRefreshToken(req);               // Validate refresh token cookie
    const accessToken = sendTokens(res, decoded.sub);      // Return new tokens

    return sendResponse(res, 200, "Token refreshed", { accessToken });
  } catch (err: any) {
    return sendResponse(res, 401, "Invalid refresh token");
  }
};

export const getMeController = async (req:Request, res:Response) => {
  try {
    const userId = req.userId; // Extracted from authGuard middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getMeService(userId);

    return res.json({ user });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return res.status(500).json({ message: errorMessage });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.query.token as string;
    const message = await verifyEmailService(token);

    return sendResponse(res, 200, message);
  } catch (err: any) {
    return sendResponse(res, 400, err.message);
  }
};
