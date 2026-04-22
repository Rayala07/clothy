import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "buyer" || !user.role) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "seller") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default SellerRoute;
