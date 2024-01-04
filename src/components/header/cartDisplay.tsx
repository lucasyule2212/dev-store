'use client';
import { useCart } from '@/contexts/cartContext';
import { ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function CartDisplay() {
  const { cartItems } = useCart();
  const cartItemsSubtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger data-testid="add-to-cart-button">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm">Cart: ({cartItems.length})</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <div
                key={item.slug}
                className="flex items-center justify-between gap-2"
              >
                <span className="text-sm text-violet-500">
                  {item.title} (<strong>{item.size}</strong>)
                </span>
                <span className="text-sm font-semibold">{item.quantity}x</span>
              </div>
            ))}
          </div>

          <p className="mt-2 border-t">
            Subtotal: <span className="font-semibold">{cartItemsSubtotal}</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
