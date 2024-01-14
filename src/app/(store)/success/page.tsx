'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('checkout') !== 'true') {
      router.push('/');
    }
  }, []);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 rounded-lg ring-1 ring-zinc-900">
      <h1 className="text-4xl font-bold">Success ✨</h1>
      <p className="mt-4 font-semibold text-zinc-200">
        Your payment has been processed successfully!
      </p>
      <Link href="/">
        <Button className="mt-4 bg-violet-600 hover:bg-violet-700">
          Continue Shopping
          <ArrowRight className="ml-2" width={18} height={18} />
        </Button>
      </Link>
    </div>
  );
}
