import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const getCartTotal = () => {
    let total = 0;

    Object.keys(cart).map((id) => {
      total += cart[id].price * cart[id].qty;
    });
    return total;
  };
  return (
    <CartContext.Provider value={{ cart, setCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
