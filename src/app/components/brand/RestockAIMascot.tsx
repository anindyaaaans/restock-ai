type MascotExpression = 'happy' | 'thinking' | 'excited' | 'waving';

interface MascotProps {
  size?: number;
  expression?: MascotExpression;
  className?: string;
}

export default function RestockAIMascot({
  size = 160,
  expression = 'happy',
  className = '',
}: MascotProps) {
  const w = size;

  return (
    <img
      src="/mascot.png"
      alt={`Restock AI Mascot - ${expression}`}
      width={w}
      style={{ width: w, objectFit: 'contain' }}
      className={`drop-shadow-2xl ${className}`}
    />
  );
}
