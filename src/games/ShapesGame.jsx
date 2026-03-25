import { useState, useEffect, useCallback } from 'react';
import DuckCharacter from '../components/DuckCharacter';
import StarProgress from '../components/StarProgress';
import BackButton from '../components/BackButton';
import CelebrationScreen from '../components/CelebrationScreen';
import { speak, cancelSpeech } from '../utils/speech';
import { playCorrect, playWrong } from '../utils/audio';
import { shapesData, shapeColors } from '../data/gameData';

const ROUNDS = 10;

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function ShapeDrawing({ shape, color }) {
  const size = 160;

  switch (shape) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="circle">
          <circle cx="80" cy="80" r="72" fill={color} />
        </svg>
      );
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="square">
          <rect x="10" y="10" width="140" height="140" fill={color} />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="triangle">
          <polygon points="80,8 152,152 8,152" fill={color} />
        </svg>
      );
    case 'rectangle':
      return (
        <svg width={size + 60} height={size - 40} viewBox="0 0 220 120" aria-label="rectangle">
          <rect x="8" y="8" width="204" height="104" fill={color} />
        </svg>
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="star">
          <polygon
            points="80,8 96,58 150,58 105,88 121,140 80,110 39,140 55,88 10,58 64,58"
            fill={color}
          />
        </svg>
      );
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="heart">
          <path
            d="M80,140 C80,140 10,95 10,50 C10,25 28,10 50,15 C62,18 72,26 80,36 C88,26 98,18 110,15 C132,10 150,25 150,50 C150,95 80,140 80,140Z"
            fill={color}
          />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="diamond">
          <polygon points="80,8 152,80 80,152 8,80" fill={color} />
        </svg>
      );
    case 'oval':
      return (
        <svg width={size + 40} height={size - 40} viewBox="0 0 200 120" aria-label="oval">
          <ellipse cx="100" cy="60" rx="92" ry="52" fill={color} />
        </svg>
      );
    case 'pentagon':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="pentagon">
          <polygon points="80,8 152,62 124,148 36,148 8,62" fill={color} />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="hexagon">
          <polygon points="80,8 148,44 148,116 80,152 12,116 12,44" fill={color} />
        </svg>
      );
    case 'octagon':
      return (
        <svg width={size} height={size} viewBox="0 0 160 160" aria-label="octagon">
          <polygon points="52,8 108,8 152,52 152,108 108,152 52,152 8,108 8,52" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

function getAvailableShapes(score) {
  if (score < 3) return shapesData.filter((s) => s.level <= 1);
  if (score < 6) return shapesData.filter((s) => s.level <= 2);
  return shapesData;
}

function generateQuestion(score) {
  const available = getAvailableShapes(score);
  const correct = available[Math.floor(Math.random() * available.length)];
  const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];

  const wrongOptions = shuffleArray(
    shapesData.filter((s) => s.name !== correct.name)
  ).slice(0, 3);

  const options = shuffleArray([correct, ...wrongOptions]);

  return { correct, color, options };
}

export default function ShapesGame({ onBack }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [celebrated, setCelebrated] = useState(false);
  const [mood, setMood] = useState('idle');
  const [feedback, setFeedback] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [question, setQuestion] = useState(() => generateQuestion(0));

  const askQuestion = useCallback((currentScore) => {
    const q = generateQuestion(currentScore);
    setQuestion(q);
    setFeedback(null);
    setDisabled(false);
    setMood('idle');

    setTimeout(() => {
      speak(`What shape is this, deputy?`);
    }, 300);
  }, []);

  useEffect(() => {
    askQuestion(0);
    return () => cancelSpeech();
  }, []);

  const handleAnswer = useCallback(
    (option) => {
      if (disabled) return;
      setDisabled(true);

      if (option.name === question.correct.name) {
        playCorrect();
        setMood('celebrate');
        setFeedback('correct');
        speak(`Right on the money! That's a ${question.correct.name}!`);

        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= ROUNDS) {
          setTimeout(() => setCelebrated(true), 1200);
        } else {
          setTimeout(() => {
            setRound((r) => r + 1);
            askQuestion(newScore);
          }, 1400);
        }
      } else {
        playWrong();
        setMood('thinking');
        setFeedback('wrong');
        speak(`Oops! Try again, Deputy!`);

        setTimeout(() => {
          setFeedback(null);
          setDisabled(false);
          setMood('idle');
        }, 1400);
      }
    },
    [disabled, question, score, askQuestion]
  );

  if (celebrated) {
    return (
      <CelebrationScreen
        onContinue={() => {
          setScore(0);
          setRound(0);
          setCelebrated(false);
          askQuestion(0);
        }}
      />
    );
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <BackButton onBack={onBack} />
        <h2 className="game-title">🔷 Shape Sheriff!</h2>
        <StarProgress score={score} />
      </div>

      <div className="game-body">
        <div className="sheriff-side">
          <DuckCharacter mood={mood} size="medium" />
        </div>

        <div className="game-center">
          <div className="game-instruction">What shape is this, deputy?</div>

          {/* Shape display */}
          <div className="shape-display">
            <ShapeDrawing shape={question.correct.draw} color={question.color} />
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`feedback-banner ${feedback}`}>
              {feedback === 'correct'
                ? `✅ That's a ${question.correct.name}!`
                : '❌ Try again, Deputy!'}
            </div>
          )}

          {/* Answer buttons */}
          <div className="answer-buttons shape-buttons">
            {question.options.map((option, i) => (
              <button
                key={i}
                className="answer-btn shape-name-btn"
                onClick={() => handleAnswer(option)}
                disabled={disabled}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
