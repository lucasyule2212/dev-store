'use client';

import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/cartContext';
import { type Product } from '@/data/types/product';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, selectedSize } = useCart();

  const { toast } = useToast();

  const handleAddToCart = () => {
    if (selectedSize === '') {
      toast({
        variant: 'destructive',
        description: 'Você precisa selecionar um tamanho para continuar',
        duration: 5000,
      });
      return;
    }

    addToCart(product);
    toast({
      description: 'Produto adicionado ao carrinho',
      duration: 5000,
    });
  };

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-green-600 font-semibold text-white transition-colors hover:bg-green-700"
      onClick={() => handleAddToCart()}
    >
      Adicionar ao carrinho
    </button>
  );
}
