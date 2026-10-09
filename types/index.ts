export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
  avg?: number;
}

export interface Product {
  id: number;
  slug?: string;
  nameBn: string;
  name?: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  emoji?: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: PriceChange;
  markets?: Market[];
  description?: string;
}

export interface Category {
  id?: string;
  slug: string;
  nameBn: string;
  name?: string;
  icon: string;
}

export type SortOption = 'default' | 'low-high' | 'high-low';

export type ChangeDirection = 'up' | 'down' | 'flat';
