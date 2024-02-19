import Skeleton from '@/components/skeleton/skeleton';

export default async function ProductLoading() {
  return (
    <div className="relative grid max-h-[860vh] grid-cols-3">
      <Skeleton className="col-span-2 h-[610px]" />
      <div className="flex flex-col justify-center px-12">
        <Skeleton className="h-[150px]" />
        <Skeleton className="mt-2 h-[80px]" />
        <div className="mt-12 space-y-4 ">
          <Skeleton className="h-[180px]" />
        </div>
      </div>
    </div>
  );
}
