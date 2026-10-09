import { formatPrice } from '@/lib/utils';
import type { Market } from '@/types';

interface MarketPriceTableProps {
  markets: Market[];
}

export default function MarketPriceTable({ markets }: MarketPriceTableProps) {
  if (!markets?.length) {
    return <p className="text-sm text-gray-500">বাজারের তথ্য নেই।</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">
              বাজার
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">
              বিভাগ
            </th>
            <th className="text-right px-4 py-3 font-semibold text-gray-700">
              সর্বনিম্ন
            </th>
            <th className="text-right px-4 py-3 font-semibold text-gray-700">
              সর্বোচ্চ
            </th>
            <th className="text-right px-4 py-3 font-semibold text-gray-700">
              গড়
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {markets.map((market, i) => {
            const avg =
              market.avg ?? (market.min + market.max) / 2;
            return (
              <tr key={`${market.market}-${i}`} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {market.market}
                </td>
                <td className="px-4 py-3 text-gray-600">{market.division}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">
                  {formatPrice(market.min)} টাকা
                </td>
                <td className="px-4 py-3 text-right font-semibold text-red-600">
                  {formatPrice(market.max)} টাকা
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatPrice(Number(avg.toFixed(1)))} টাকা
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
