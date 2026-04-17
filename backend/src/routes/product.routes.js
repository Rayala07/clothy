import {
  authenticateSeller,
  verifyUser,
} from "../middlewares/verify.middleware.js";

export { Router } from "express";

const productRouter = Router();

productRouter.post("/create", verifyUser, authenticateSeller, createProduct);
