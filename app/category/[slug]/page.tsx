import CategoryProducts from '@/components/CategoryProducts';
import { getAllCategories, getProductsByCategory } from '@/lib/api';
import { Home } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProductsByCategory(slug),
    getAllCategories(),
  ]);

  const currentCategory = categories.find((cat) => cat.slug === slug);

  // Empty state
  if (!products.length) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-16">
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 p-8">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-gray-600 max-w-md mb-8">
            &ldquo;{slug}&rdquo; ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Title + Icon */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl sm:text-4xl">
          {currentCategory?.icon || '🛒'}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {currentCategory?.nameBn || slug}
        </h1>
      </div>

      {/* Sort + Grid (Client Component) */}
      <CategoryProducts products={products} />
    </div>
  );
}
