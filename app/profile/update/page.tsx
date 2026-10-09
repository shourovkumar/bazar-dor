'use client';

import { authClient } from '@/lib/auth-client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নাম খালি রাখা যাবে না');
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({ name });

    if (error) {
      toast.error(error.message || 'আপডেট ব্যর্থ হয়েছে');
      setLoading(false);
      return;
    }

    toast.success('তথ্য সফলভাবে আপডেট হয়েছে');
    router.push('/profile');
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        প্রোফাইলে ফিরে যান
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          তথ্য পরিবর্তন করুন
        </h1>
        <p className="text-sm text-gray-500">
          আপনার নাম আপডেট করুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
          >
            {loading ? 'আপডেট হচ্ছে...' : 'তথ্য আপডেট করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
