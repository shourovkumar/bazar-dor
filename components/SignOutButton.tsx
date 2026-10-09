'use client';

import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success('সাইন আউট সফল');
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-1.5 text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
    >
      <LogOut className="w-4 h-4" />
      সাইন আউট
    </button>
  );
}
