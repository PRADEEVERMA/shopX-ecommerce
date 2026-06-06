import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-[1300px] flex-col gap-2 px-4 py-3 text-[11px] uppercase tracking-[0.3em] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-semibold text-white">
          Free Shipping on all orders over  ₹500
        </p>
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <Link to="/shop?track=order" className="transition hover:text-white">
            Track Order
          </Link>
          <Link to="/shop?help=support" className="transition hover:text-white">
            Help & Support
          </Link>
          <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] uppercase tracking-[0.3em] transition hover:border-orange-500 hover:text-white">
            English | INDIA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
