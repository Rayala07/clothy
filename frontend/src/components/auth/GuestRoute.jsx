import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
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

  // If the user is logged in, redirect them to the home page (or dashboard)
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If no user is logged in, allow them to view the guest routes (login, register, etc.)
  return children;
};

export default GuestRoute;
