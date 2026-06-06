import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    setOrderId(searchParams.get("orderId"));
  }, [searchParams]);

  return (
    <section className="space-y-8 pt-10">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
          Payment successful
        </p>
        <h1 className="mt-4 text-4xl font-black text-slate-950">
          Your order is confirmed
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-500">
          Thank you for your purchase. We are processing your order now and will
          update you with shipping information shortly.
        </p>
        {orderId && (
          <p className="mt-4 text-sm text-slate-700">Order ID: {orderId}</p>
        )}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/orders"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View orders
          </Link>
          <Link
            to="/shop"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
