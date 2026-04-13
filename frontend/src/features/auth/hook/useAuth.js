import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { registerUser } from "../services/auth.service.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleRegister = async ({ fullname, email, contact, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await registerUser({ fullname, email, contact, password });
      return data;
    } catch (err) {
      dispatch(setError(err.message || "Registration Failed"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...auth,
    handleRegister,
  };
};
