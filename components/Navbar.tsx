'use client';

import { authClient } from '@/lib/auth-client';
import { getBanglaDate } from '@/lib/utils';
import type { Category } from '@/types';
import { ChevronDown, LogOut, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface NavbarProps {
  categories?: Category[];
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
    toast.success('সাইন আউট সফল');
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-green-700">বাজার দর</span>
          </div>
          <span className="text-xs text-gray-500 mt-0.5">{getBanglaDate()}</span>
        </Link>

        <div className="relative flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-9 bg-gray-200 rounded-full animate-pulse" />
          ) : session ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {session.user.name?.[0] || 'U'}
                </div>
              )}
              <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                {session.user.name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-1.5"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700"
              >
                সাইন আপ
              </Link>
            </>
          )}

          {menuOpen && session && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="w-4 h-4" />
                আমার প্রোফাইল
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                সাইন আউট
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-green-100 bg-green-50">
        <nav className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <ul className="flex gap-2 py-2">
            <li>
              <Link
                href="/"
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  pathname === '/'
                    ? 'bg-green-600 text-white'
                    : 'text-green-700 hover:bg-green-100'
                }`}
              >
                সব
              </Link>
            </li>
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-1 ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
