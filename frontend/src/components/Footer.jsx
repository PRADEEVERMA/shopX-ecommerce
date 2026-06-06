import { Gift, Shield, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const footerData = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% safe & secure checkout every time.",
  },
  {
    icon: Gift,
    title: "Free Shipping",
    description: "On all orders over ₹50 with fast delivery.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are always here to help you.",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-[1300px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {footerData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[2rem] bg-white/5 p-8 shadow-sm backdrop-blur-xl"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-sm text-slate-400 sm:grid-cols-[1.5fr_1fr] sm:items-center sm:px-8">
          <div>
            <p>
              Enjoy a premium shopping experience with ShopX, designed for
              modern retailers and online buyers.
            </p>
          </div>
          <div className="grid gap-3 sm:justify-end">
            <Link to="/shop" className="transition hover:text-white">
              Shop
            </Link>
            <Link to="/wishlist" className="transition hover:text-white">
              Wishlist
            </Link>
            <Link to="/cart" className="transition hover:text-white">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
