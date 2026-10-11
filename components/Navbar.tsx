'use client';

import { authClient } from '@/lib/auth-client';
import { getBanglaDate } from '@/lib/utils';
import type { Category } from '@/types';
import { ChevronDown, LogOut, User } from 'lucide-react';
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
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
    toast.success('সাইন আউট সফল');
    setMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Row 1 — Logo + Date + Auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* Green circle with cart icon (SVG) */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold text-green-700 leading-tight">
              বাজার দর
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500">{getBanglaDate()}</span>
          </div>
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
                  {session.user.name?.[0]?.toUpperCase() || 'U'}
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
                className="text-sm font-medium bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors"
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

      {/* Row 2 — Categories */}
      {/* Row 2 — Categories */}
      <div className="border-t border-green-100 bg-green-50 relative">
        <nav className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
          <ul className="flex gap-1.5 sm:gap-2 py-2 px-3 sm:px-4">
            {/* Mobile: "সব ▼" dropdown toggle */}
            <li className="flex-shrink-0 md:hidden">
              <button
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors flex items-center gap-1 ${
                  pathname === '/' ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-100'
                }`}
              >
                <span>সব</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </li>

            {/* Desktop: "সব" link */}
            <li className="hidden md:flex flex-shrink-0">
              <Link
                href="/"
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  pathname === '/' ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-100'
                }`}
              >
                সব
              </Link>
            </li>

            {/* Categories */}
            {categories.map(cat => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug} className="hidden md:flex flex-shrink-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={() => setCategoryMenuOpen(false)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-1 ${
                      isActive ? 'bg-green-600 text-white' : 'text-green-700 hover:bg-green-100'
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

        {/* Mobile dropdown menu */}
        {categoryMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-green-100 shadow-lg z-40">
            <ul className="py-2 max-h-64 overflow-y-auto">
              <li>
                <Link
                  href="/"
                  onClick={() => setCategoryMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm border-b border-gray-50 ${
                    pathname === '/'
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🛒 সব পণ্য
                </Link>
              </li>
              {categories.map(cat => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={() => setCategoryMenuOpen(false)}
                      className={`block px-4 py-2.5 text-sm border-b border-gray-50 flex items-center gap-2 ${
                        isActive
                          ? 'bg-green-50 text-green-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.nameBn}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
