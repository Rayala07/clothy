// Email of user to match OTP
export const setVerifyEmail = (email) => {
  localStorage.setItem("verifyEmail", email);
};

export const getVerifyEmail = () => {
  return localStorage.getItem("verifyEmail");
};

export const clearVerifyEmail = () => {
  localStorage.removeItem("verifyEmail");
};

// Save OTP Expiry time per user, via their email
export const setOtpData = (email) => {
  const otpData = {
    email,
    expiry: Date.now() + 5 * 60 * 1000,
  };

  localStorage.setItem("otp_data", JSON.stringify(otpData));
};

// Get remaining time: Beneficial when user refreshes the website
export const getOtpTimeLeft = (currentEmail) => {
  const data = JSON.parse(localStorage.getItem("otp_data"));

  if (!data) return 0;

  if (data.email !== currentEmail) {
    return 0;
  }

  const remainingTime = Math.floor((data.expiry - Date.now()) / 1000);

  return remainingTime > 0 ? remainingTime : 0;
};

// Clear OTP data, after successfull submit or for new timer set
export const clearOtpData = () => {
  localStorage.removeItem("otp_data");
};
