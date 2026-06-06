import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductSection from "../components/ProductSection";
import API from "../api";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);

  // FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "/products";
        if (searchQuery) {
          url += `?search=${encodeURIComponent(searchQuery)}`;
        }
        const { data } = await API.get(url);
        setProducts(data || []);
        console.log("Shop products:", data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load products. Please try again.",
        );
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, categoryQuery]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => String(product.category || "").trim())
          .filter(Boolean),
      ),
    ].sort();
  }, [products]);

  // CATEGORY FILTER
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else if (searchQuery === "electronics") {
      setSelectedCategory("Electronics");
    } else if (searchQuery === "fashion") {
      setSelectedCategory("Fashion");
    } else if (searchQuery === "home-kitchen") {
      setSelectedCategory("Home & Kitchen");
    } else if (searchQuery === "beauty") {
      setSelectedCategory("Beauty & Health");
    } else if (searchQuery === "sports") {
      setSelectedCategory("Sports");
    } else {
      setSelectedCategory("All");
    }

    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [searchQuery, categoryQuery]);

  console.log("Selected:", selectedCategory);
  console.log("Products:", products);
  console.log("Categories:", categories);

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Shop
          </p>

          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Browse our top categories
          </h1>
        </div>

        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Explore featured collections and discover the perfect product for your
          lifestyle.
        </p>
      </div>

      <div ref={productsRef}>
        <ProductSection
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
};

export default Shop;
