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
      className="block bg-white rounded-xl border border-gray-100 hover:border-green-300 hover:shadow-md transition-all p-4"
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{product.emoji || '🛒'}</div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
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

      <h3 className="font-bold text-gray-900 mt-3">{product.nameBn}</h3>
      <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-[10px] text-gray-500 uppercase tracking-wide">
          আজকের দাম
        </p>
        <p className="font-bold text-gray-900 text-lg">
          {formatPrice(product.today)} টাকা
        </p>
      </div>
    </Link>
  );
}
