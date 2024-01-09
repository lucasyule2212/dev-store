/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import { useCart } from '@/contexts/cartContext';
import { env } from '@/env';
import { useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';
import { ShoppingBag } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import Spinner from '../ui/spinner';

export default function CheckoutProceed() {
  const { cartItems } = useCart();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const cartItemsSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const hasItems = useMemo(() => {
    return cartItems.length > 0;
  }, [cartItems]);

  const redirectToCheckout = useCallback(async () => {
    setIsLoading(true);
    try {
      const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) throw new Error('Stripe failed to initialize.');

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartDetails: cartItems.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
          customerEmail: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [cartItems]);

  return (
    <div className="flex max-h-[300px] flex-col gap-6 rounded-md bg-zinc-900 p-4">
      <p className="text-2xl font-extrabold">Subtotal:</p>
      <h1 className="text-5xl font-semibold tabular-nums">
        {cartItemsSubtotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        })}
      </h1>
      {hasItems && (
        <div>
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
          <p className="text-xs text-violet-500">
            Shipping calculated at checkout
          </p>
        </div>
      )}
      <Button
        disabled={!hasItems || isLoading}
        className="mt-6 flex justify-center gap-2 justify-self-end rounded-md bg-violet-500 p-2 font-semibold text-zinc-50 hover:bg-violet-600"
        onClick={redirectToCheckout}
      >
        {isLoading ? (
          <>
            <Spinner />
            Proceeding to Checkout
          </>
        ) : (
          <>
            <ShoppingBag />
            Proceed to Checkout
          </>
        )}
      </Button>
    </div>
  );
}
