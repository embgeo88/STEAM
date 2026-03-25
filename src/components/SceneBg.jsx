// Decorative BabyBus-style nature background — fixed behind all content

function Tree({ x, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x}, 0) scale(${flip ? -scale : scale}, ${scale})`}>
      {/* Trunk */}
      <rect x="-12" y="80" width="24" height="55" rx="8" fill="#8B5A2B"/>
      <rect x="-6"  y="82" width="6"  height="50" rx="3" fill="#A06A35" opacity="0.5"/>
      {/* Canopy — layered circles for puffy look */}
      <circle cx="0"   cy="60" r="48" fill="#2E7D45"/>
      <circle cx="-28" cy="75" r="34" fill="#2E7D45"/>
      <circle cx="28"  cy="75" r="34" fill="#2E7D45"/>
      <circle cx="0"   cy="38" r="36" fill="#3D9B55"/>
      <circle cx="-22" cy="55" r="28" fill="#3D9B55"/>
      <circle cx="22"  cy="55" r="28" fill="#3D9B55"/>
      {/* Light highlight */}
      <circle cx="-10" cy="30" r="20" fill="#52C16A" opacity="0.65"/>
      <circle cx="8"   cy="22" r="14" fill="#6BD680" opacity="0.45"/>
    </g>
  );
}

function SmallBush({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0"  cy="0"  r="18" fill="#3D9B55"/>
      <circle cx="-14" cy="5" r="13" fill="#3D9B55"/>
      <circle cx="14"  cy="5" r="13" fill="#3D9B55"/>
      <circle cx="0"  cy="-8" r="13" fill="#52C16A"/>
    </g>
  );
}

function Flower({ x, y, color = '#FF6B9D' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0"  cy="-8" r="5" fill={color}/>
      <circle cx="6"  cy="-4" r="5" fill={color}/>
      <circle cx="6"  cy="3"  r="5" fill={color}/>
      <circle cx="0"  cy="7"  r="5" fill={color}/>
      <circle cx="-6" cy="3"  r="5" fill={color}/>
      <circle cx="-6" cy="-4" r="5" fill={color}/>
      <circle cx="0"  cy="0"  r="5" fill="#FFD700"/>
      <rect x="-2" y="8" width="4" height="16" rx="2" fill="#3D9B55"/>
    </g>
  );
}

export default function SceneBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Sky-to-grass gradient fill */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#87CEEB"/>
            <stop offset="58%"  stopColor="#B8E4F9"/>
            <stop offset="58%"  stopColor="#6EBF76"/>
            <stop offset="100%" stopColor="#4A9E55"/>
          </linearGradient>
          {/* Cloud shape filter */}
        </defs>

        {/* Background fill */}
        <rect width="1000" height="600" fill="url(#skyGrad)"/>

        {/* Ground detail strip */}
        <ellipse cx="500" cy="355" rx="600" ry="18" fill="#5AB060" opacity="0.6"/>

        {/* ── CLOUDS ── */}
        <g opacity="0.9">
          {/* Cloud 1 */}
          <circle cx="150" cy="80" r="35" fill="white"/>
          <circle cx="185" cy="68" r="42" fill="white"/>
          <circle cx="225" cy="75" r="35" fill="white"/>
          <circle cx="258" cy="85" r="28" fill="white"/>
          <circle cx="120" cy="92" r="25" fill="white"/>
          {/* Cloud 2 */}
          <circle cx="700" cy="60" r="30" fill="white"/>
          <circle cx="733" cy="48" r="38" fill="white"/>
          <circle cx="768" cy="55" r="30" fill="white"/>
          <circle cx="797" cy="68" r="22" fill="white"/>
          <circle cx="673" cy="72" r="22" fill="white"/>
          {/* Cloud 3 (small) */}
          <circle cx="500" cy="110" r="20" fill="white" opacity="0.75"/>
          <circle cx="522" cy="102" r="26" fill="white" opacity="0.75"/>
          <circle cx="548" cy="108" r="20" fill="white" opacity="0.75"/>
        </g>

        {/* ── LEFT TREES ── */}
        <Tree x="65"  scale={1.1}/>
        <Tree x="-10" scale={0.8}/>
        <Tree x="140" scale={0.7}/>

        {/* ── RIGHT TREES ── */}
        <Tree x="935" scale={1.1} flip/>
        <Tree x="1010" scale={0.85} flip/>
        <Tree x="860" scale={0.72} flip/>

        {/* ── BUSHES ── */}
        <SmallBush x="220" y="355"/>
        <SmallBush x="780" y="355"/>
        <SmallBush x="310" y="365"/>
        <SmallBush x="690" y="365"/>

        {/* ── FLOWERS ── */}
        <Flower x="270" y="360" color="#FF6B9D"/>
        <Flower x="340" y="370" color="#FF9B42"/>
        <Flower x="660" y="370" color="#A855F7"/>
        <Flower x="730" y="360" color="#FF6B9D"/>
        <Flower x="180" y="372" color="#FFD700"/>
        <Flower x="820" y="372" color="#FF9B42"/>

        {/* Small stones */}
        <ellipse cx="390" cy="372" rx="12" ry="7" fill="#9E9E9E" opacity="0.5"/>
        <ellipse cx="610" cy="372" rx="10" ry="6" fill="#9E9E9E" opacity="0.5"/>
      </svg>
    </div>
  );
}
