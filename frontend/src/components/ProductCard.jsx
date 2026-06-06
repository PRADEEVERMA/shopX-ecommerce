import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getImageSrc } from "../utils/imageMap";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, wishlist, toggleWishlist } = useCart();

  const productId = product._id || product.id;
  const inWishlist = wishlist.includes(productId);
  const inCart = cartItems.some(
    (item) => item._id === productId || item.id === productId,
  );

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart({
      ...product,
      id: productId,
    });
  };

  const handleToggleWishlist = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleWishlist(productId);
  };

  return (
    <motion.article
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* IMAGE BOX */}
      <div className="relative mb-5 flex h-[250px] items-center justify-center overflow-hidden rounded-[1.75rem] bg-slate-100 p-4 transition duration-500 group-hover:bg-slate-50">
        <Link
          to={`/product/${productId}`}
          className="flex h-full w-full items-center justify-center"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={
              getImageSrc(product.image) ||
              "https://via.placeholder.com/300?text=No+Image"
            }
            alt={product.name}
            className="h-full w-full rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition ${
            inWishlist
              ? "bg-orange-500 text-white"
              : "bg-white text-slate-900 hover:bg-orange-500 hover:text-white"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            {product.category || "Uncategorized"}
          </p>

          <div className="mt-3 text-lg font-bold text-slate-950 transition group-hover:text-orange-600">
            {product.name}
          </div>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Star className="h-4 w-4 text-orange-500" />

          <span className="font-semibold text-slate-900">
            {product.rating || 0}
          </span>

          <span>({product.reviews || 0})</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-slate-950">
            ₹{(product.price || 0).toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              ₹{(product.oldPrice || 0).toFixed(2)}
            </span>
          )}
        </div>

        {/* ADD TO CART */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold text-white transition ${
            inCart
              ? "bg-orange-500 hover:bg-orange-400"
              : "bg-slate-950 hover:bg-slate-800"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />

          {inCart ? "Added" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
