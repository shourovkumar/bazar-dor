import { formatPrice, getChangeBadge } from '@/lib/utils';
import type { Product } from '@/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const badge = getChangeBadge(product.change);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-4"
    >
      {/* Emoji + Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="text-3xl sm:text-4xl leading-none">
          {product.image || product.categoryIcon || '🛒'}
        </div>
        <span
          className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
            badge.isUp
              ? 'bg-red-50 text-red-600'
              : badge.isDown
              ? 'bg-green-50 text-green-600'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {badge.text}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-bold text-gray-900 mt-3 text-sm sm:text-base leading-tight line-clamp-2 min-h-[2.5rem]">
        {product.nameBn}
      </h3>

      {/* Unit + Category Tag */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[11px] sm:text-xs text-gray-500">
          {product.unit}
        </span>
        <span className="text-gray-300">·</span>
        <span className="inline-block bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded">
          {product.categoryNameBn || product.category}
        </span>
      </div>

      {/* Divider + Price */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">
          আজকের দাম
        </p>
        <p className="font-bold text-gray-900 text-base sm:text-lg mt-0.5">
          {formatPrice(product.today)} টাকা
        </p>
      </div>
    </Link>
  );
}
