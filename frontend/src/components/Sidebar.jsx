import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // HERO KE BARABAR
      className="h-[520px] rounded-[2rem] bg-white p-5 shadow-lg"
    >
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-orange-600">
            All Categories
          </p>

          {/* SIZE CHHOTA */}
          <h2 className="mt-1 text-[24px] font-black leading-tight text-slate-950">
            Browse Collections
          </h2>
        </div>

        <ChevronsRight className="h-5 w-5 text-slate-400" />
      </div>

      {/* CATEGORYS */}
      <div className="space-y-2">
        {["All", ...categories].map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelectedCategory(label)}
            className={`flex w-full items-center justify-between rounded-[1.3rem] border px-4 py-3 text-left text-[14px] font-medium transition ${
              selectedCategory === label
                ? "border-orange-500 bg-orange-50 text-slate-950"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-300"
            }`}
          >
            <span>{label}</span>

            <span
              className={
                selectedCategory === label
                  ? "text-orange-500"
                  : "text-slate-400"
              }
            >
              ›
            </span>
          </button>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
