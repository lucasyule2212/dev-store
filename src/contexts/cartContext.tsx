'use client';
import { type Product } from '@/data/types/product';
import { createContext, useContext, useState, type ReactNode } from 'react';
export interface CartItem extends Product {
  quantity: number;
  size: string;
}
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  selectedQuantity: number;
  setSelectedQuantity: React.Dispatch<React.SetStateAction<number>>;
  clearCart: () => void;
}
const CartContext = createContext({} as CartContextProps);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const productAlreadyInCart = prev.find(
        (item) => item.id === product.id && item.size === selectedSize,
      );

      if (productAlreadyInCart) {
        return prev.map((item) => {
          if (item.id === product.id && item.size === selectedSize) {
            return {
              ...item,
              quantity: item.quantity + selectedQuantity,
            };
          }
          return item;
        });
      }

      return [
        ...prev,
        { ...product, quantity: selectedQuantity, size: selectedSize },
      ];
    });
  }

  function removeFromCart(productId: number) {
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== productId);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        selectedSize,
        setSelectedSize,
        selectedQuantity,
        setSelectedQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
