import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProductController(req, res) {
  const { title, description, priceAmount } = req.body;
  const seller = req.user;

  const variantsMeta = JSON.parse(req.body.variants);

  if (!variantsMeta || variantsMeta.length === 0) {
    return res.status(400).json({
      status: false,
      message: "At least one color variant is required",
    });
  }

  const variants = await Promise.all(
    variantsMeta.map(async (variantMeta, index) => {
      const filesForThisVariant = req.files[`variant_${index}_images`] || [];

      const uploadImages = await Promise.all(
        filesForThisVariant.map(async (file) => {
          const url = await uploadFile({
            buffer: file.buffer,
            fileName: file.originalName,
          });

          return { url };
        }),
      );

      return {
        color: variantMeta.color,
        sizes: variantMeta.sizes,
        images: uploadImages,
      };
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
    },
    variants,
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

  const products = await productModel
    .find({ seller: id })
    .sort({ createdAt: -1 });

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

export async function getProductByIdController(req, res) {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: true,
    message: "Product fetched successfully",
    product,
  });
}
