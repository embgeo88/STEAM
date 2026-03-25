// BabyBus-style cartoon duck character — Duckie

export default function DuckCharacter({ mood = 'idle', size = 'medium' }) {
  const sizeMap = {
    small:  { w: 65,  h: 100 },
    medium: { w: 95,  h: 146 },
    large:  { w: 120, h: 185 },
  };
  const sz = sizeMap[size] || sizeMap.medium;

  const animClass =
    mood === 'celebrate' ? 'sheriff-spin' :
    mood === 'happy'     ? 'sheriff-bounce' :
    'sheriff-bob';

  // Mouth path based on mood
  const mouthPath =
    mood === 'celebrate' ? 'M 38 86 Q 50 97 62 86' :
    mood === 'happy'     ? 'M 40 85 Q 50 94 60 85' :
    mood === 'thinking'  ? 'M 42 88 Q 50 90 58 88' :
                           'M 40 86 Q 50 93 60 86';

  // Bill open amount
  const billOpen = (mood === 'happy' || mood === 'celebrate') ? 8 : 4;

  return (
    <div className={`sheriff-wrapper ${animClass}`} style={{ display: 'inline-block' }}>
      <svg
        viewBox="0 0 100 150"
        width={sz.w}
        height={sz.h}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
      >
        {/* ── GREEN BEANIE ── */}
        <ellipse cx="50" cy="44" rx="37" ry="28" fill="#388E3C"/>
        {/* Brim roll */}
        <ellipse cx="50" cy="55" rx="40" ry="11" fill="#2E7D32"/>
        <ellipse cx="50" cy="53" rx="36" ry="7"  fill="#43A047"/>
        {/* Pom-pom button */}
        <circle cx="50" cy="16" r="7"   fill="#FFD54F"/>
        <circle cx="50" cy="16" r="5"   fill="#FFEE58"/>

        {/* ── HEAD ── */}
        <circle cx="50" cy="74" r="36" fill="#FFD54F"/>

        {/* ── EYES ── */}
        <circle cx="36"  cy="66" r="12" fill="white"/>
        <circle cx="64"  cy="66" r="12" fill="white"/>
        <circle cx="37"  cy="67" r="8"  fill="#5D4037"/>
        <circle cx="65"  cy="67" r="8"  fill="#5D4037"/>
        {/* Shine */}
        <circle cx="40"  cy="63" r="3"  fill="white"/>
        <circle cx="68"  cy="63" r="3"  fill="white"/>

        {/* ── FRECKLE SPOTS ── */}
        <circle cx="44" cy="57" r="2.5" fill="#A1887F" opacity="0.55"/>
        <circle cx="50" cy="55" r="2.5" fill="#A1887F" opacity="0.55"/>
        <circle cx="56" cy="57" r="2.5" fill="#A1887F" opacity="0.55"/>

        {/* ── DUCK BILL ── */}
        {/* Upper bill */}
        <path
          d={`M 34 82 Q 50 92 66 82 Q 64 ${90 + billOpen} 50 ${94 + billOpen} Q 36 ${90 + billOpen} 34 82`}
          fill="#FF8F00"
        />
        {/* Lower bill (shows when open) */}
        {billOpen > 4 && (
          <>
            <path
              d={`M 37 ${88} Q 50 ${95 + billOpen} 63 ${88}`}
              fill="#E65100"
            />
            {/* Tongue */}
            <ellipse cx="50" cy={93 + billOpen} rx="8" ry="4.5" fill="#EF5350" opacity="0.85"/>
          </>
        )}
        {/* Bill highlight */}
        <ellipse cx="50" cy="84" rx="9" ry="3" fill="#FFA726" opacity="0.5"/>

        {/* ── BLUSH ── */}
        <ellipse cx="24" cy="78" rx="8"   ry="5.5" fill="#FF9E6E" opacity="0.5"/>
        <ellipse cx="76" cy="78" rx="8"   ry="5.5" fill="#FF9E6E" opacity="0.5"/>

        {/* ── BODY / GREEN HOODIE ── */}
        <rect x="22" y="106" width="56" height="44" rx="13" fill="#4CAF50"/>
        {/* Hoodie front pocket */}
        <rect x="33" y="118" width="34" height="22" rx="9"  fill="#388E3C" opacity="0.8"/>
        {/* Pocket shine */}
        <rect x="36" y="120" width="10" height="4"  rx="2"  fill="#66BB6A" opacity="0.5"/>

        {/* ── ORANGE FEET ── */}
        <ellipse cx="36" cy="148" rx="13" ry="7" fill="#FF8F00"/>
        <ellipse cx="64" cy="148" rx="13" ry="7" fill="#FF8F00"/>
        {/* Toe lines */}
        <line x1="28" y1="148" x2="26" y2="144" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="145" x2="36" y2="141" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="44" y1="148" x2="46" y2="144" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round"/>

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
