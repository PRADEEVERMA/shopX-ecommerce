import { useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductSection = ({
  products = [],
  categories = [],
  selectedCategory = "All",
  setSelectedCategory,
  loading = false,
  error = null,
}) => {
  const activeCategory = selectedCategory || "All";

  // Get unique categories from props or fall back to products
  const dynamicCategories = useMemo(() => {
    const cats = categories.length
      ? categories
      : [
          ...new Set(
            products
              .map((p) => String(p.category || "").trim())
              .filter(Boolean),
          ),
        ];

    return ["All", ...cats.sort()];
  }, [products, categories]);

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter(
      (product) =>
        String(product.category || "")
          .trim()
          .toLowerCase() === activeCategory.trim().toLowerCase(),
    );
  }, [products, activeCategory]);

  console.log("Selected:", activeCategory);
  console.log("Products:", products);
  console.log("Filtered:", filteredProducts);

  return (
    <section id="products" className="space-y-8">
      {/* TOP SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Best Selling Products
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Top picks for your next purchase
          </h2>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap items-center gap-3">
          {dynamicCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-slate-950"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-red-600">
            Error loading products
          </p>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      ) : loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            Loading products...
          </p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            No products found
          </p>
          <p className="mt-2 text-sm text-slate-500">Try another category.</p>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
