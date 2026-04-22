import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../../hook/useProduct";
import ProductCard from "../../../../components/seller/ProductCard";

const ViewProducts = () => {
  const { handleGetProducts } = useProduct();
  const { sellerProducts } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        await handleGetProducts();
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[400px]">
        <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-black/40">
          LOADING...
        </p>
      </div>
    );
  }

  if (!sellerProducts || sellerProducts.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center min-h-[400px] gap-2">
        <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-black/40">
          NO PRODUCTS YET
        </p>
        <p className="font-body text-[13px] font-normal text-black/50">
          Use CREATE to add your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-[40px] pb-[80px]">
      <div className="flex flex-wrap justify-center sm:justify-start gap-[24px]">
        {sellerProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
