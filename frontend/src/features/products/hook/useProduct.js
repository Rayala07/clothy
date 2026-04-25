import {
  createProduct,
  getProducts,
  getAllProducts,
  getProductDetails,
} from "../services/product.service.js";
import { useDispatch } from "react-redux";
import { setSellerProducts, setAllProducts } from "../state/product.slice.js";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      const data = await createProduct(formData);
      return data.product;
    } catch (err) {
      console.error("Error creating product: ", err);
    }
  }

  async function handleGetProducts() {
    try {
      const data = await getProducts();
      dispatch(setSellerProducts(data.products));
      return data.products;
    } catch (err) {
      console.error("Error getting seller products: ", err);
    }
  }

  async function handleGetAllProducts() {
    try {
      const data = await getAllProducts();
      dispatch(setAllProducts(data.products));
      return data.products;
    } catch (err) {
      console.error("Error getting all products: ", err);
    }
  }

  async function handleGetProductDetails(productId) {
    try {
      const data = await getProductDetails(productId);
      return data.product;
    } catch (err) {
      console.error("Error getting product details: ", err);
    }
  }

  return {
    handleCreateProduct,
    handleGetProducts,
    handleGetAllProducts,
    handleGetProductDetails,
  };
};
