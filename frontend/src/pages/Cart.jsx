import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageSrc } from "../utils/imageMap";

const Cart = () => {
  const { cartItems, clearCart, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="space-y-8 pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Cart
          </p>

          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Your shopping bag
          </h1>
        </div>

        <div className="text-sm text-slate-500">
          {cartItems.length} item{cartItems.length !== 1 && "s"} added
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-lg font-semibold text-slate-950">
            Your cart is empty.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Browse products and add items to your cart.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-[2rem] bg-white p-5 shadow-soft"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={getImageSrc(item.image) || item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-[1.75rem] object-cover"
                    />

                    <div>
                      <p className="text-lg font-semibold text-slate-950">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      -
                    </button>

                    <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-950">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 text-sm text-slate-500">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-4 rounded-[2rem] bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
              Order summary
            </p>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>₹9.99</span>
              </div>

              <div className="flex items-center justify-between font-semibold text-slate-950">
                <span>Total</span>
                <span>₹{(total + 9.99).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Clear cart
            </button>

            <button className="w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
              Checkout now
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
