'use client';

import { useSortProducts } from '@/hooks/useSortProducts';
import type { Product, SortOption } from '@/types';
import { useState } from 'react';
import CategorySort from './CategorySort';
import ProductCard from './ProductCard';

interface CategorySortWrapperProps {
  products: Product[];
}

export default function CategorySortWrapper({ products }: CategorySortWrapperProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const sortedProducts = useSortProducts(products, sortOption);

  return (
    <>
      <CategorySort value={sortOption} onChange={setSortOption} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
