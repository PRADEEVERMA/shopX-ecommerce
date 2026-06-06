import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getImageSrc } from "../utils/imageMap";
import API from "../api";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  return (
    <section className="space-y-8 pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Order details
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Order #{orderId?.slice(-6)}
          </h1>
        </div>
        <Link
          to="/orders"
          className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Back to orders
        </Link>
      </div>

      {loading ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-sm text-slate-500">Loading order...</p>
        </div>
      ) : error ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-950">Shipping Address</p>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950">Payment</p>
                <p>{order.paymentMethod}</p>
                <p>Status: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-lg font-semibold text-slate-950">Items</p>
              {order.orderItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 p-4"
                >
                  <img
                    src={getImageSrc(item.image) || item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-[1.5rem] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-950">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-[2rem] bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
              Summary
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>₹{order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-slate-950">
                <span>Total</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default OrderDetails;
