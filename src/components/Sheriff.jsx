// BabyBus-style cartoon police dog character

export default function Sheriff({ mood = 'idle', size = 'medium' }) {
  const sizeMap = {
    small:  { w: 70,  h: 112 },
    medium: { w: 100, h: 160 },
    large:  { w: 130, h: 208 },
  };

  const sz = sizeMap[size] || sizeMap.medium;

  // Mood-based eye/mouth/expression tweaks
  const moodFace = {
    idle:      { eyeY: 0,   mouthPath: 'M 41 87 Q 50 93 59 87', brow: 0 },
    happy:     { eyeY: 1,   mouthPath: 'M 40 85 Q 50 97 60 85', brow: -2 },
    thinking:  { eyeY: 0,   mouthPath: 'M 44 89 Q 50 92 56 89', brow: 2 },
    celebrate: { eyeY: 2,   mouthPath: 'M 38 84 Q 50 99 62 84', brow: -3 },
  };

  const face = moodFace[mood] || moodFace.idle;

  const animClass =
    mood === 'celebrate' ? 'sheriff-spin' :
    mood === 'happy'     ? 'sheriff-bounce' :
    'sheriff-bob';

  return (
    <div className={`sheriff-wrapper ${animClass}`} style={{ display: 'inline-block' }}>
      <svg
        viewBox="0 0 100 160"
        width={sz.w}
        height={sz.h}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.22))' }}
      >
        {/* ── EARS (behind head) ── */}
        <ellipse cx="17" cy="74" rx="14" ry="23" fill="#D4893A"/>
        <ellipse cx="17" cy="76" rx="9"  ry="17" fill="#C07828"/>
        <ellipse cx="83" cy="74" rx="14" ry="23" fill="#D4893A"/>
        <ellipse cx="83" cy="76" rx="9"  ry="17" fill="#C07828"/>

        {/* ── HEAD ── */}
        <circle cx="50" cy="70" r="37" fill="#E8A84A"/>

        {/* ── POLICE HAT ── */}
        {/* Hat crown */}
        <rect x="19" y="29" width="62" height="27" rx="6" fill="#1E3A5F"/>
        {/* Hat stripe band */}
        <rect x="14" y="52" width="72" height="10" rx="5" fill="#2B5F9E"/>
        <rect x="16" y="54" width="68" height="6"  rx="3" fill="white" opacity="0.55"/>
        {/* Hat brim */}
        <rect x="8"  y="59" width="84" height="8"  rx="4" fill="#1A305A"/>
        {/* Badge on hat */}
        <circle cx="50" cy="42" r="9"  fill="#2B5F9E"/>
        <circle cx="50" cy="42" r="7"  fill="#FFD700"/>
        <circle cx="50" cy="42" r="4"  fill="#E8B800"/>
        <circle cx="50" cy="42" r="2"  fill="#FFD700"/>

        {/* ── EYES ── */}
        <circle cx="37" cy={67 + face.eyeY} r="12.5" fill="white"/>
        <circle cx="63" cy={67 + face.eyeY} r="12.5" fill="white"/>
        <circle cx="38" cy={68 + face.eyeY} r="8"    fill="#111111"/>
        <circle cx="64" cy={68 + face.eyeY} r="8"    fill="#111111"/>
        {/* Eye shine */}
        <circle cx="41" cy={64 + face.eyeY} r="3"    fill="white"/>
        <circle cx="67" cy={64 + face.eyeY} r="3"    fill="white"/>

        {/* ── EYEBROWS ── */}
        <path
          d={`M 28 ${53 + face.brow} Q 37 ${50 + face.brow} 46 ${53 + face.brow}`}
          stroke="#8B5A2B" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
        <path
          d={`M 54 ${53 + face.brow} Q 63 ${50 + face.brow} 72 ${53 + face.brow}`}
          stroke="#8B5A2B" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />

        {/* ── NOSE ── */}
        <ellipse cx="50" cy="82" rx="9.5" ry="6.5" fill="#1A1A1A"/>
        <ellipse cx="47" cy="80" rx="2.5" ry="1.5" fill="white" opacity="0.4"/>

        {/* ── MOUTH ── */}
        <path
          d={face.mouthPath}
          stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />

        {/* ── BLUSH ── */}
        <ellipse cx="25" cy="79" rx="8"   ry="5.5" fill="#FF9E6E" opacity="0.5"/>
        <ellipse cx="75" cy="79" rx="8"   ry="5.5" fill="#FF9E6E" opacity="0.5"/>

        {/* ── BODY / UNIFORM ── */}
        <rect x="22" y="104" width="56" height="53" rx="12" fill="#1E3A5F"/>

        {/* Collar + tie */}
        <path d="M50 105 L43 117 L50 115 L57 117 Z" fill="#3A7FC1"/>
        <rect x="47" y="117" width="6" height="12" rx="2" fill="#3A7FC1"/>

        {/* Left epaulette */}
        <rect x="21" y="107" width="15" height="5"  rx="2.5" fill="#2B5F9E"/>
        <rect x="21" y="114" width="15" height="3.5" rx="1.5" fill="#FFD700"/>
        <rect x="21" y="119" width="15" height="3.5" rx="1.5" fill="#FFD700"/>

        {/* Right epaulette */}
        <rect x="64" y="107" width="15" height="5"  rx="2.5" fill="#2B5F9E"/>
        <rect x="64" y="114" width="15" height="3.5" rx="1.5" fill="#FFD700"/>
        <rect x="64" y="119" width="15" height="3.5" rx="1.5" fill="#FFD700"/>

        {/* Paw badge */}
        <circle cx="67" cy="131" r="9.5" fill="#FFD700"/>
        {/* Paw pad (center) */}
        <ellipse cx="67" cy="133" rx="3.5" ry="3"   fill="#E8A84A"/>
        {/* Toes */}
        <circle cx="62.5" cy="127.5" r="2.2" fill="#E8A84A"/>
        <circle cx="67"   cy="126"   r="2.2" fill="#E8A84A"/>
        <circle cx="71.5" cy="127.5" r="2.2" fill="#E8A84A"/>

        {/* Mood bubble (happy star, celebrate sparkles) */}
        {mood === 'happy' && (
          <text x="85" y="55" fontSize="18" textAnchor="middle">⭐</text>
        )}
        {mood === 'celebrate' && (
          <>
            <text x="88" y="48" fontSize="16" textAnchor="middle">✨</text>
            <text x="12" y="48" fontSize="16" textAnchor="middle">✨</text>
          </>
        )}
        {mood === 'thinking' && (
          <text x="88" y="55" fontSize="16" textAnchor="middle">💭</text>
        )}
      </svg>
    </div>
  );
}
