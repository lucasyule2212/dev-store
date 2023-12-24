'use client';
import Skeleton from '@/components/skeleton/skeleton';
import { useSearchParams } from 'next/navigation';

export default function SearchLoading() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Results to: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
      </div>
    </div>
  );
}
