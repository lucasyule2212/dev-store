'use client';

import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/cartContext';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

export default function AddToCartButton({ productId }: { productId: number }) {
  const { addToCart, removeFromCart, cartItems, selectedSize } = useCart();
  const itemIsInCart = useMemo(
    () => cartItems.some((item) => item.productId === productId),
    [cartItems],
  );
  const { toast } = useToast();

  const buttonCollor = useMemo(
    () =>
      itemIsInCart
        ? 'bg-violet-600 hover:bg-violet-700'
        : 'bg-emerald-600 hover:bg-emerald-700',
    [itemIsInCart],
  );

  const handleAddToCart = () => {
    if (selectedSize === '') {
      toast({
        variant: 'destructive',
        description: 'Você precisa selecionar um tamanho para continuar',
        duration: 5000,
      });
      return;
    }

    if (itemIsInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  return (
    <button
      type="button"
      className={twMerge(
        'mt-8 flex h-12 items-center justify-center rounded-full font-semibold text-white transition-colors',
        buttonCollor,
      )}
      onClick={() => handleAddToCart()}
    >
      {itemIsInCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
    </button>
  );
}
