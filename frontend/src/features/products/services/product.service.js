import axios from "axios";
import { config } from "../../../config/env.config.js";

const product_api = axios.create({
  baseURL: `${config.BASE_URL}/api/products`,
  withCredentials: true,
});

export async function createProduct(formData) {
  try {
    const response = await product_api.post("/", formData);
    return response.data;
  } catch (err) {
    console.error("Error occured: ", err);
    throw err.response?.data || { message: "Create product failed" };
  }
}

export async function getProducts() {
  try {
    const response = await product_api.get("/seller-products");
    return response.data;
  } catch (err) {
    console.error("An error occured: ", err);
    throw err.response?.data || { message: "Get products failed" };
  }
}

export async function getAllProducts() {
  try {
    const response = await product_api.get("/");
    return response.data;
  } catch (err) {
    console.error("Error occured: ", err);
    throw err.response?.data || { message: "Get All products failed" };
  }
}
