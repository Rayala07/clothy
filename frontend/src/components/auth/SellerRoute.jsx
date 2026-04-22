import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerRoute = ({ children }) => {
  const { user, isAuthLoading } = useSelector((state) => state.auth);

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-black/40">
          VERIFYING SESSION...
        </p>
      </div>
    );
  }

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
