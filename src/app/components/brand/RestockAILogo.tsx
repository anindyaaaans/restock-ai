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
  const textColor = wordmarkColor === 'light' ? '#ffffff' : '#1a2d5a';
  const textShadow = wordmarkColor === 'light' ? undefined : 'none';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoCircleGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a2d5a" />
            <stop offset="100%" stopColor="#0ea5a0" />
          </linearGradient>
          <linearGradient id="logoArrowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5cc" />
            <stop offset="100%" stopColor="#00bfaa" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle cx="40" cy="40" r="38" fill="url(#logoCircleGrad)" />

        {/* Orbit ring */}
        <circle
          cx="40" cy="40" r="32"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6 4"
        />

        {/* Box / package body */}
        <rect x="22" y="30" width="26" height="22" rx="3" fill="white" fillOpacity="0.95" />
        {/* Box lid */}
        <rect x="20" y="26" width="30" height="7" rx="2.5" fill="white" />
        {/* Box center crease */}
        <line x1="35" y1="26" x2="35" y2="33" stroke="#1a2d5a" strokeWidth="1.5" />
        {/* Box ribbon */}
        <line x1="35" y1="33" x2="35" y2="52" stroke="rgba(0,180,160,0.4)" strokeWidth="1.5" />

        {/* Upward arrow (cyan) */}
        <g transform="translate(44, 18)">
          <path
            d="M6 18 L6 6 M6 6 L2 10 M6 6 L10 10"
            stroke="url(#logoArrowGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Bar chart (bottom-right) */}
        <rect x="52" y="42" width="5" height="10" rx="1.5" fill="url(#logoArrowGrad)" />
        <rect x="59" y="36" width="5" height="16" rx="1.5" fill="url(#logoArrowGrad)" />

        {/* Sparkle top-right */}
        <g transform="translate(57, 18)" fill="#00e5cc">
          <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fillOpacity="0.9" />
        </g>
        <circle cx="63" cy="29" r="1.5" fill="#00e5cc" fillOpacity="0.6" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className="font-extrabold select-none"
          style={{ fontSize: size * 0.45, letterSpacing: '-0.01em', color: textColor }}
        >
          Restock
          <span style={{ color: '#00bfaa' }}>AI</span>
        </span>
      )}
    </div>
  );
}
