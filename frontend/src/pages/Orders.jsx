import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders");
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="space-y-8 pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            My Orders
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Order history
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-sm text-slate-500">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <p className="text-lg font-semibold text-slate-950">
            No orders placed yet.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Complete a purchase to see it here.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-[2rem] bg-white p-6 shadow-soft"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    {order.status}
                  </p>
                </div>
                <div className="space-y-1 text-sm text-slate-500">
                  <p>
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>Total: ₹{order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
                <p>Items: {order.orderItems.length}</p>
                <Link
                  to={`/order/${order._id}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
