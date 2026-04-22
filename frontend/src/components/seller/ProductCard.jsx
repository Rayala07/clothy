import { useProduct } from "../../features/products/hook/useProduct";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white border border-black rounded-none overflow-hidden w-[280px] h-auto min-h-[120px] shrink-0">
      <div className="p-4 flex-1 flex flex-col justify-center">
        <h3 className="text-[13px] uppercase tracking-[2px] font-bold text-black truncate mb-1" title={product.title}>
          {product.title}
        </h3>
        <p className="text-[13px] font-normal text-black opacity-70">
          {product.price?.currency || "INR"} {product.price?.amount || 0}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full h-[36px] border-t border-black">
        <button
          type="button"
          className="flex-1 bg-white text-black font-body text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:bg-cream border-r border-black cursor-pointer"
        >
          VIEW DETAILS
        </button>
        <button
          type="button"
          className="flex-1 bg-black text-white font-body text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:bg-black/90"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
