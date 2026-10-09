import SignOutButton from '@/components/SignOutButton';
import { auth } from '@/lib/auth';
import { Mail, Pencil } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <div className="flex items-start gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || 'User'}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </div>
          </div>

          <SignOutButton />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">তথ্য</h3>

        <div className="space-y-3 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              নাম
            </p>
            <p className="text-gray-900 font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              ইমেইল
            </p>
            <p className="text-gray-900 font-medium">{user.email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="inline-flex items-center justify-center gap-2 w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Pencil className="w-4 h-4" />
          তথ্য পরিবর্তন করুন
        </Link>
      </div>
    </div>
  );
}
