import {
  authenticateSeller,
  verifyUser,
} from "../middlewares/verify.middleware.js";
import multer from "multer";
import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";

// File upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const productRouter = Router();

productRouter.post(
  "/create",
  verifyUser,
  authenticateSeller,
  upload.array("images", 7),
  createProduct,
);

export default productRouter;
