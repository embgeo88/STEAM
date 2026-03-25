import { useState, useEffect, useCallback, useRef } from 'react';
import DuckCharacter from '../components/DuckCharacter';
import StarProgress from '../components/StarProgress';
import BackButton from '../components/BackButton';
import CelebrationScreen from '../components/CelebrationScreen';
import { speak, cancelSpeech } from '../utils/speech';
import { playCorrect, playWrong } from '../utils/audio';
import { mathEmojis } from '../data/gameData';

const ROUNDS = 10;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChoices(correct) {
  const choices = new Set([correct]);
  while (choices.size < 3) {
    let wrong = getRandomInt(Math.max(1, correct - 4), correct + 4);
    if (wrong !== correct && wrong >= 1 && wrong <= 10) choices.add(wrong);
  }
  return [...choices].sort(() => Math.random() - 0.5);
}

export default function MathGame({ onBack }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [celebrated, setCelebrated] = useState(false);
  const [mood, setMood] = useState('idle');
  const [feedback, setFeedback] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const emojiSet = mathEmojis[round % mathEmojis.length];
  // Progressive: range 1-5 first 3 rounds, 1-10 after
  const maxN = round < 3 ? 5 : 10;
  const questionRef = useRef(null);

  // Generate a stable question per round
  const [question, setQuestion] = useState(() => {
    const n = getRandomInt(1, 5);
    return { n, choices: generateChoices(n), emojiSet: mathEmojis[0] };
  });

  const askQuestion = useCallback((roundNum) => {
    const eSet = mathEmojis[roundNum % mathEmojis.length];
    const max = roundNum < 3 ? 5 : 15;
    const n = getRandomInt(1, Math.min(roundNum + 2, 15));
    const q = { n, choices: generateChoices(n), emojiSet: eSet };
    setQuestion(q);
    setFeedback(null);
    setDisabled(false);
    setMood('idle');

    setTimeout(() => {
      speak(`How many ${eSet.name} do you see? Count them!`);
    }, 300);
  }, []);

  useEffect(() => {
    askQuestion(0);
    return () => cancelSpeech();
  }, []);

  const handleAnswer = useCallback(
    (choice) => {
      if (disabled) return;
      setDisabled(true);

      if (choice === question.n) {
        playCorrect();
        setMood('celebrate');
        setFeedback('correct');
        speak(`Woof woof! That's right, Deputy! ${choice}!`);

        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= ROUNDS) {
          setTimeout(() => setCelebrated(true), 1200);
        } else {
          setTimeout(() => {
            const nextRound = round + 1;
            setRound(nextRound);
            askQuestion(nextRound);
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
          setTimeout(() => speak(`How many ${question.emojiSet.name} do you see?`), 300);
        }, 1400);
      }
    },
    [disabled, question, score, round, askQuestion]
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
        <h2 className="game-title">🔢 Count With Me!</h2>
        <StarProgress score={score} />
      </div>

      <div className="game-body">
        <div className="sheriff-side">
          <DuckCharacter mood={mood} size="medium" />
        </div>

        <div className="game-center">
          {/* Emoji display */}
          <div className="emoji-display" aria-label={`${question.n} ${question.emojiSet.name}`}>
            {Array.from({ length: question.n }).map((_, i) => (
              <span key={i} className="count-emoji">
                {question.emojiSet.emoji}
              </span>
            ))}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`feedback-banner ${feedback}`}>
              {feedback === 'correct' ? '✅ Woof! Correct!' : '❌ Try again, Deputy!'}
            </div>
          )}

          {/* Answer buttons */}
          <div className="answer-buttons">
            {question.choices.map((choice) => (
              <button
                key={choice}
                className="answer-btn number-btn"
                onClick={() => handleAnswer(choice)}
                disabled={disabled}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
