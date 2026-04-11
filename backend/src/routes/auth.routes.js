import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
  validateVerifyUser,
} from "../validators/auth.validator.js";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  resendOtpController,
  verifyOtpController,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/verify.middleware.js";

const authRouter = Router();

// Register and Verify User
authRouter.post("/register", validateRegisterUser, registerUserController);
authRouter.post("/verify_otp", validateVerifyUser, verifyOtpController);
authRouter.post("/resend_otp", resendOtpController);
authRouter.post("/login", validateLoginUser, loginUserController);

// Logout endpoint
authRouter.post("/logout", verifyUser, logoutUserController);

export default authRouter;
