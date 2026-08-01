interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: 'dark' | 'light';
  className?: string;
}

export default function RestockAILogo({
  size = 40,
  showWordmark = true,
  wordmarkColor = 'light',
  className = '',
}: LogoProps) {
  const textColor = wordmarkColor === 'light' ? '#1A1A1B' : '#1a2d5a';
  const textShadow = wordmarkColor === 'light' ? undefined : 'none';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark */}
      <img
        src="/logo-restockai.png"
        alt="Restock AI Logo"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />

      {/* Wordmark */}
      {showWordmark && (
        <span
          className="font-extrabold select-none"
          style={{ fontSize: size * 0.45, letterSpacing: '-0.01em', color: textColor }}
        >
          Restock AI
        </span>
      )}
    </div>
  );
}
