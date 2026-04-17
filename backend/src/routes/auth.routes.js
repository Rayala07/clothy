import { Router } from "express";
import { config } from "../config/config.js";
import {
  validateLoginUser,
  validateRegisterUser,
  validateVerifyUser,
} from "../validators/auth.validator.js";
import {
  googleCallback,
  loginUserController,
  logoutUserController,
  registerUserController,
  resendOtpController,
  verifyOtpController,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/verify.middleware.js";
import passport from "passport";

const authRouter = Router();

// Register and Verify User
authRouter.post("/register", validateRegisterUser, registerUserController);
authRouter.post("/verify_otp", validateVerifyUser, verifyOtpController);
authRouter.post("/resend_otp", resendOtpController);
authRouter.post("/login", validateLoginUser, loginUserController);

// Logout endpoint
authRouter.post("/logout", verifyUser, logoutUserController);

// Google OAuth
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  googleCallback,
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.FRONTEND_URL}/login`,
  }),
  googleCallback,
);
export default authRouter;
