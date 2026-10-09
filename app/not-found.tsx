import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
      >
        <Home className="w-4 h-4" />
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
