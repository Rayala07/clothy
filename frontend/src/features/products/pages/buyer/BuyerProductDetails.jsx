import { useProduct } from "../../hook/useProduct.js";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";

const BuyerProductDetails = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("L");
    const [selectedColor, setSelectedColor] = useState("Black");
    const [loading, setLoading] = useState(true);

    const {handleGetProductDetails} = useProduct();

    async function fetchProductDetails() {
      setLoading(true);
      try {
        const data = await handleGetProductDetails(productId);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchProductDetails();
    }, [productId]);

    if (loading) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center">
           <p className="font-body text-[12px] font-bold tracking-[0.2em] uppercase text-black animate-pulse">Loading...</p>
        </div>
      );
    }

    if (!product) {
      return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
           <h1 className="font-display text-[64px] uppercase text-black leading-none m-0">Not Found</h1>
           <Link to="/" className="font-body text-[12px] font-bold tracking-[0.2em] uppercase text-black underline underline-offset-4">Return to Store</Link>
        </div>
      );
    }

    const currency = product.price?.currency || "INR";
    const amount = product.price?.amount || 0;
    
    // Dummy Data
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const colors = ["Black", "White", "Neon"];

    return (
      <div className="min-h-screen bg-cream text-black selection:bg-accent selection:text-black">
        {/* ── Navigation ── */}
        <nav className="flex items-center justify-between px-6 md:px-12 h-16 border-b-[1.5px] border-black bg-cream sticky top-0 z-50">
           <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
                 <RiArrowLeftLine size={20} />
                 <span className="font-body text-[11px] font-bold tracking-[0.2em] uppercase hidden md:inline">Back</span>
              </Link>
           </div>
           {/* Center Logo */}
           <Link to="/" className="font-body font-bold text-xl tracking-[0.2em] uppercase text-black absolute left-1/2 -translate-x-1/2">
             CLOTHY
           </Link>
           <div className="flex items-center gap-6">
              <button className="font-body text-[11px] font-bold tracking-[0.2em] uppercase hover:underline underline-offset-4 cursor-pointer">Cart [0]</button>
           </div>
        </nav>

        {/* ── Main Product Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b-[1.5px] border-black min-h-[calc(100vh-64px)]">
          
          {/* Left Column: Image Gallery */}
          <div className="border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black flex flex-col">
             {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <div key={idx} className="w-full aspect-[4/5] border-b-[1.5px] border-black last:border-b-0 bg-black/5 flex items-center justify-center">
                     <img src={img.url} alt={`${product.title} - View ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
             ) : (
                <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-black/5">
                   <p className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black/40">No Images Available</p>
                </div>
             )}
          </div>

          {/* Right Column: Product Details (Sticky on Desktop) */}
          <div className="relative">
             <div className="md:sticky md:top-16 p-6 md:p-12 lg:p-16 flex flex-col gap-10">
                
                {/* Title & Price */}
                <div className="flex flex-col gap-4">
                   <h1 className="font-display text-[48px] md:text-[72px] lg:text-[84px] leading-[0.85] tracking-[-0.02em] uppercase text-black break-words">
                     {product.title}
                   </h1>
                   <p className="font-body text-2xl font-medium tracking-[0.05em] text-black">
                     {currency} {amount.toLocaleString()}
                   </p>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-3">
                   <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black">Details</h3>
                   <p className="font-body text-[14px] leading-relaxed text-black/80 whitespace-pre-wrap">
                     {product.description}
                   </p>
                </div>

                {/* Size Selector (Dummy) */}
                <div className="flex flex-col gap-4">
                   <div className="flex items-center justify-between">
                     <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black">Size</h3>
                     <button className="font-body text-[10px] uppercase tracking-[0.1em] text-black/50 hover:text-black underline underline-offset-2 cursor-pointer">Size Guide</button>
                   </div>
                   <div className="flex flex-wrap gap-3">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-12 min-w-[3rem] px-4 font-body text-[13px] font-bold uppercase border-[1.5px] cursor-pointer transition-colors duration-150 ${
                            selectedSize === size 
                            ? "border-black bg-accent text-black" 
                            : "border-black/20 bg-transparent text-black/60 hover:border-black hover:text-black"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Color Selector (Dummy) */}
                <div className="flex flex-col gap-4">
                   <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black">Color</h3>
                   <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`h-12 px-5 font-body text-[13px] font-bold uppercase border-[1.5px] cursor-pointer transition-colors duration-150 ${
                            selectedColor === color 
                            ? "border-black bg-black text-white" 
                            : "border-black/20 bg-transparent text-black/60 hover:border-black hover:text-black"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-4">
                   <button className="w-full h-[60px] flex items-center justify-center bg-accent border-[1.5px] border-black font-body text-[13px] font-bold tracking-[0.2em] uppercase text-black cursor-pointer transition-transform duration-150 active:scale-[0.98] hover:bg-[#b8e800]">
                     Add to Cart
                   </button>
                   <button className="w-full h-[60px] flex items-center justify-center bg-black border-[1.5px] border-black font-body text-[13px] font-bold tracking-[0.2em] uppercase text-white cursor-pointer transition-transform duration-150 active:scale-[0.98] hover:bg-black/90">
                     Buy It Now
                   </button>
                </div>

             </div>
          </div>
        </div>
      </div>
    );
};

export default BuyerProductDetails;