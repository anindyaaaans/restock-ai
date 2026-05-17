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
  const h = size * 1.25;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a7a" />
          <stop offset="100%" stopColor="#162d63" />
        </linearGradient>
        <linearGradient id="headShellGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f4ff" />
          <stop offset="100%" stopColor="#dce5f5" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2d6a" />
          <stop offset="100%" stopColor="#0f1e4a" />
        </linearGradient>
        <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4c8" />
          <stop offset="100%" stopColor="#00a89e" />
        </linearGradient>
        <linearGradient id="shoeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a7a" />
          <stop offset="100%" stopColor="#0f2050" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0a1a4a" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ── Antenna ── */}
      <line x1="80" y1="8" x2="80" y2="26" stroke="url(#tealGrad)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="80" cy="6" r="6" fill="url(#tealGrad)" />
      <circle cx="80" cy="6" r="3" fill="white" fillOpacity="0.6" />

      {/* ── Head shell (white outer) ── */}
      <rect x="28" y="24" width="104" height="82" rx="22" fill="url(#headShellGrad)" filter="url(#softShadow)" />

      {/* ── Ear pieces (teal, left & right) ── */}
      <rect x="18" y="44" width="14" height="28" rx="7" fill="url(#tealGrad)" />
      <rect x="128" y="44" width="14" height="28" rx="7" fill="url(#tealGrad)" />
      {/* Ear inner dot */}
      <circle cx="25" cy="58" r="3.5" fill="white" fillOpacity="0.5" />
      <circle cx="135" cy="58" r="3.5" fill="white" fillOpacity="0.5" />

      {/* ── Screen face ── */}
      <rect x="38" y="32" width="84" height="66" rx="16" fill="url(#screenGrad)" />

      {/* ── Eyes ── */}
      {expression === 'thinking' ? (
        /* Thinking: one eye squinting */
        <>
          <path d="M58 58 Q62 54 66 58" stroke="#00d4c8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M94 55 Q98 59 102 55" stroke="#00d4c8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      ) : expression === 'excited' ? (
        /* Excited: winking / both curved up with lashes */
        <>
          <path d="M55 57 Q62 50 69 57" stroke="#00d4c8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M91 57 Q98 50 105 57" stroke="#00d4c8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <line x1="62" y1="50" x2="60" y2="44" stroke="#00d4c8" strokeWidth="2" strokeLinecap="round" />
          <line x1="98" y1="50" x2="96" y2="44" stroke="#00d4c8" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        /* Happy / Waving: happy curved eyes ^^ */
        <>
          <path d="M54 60 Q62 53 70 60" stroke="#00d4c8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M90 60 Q98 53 106 60" stroke="#00d4c8" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* ── Cheek blushes ── */}
      <ellipse cx="52" cy="74" rx="7" ry="4" fill="#ff9ec8" fillOpacity="0.35" />
      <ellipse cx="108" cy="74" rx="7" ry="4" fill="#ff9ec8" fillOpacity="0.35" />

      {/* ── Mouth / smile ── */}
      {expression === 'thinking' ? (
        <path d="M72 78 Q80 74 88 78" stroke="#00d4c8" strokeWidth="3" strokeLinecap="round" fill="none" />
      ) : expression === 'excited' ? (
        /* Open mouth smile */
        <>
          <path d="M65 76 Q80 90 95 76" stroke="#00d4c8" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M65 76 Q80 90 95 76" fill="#00d4c8" fillOpacity="0.15" />
        </>
      ) : (
        <path d="M64 76 Q80 90 96 76" stroke="#00d4c8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}

      {/* ── Screen glare ── */}
      <ellipse cx="57" cy="37" rx="10" ry="5" fill="white" fillOpacity="0.06" transform="rotate(-15 57 37)" />

      {/* ── Body (hoodie) ── */}
      <rect x="32" y="102" width="96" height="62" rx="18" fill="url(#bodyGrad)" filter="url(#softShadow)" />

      {/* Hoodie pocket area */}
      <rect x="52" y="128" width="56" height="28" rx="10" fill="rgba(255,255,255,0.06)" />

      {/* RestockAI text on hoodie */}
      <text
        x="80" y="147"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.3"
        fillOpacity="0.7"
      >
        RestockAI
      </text>

      {/* Chart icon on hoodie */}
      <rect x="67" y="114" width="4" height="8" rx="1" fill="#00d4c8" fillOpacity="0.7" />
      <rect x="73" y="110" width="4" height="12" rx="1" fill="#00d4c8" fillOpacity="0.7" />
      <rect x="79" y="107" width="4" height="15" rx="1" fill="#00d4c8" fillOpacity="0.9" />
      <rect x="85" y="112" width="4" height="10" rx="1" fill="#00d4c8" fillOpacity="0.7" />

      {/* ── Left arm (waving if expression=waving, otherwise relaxed) ── */}
      {expression === 'waving' ? (
        /* Raised waving arm */
        <g>
          <path
            d="M32 114 Q14 100 10 78 Q8 68 18 66"
            stroke="url(#headShellGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* White glove */}
          <circle cx="18" cy="65" r="11" fill="url(#headShellGrad)" />
          {/* Fingers hint */}
          <path d="M10 60 Q14 55 18 58" stroke="#c8d5ee" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M14 55 Q18 50 22 54" stroke="#c8d5ee" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M20 54 Q24 50 26 55" stroke="#c8d5ee" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        /* Relaxed arm down */
        <g>
          <path
            d="M32 118 Q12 122 10 140 Q9 150 20 152"
            stroke="url(#headShellGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="20" cy="153" r="11" fill="url(#headShellGrad)" />
        </g>
      )}

      {/* ── Right arm ── */}
      <g>
        <path
          d="M128 118 Q148 122 150 140 Q151 150 140 152"
          stroke="url(#headShellGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="140" cy="153" r="11" fill="url(#headShellGrad)" />
      </g>

      {/* ── Legs ── */}
      <rect x="46" y="158" width="28" height="28" rx="10" fill="url(#bodyGrad)" />
      <rect x="86" y="158" width="28" height="28" rx="10" fill="url(#bodyGrad)" />

      {/* ── Shoes ── */}
      <rect x="38" y="178" width="40" height="18" rx="9" fill="url(#shoeGrad)" />
      <rect x="82" y="178" width="40" height="18" rx="9" fill="url(#shoeGrad)" />
      {/* Shoe accent (white sole strip) */}
      <rect x="38" y="189" width="40" height="7" rx="4" fill="white" fillOpacity="0.2" />
      <rect x="82" y="189" width="40" height="7" rx="4" fill="white" fillOpacity="0.2" />
    </svg>
  );
}
