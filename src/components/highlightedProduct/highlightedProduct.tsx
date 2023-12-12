import Image from 'next/image';
import Link from 'next/link';

export default function HighlightedProduct({
  title,
  price,
  image,
  slug,
}: {
  title: string;
  price: number;
  image: string;
  slug: string;
}) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group relative col-span-6 row-span-6 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
    >
      {/* O width e height do Image component serve apenas para dizer o quão grande queremos renderizar a imagem (qualidade) */}
      <Image
        className="transition-transform duration-500 group-hover:scale-105"
        src={image}
        alt=""
        width={600}
        height={600}
        quality={100}
      />
      <div className="absolute bottom-28 right-28 flex h-12 max-w-[220px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
        <span className="truncate text-sm ">{title}</span>
        <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold tabular-nums">
          {price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
    </Link>
  );
}
