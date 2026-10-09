import type { PriceChange } from '@/types';

const bengaliDigits: string[] = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengali(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '';
  return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
}

export function toEnglish(bengaliStr: string): string {
  return bengaliStr
    .toString()
    .replace(/[০-৯]/g, (d) => bengaliDigits.indexOf(d).toString())
    .replace(/,/g, '');
}

export function formatPrice(num: number | null | undefined): string {
  if (num === null || num === undefined) return '';
  const withComma = num.toLocaleString('en-IN');
  return toBengali(withComma);
}

export function getBanglaDate(): string {
  const now = new Date();
  return now.toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export interface ChangeBadge {
  color: 'green' | 'red' | 'gray';
  text: string;
  isUp: boolean;
  isDown: boolean;
}

export function getChangeBadge(change?: PriceChange): ChangeBadge {
  if (!change) {
    return { color: 'gray', text: '— ০.০%', isUp: false, isDown: false };
  }

  const { dir, pct } = change;
  const formattedPct = formatPrice(Number(Math.abs(pct).toFixed(1))) + '%';

  // Price UP = RED (bad for consumer)
  if (dir === 'up') {
    return {
      color: 'red',
      text: `▲ ${formattedPct}`,
      isUp: true,
      isDown: false,
    };
  }
  // Price DOWN = GREEN (good for consumer)
  if (dir === 'down') {
    return {
      color: 'green',
      text: `▼ ${formattedPct}`,
      isUp: false,
      isDown: true,
    };
  }
  return {
    color: 'gray',
    text: `— ${formattedPct}`,
    isUp: false,
    isDown: false,
  };
}
