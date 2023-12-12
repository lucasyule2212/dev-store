import Skeleton from '@/components/skeleton/skeleton';

export default function HomeLoading() {
  return (
    <div className="grid h-full grid-cols-9 grid-rows-6 gap-6">
      <Skeleton className="col-span-6 row-span-6 h-[600px]" />
      <Skeleton className="col-span-3 row-span-3 h-[285px]" />
      <Skeleton className="col-span-3 row-span-3 h-[285px]" />
    </div>
  );
}
