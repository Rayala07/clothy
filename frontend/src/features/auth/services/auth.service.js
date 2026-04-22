import axios from "axios";
import { config } from "../../../config/env.config.js";

const auth_api = axios.create({
  baseURL: `${config.BASE_URL}/api/auth`,
  withCredentials: true,
});

export async function registerUser({
  fullname,
  email,
  contact,
  password,
  role,
}) {
  try {
    const response = await auth_api.post("/register", {
      fullname,
      email,
      contact,
      password,
      role,
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration Failed" };
  }
}

export async function verifyOtp({ email, otp }) {
  try {
    const response = await auth_api.post("/verify_otp", {
      email,
      otp,
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "OTP Verification Failed" };
  }
}

export async function resendOtp({ email }) {
  try {
    const response = await auth_api.post("/resend_otp", { email });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Resend OTP Failed" };
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await auth_api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login Failed" };
  }
}

export async function getMe() {
  try {
    const response = await auth_api.get("/me");
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Get Me Failed" };
  }
}

export async function logoutUser() {
  try {
    const response = await auth_api.post("/logout");
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Logout Failed" };
  }
}
