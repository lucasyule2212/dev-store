import Image from 'next/image';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">moletom</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        <Link
          href={`/product/moletom-never-stop-learning`}
          className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
        >
          <Image
            className="transition-transform duration-500 group-hover:scale-105"
            src="/moletom-never-stop-learning.png"
            alt=""
            width={350}
            height={350}
            quality={100}
          />
          <div className="absolute bottom-10 right-10 flex h-12 max-w-[240px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="truncate text-sm ">
              Moletom Never Stop Learning
            </span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold tabular-nums">
              {new Number(129).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
