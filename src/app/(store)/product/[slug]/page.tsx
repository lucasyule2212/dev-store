import AddToCartButton from '@/components/addToCartButton/addToCartButton';
import ProductSizeButton from '@/components/productSizeButton/productSizeButton';
import Image from 'next/image';

export default function ProductPage() {
  return (
    <div className="relative grid max-h-[860vh] grid-cols-3">
      <div className="col-span-2 flex  justify-center overflow-hidden">
        <Image
          className="relative"
          src="/moletom-never-stop-learning.png"
          alt=""
          width={610}
          height={610}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">
          Moletom Never Stop Learning
        </h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          Moletom fabricado com 88% de algodão e 12% de poliéster.{' '}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            R$ 129
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x sem juros de 10,75
          </span>
        </div>
        <div className="mt-8 space-y-4 ">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <ProductSizeButton size="P" />
            <ProductSizeButton size="M" />
            <ProductSizeButton size="G" />
            <ProductSizeButton size="GG" />
          </div>
        </div>
        <AddToCartButton />
      </div>
    </div>
  );
}
