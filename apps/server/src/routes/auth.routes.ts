import { googleAuth, refreshToken, signin, signup, verifyEmail } from "@/controllers/auth.controller";
import express from "express";
// import { authGuard } from "@/middlewares/authGuard";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.get("/refresh", refreshToken);
router.get("/verify-email", verifyEmail);

export default router;
