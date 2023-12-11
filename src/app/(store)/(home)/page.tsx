import api from "@/data/api";
import type { Product } from "@/data/types/product";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts():Promise<Product[]> {
  const response = await api({ path: '/products/featured' });
  
  const products = await response.json() as Product[];

  return products;
}

export default async function HomePage() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();
  
  return (
    <div className='grid max-h-[600px] grid-cols-9 grid-rows-6 gap-6'>
      <Link href='/' className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end">
              {/* O width e height do Image component serve apenas para dizer o quão grande queremos renderizar a imagem (qualidade) */}
        <Image className="group-hover:scale-105 transition-transform duration-500" src='/moletom-java.png' alt="" width={600} height={600} quality={100} />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[220px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate ">
            Moletom Side
          </span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold tabular-nums">
              R$ 159
          </span>
        </div>
      </Link>
      <Link href='/' className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end">
        <Image className="group-hover:scale-105 transition-transform duration-500" src='/moletom-ia-p-devs.png' alt="" width={300} height={300} quality={100} />
        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[240px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate ">
            Moletom Ia Devs
          </span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold tabular-nums">
              R$ 130
          </span>
        </div>
      </Link>
      <Link href='/' className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end">
            
        <Image className="group-hover:scale-105 transition-transform duration-500" src='/moletom-ai-side.png' alt="" width={300} height={300} quality={100} />
        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[240px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate ">
            Moletom I.A Side
          </span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold tabular-nums">
              R$ 180
          </span>
        </div>
      </Link>
      </div>
  )
}
