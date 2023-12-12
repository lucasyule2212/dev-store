'use client';

export default function ProductSizeButton({ size }: { size: string }) {
  return (
    <button
      type="button"
      className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold transition-colors hover:bg-zinc-900"
    >
      {size}
    </button>
  );
}
