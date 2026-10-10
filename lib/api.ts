import type { Category, Product } from '@/types';

const BASE_URL = 'https://openapi.programming-hero.com/api/bazardor';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return Array.isArray(data) ? data : data.data ?? data.products ?? [];
  } catch (error) {
    console.error('getAllProducts error:', error);
    return [];
  }
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?category=${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error('Failed to fetch category products');
    const data = await res.json();
    return Array.isArray(data) ? data : data.data ?? data.products ?? [];
  } catch (error) {
    console.error('getProductsByCategory error:', error);
    return [];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? data.product ?? data;
  } catch (error) {
    console.error('getProductById error:', error);
    return null;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return Array.isArray(data) ? data : data.data ?? data.categories ?? [];
  } catch (error) {
    console.error('getAllCategories error:', error);
    return [];
  }
}

export function getTopMovers(
  products: Product[],
  direction: 'up' | 'down',
  limit = 6
): Product[] {
  return products
    .filter((p) => p.change?.dir === direction)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}
