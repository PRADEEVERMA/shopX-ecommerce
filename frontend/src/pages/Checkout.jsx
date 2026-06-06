import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import API from "../api";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const shippingPrice = 9.99;
  const totalPrice = cartTotal + shippingPrice;
  const itemsPrice = cartTotal;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayNow = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      setLoading(false);
      return;
    }

    if (Object.values(shippingAddress).some((value) => !value)) {
      setMessage("Please complete all shipping fields.");
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await API.post("/payments/create-order", {
        amount: totalPrice,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "ShopX",
        description: "Complete your order payment",
        order_id: order.id,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        handler: async (response) => {
          try {
            await API.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const orderPayload = {
              orderItems: cartItems.map((item) => ({
                product: item._id || item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
              })),
              shippingAddress,
              itemsPrice,
              shippingPrice,
              totalPrice,
              paymentMethod: "Razorpay",
              paymentResult: {
                id: response.razorpay_payment_id,
                status: "Paid",
                update_time: new Date().toISOString(),
                email_address: user?.email,
              },
            };

            const { data: createdOrder } = await API.post(
              "/orders",
              orderPayload,
            );
            clearCart();
            navigate(`/order-success?orderId=${createdOrder._id}`);
          } catch (verifyError) {
            setMessage(
              verifyError.response?.data?.message ||
                "Payment verification failed.",
            );
          }
        },
        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8 pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Checkout
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Complete your order
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
        <form
          onSubmit={handlePayNow}
          className="rounded-[2rem] bg-white p-8 shadow-soft"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <input
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleChange}
                className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Address
              </label>
              <input
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  City
                </label>
                <input
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  State
                </label>
                <input
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Postal code
                </label>
                <input
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Country
                </label>
                <input
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Phone number
              </label>
              <input
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="mt-3 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-[1.75rem] bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Processing payment..."
              : `Pay ₹${totalPrice.toFixed(2)}`}
          </button>

          {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
        </form>

        <aside className="rounded-[2rem] bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
            Order summary
          </p>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>₹{shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-slate-950">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            {cartItems.length} item{cartItems.length !== 1 && "s"} in cart.
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
