// BabyBus-style cartoon bunny character — Bunny

export default function BunnyCharacter({ mood = 'idle', size = 'medium' }) {
  const sizeMap = {
    small:  { w: 65,  h: 105 },
    medium: { w: 95,  h: 152 },
    large:  { w: 120, h: 192 },
  };
  const sz = sizeMap[size] || sizeMap.medium;

  const animClass =
    mood === 'celebrate' ? 'sheriff-spin' :
    mood === 'happy'     ? 'sheriff-bounce' :
    'sheriff-bob';

  // Mouth path based on mood
  const mouthPath =
    mood === 'celebrate' ? 'M 36 90 Q 50 106 64 90' :
    mood === 'happy'     ? 'M 38 89 Q 50 101 62 89' :
    mood === 'thinking'  ? 'M 40 90 L 60 90' :
                           'M 39 89 Q 50 98 61 89';

  return (
    <div className={`sheriff-wrapper ${animClass}`} style={{ display: 'inline-block' }}>
      <svg
        viewBox="0 0 100 160"
        width={sz.w}
        height={sz.h}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
      >
        {/* ── EARS (behind head) ── */}
        {/* Left ear outer */}
        <ellipse cx="32" cy="28" rx="13" ry="28" fill="#F5F0E8"/>
        {/* Left ear inner */}
        <ellipse cx="32" cy="28" rx="7" ry="20" fill="#FFB3C1"/>
        {/* Right ear outer */}
        <ellipse cx="68" cy="28" rx="13" ry="28" fill="#F5F0E8"/>
        {/* Right ear inner */}
        <ellipse cx="68" cy="28" rx="7" ry="20" fill="#FFB3C1"/>

        {/* ── HEAD ── */}
        <circle cx="50" cy="78" r="35" fill="#F5F0E8"/>

        {/* ── EYES ── */}
        {/* White sclera */}
        <circle cx="37" cy="70" r="11" fill="white"/>
        <circle cx="63" cy="70" r="11" fill="white"/>
        {/* Blue pupils */}
        <circle cx="38" cy="71" r="7.5" fill="#5B9BD5"/>
        <circle cx="64" cy="71" r="7.5" fill="#5B9BD5"/>
        {/* Shine dots */}
        <circle cx="41" cy="67" r="2.5" fill="white"/>
        <circle cx="67" cy="67" r="2.5" fill="white"/>

        {/* ── NOSE ── */}
        <circle cx="50" cy="84" r="4" fill="#FFB3C1"/>

        {/* ── MOUTH ── */}
        <path
          d={mouthPath}
          fill={mood === 'celebrate' ? '#FF8FAB' : 'none'}
          stroke="#E88FA0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Open smile tongue for celebrate */}
        {mood === 'celebrate' && (
          <ellipse cx="50" cy="100" rx="9" ry="5" fill="#EF5350" opacity="0.85"/>
        )}

        {/* ── BLUSH ── */}
        <ellipse cx="24" cy="82" rx="9" ry="5.5" fill="#FF9E6E" opacity="0.5"/>
        <ellipse cx="76" cy="82" rx="9" ry="5.5" fill="#FF9E6E" opacity="0.5"/>

        {/* ── BODY / LIGHT BLUE TOP ── */}
        <rect x="22" y="110" width="56" height="50" rx="12" fill="#4FC3F7"/>

        {/* ── HEART ON SHIRT (SVG path) ── */}
        <path
          d="M50,126 C50,126 44,120 44,116 C44,113 46.5,111 49,113 C49.5,113.4 49.8,113.8 50,114.2 C50.2,113.8 50.5,113.4 51,113 C53.5,111 56,113 56,116 C56,120 50,126 50,126Z"
          fill="#FFD700"
          opacity="0.9"
        />

        {/* Mood extras */}
        {mood === 'happy' && (
          <text x="86" y="58" fontSize="16" textAnchor="middle">⭐</text>
        )}
        {mood === 'celebrate' && (
          <>
            <text x="88" y="50" fontSize="15" textAnchor="middle">✨</text>
            <text x="12" y="50" fontSize="15" textAnchor="middle">✨</text>
          </>
        )}
        {mood === 'thinking' && (
          <text x="88" y="58" fontSize="14" textAnchor="middle">💭</text>
        )}
      </svg>
    </div>
  );
}
