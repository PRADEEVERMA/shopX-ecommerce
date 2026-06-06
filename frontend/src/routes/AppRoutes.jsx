import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Categories from "../pages/Categories";
import Deals from "../pages/Deals";
import Pages from "../pages/Pages";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import ProtectedRoute from "../components/ProtectedRoute";

const Layout = () => (
  <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">
    <TopBar />
    <Navbar />
    <main className="mx-auto w-full max-w-[1700px] px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="categories" element={<Categories />} />
      <Route path="deals" element={<Deals />} />
      <Route path="pages" element={<Pages />} />
      <Route path="blog" element={<Blog />} />
      <Route path="contact" element={<Contact />} />
      <Route path="product/:productId" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders/:orderId"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
