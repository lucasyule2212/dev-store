'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
interface CartItem {
  productId: string;
  quantity: number;
}
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}
const CartContext = createContext({} as CartContextProps);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(productId: string) {
    setCartItems((prev) => {
      const existingCartItem = prev.find(
        (item) => item.productId === productId,
      );
      if (existingCartItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCartItems((prev) => {
      const existingCartItem = prev.find(
        (item) => item.productId === productId,
      );
      if (existingCartItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
