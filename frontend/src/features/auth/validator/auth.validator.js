/**
 * auth.validator.js
 * Frontend Zod validation schemas for all authentication forms.
 * These schemas validate the UI-level field shapes before any API call is made.
 * The register payload is then mapped to the backend shape (fullname, contact) in the submit handler.
 */

import { z } from "zod";

// ─── Register Schema ─────────────────────────────────────────────────────────
// Validates the 6 UI fields shown on the Register page.
// fullname is composed from firstName + lastName before sending to the backend.
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),

    lastName: z
      .string()
      .min(1, "Last name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    contact: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach the error to the confirmPassword field
  });

// ─── OTP Schema ──────────────────────────────────────────────────────────────
// Validates a 6-digit numeric OTP string.
export const verifyOtpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit code"),
});

// ─── Login Schema ─────────────────────────────────────────────────────────────
// Validates the email + password fields on the Login page.
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
