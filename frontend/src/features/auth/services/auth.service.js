import axios from "axios";
import { config } from "../../../config/env.config.js";

const auth_api = axios.create({
  baseURL: `${config.BASE_URL}/api/auth`,
  withCredentials: true,
});

export async function registerUser({ fullname, email, contact, password }) {
  try {
    const response = await auth_api.post("/register", {
      fullname,
      email,
      contact,
      password,
    });
  } catch (err) {
    console.error("An error occoured at register: ", err);
  }
}
