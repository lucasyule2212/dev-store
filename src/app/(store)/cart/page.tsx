import CheckoutProceed from '@/components/checkoutProceed/checkoutProceed';

export default function CartPage() {
  return (
    <main className="grid w-full grid-cols-3 gap-4 ">
      <div className="col-span-2 flex rounded-md bg-zinc-900 p-4">
        <h1 className="text-2xl font-extrabold">Your Cart</h1>
      </div>
      <CheckoutProceed />
    </main>
  );
}
