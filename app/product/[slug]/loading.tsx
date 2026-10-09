export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 w-64 bg-gray-200 rounded mb-4" />

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-16 h-16 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded mt-2" />
          </div>
          <div className="w-40 h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-32 bg-gray-200 rounded mt-2" />
          </div>
        ))}
      </div>

      <div className="h-64 bg-white rounded-xl border border-gray-100" />
    </div>
  );
}
