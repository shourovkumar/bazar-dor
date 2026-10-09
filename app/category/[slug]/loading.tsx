import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
