import {
  authenticateSeller,
  verifyUser,
} from "../middlewares/verify.middleware.js";
import multer from "multer";
import { Router } from "express";
import {
  createProductController,
  getSellerProductsController,
  getProductsController,
  getProductByIdController,
} from "../controllers/product.controller.js";
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
  "/",
  validateCreateProduct,
  verifyUser,
  authenticateSeller,
  upload.array("images", 7),
  createProductController,
);

// Seller : [View all products of own]
productRouter.get(
  "/seller-products",
  verifyUser,
  authenticateSeller,
  getSellerProductsController,
);

// Buyer : [Get and Render all products/details]
productRouter.get("/", getProductsController);
productRouter.get("/:productId", getProductByIdController);

export default productRouter;
