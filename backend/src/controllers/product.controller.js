import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProductController(req, res) {
  const { title, description, priceAmount } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
    },
    images,
    seller: seller._id,
  });

  res.status(201).json({
    status: true,
    message: "Product created successfully",
    product,
  });
}

export async function getSellerProductsController(req, res) {
  const { id } = req.user;

  const products = await productModel.find({ seller: id });

  if (!products) {
    return res.status(404).json({
      status: false,
      message: "Products not found",
    });
  }

  res.status(200).json({
    status: true,
    message: "Products fetched successfully",
    products,
  });
}

export async function getProductsController(req, res) {
  const products = await productModel.find();

  if (!products) {
    return res.status(404).json({
      status: false,
      message: "Products not found",
    });
  }

  res.status(200).json({
    status: true,
    message: "Products fetched successfully",
    products,
  });
}
