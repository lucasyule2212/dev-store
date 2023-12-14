'use client';
import { useCart } from '@/contexts/cartContext';
import { ShoppingBag } from 'lucide-react';

export default function CartDisplay() {
  const { cartItems } = useCart();
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <span className="text-sm">Cart: ({cartItems.length})</span>
    </div>
  );
}
