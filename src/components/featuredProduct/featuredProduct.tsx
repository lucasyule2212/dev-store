import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProduct({
  title,
  price,
  image,
}: {
  title: string;
  price: number;
  image: string;
}) {
  return (
    <Link
      href="/"
      className="group relative col-span-3 row-span-3 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
    >
      <Image
        className="transition-transform duration-500 group-hover:scale-105"
        src={image}
        alt=""
        width={300}
        height={300}
        quality={100}
      />
      <div className="absolute bottom-10 right-10 flex h-12 max-w-[240px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
