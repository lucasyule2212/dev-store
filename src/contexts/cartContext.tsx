'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
interface CartItem {
  productId: number;
  quantity: number;
}
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}
const CartContext = createContext({} as CartContextProps);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');

  function addToCart(productId: number) {
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
      return [...prev, { productId, quantity: 1, size: selectedSize }];
    });
  }

  function removeFromCart(productId: number) {
    setCartItems((prev) => {
      return prev.filter((item) => item.productId !== productId);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        selectedSize,
        setSelectedSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
