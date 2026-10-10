import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import SectionHeader from '@/components/SectionHeader';
import { getAllProducts, getTopMovers } from '@/lib/api';

export default async function Home() {
  const products = await getAllProducts();
  const risers = getTopMovers(products, 'up', 6);
  const fallers = getTopMovers(products, 'down', 6);

  return (
    <div>
      <Hero />

      {/* Section A: Risers (দাম বেড়েছে) — RED (bad for consumer) */}
      {risers.length > 0 && (
        <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <SectionHeader title="আজ দাম বেড়েছে" emoji="▲" color="red" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: Fallers (দাম কমেছে) — GREEN (good for consumer) */}
      {fallers.length > 0 && (
        <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <SectionHeader title="আজ দাম কমেছে" emoji="▼" color="green" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C: All Products — 3 columns on tablet + desktop */}
      <section
        id="সব-পণ্য"
        className="max-w-6xl mx-auto px-3 sm:px-4 pt-6 pb-2 sm:py-8 scroll-mt-32"
      >
        <SectionHeader title="সব পণ্য" emoji="🛒" color="gray" />
        <p className="text-xs sm:text-sm text-gray-500 -mt-2 mb-4">
          মোট {products.length}টি পণ্যের আজকের দাম
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
