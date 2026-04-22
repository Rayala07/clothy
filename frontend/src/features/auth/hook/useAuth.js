import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  setIsAuthLoading,
} from "../state/auth.slice.js";
import {
  loginUser,
  registerUser,
  resendOtp,
  verifyOtp,
  logoutUser,
  getMe,
} from "../services/auth.service.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Accepts composed payload: { fullname, email, contact, password, role }
  // fullname is composed from firstName + lastName in the Register page before calling this
  const handleRegister = async ({
    fullname,
    email,
    contact,
    password,
    role,
  }) => {
    try {
      dispatch(setLoading(true));
      const data = await registerUser({
        fullname,
        email,
        contact,
        password,
        role,
      });
      return data;
    } catch (err) {
      dispatch(setError(err.message || "Registration Failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerifyOtp = async ({ email, otp }) => {
    try {
      dispatch(setLoading(true));
      const data = await verifyOtp({ email, otp });
      return data;
    } catch (err) {
      dispatch(setError(err.message || "OTP Verification Failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendOtp = async ({ email }) => {
    try {
      dispatch(setLoading(true));
      const data = await resendOtp({ email });
      return data;
    } catch (err) {
      dispatch(setError(err.message || "Resend OTP Failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLoginUser = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await loginUser({ email, password });
      // Store user (including role) into Redux state so SellerRoute can read it
      if (data.user) dispatch(setUser(data.user));
      return data.user;
    } catch (err) {
      dispatch(setError(err.message || "Login Failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      if (data) dispatch(setUser(data.user));
      return data.user;
    } catch (err) {
      dispatch(setError(err.message || "Get Me Failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
      dispatch(setIsAuthLoading(false));
    }
  };

  const handleLogoutUser = async () => {
    try {
      dispatch(setLoading(true));
      await logoutUser();
      dispatch(setUser(null));
    } catch (err) {
      console.error("Logout error", err);
      // We still clear the local user state even if the server fails, for security/reset purposes
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...auth,
    handleRegister,
    handleVerifyOtp,
    handleResendOtp,
    handleLoginUser,
    handleLogoutUser,
    handleGetMe,
  };
};
