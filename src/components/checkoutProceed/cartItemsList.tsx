'use client';

import { useCart, type CartItem } from '@/contexts/cartContext';
import { Trash, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmationModal from '../confirmationModal/confirmationModal';
import { Button } from '../ui/button';

function CartItem({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();

  return (
    <div className="group flex items-center justify-between rounded-md p-4 transition-colors hover:bg-zinc-800">
      <div className="flex items-center gap-3">
        <Image src={item.image} alt="" width={150} height={150} />
        <div className="mt-14 flex flex-col gap-4">
          <Link
            href={`/product/${item.slug}`}
            className="text-xl font-bold hover:underline"
          >
            {item.title} (<strong>{item.size}</strong>)
          </Link>
          <ConfirmationModal
            title="Remove this item from your cart"
            description={`Are you sure you want to remove ${item.title} from your cart?`}
            toastConfirmMessage="Item removed from your cart!"
            confirmButtonText="Remove"
            onConfirm={() => removeFromCart(item.id)}
          >
            <Button
              className="absolut right-10 top-10 flex w-fit gap-2 text-sm font-semibold shadow-md ring-1 ring-zinc-800 hover:bg-zinc-900 group-hover:bg-zinc-800 group-hover:ring-zinc-700"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              Remove <Trash width={18} height={18} />
            </Button>
          </ConfirmationModal>
        </div>
        <span className="text-3xl font-extrabold text-violet-500">
          {item.quantity}x
        </span>
      </div>
      <h1 className="text-3xl font-extrabold">
        {(item.price * item.quantity).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        })}
      </h1>
    </div>
  );
}

export default function CartItemsList() {
  const { cartItems, clearCart } = useCart();
  return (
    <div className="col-span-2 flex flex-col gap-6 rounded-md bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Your Cart</h1>
        <ConfirmationModal
          title="Clear your current cart"
          description="Are you sure you want to clear your current cart?"
          toastConfirmMessage="Your cart has been cleared!"
          confirmButtonText="Clear"
          onConfirm={() => clearCart()}
        >
          <Button
            className="hover:bg-violet-7 flex w-fit gap-2 bg-violet-500 text-lg font-semibold shadow-md"
            disabled={cartItems.length === 0}
          >
            Clear <X />
          </Button>
        </ConfirmationModal>
      </div>
      <div className="flex flex-col gap-2">
        {cartItems.map((item) => (
          <CartItem key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
