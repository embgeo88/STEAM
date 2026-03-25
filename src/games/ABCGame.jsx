import { useState, useEffect, useCallback, useRef } from 'react';
import BunnyCharacter from '../components/BunnyCharacter';
import StarProgress from '../components/StarProgress';
import BackButton from '../components/BackButton';
import CelebrationScreen from '../components/CelebrationScreen';
import { speak, cancelSpeech } from '../utils/speech';
import { playCorrect, playWrong } from '../utils/audio';
import { abcData } from '../data/gameData';

const ROUNDS = 10;

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getQuestion(shuffled, index) {
  const item = shuffled[index % shuffled.length];
  const options = shuffleArray([
    { emoji: item.emoji, word: item.word, correct: true },
    { emoji: item.distractors[0], word: '', correct: false },
    { emoji: item.distractors[1], word: '', correct: false },
  ]);
  return { ...item, options };
}

export default function ABCGame({ onBack }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [celebrated, setCelebrated] = useState(false);
  const [mood, setMood] = useState('idle');
  const [feedback, setFeedback] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);

  const shuffledLetters = useRef(shuffleArray(abcData));

  const [question, setQuestion] = useState(() => getQuestion(shuffledLetters.current, 0));

  const askQuestion = useCallback((idx) => {
    const q = getQuestion(shuffledLetters.current, idx);
    setQuestion(q);
    setFeedback(null);
    setDisabled(false);
    setMood('idle');

    setTimeout(() => {
      speak(`The letter ${q.letter}! Find something that starts with ${q.letter}!`);
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

      if (option.correct) {
        playCorrect();
        setMood('celebrate');
        setFeedback('correct');
        speak(`Great job! ${question.word} starts with ${question.letter}!`);

        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= ROUNDS) {
          setTimeout(() => setCelebrated(true), 1200);
        } else {
          setTimeout(() => {
            const nextIdx = (letterIndex + 1) % shuffledLetters.current.length;
            setLetterIndex(nextIdx);
            setRound((r) => r + 1);
            askQuestion(nextIdx);
          }, 1400);
        }
      } else {
        playWrong();
        setMood('thinking');
        setFeedback('wrong');
        speak(`Oops! Try again! Find something that starts with ${question.letter}!`);

        setTimeout(() => {
          setFeedback(null);
          setDisabled(false);
          setMood('idle');
        }, 1400);
      }
    },
    [disabled, question, score, letterIndex, askQuestion]
  );

  if (celebrated) {
    return (
      <CelebrationScreen
        onContinue={() => {
          shuffledLetters.current = shuffleArray(abcData);
          setScore(0);
          setRound(0);
          setCelebrated(false);
          setLetterIndex(0);
          askQuestion(0);
        }}
      />
    );
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <BackButton onBack={onBack} />
        <h2 className="game-title">🔤 ABC Roundup!</h2>
        <StarProgress score={score} />
      </div>

      <div className="game-body">
        <div className="sheriff-side">
          <BunnyCharacter mood={mood} size="medium" />
        </div>

        <div className="game-center">
          {/* Big letter display */}
          <div className="big-letter" aria-label={`Letter ${question.letter}`}>
            {question.letter}
          </div>

          <div className="game-instruction">
            Find something that starts with <strong>{question.letter}</strong>!
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`feedback-banner ${feedback}`}>
              {feedback === 'correct'
                ? `✅ ${question.word} starts with ${question.letter}!`
                : '❌ Try again!'}
            </div>
          )}

          {/* Emoji option buttons */}
          <div className="answer-buttons">
            {question.options.map((option, i) => (
              <button
                key={i}
                className="answer-btn emoji-btn"
                onClick={() => handleAnswer(option)}
                disabled={disabled}
              >
                {option.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
