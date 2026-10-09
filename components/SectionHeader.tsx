interface SectionHeaderProps {
  title: string;
  emoji?: string;
  color?: 'green' | 'red' | 'gray';
}

export default function SectionHeader({
  title,
  emoji,
  color = 'gray',
}: SectionHeaderProps) {
  const colorClass =
    color === 'green'
      ? 'text-green-600'
      : color === 'red'
      ? 'text-red-600'
      : 'text-gray-900';

  return (
    <h2
      className={`text-xl md:text-2xl font-bold flex items-center gap-2 mb-4 ${colorClass}`}
    >
      {emoji && <span>{emoji}</span>}
      {title}
    </h2>
  );
}
