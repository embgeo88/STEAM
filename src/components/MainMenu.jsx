import { useEffect } from 'react';
import Sheriff from './Sheriff';
import { speak, cancelSpeech } from '../utils/speech';

const menuItems = [
  { id: 'math',    emoji: '🔢', label: 'COUNT WITH ME',  sublabel: 'Numbers',  color: '#FF6B35', textColor: '#fff' },
  { id: 'abc',     emoji: '🔤', label: 'ABC ROUNDUP',    sublabel: 'Letters',  color: '#00B4D8', textColor: '#fff' },
  { id: 'science', emoji: '🐾', label: 'CRITTER PATROL', sublabel: 'Animals',  color: '#43AA8B', textColor: '#fff' },
  { id: 'shapes',  emoji: '🔷', label: 'SHAPE SQUAD',    sublabel: 'Shapes',   color: '#9B59B6', textColor: '#fff' },
  { id: 'weather', emoji: '🌤️', label: 'WEATHER WATCH',  sublabel: 'Weather',  color: '#3498DB', textColor: '#fff' },
];

export default function MainMenu({ onSelectGame }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      speak("Hello deputy! Pick a game to play!");
    }, 600);
    return () => {
      clearTimeout(timer);
      cancelSpeech();
    };
  }, []);

  return (
    <div className="main-menu">
      {/* Header card */}
      <div className="menu-header">
        <div className="menu-title-area">
          <div className="menu-title-top">⭐ SHERIFF LAB'S ⭐</div>
          <div className="menu-title-main">LEARNING STATION</div>
          <div className="menu-title-sub">🐾 Ready to learn, Deputy? 🐾</div>
        </div>
        <div className="menu-sheriff">
          <Sheriff mood="idle" size="large" />
          <div className="sheriff-speech-bubble">
            Hello Deputy!<br />Pick a game!
          </div>
        </div>
      </div>

      {/* Game buttons */}
      <div className="menu-grid">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="menu-game-btn"
            style={{ backgroundColor: item.color, color: item.textColor }}
            onClick={() => onSelectGame(item.id)}
            aria-label={`Play ${item.label}`}
          >
            <span className="menu-btn-emoji">{item.emoji}</span>
            <span className="menu-btn-label">{item.label}</span>
            <span className="menu-btn-sublabel">{item.sublabel}</span>
          </button>
        ))}
      </div>

      {/* Footer decoration */}
      <div className="menu-footer">
        🌿 &nbsp; ⭐ &nbsp; 🐾 &nbsp; ⭐ &nbsp; 🌿
      </div>
    </div>
  );
}
