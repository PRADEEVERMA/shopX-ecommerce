import { useMemo, useRef, useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Sidebar from "../components/Sidebar";
import PromoCards from "../components/PromoCards";
import ProductSection from "../components/ProductSection";
import API from "../api";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);
  const promoRef = useRef(null);

  // FETCH PRODUCTS FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await API.get("/products");
        setProducts(data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPromo = () => {
    promoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Get unique, sanitized categories from products
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => String(product.category || "").trim())
          .filter(Boolean),
      ),
    ].sort();
  }, [products]);

  console.log("Selected:", selectedCategory);
  console.log("Products:", products);

  return (
    <div className="space-y-10">
      <section className="grid items-start gap-4 lg:grid-cols-[3fr_1fr]">
        <HeroSection
          onShopNow={scrollToProducts}
          onViewCollection={scrollToPromo}
        />
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => {
            setSelectedCategory(category);

            productsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
      </section>

      <section ref={promoRef} className="space-y-10">
        <PromoCards />
        <section ref={productsRef}>
          <ProductSection
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loading={loading}
            error={error}
          />
        </section>
      </section>
    </div>
  );
};

export default Home;
