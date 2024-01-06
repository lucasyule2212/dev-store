import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Suspense } from 'react';
import SearchForm from '../searchForm/searchForm';
import CartDisplay from './cartDisplay';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          DevStore
        </Link>
        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>

      <div className="flex items-center gap-4">
        <CartDisplay />
        <div className="h-4 w-px bg-zinc-700" />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
