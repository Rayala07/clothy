import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(3, "Must be more than 3 characters"),
  email: z.string().email("Invalid email"),
  contact: z.string().regex(/^\d{10}$/, "Must be exactly 10 digits"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

export const verifyOtpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Invalid OTP"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Must be atleast 6 characters"),
});
