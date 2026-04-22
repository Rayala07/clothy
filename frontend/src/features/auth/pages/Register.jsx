/**
 * Register.jsx
 * Registration page for Clothy.
 * Renders the brand UI for new account creation with Zod-validated fields.
 * The form collects UI fields (firstName, lastName, contact, email, password, confirmPassword),
 * validates them via registerSchema, then composes the backend payload before calling handleRegister.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { registerSchema } from "../validator/auth.validator";
import { setVerifyEmail, setOtpData } from "../utils/authStorage.js";

// Shared layout & sub-components
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import GoogleButton from "../components/GoogleButton";

// Remixicon eye icons for password visibility toggle
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

// ─────────────────────────────────────────────
// PasswordField — password input with eye toggle
// ─────────────────────────────────────────────
const PasswordField = ({ id, label, name, value, onChange, error }) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      id={id}
      label={label}
      type={visible ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      rightSlot={
        <button
          type="button"
          className="absolute right-3.5 text-black/45 flex items-center justify-center p-1 transition-colors duration-150 hover:text-black"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
        </button>
      }
    />
  );
};

// ─────────────────────────────────────────────
// Register Page
// ─────────────────────────────────────────────
const Register = () => {
  // Form state — matches registerSchema fields exactly
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState("buyer");
  const [errors, setErrors] = useState({});

  const { handleRegister, loading, error } = useAuth();
  const navigate = useNavigate();

  // Update a single field value in the controlled form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate via Zod schema, then compose and submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all UI fields against the Zod registerSchema
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      // Map Zod issues to a { fieldName: message } object for display
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear any stale errors before a clean submission
    setErrors({});

    // Compose the backend-expected payload: fullname = firstName + lastName
    const payload = {
      fullname: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      role: role,
    };

    try {
      // TODO: handle API call here
      await handleRegister(payload);
      setVerifyEmail(formData.email);
      setOtpData(formData.email);
      navigate("/verify-otp");
    } catch (err) {
      console.error("Registration Failed: ", err);
    }
  };

  // Handle Google OAuth redirect
  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  return (
    <AuthLayout
      navLinkTo="/login"
      navLinkText="Already have an account?"
      navLinkCta="LOGIN"
    >

      <div className="w-full max-w-[480px] m-auto relative z-10">

        {/* ── Page Header ── */}
        <p className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-black/45 mb-1.5">Create Account</p>
        <h1 className="font-display text-[52px] leading-[0.9] tracking-[-1px] uppercase text-black mb-5">Register</h1>

        {/* ── Registration Form ── */}
        <form onSubmit={handleSubmit} noValidate>

          {/* First Name + Last Name — side by side */}
          <div className="flex gap-3 *:flex-1">
            <FormField
              id="reg-first-name"
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <FormField
              id="reg-last-name"
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          {/* Email Address */}
          <div className="-mt-1">
            <FormField
              id="reg-email"
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          {/* Phone / Contact */}
          <div className="-mt-1">
            <FormField
              id="reg-contact"
              label="Phone Number"
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              error={errors.contact}
            />
          </div>

          {/* Password */}
          <div className="-mt-1">
            <PasswordField
              id="reg-password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          {/* Confirm Password */}
          <div className="-mt-1" style={{ marginBottom: "12px" }}>
            <PasswordField
              id="reg-confirm-password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>

          {/* ── Role Selector ── */}
          <div className="w-full pb-3 -mt-1">
            <label className="block font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-black mb-1 opacity-50">Account Type</label>
            <div className="flex w-full">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`flex-1 h-[44px] border-[1.5px] border-black focus:outline-none rounded-none font-body text-[11px] font-bold tracking-[3px] uppercase transition-all duration-150 ${role === "buyer" ? "bg-black text-white opacity-100" : "bg-white text-black opacity-50"} m-0`}
                style={{ marginRight: "-1.5px", zIndex: role === "buyer" ? 1 : 0 }}
              >
                BUYER
              </button>
              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`flex-1 h-[44px] border-[1.5px] border-black focus:outline-none rounded-none font-body text-[11px] font-bold tracking-[3px] uppercase transition-all duration-150 ${role === "seller" ? "bg-black text-white opacity-100" : "bg-white text-black opacity-50"} m-0`}
                style={{ zIndex: role === "seller" ? 1 : 0 }}
              >
                SELLER
              </button>
            </div>
          </div>

          {/* Primary CTA button */}
          <button
            id="reg-submit-btn"
            type="submit"
            className="flex items-center justify-center w-full h-[44px] px-5 bg-accent text-black border-[1.5px] border-black rounded-none font-body text-[12px] font-bold tracking-[0.2em] uppercase cursor-pointer gap-2 transition-all duration-150 hover:bg-[#b8e800] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mb-0"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          {/* Backend error message */}
          {error && (
            <p className="field-error" style={{ textAlign: "center", marginTop: "12px" }}>
              {error}
            </p>
          )}
        </form>

        {/* ── OR Divider ── */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-[1px] bg-black" />
          <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-black whitespace-nowrap">or</span>
          <div className="flex-1 h-[1px] bg-black" />
        </div>

        {/* ── Google Auth ── */}
        <GoogleButton onClick={handleGoogleAuth} />

        {/* ── Terms micro-text ── */}
        <p className="font-body text-[10px] font-normal tracking-[0.03em] text-black/45 text-center mt-4 [&>a]:text-black/45 [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:text-black">
          By creating an account, you agree to our{" "}
          <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
        </p>

      </div>
    </AuthLayout>
  );
};

export default Register;
