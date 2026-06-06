import { motion } from "framer-motion";
import { heroImage } from "../data/products";

const features = [
  { label: "Free Shipping", detail: "On orders over ₹50" },
  { label: "Easy Returns", detail: "30-day returns" },
  { label: "Secure Payment", detail: "100% secure" },
];

const HeroSection = ({ onShopNow, onViewCollection }) => {
  return (
    <section className="overflow-hidden rounded-[2.2rem] bg-[#f6e2d4] p-7 shadow-sm">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-flex rounded-full bg-[#f9e8dc] px-5 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">
            Premium Collection
          </span>

          <h1 className="mt-5 text-[68px] font-black leading-[0.95] tracking-[-2px] text-[#07051f]">
            Big Savings on
            <br />
            <span className="text-orange-500">Top Brands</span>
          </h1>

          <p className="mt-6 max-w-xl text-[18px] leading-8 text-slate-600">
            Discover the best deals on electronics, fashion, home essentials &
            more.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onShopNow}
              className="rounded-full bg-[#12090a] px-8 py-4 text-lg font-semibold text-white transition hover:bg-black"
            >
              Shop Now →
            </button>

            <button
              onClick={onViewCollection}
              className="rounded-full border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              View Collection
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-10 flex flex-wrap gap-10">
            {features.map((feature) => (
              <div key={feature.label}>
                <p className="text-[17px] font-semibold text-[#07051f]">
                  {feature.label}
                </p>

                <p className="mt-1 text-[15px] text-slate-500">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* CAMERA INSIDE BANNER */}
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={heroImage}
              alt="Hero"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
