/**
 * Login.jsx
 * Login page for Clothy — returning users.
 * Renders the branded login form UI.
 * All validation and API logic is handled by existing hooks/services.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth.js";
import { loginSchema } from "../validator/auth.validator.js";

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
          {visible
            ? <RiEyeOffLine size={18} />
            : <RiEyeLine size={18} />
          }
        </button>
      }
    />
  );
};

// ─────────────────────────────────────────────
// Login Page
// ─────────────────────────────────────────────
const Login = () => {
  const { handleLoginUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Update a single field in the controlled form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate and submit the login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side schema validation (Zod)
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear any stale errors before the fresh attempt
    setErrors({});

    try {
      // TODO: handle API call here
      await handleLoginUser(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Failed: ", err.message);
    }
  };

  // Handle Google OAuth redirect
  const handleGoogleAuth = () => {
    // TODO: Google auth handler
  };

  return (
    <AuthLayout
      navLinkTo="/register"
      navLinkText="New to Clothy?"
      navLinkCta="REGISTER"
    >

      <div className="w-full max-w-[480px] relative z-10">

        {/* ── Page Header ── */}
        <p className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-black/45 mb-2">Welcome Back</p>
        <h1 className="font-display text-[72px] leading-[0.9] tracking-[-1px] uppercase text-black mb-8">Login</h1>

        {/* ── Login Form ── */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Email Address */}
          <div className="mb-2">
            <FormField
              id="login-email"
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          {/* Password with eye toggle */}
          <div className="mb-2">
            <PasswordField
              id="login-password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          {/* Forgot Password — right-aligned, below password field */}
          <a href="#" className="font-body text-[11px] font-medium tracking-[0.2em] uppercase text-black block text-right mt-2 mb-6 transition-colors duration-150 hover:underline hover:decoration-accent hover:underline-offset-[3px]">Forgot Password?</a>

          {/* Primary CTA button */}
          <button
            id="login-submit-btn"
            type="submit"
            className="flex items-center justify-center w-full h-[52px] px-5 bg-accent text-black border-[1.5px] border-black rounded-none font-body text-[13px] font-bold tracking-[0.2em] uppercase cursor-pointer gap-2 transition-all duration-150 hover:bg-[#b8e800] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mb-0"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login →"}
          </button>

          {/* Backend error message */}
          {error && (
            <p className="field-error" style={{ textAlign: "center", marginTop: "12px" }}>
              {error}
            </p>
          )}
        </form>

        {/* ── OR Divider ── */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-black" />
          <span className="font-body text-[11px] font-semibold tracking-[0.25em] uppercase text-black whitespace-nowrap">or</span>
          <div className="flex-1 h-[1px] bg-black" />
        </div>

        {/* ── Google Auth ── */}
        <GoogleButton onClick={handleGoogleAuth} />

        {/* ── Bottom register link ── */}
        <div className="mt-6 text-center font-body text-[11px] font-normal tracking-[0.05em] text-black/45">
          Don&apos;t have an account?&nbsp;
          <Link to="/register" className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black transition-colors duration-150 hover:underline hover:decoration-accent hover:underline-offset-[3px]">
            Register →
          </Link>
        </div>

      </div>
    </AuthLayout>
  );
};

export default Login;
