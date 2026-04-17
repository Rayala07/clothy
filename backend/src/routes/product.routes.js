import {
  authenticateSeller,
  verifyUser,
} from "../middlewares/verify.middleware.js";
import multer from "multer";

export { Router } from "express";

// File upload
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize:
//   },
// });

const productRouter = Router();

productRouter.post("/create", verifyUser, authenticateSeller, createProduct);
