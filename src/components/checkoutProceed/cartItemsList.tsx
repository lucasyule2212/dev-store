'use client';

import { useCart, type CartItem } from '@/contexts/cartContext';
import Image from 'next/image';
import Link from 'next/link';

function CartItem({ item }: { item: CartItem }) {
  return (
    <Link
      href={`/product/${item.slug}`}
      className="group flex items-center justify-between rounded-md p-4 transition-colors hover:bg-zinc-800"
    >
      <div className="flex items-center gap-3">
        <Image src={item.image} alt="" width={150} height={150} />
        <span className="text-xl font-bold">
          {item.title} (<strong>{item.size}</strong>)
        </span>
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
    </Link>
  );
}

export default function CartItemsList() {
  const { cartItems } = useCart();
  return (
    <div className="col-span-2 flex flex-col gap-6 rounded-md bg-zinc-900 p-4">
      <h1 className="text-2xl font-extrabold">Your Cart</h1>
      <div className="flex flex-col gap-2">
        {cartItems.map((item) => (
          <CartItem key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
