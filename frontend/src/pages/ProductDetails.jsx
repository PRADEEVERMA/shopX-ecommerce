import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getImageSrc } from "../utils/imageMap";
import API from "../api";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-soft text-center">
        <p className="text-lg font-semibold text-slate-950">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <p className="text-lg font-semibold text-red-600">
          {error || "Product not found."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to shop
        </button>
      </div>
    );
  }

  const inWishlist = wishlist.includes(product._id || product.id);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </button>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1fr]">
          <div className="rounded-[2rem] bg-slate-100 p-6">
            <img
              src={
                getImageSrc(product.image) ||
                "https://via.placeholder.com/400?text=No+Image"
              }
              alt={product.name}
              className="h-full w-full rounded-[2rem] object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
                {product.category || "Uncategorized"}
              </p>
              <h2 className="mt-4 text-4xl font-black text-slate-950">
                {product.name}
              </h2>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                <Star className="h-4 w-4 text-orange-500" />
                <span className="font-semibold text-slate-900">
                  {product.rating || 0}
                </span>
                <span>({product.reviews || 0} reviews)</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Price</p>
                  <p className="mt-1 text-3xl font-bold text-slate-950">
                    ₹{(product.price || 0).toFixed(2)}
                  </p>
                </div>
                {product.oldPrice && (
                  <p className="text-sm text-slate-400 line-through">
                    ₹{(product.oldPrice || 0).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {product.description ||
                "Crafted for the modern shopper, this premium product combines beautiful design with exceptional performance. It is perfect for gifting or upgrading your daily routine."}
            </p>

            {product.countInStock > 0 ? (
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      ...product,
                      id: product._id || product.id,
                    })
                  }
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product._id || product.id)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-semibold transition ${
                    inWishlist
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  {inWishlist ? "In Wishlist" : "Add to wishlist"}
                </button>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-700">
                  Out of Stock
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
            Product details
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>✓ Premium trusted brand quality</li>
            <li>✓ Fast shipping across the country</li>
            <li>✓ Easy returns within 30 days</li>
            <li>✓ Secure payment processing</li>
            {product.countInStock && <li>✓ {product.countInStock} in stock</li>}
          </ul>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
            Need help?
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Contact our support team for additional questions or personalized
            assistance. We're here to help!
          </p>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetails;
