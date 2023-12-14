'use client';

import { useCart } from '@/contexts/cartContext';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ProductSizeButton({ size }: { size: string }) {
  const { selectedSize, setSelectedSize } = useCart();

  const selectedButtonColor = useMemo(() => {
    if (selectedSize === size) {
      return 'border-violet-500 text-violet-500';
    }
    return 'border-zinc-600';
  }, [selectedSize]);

  return (
    <button
      type="button"
      className={twMerge(
        'flex h-9 w-14 items-center justify-center rounded-full border  bg-zinc-800 text-sm font-semibold transition-colors hover:bg-zinc-900',
        selectedButtonColor,
      )}
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </button>
  );
}
