/**
 * OtpInput.jsx
 * A row of 6 individual digit boxes for OTP entry.
 * Handles arrow-key navigation, backspace, and auto-advance between boxes.
 *
 * Props:
 * @param {string[]} props.digits    - Array of 6 single-character strings (controlled state)
 * @param {Function} props.onChange  - Called with the updated digits array on any change
 */

import { useRef } from "react";

const OTP_LENGTH = 6;

const OtpInput = ({ digits, onChange }) => {
  // Refs to each individual input box for programmatic focus
  const inputRefs = useRef([]);

  /**
   * Focus the box at a given index safely.
   */
  const focusBox = (index) => {
    if (index >= 0 && index < OTP_LENGTH) {
      inputRefs.current[index]?.focus();
    }
  };

  /**
   * Handle digit entry — only allow single numeric character, then auto-advance.
   */
  const handleChange = (e, index) => {
    const raw = e.target.value;

    // Allow only the last typed digit (strip non-numeric)
    const digit = raw.replace(/\D/g, "").slice(-1);

    const updated = [...digits];
    updated[index] = digit;
    onChange(updated);

    // Auto-advance to next box when a digit is entered
    if (digit && index < OTP_LENGTH - 1) {
      focusBox(index + 1);
    }
  };

  /**
   * Handle Backspace to clear current box and move back.
   * Handle ArrowLeft / ArrowRight for keyboard navigation.
   */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // Clear current box
        const updated = [...digits];
        updated[index] = "";
        onChange(updated);
      } else {
        // Move to previous box
        focusBox(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusBox(index - 1);
    } else if (e.key === "ArrowRight") {
      focusBox(index + 1);
    }
  };

  /**
   * Handle paste — distribute pasted digits across boxes.
   */
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const updated = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      updated[i] = pasted[i];
    }
    onChange(updated);
    // Focus the box after the last pasted digit
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  return (
    <div className="flex gap-2.5 mb-8" role="group" aria-label="One-time password input">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          id={`otp-box-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={`flex-1 h-16 text-center font-body text-2xl font-bold text-black bg-white border-[1.5px] border-black rounded-none outline-none transition-all duration-150 focus:border-2 focus:border-black appearance-none ${digits[i] ? "bg-cream" : ""}`}
          aria-label={`Digit ${i + 1}`}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

export default OtpInput;
