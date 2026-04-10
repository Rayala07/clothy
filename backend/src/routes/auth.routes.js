import { Router } from "express";
import { validateRegisterUser } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser);
