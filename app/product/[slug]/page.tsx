import MarketPriceTable from '@/components/MarketPriceTable';
import { getProductById } from '@/lib/api';
import { auth } from '@/lib/auth';
import { formatPrice, getChangeBadge } from '@/lib/utils';
import { ArrowLeft, TrendingDown, TrendingUp } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  // Server-side session check (double protection)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          পণ্য পাওয়া যায়নি
        </h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const badge = getChangeBadge(product.change);

  // Calculate min, max, avg from markets
  const markets = product.markets || [];
  const allPrices = markets.flatMap((m) => [m.min, m.max]);
  const minPrice = allPrices.length ? Math.min(...allPrices) : product.today;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : product.today;
  const avgPrice = allPrices.length
    ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length
    : product.today;

  // Find markets for min/max labels
  const minMarket = markets.find((m) => m.min === minPrice)?.market || '';
  const maxMarket = markets.find((m) => m.max === maxPrice)?.market || '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-green-600">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-green-600">
          {product.categoryNameBn || product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="text-6xl">{product.image || product.categoryIcon || '🛒'}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {product.unit}
                {product.categoryNameBn && ` · ${product.categoryNameBn}`}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {badge.isUp && (
                  <span className="text-red-600 font-medium">
                    গতকালের তুলনায় দাম বেড়েছে · {badge.text}
                  </span>
                )}
                {badge.isDown && (
                  <span className="text-green-600 font-medium">
                    গতকালের তুলনায় দাম কমেছে · {badge.text}
                  </span>
                )}
                {!badge.isUp && !badge.isDown && (
                  <span className="text-gray-500">দাম অপরিবর্তিত</span>
                )}
              </p>
            </div>
          </div>

          {/* Today's Price Box */}
          <div className="bg-gray-50 rounded-xl p-4 text-center min-w-[180px]">
            <p className="text-xs text-gray-500 uppercase tracking-wide">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{formatPrice(product.today)}</p>
            <p className="text-xs text-gray-500 mt-1">
              টাকা / {product.unit.replace('প্রতি ', '')}
            </p>
            <div
              className={`inline-flex items-center gap-1 mt-2 text-xs font-bold px-2 py-1 rounded-full ${
                badge.isUp
                  ? 'bg-red-50 text-red-600'
                  : badge.isDown
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-500'
              }`}
            >
              {badge.isUp && <TrendingUp className="w-3 h-3" />}
              {badge.isDown && <TrendingDown className="w-3 h-3" />}
              {badge.text}
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{formatPrice(minPrice)} টাকা</p>
            {minMarket && <p className="text-xs text-gray-500 mt-1">{minMarket} বাজার</p>}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{formatPrice(maxPrice)} টাকা</p>
            {maxMarket && <p className="text-xs text-gray-500 mt-1">{maxMarket} বাজার</p>}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">গড় দাম</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatPrice(Number(avgPrice.toFixed(1)))} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">
              প্রতি {product.unit.replace('প্রতি ', '')}-এর হিসাব
            </p>
          </div>
        </div>
      </div>

      {/* Market Price Table */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">বাজারভিত্তিক আজকের দাম</h2>
        <MarketPriceTable markets={markets} />
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
