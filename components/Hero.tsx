import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-green-50 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-white text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            বাংলাদেশের বাজারদর
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            সব পণ্য দেখুন
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/images/basket-hero.png"
            alt="বাজারের ঝুড়ি"
            width={400}
            height={400}
            className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-xs"
            priority
          />
        </div>
      </div>
    </section>
  );
}
