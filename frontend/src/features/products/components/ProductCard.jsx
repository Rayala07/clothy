import { RiHeartLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleWishlist = (e) => {
    e.stopPropagation();
    console.log("Add to wishlist clicked for:", product._id);
  };

  const currency = product.price?.currency || "INR";
  const amount = product.price?.amount;

  return (
    <div
      className="
        group relative flex flex-col
        border-2 border-transparent
        overflow-hidden bg-white
        hover:border-[#CAFF00]
        transition-all duration-200 ease-in-out
        cursor-pointer
      "
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      <div className="relative w-full aspect-[4/5] bg-black/5 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]?.url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-body text-[11px] tracking-[0.2em] uppercase text-black/30">
              No Image
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-black/8" />

      {/* Info Row */}
      <div className="flex items-center justify-between px-4 py-3.5 gap-3">
        <div className="flex flex-col min-w-0">
          <p className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-black truncate">
            {product.title}
          </p>
          <p className="font-body text-[12px] font-medium text-black/45 mt-0.5">
            {currency} {amount}
          </p>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="
            flex-shrink-0 w-9 h-9 rounded-full
            border border-black/12
            bg-white
            flex items-center justify-center
            hover:border-[#CAFF00] hover:border-2
            active:bg-[#CAFF00] active:border-[#CAFF00]
            transition-all duration-250 ease-in-out
            cursor-pointer
          "
        >
          <RiHeartLine size={16} className="text-black/70" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

