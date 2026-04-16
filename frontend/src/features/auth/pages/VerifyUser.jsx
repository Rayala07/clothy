/**
 * VerifyUser.jsx
 * OTP Verification page for Clothy.
 * Renders 6 individual digit boxes for code entry with a countdown resend timer.
 * All verification and resend logic is handled by existing hooks/services.
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVerifyEmail, clearVerifyEmail, getOtpTimeLeft, clearOtpData, setOtpData } from "../utils/authStorage.js";
import { verifyOtpSchema } from "../validator/auth.validator";
import { useAuth } from "../hook/useAuth";
import { resendOtp } from "../services/auth.service";

// Shared layout & sub-components
import AuthLayout from "../components/AuthLayout";
import OtpInput from "../components/OtpInput";

const VerifyUser = () => {
  const navigate = useNavigate();

  // Retrieve the email stored after registration
  const email = getVerifyEmail();

  const { handleVerifyOtp, loading, error } = useAuth();

  // 6 individual digit strings — matches the OtpInput component's shape
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [errors, setErrors] = useState({});

  // Countdown timer — reads persisted time from localStorage
  const [timeLeft, setTimeLeft] = useState(() => getOtpTimeLeft(email));

  // Redirect to register if no email is found in storage
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // Decrement the timer every second until it hits zero
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format seconds as "M:SS" for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Join digits array into a single OTP string for validation
  const getOtpString = () => digits.join("");

  // Validate OTP and submit for verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const otp = getOtpString();

    // Client-side schema validation (Zod)
    const result = verifyOtpSchema.safeParse({ otp });

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      // TODO: handle API call here
      await handleVerifyOtp({ email, otp });
      clearVerifyEmail();
      clearOtpData();
      navigate("/login");
    } catch (err) {
      console.error("Verification Failed: ", err);
    }
  };

  // Request a new OTP code and reset the timer
  const handleResend = async () => {
    const storedEmail = getVerifyEmail();
    // TODO: handle API call here
    await resendOtp({ email: storedEmail });
    setOtpData(storedEmail);
    setTimeLeft(300);
    // Clear boxes so the user starts fresh
    setDigits(Array(6).fill(""));
  };

  return (
    <AuthLayout
      navLinkTo="/login"
      navLinkText="Back to"
      navLinkCta="LOGIN"
    >
      <div className="w-full max-w-[420px] m-auto relative z-10">

        {/* ── Page Header ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <p className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-black/45 mb-1.5">Email Verification</p>
          <h1 className="font-display text-[60px] leading-[0.9] tracking-[-1px] uppercase text-black mb-6">Verify</h1>
        </div>

        {/* Subtext showing which email the code was sent to */}
        <p className="font-body text-[13px] font-normal text-black/70 leading-relaxed mb-6">
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
        </p>

        {/* ── OTP Form ── */}
        <form onSubmit={handleOtpSubmit} noValidate>

          {/* 6-box OTP digit row */}
          <OtpInput digits={digits} onChange={setDigits} />

          {/* OTP validation error */}
          {errors.otp && (
            <p className="field-error" style={{ marginBottom: "16px", marginTop: "-20px" }}>
              {errors.otp}
            </p>
          )}

          {/* Primary CTA button */}
          <button
            id="verify-submit-btn"
            type="submit"
            className="flex items-center justify-center w-full h-[44px] px-5 bg-accent text-black border-[1.5px] border-black rounded-none font-body text-[12px] font-bold tracking-[0.2em] uppercase cursor-pointer gap-2 transition-all duration-150 hover:bg-[#b8e800] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mb-0"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code →"}
          </button>

          {/* Backend error message */}
          {error && (
            <p className="field-error" style={{ textAlign: "center", marginTop: "12px" }}>
              {error}
            </p>
          )}
        </form>

        {/* ── Resend Row ── */}
        <div className="text-center mt-4">
          <span className="font-body text-[10px] font-normal tracking-[0.05em] text-black/45">Didn&apos;t receive it?&nbsp;</span>
          <button
            type="button"
            id="otp-resend-btn"
            className="bg-transparent border-none font-body text-[10px] font-bold tracking-[0.2em] uppercase text-black cursor-pointer underline underline-offset-[3px] p-0 transition-colors duration-150 decoration-transparent hover:not-disabled:decoration-accent disabled:opacity-35 disabled:cursor-default"
            onClick={handleResend}
            disabled={timeLeft > 0}
          >
            Resend Code
          </button>

          {/* Countdown timer — only shown while timer is active */}
          {timeLeft > 0 && (
            <p className="font-body text-[10px] font-normal tracking-[0.05em] text-black/45 mt-2">Resend in {formatTime(timeLeft)}</p>
          )}
        </div>

      </div>
    </AuthLayout>
  );
};

export default VerifyUser;
