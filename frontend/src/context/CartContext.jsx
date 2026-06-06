import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // LOAD CART FROM LOCAL STORAGE
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // LOAD WISHLIST FROM LOCAL STORAGE
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // CART SIDEBAR OPEN/CLOSE
  const [cartOpen, setCartOpen] = useState(false);

  // SAVE CART TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // SAVE WISHLIST TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ADD TO CART
  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      // IF PRODUCT ALREADY EXISTS
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // NEW PRODUCT
      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // OPEN CART SIDEBAR
    setCartOpen(true);
  };

  // UPDATE PRODUCT QUANTITY
  const updateQuantity = (productId, quantity) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(1, quantity),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // REMOVE PRODUCT FROM CART
  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  // ADD/REMOVE WISHLIST
  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  // CLEAR ENTIRE CART
  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem("cartItems");
  };

  // TOTAL CART ITEMS COUNT
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // CONTEXT VALUE
  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      wishlist,
      cartOpen,

      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,

      setCartOpen,
      clearCart,
    }),
    [cartItems, cartCount, cartTotal, wishlist, cartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// CUSTOM HOOK
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
