import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import { getAllCategories, getAllProducts } from '@/lib/api';
import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
});

export const metadata: Metadata = {
  title: 'বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম',
  description: 'প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <html lang="bn">
      <body
        suppressHydrationWarning
        className={`${notoBengali.variable} font-sans bg-gray-50`}
      >
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </body>
    </html>
  );
}
