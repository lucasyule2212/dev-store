'use client';

import { useCart } from '@/contexts/cartContext';
import { ShoppingBag } from 'lucide-react';
import { useMemo } from 'react';

export default function CheckoutProceed() {
  const { cartItems } = useCart();

  const cartItemsSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const hasItems = useMemo(() => {
    return cartItems.length > 0;
  }, [cartItems]);

  return (
    <div className="flex flex-col gap-6 rounded-md bg-zinc-900 p-4">
      <p className="text-2xl font-extrabold">Subtotal:</p>
      <h1 className="text-5xl font-semibold tabular-nums">
        {cartItemsSubtotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        })}
      </h1>
      <div>
        {hasItems && (
          <p className=" flex items-center gap-2 font-semibold text-zinc-300">
            12x of{' '}
            <span className="font-semibold text-violet-500">
              {(cartItemsSubtotal / 12).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
              })}
            </span>{' '}
            without interest
          </p>
        )}

        <p className="text-xs text-violet-500">
          Shipping calculated at checkout
        </p>
      </div>
      <button className="mt-6 flex justify-center gap-2 rounded-md bg-violet-500 p-2 font-semibold text-zinc-50 hover:bg-violet-600">
        <ShoppingBag /> Proceed to Checkout
      </button>
    </div>
  );
}
