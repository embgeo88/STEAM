import { useEffect, useRef } from 'react';
import Sheriff from './Sheriff';
import DuckCharacter from './DuckCharacter';
import BunnyCharacter from './BunnyCharacter';
import { playCelebration } from '../utils/audio';
import { speak, cancelSpeech } from '../utils/speech';

const CONFETTI_COLORS = [
  '#00B4D8', '#43AA8B', '#FF6B35', '#9B59B6',
  '#FFD700', '#3498DB', '#E91E63', '#87CEEB',
];

function ConfettiPiece({ style }) {
  return <div className="confetti-piece" style={style} aria-hidden="true" />;
}

export default function CelebrationScreen({ onContinue, gameName }) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    playCelebration();
    speak(`Amazing work, deputy! You earned a star badge! You are a STEM superstar!`);

    return () => {
      cancelSpeech();
    };
  }, []);

  // Generate confetti pieces
  const confetti = Array.from({ length: 40 }).map((_, i) => {
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const left = `${Math.random() * 100}%`;
    const delay = `${Math.random() * 2}s`;
    const duration = `${2 + Math.random() * 2}s`;
    const size = `${8 + Math.floor(Math.random() * 12)}px`;
    const isRect = i % 3 !== 0;

    return {
      style: {
        left,
        top: '-20px',
        width: isRect ? `${parseInt(size) / 2}px` : size,
        height: size,
        backgroundColor: color,
        borderRadius: isRect ? '2px' : '50%',
        animationDelay: delay,
        animationDuration: duration,
      },
      key: i,
    };
  });

  return (
    <div className="celebration-screen">
      {confetti.map(({ style, key }) => (
        <ConfettiPiece key={key} style={style} />
      ))}

      <div className="celebration-content">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: '8px' }}>
          <Sheriff mood="celebrate" size="medium" />
          <DuckCharacter mood="celebrate" size="medium" />
          <BunnyCharacter mood="celebrate" size="medium" />
        </div>

        <div className="celebration-title">
          🌟 AMAZING WORK! 🌟
        </div>

        <div className="celebration-subtitle">
          You earned a star badge, Deputy!
        </div>

        <div className="celebration-badge">⭐⭐⭐⭐⭐</div>

        <button
          className="celebration-button"
          onClick={onContinue}
        >
          Play Again! 🐾
        </button>
      </div>
    </div>
  );
}
