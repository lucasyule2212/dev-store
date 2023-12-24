import api from '@/data/api';
import { type Product } from '@/data/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api({
    path: `/products/search?q=${query}`,
    init: {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  });

  const products = (await response.json()) as Product[];

  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q: query } = searchParams;

  if (!query) {
    redirect('/');
  }

  const products = await searchProducts(query);

  if (!products.length) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">No results found.</h1>
        <Link href="/">
          <button className="rounded-full bg-zinc-900 p-4 text-violet-500">
            Go back home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Results to: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
          >
            <Image
              className="transition-transform duration-500 group-hover:scale-105"
              src={product.image}
              alt=""
              width={350}
              height={350}
              quality={100}
            />
            <div className="absolute bottom-10 right-10 flex h-12 max-w-[240px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="truncate text-sm ">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold tabular-nums">
                {product.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
