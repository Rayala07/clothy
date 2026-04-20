import axios from "axios";
import { config } from "../../../../../backend/src/config/config";

const product_api = axios.create({
  baseURL: config.VITE_BACKEND_URL,
  withCredentials: true,
});

export async function createProduct() {
    const response = product_api.post()
    console.log(response)
}