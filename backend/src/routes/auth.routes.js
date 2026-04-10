import { Router } from "express";
import { validateRegisterUser } from "../../validators/auth.validator";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser);
