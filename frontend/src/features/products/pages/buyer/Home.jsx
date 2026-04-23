import { useProduct } from "../../hook/useProduct.js";
import { useEffect, useState } from "react";
import { setAllProducts } from "../../state/product.slice.js";
import { useDispatch, useSelector } from "react-redux";

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
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      {isLoading ? (
        <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-black/40">
          LOADING PRODUCTS...
        </p>
      ) : allProducts.length === 0 ? (
        <h1 className="font-display text-[60px] leading-[0.9] tracking-[-2px] uppercase text-black mb-4">
          No products found
        </h1>
      ) : (
        allProducts.map((product) => (
          <div key={product._id}>
            <p>{product.title}</p>
            <p>{product.price?.currency || "INR"} {product.price?.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
