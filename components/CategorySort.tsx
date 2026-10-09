'use client';

import type { SortOption } from '@/types';
import { ChevronDown } from 'lucide-react';

interface CategorySortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function CategorySort({ value, onChange }: CategorySortProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">সাজান:</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2 pr-10 text-sm text-gray-800 outline-none cursor-pointer hover:border-green-400 focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-high">দাম: কম থেকে বেশি</option>
          <option value="high-low">দাম: বেশি থেকে কম</option>
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
