import {
  authenticateSeller,
  verifyUser,
} from "../middlewares/verify.middleware.js";
import multer from "multer";
import { Router } from "express";
import { createProductController, getProductsController } from "../controllers/product.controller.js";
import { validateCreateProduct } from "../validators/product.validator.js";

// File upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const productRouter = Router();

// Seller: [Create Products]
productRouter.post(
  "/create",
  validateCreateProduct,
  verifyUser,
  authenticateSeller,
  upload.array("images", 7),
  createProductController,
);

// Seller : [View All products]
productRouter.get("/", verifyUser, authenticateSeller, getProductsController);

export default productRouter;
