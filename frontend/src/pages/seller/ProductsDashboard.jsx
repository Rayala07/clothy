import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hook/useAuth";
import { RiUserLine } from "@remixicon/react";

const ProductsDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, handleLogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    await handleLogoutUser();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-cream flex flex-col relative w-full">
      <nav className="flex items-center justify-between px-12 h-16 shrink-0 z-50 border-b border-black bg-cream">
        <div className="flex-1">
          <Link to="/" className="font-body font-bold text-lg tracking-[0.2em] uppercase text-black">
            CL
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center gap-8">
          <Link to="/" className="font-body text-[12px] font-semibold tracking-[0.25em] uppercase text-black/50 hover:text-black transition-colors">
            Home
          </Link>
          <div className="relative flex flex-col items-center justify-center">
            <Link 
              to="/dashboard"
              className="font-body text-[12px] font-bold tracking-[0.25em] uppercase text-black cursor-pointer bg-transparent border-none outline-none"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-end relative" ref={dropdownRef}>
          <button 
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full border-[1.5px] border-black flex items-center justify-center bg-white hover:bg-black/5 transition-colors overflow-hidden cursor-pointer outline-none"
          >
            {user?.displayImage && !user.displayImage.includes("default_profile.jpg") ? (
              <img src={user.displayImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <RiUserLine size={20} className="text-black" />
            )}
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 mt-2 bg-white border border-black min-w-[140px] shadow-sm z-50">
              <button 
                type="button" 
                onClick={onLogout}
                className="w-full text-center px-4 py-3 font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
               >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto flex flex-col p-6 w-full max-w-[1240px] mx-auto relative z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ProductsDashboard;
