import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  return (
    <main className="grid w-full grid-cols-3 gap-4 ">
      <div className="col-span-2 flex rounded-md bg-zinc-900 p-4">
        <h1 className="text-2xl font-extrabold">Your Cart</h1>
      </div>
      <div className="flex flex-col gap-6 rounded-md bg-zinc-900 p-4">
        <p className="text-2xl font-extrabold">Subtotal:</p>
        <h1 className="text-5xl font-semibold tabular-nums">$99,90</h1>
        <div>
          <p className=" flex items-center gap-2 font-semibold text-zinc-300">
            12x of <span className="font-semibold text-violet-500">$9,99</span>{' '}
            without interest
          </p>
          <p className="text-xs text-violet-500">
            Shipping calculated at checkout
          </p>
        </div>
        <button className="mt-6 flex justify-center gap-2 rounded-md bg-violet-500 p-2 font-semibold text-zinc-50 hover:bg-violet-600">
          <ShoppingBag /> Proceed to Checkout
        </button>
      </div>
    </main>
  );
}
