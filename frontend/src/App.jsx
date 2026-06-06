import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import CartDrawer from "./components/CartDrawer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <CartDrawer />
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
