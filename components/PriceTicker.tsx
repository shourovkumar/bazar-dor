import { formatPrice, getChangeBadge } from '@/lib/utils';
import type { Product } from '@/types';
import Link from 'next/link';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products?.length) return null;

  const items = [...products, ...products];

  return (
    <div className="bg-green-600 text-white overflow-hidden">
      <div className="marquee-track flex gap-8 whitespace-nowrap py-2">
        {items.map((product, i) => {
          const badge = getChangeBadge(product.change);
          return (
            <Link
              key={`${product.id}-${i}`}
              href={`/product/${product.id}`}
              className="flex items-center gap-2 text-sm hover:opacity-80"
            >
              <span className="text-base">{product.emoji || '🛒'}</span>
              <span className="font-medium">{product.nameBn}</span>
              <span className="font-bold">
                {formatPrice(product.today)} টাকা/{product.unit.replace('প্রতি ', '')}
              </span>
              <span
                className={`text-xs font-bold ${
                  badge.isUp
                    ? 'text-red-200'
                    : badge.isDown
                    ? 'text-green-200'
                    : 'text-white/70'
                }`}
              >
                {badge.text}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
