import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductSection from "../components/ProductSection";
import API from "../api";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);
  const selectedCategory = categoryQuery || "All";

  // FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (categoryQuery.trim()) params.set("category", categoryQuery.trim());

        const url = `/products${params.toString() ? `?${params.toString()}` : ""}`;
        const { data } = await API.get(url, { signal: controller.signal });
        setProducts(data || []);
      } catch (err) {
        if (err.name === "CanceledError") return;
        setError(
          err.response?.data?.message ||
            "Failed to load products. Please try again.",
        );
        console.error("Error fetching products:", err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
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

  const handleCategoryChange = useCallback((category) => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (category !== "All") params.set("category", category);
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [searchQuery, categoryQuery]);

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
          setSelectedCategory={handleCategoryChange}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
};

export default Shop;
