import {
  createProduct,
  getProducts,
} from "../services/product.service.js";
import { useDispatch } from "react-redux";
import {
  setSellerProducts,
} from "../state/product.slice.js";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);

    return data.product;
  }

  async function handleGetProducts() {
    const data = await getProducts();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  return {
    handleCreateProduct,
    handleGetProducts,
  };
};
