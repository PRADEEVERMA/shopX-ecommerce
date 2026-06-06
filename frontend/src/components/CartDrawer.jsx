import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageSrc } from "../utils/imageMap";

const CartDrawer = () => {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity } =
    useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed right-0 top-0 z-[9999] h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl"
          >
            {/* HEADER */}
            <div className="sticky top-0 z-20 border-b border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-950">
                  Shopping Cart
                </h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-4 p-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    {/* IMAGE */}
                    <img
                      src={getImageSrc(item.image) || item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        ₹{item.price.toFixed(2)} each
                      </p>

                      {/* QUANTITY CONTROLS */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs font-semibold text-slate-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300"
                        >
                          +
                        </button>

                        {/* TOTAL PRICE */}
                        <span className="ml-auto text-sm font-semibold text-slate-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 transition hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="space-y-4 text-center py-8">
                  <p className="text-slate-500">Your cart is empty</p>
                  <Link
                    to="/shop"
                    onClick={() => setCartOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (
              <div className="sticky bottom-0 border-t border-slate-200 bg-white p-6 space-y-4">
                {/* TOTAL */}
                <div className="flex items-center justify-between pb-4">
                  <span className="font-semibold text-slate-900">Subtotal</span>
                  <span className="text-xl font-bold text-slate-950">
                    ₹
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>

                {/* CHECKOUT BUTTON */}
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
                >
                  Checkout
                  <ChevronRight className="h-4 w-4" />
                </Link>

                {/* VIEW CART LINK */}
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="flex w-full items-center justify-center rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
