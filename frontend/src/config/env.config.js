import dotenv from "dotenv";
dotenv.config();

if (!import.meta.env.VITE_BACKEND_URL) {
  throw new Error("BACKEND URL is not defined in environment variable");
}

export const config = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL,
};