import CartItemsList from '@/components/checkoutProceed/cartItemsList';
import CheckoutProceed from '@/components/checkoutProceed/checkoutProceed';

export default function CartPage() {
  return (
    <main className="grid w-full grid-cols-3 gap-4 ">
      <CartItemsList />
      <CheckoutProceed />
    </main>
  );
}
