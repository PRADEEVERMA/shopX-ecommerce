import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageSrc } from "../utils/imageMap";
import API from "../api";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (wishlist.length === 0) {
        setWishlistItems([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data: products } = await API.get("/products");
        const items = products.filter((product) =>
          wishlist.includes(product._id || product.id),
        );
        setWishlistItems(items);
      } catch (err) {
        setError("Failed to load wishlist items");
        console.error("Error fetching wishlist items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [wishlist]);

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      id: item._id || item.id,
    });
  };

  const handleRemove = (productId) => {
    toggleWishlist(productId);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Wishlist
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Your saved favorites
          </h1>
        </div>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Save the products you love and move them to cart whenever you are
          ready.
        </p>
      </div>

      {loading && (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-lg font-semibold text-slate-950">Loading...</p>
        </div>
      )}

      {error && (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && wishlistItems.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-lg font-semibold text-slate-950">
            No items in wishlist yet.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Browse the shop and add products to your wishlist.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {wishlistItems.map((item) => (
            <div
              key={item._id || item.id}
              className="rounded-[2rem] bg-white p-6 shadow-soft"
            >
              <div className="flex items-start gap-4">
                <img
                  src={
                    getImageSrc(item.image) ||
                    item.image ||
                    "https://via.placeholder.com/112?text=No+Image"
                  }
                  alt={item.name}
                  className="h-28 w-28 rounded-[1.75rem] object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-950">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.category || "Uncategorized"}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="font-semibold text-slate-900">
                      ₹{(item.price || 0).toFixed(2)}
                    </span>
                    {item.oldPrice && (
                      <span className="line-through">
                        ₹{(item.oldPrice || 0).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => handleRemove(item._id || item.id)}
                  className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:bg-orange-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
