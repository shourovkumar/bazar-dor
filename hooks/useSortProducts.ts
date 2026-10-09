'use client';

import { toEnglish } from '@/lib/utils';
import type { Product, SortOption } from '@/types';
import { useMemo } from 'react';

export function useSortProducts(
  products: Product[],
  sortOption: SortOption
): Product[] {
  return useMemo(() => {
    if (sortOption === 'default') return products;

    const sorted = [...products];

    if (sortOption === 'low-high') {
      sorted.sort(
        (a, b) => Number(toEnglish(a.today.toString())) - Number(toEnglish(b.today.toString()))
      );
    } else if (sortOption === 'high-low') {
      sorted.sort(
        (a, b) => Number(toEnglish(b.today.toString())) - Number(toEnglish(a.today.toString()))
      );
    }

    return sorted;
  }, [products, sortOption]);
}
