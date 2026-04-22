import { useNavigate } from "react-router-dom";

const DashboardLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[450px] gap-6">
      <button 
        type="button"
        onClick={() => navigate("/dashboard/create")}
        className="w-64 h-[50px] bg-accent text-black border-[1.5px] border-black rounded-none font-body text-[12px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#b8e800] active:scale-[0.99] cursor-pointer outline-none"
      >
        List Product →
      </button>
      <button 
        type="button"
        onClick={() => navigate("/dashboard/view")}
        className="w-64 h-[50px] bg-white text-black border-[1.5px] border-black rounded-none font-body text-[12px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-cream active:scale-[0.99] cursor-pointer outline-none"
      >
        View All Products →
      </button>
    </div>
  );
};

export default DashboardLanding;
