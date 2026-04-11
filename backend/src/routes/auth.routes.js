import { Router } from "express";
import {
  validateRegisterUser,
  validateVerifyUser,
} from "../validators/auth.validator.js";
import {
  registerUserController,
  resendOtpController,
  verifyOtpController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, registerUserController);
authRouter.post("/verify_otp", validateVerifyUser, verifyOtpController);
authRouter.post("/resend_otp", resendOtpController);

export default authRouter;
