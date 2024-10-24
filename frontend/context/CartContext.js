"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setTotal(total + product.price);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
