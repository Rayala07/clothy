import { useProduct } from "../../hook/useProduct.js";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowLeftLine } from "@remixicon/react";

const BuyerProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedSize, setSelectedSize]   = useState("L");
  const [selectedColor, setSelectedColor] = useState("Black");

  const { handleGetProductDetails } = useProduct();

  useEffect(() => {
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
    fetchProductDetails();
  }, [productId]);

  // ── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-screen bg-cream flex items-center justify-center">
        <p className="font-body text-[12px] font-bold tracking-[0.2em] uppercase text-black animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  // ── Not found ──────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="h-screen bg-cream flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-[64px] uppercase text-black leading-none m-0">Not Found</h1>
        <Link
          to="/"
          className="font-body text-[12px] font-bold tracking-[0.2em] uppercase text-black underline underline-offset-4"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const currency = product.price?.currency || "INR";
  const amount   = product.price?.amount   || 0;
  const images   = product.images || [];
  const hasImages = images.length > 0;

  // Dummy selector data
  const sizes  = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Olive", "Neon"];

  // Carousel navigation
  const goNext = () => setActiveIdx((i) => (i + 1) % (images.length || 1));
  const goPrev = () => setActiveIdx((i) => (i - 1 + (images.length || 1)) % (images.length || 1));

  return (
    <div className="h-screen bg-cream text-black flex flex-col overflow-hidden selection:bg-accent selection:text-black">
      {/* ── Body: two-column split ─────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* ─── LEFT COLUMN: Fixed image carousel ─────────────── */}
        <div className="flex-shrink-0 w-full md:w-[45%] lg:w-[42%] flex flex-col border-r-[1.5px] border-black overflow-hidden">

          {/* Main Image Area — takes all remaining left-column height */}
          <div className="flex-1 relative overflow-hidden bg-black/5 group min-h-0">
            {hasImages ? (
              <img
                key={activeIdx}
                src={images[activeIdx]?.url}
                alt={`${product.title} — image ${activeIdx + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black/30">
                  No Images
                </p>
              </div>
            )}

            {/* Prev / Next arrows — visible on hover */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-cream border-[1.5px] border-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent cursor-pointer"
                >
                  <RiArrowLeftSLine size={22} />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-cream border-[1.5px] border-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent cursor-pointer"
                >
                  <RiArrowRightSLine size={22} />
                </button>
              </>
            )}

            {/* Image counter badge */}
            {images.length > 1 && (
              <span className="absolute bottom-3 right-3 font-body text-[10px] font-bold tracking-[0.15em] uppercase bg-cream border-[1.5px] border-black px-2 py-0.5">
                {activeIdx + 1} / {images.length}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="shrink-0 flex border-t-[1.5px] border-black h-[90px]">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`flex-1 h-full overflow-hidden border-r-[1.5px] border-black last:border-r-0 cursor-pointer transition-all duration-150 ${
                    idx === activeIdx
                      ? "ring-2 ring-inset ring-accent"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── RIGHT COLUMN: Independently scrollable details ─── */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 flex flex-col gap-10 min-h-0">

          {/* Title & Price */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">
              {/* Category placeholder — connect when available */}
              Streetwear
            </p>
            <h1 className="font-display text-[52px] md:text-[68px] lg:text-[80px] leading-[0.88] tracking-[-0.02em] uppercase text-black break-words">
              {product.title}
            </h1>
            <p className="font-body text-[22px] font-medium tracking-[0.04em] text-black mt-2">
              {currency} {amount.toLocaleString()}
            </p>
          </div>

          {/* Divider */}
          <div className="h-[1.5px] bg-black" />

          {/* Size Selector */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black">
                Size
              </h3>
              <button className="font-body text-[10px] uppercase tracking-[0.1em] text-black/50 hover:text-black underline underline-offset-2 cursor-pointer transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 min-w-[2.75rem] px-4 font-body text-[12px] font-bold uppercase border-[1.5px] cursor-pointer transition-colors duration-150 ${
                    selectedSize === size
                      ? "border-black bg-accent text-black"
                      : "border-black/20 bg-transparent text-black/55 hover:border-black hover:text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black">
              Color — <span className="text-black/50 font-medium normal-case tracking-normal">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-11 px-5 font-body text-[12px] font-bold uppercase border-[1.5px] cursor-pointer transition-colors duration-150 ${
                    selectedColor === color
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-transparent text-black/55 hover:border-black hover:text-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-black" />
          {/* CTAs */}
          <div className="flex flex-col gap-3 pb-6">
            <button className="w-full h-14 flex items-center justify-center bg-accent border-[1.5px] border-black font-body text-[12px] font-bold tracking-[0.2em] uppercase text-black cursor-pointer transition-transform duration-150 active:scale-[0.99] hover:bg-[#b8e800]">
              Add to Cart
            </button>
            <button className="w-full h-14 flex items-center justify-center bg-black border-[1.5px] border-black font-body text-[12px] font-bold tracking-[0.2em] uppercase text-white cursor-pointer transition-transform duration-150 active:scale-[0.99] hover:bg-black/85">
              Buy It Now
            </button>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-black" />

          {/* Description */}
          <div className="flex flex-col gap-3">
            <h3 className="font-body text-[11px] font-bold tracking-[0.2em] uppercase text-black">
              Product Details
            </h3>
            <p className="font-body text-[14px] leading-relaxed text-black/75 whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuyerProductDetails;