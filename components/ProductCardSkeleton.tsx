export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="w-16 h-6 bg-gray-200 rounded-full" />
      </div>
      <div className="h-4 bg-gray-200 rounded mt-3 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mt-2 w-1/2" />
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded mt-2 w-2/3" />
      </div>
    </div>
  );
}
