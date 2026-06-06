import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { promoHighlights } from "../data/products";

const PromoCards = () => {
  return (
    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {promoHighlights.map((card, index) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="group relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="relative overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="h-70 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          </div>
          <div className="relative space-y-4 p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                {card.subtitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                {card.title}
              </h3>
            </div>
            <Link
              to={card.link}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Shop Now
            </Link>
          </div>
        </motion.article>
      ))}
    </section>
  );
};

export default PromoCards;
