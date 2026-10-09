export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <p>
          <span className="font-bold text-green-700">বাজার দর</span> — প্রয়োজনীয়
          পণ্যের দাম এক নজরে।
        </p>
        <p className="text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
