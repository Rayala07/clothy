import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    description: {
      type: String,
      required: [true, "Product description required"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Seller details required"],
    },
    price: {
      amount: {
        type: Number,
        required: [true, "Amount of the product is required"],
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
    variants: [
      {
        color: {
          type: String,
          required: [true, "Color name is required"],
        },
        sizes: {
          type: [String],
          enum: ["XS","S","M","L","XL"],
          required: [true, "At least one size is required"],
        },
        images: [
          {
            url: {
              type: String,
              required: [true, "At least one image URL is required"],
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
