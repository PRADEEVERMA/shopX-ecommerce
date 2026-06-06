import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, User, Heart, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getImageSrc } from "../utils/imageMap";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "Pages", href: "/pages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartItems, cartCount, cartOpen, setCartOpen, wishlist } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/shop");
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition duration-300 ${
        scrolled ? "shadow-slate-900/8" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-slate-950"
          >
            ShopX
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `transition text-sm font-semibold ${
                    isActive
                      ? "text-slate-950 underline underline-offset-8 decoration-orange-500 decoration-2"
                      : "text-slate-600 hover:text-slate-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-slate-600 shadow-sm sm:flex"
        >
          <Search className="h-4 w-6" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="search"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </form>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
              </button>
              <span className="hidden text-sm font-semibold text-slate-900 sm:inline">
                {user.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="User account"
            >
              <User className="h-4 w-4" />
            </Link>
          )}
          <Link
            to="/wishlist"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCartOpen(!cartOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {cartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full z-20 mt-4 w-[320px] rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      Shopping Cart
                    </p>
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      className="text-slate-500 transition hover:text-slate-900"
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-4 space-y-4 max-h-64 overflow-y-auto pr-1">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={getImageSrc(item.image) || item.image}
                              alt={item.name}
                              className="h-14 w-14 rounded-3xl object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-950">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Qty {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-slate-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        Your cart is empty. Add a product to get started.
                      </p>
                    )}
                  </div>
                  <Link
                    to="/cart"
                    onClick={() => {
                      setCartOpen(false);

                      setTimeout(() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }, 100);
                    }}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View cart
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-full z-20 bg-white shadow-soft lg:hidden"
          >
            <div className="border-b border-slate-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-950">ShopX</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2 px-4 pb-8 pt-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-3xl px-4 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
              <form
                onSubmit={handleSearch}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <Search className="h-4 w-4" />
                  Search products
                </div>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  type="search"
                  placeholder="Search for products..."
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
