'use client';

import { useSortProducts } from '@/hooks/useSortProducts';
import type { Product, SortOption } from '@/types';
import { useState } from 'react';
import CategorySort from './CategorySort';
import ProductCard from './ProductCard';

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const sortedProducts = useSortProducts(products, sortOption);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-xs sm:text-sm text-gray-500">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <CategorySort value={sortOption} onChange={setSortOption} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
