import { Router } from "express";
import { validateRegisterUser } from "../validators/auth.validator.js";
import { registerUserController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, registerUserController);

export default authRouter;
