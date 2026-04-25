import { useProduct } from "../../hook/useProduct.js";
import { useEffect, useState } from "react";
import { setAllProducts } from "../../state/product.slice.js";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard.jsx";

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await handleGetAllProducts();
        if (products) {
          dispatch(setAllProducts(products));
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const allProducts = useSelector((state) => state.product.allProducts);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-black/40">
            LOADING PRODUCTS...
          </p>
        </div>
      ) : allProducts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <h1 className="font-display text-[60px] leading-[0.9] tracking-[-2px] uppercase text-black mb-4">
            No products found
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-4">
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
