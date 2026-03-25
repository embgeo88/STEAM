import { useState, useEffect, useCallback } from 'react';
import BunnyCharacter from '../components/BunnyCharacter';
import StarProgress from '../components/StarProgress';
import BackButton from '../components/BackButton';
import CelebrationScreen from '../components/CelebrationScreen';
import { speak, cancelSpeech } from '../utils/speech';
import { playCorrect, playWrong } from '../utils/audio';
import { weatherScenes, weatherIdentify } from '../data/gameData';

const ROUNDS = 10;

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(roundNum) {
  const isIdentify = roundNum % 2 === 1;

  if (isIdentify) {
    const item = weatherIdentify[Math.floor(Math.random() * weatherIdentify.length)];
    return {
      type: 'identify',
      description: item.description,
      answer: item.answer,
      name: item.name,
      options: shuffleArray(item.options),
    };
  } else {
    const scene = weatherScenes[Math.floor(Math.random() * weatherScenes.length)];
    const options = shuffleArray([scene.correctItem, ...scene.wrongItems]);
    return {
      type: 'dress',
      scene,
      options,
      correct: scene.correctItem,
    };
  }
}

export default function WeatherGame({ onBack }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [celebrated, setCelebrated] = useState(false);
  const [mood, setMood] = useState('idle');
  const [feedback, setFeedback] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [question, setQuestion] = useState(() => generateQuestion(0));

  const askQuestion = useCallback((roundNum) => {
    const q = generateQuestion(roundNum);
    setQuestion(q);
    setFeedback(null);
    setDisabled(false);
    setMood('idle');

    setTimeout(() => {
      if (q.type === 'dress') {
        speak(`${q.scene.description} What should you wear or bring?`);
      } else {
        speak(`${q.description} What is the weather?`);
      }
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

      const isCorrect =
        question.type === 'identify'
          ? option === question.answer
          : option.emoji === question.correct.emoji;

      if (isCorrect) {
        playCorrect();
        setMood('celebrate');
        setFeedback('correct');

        const msg =
          question.type === 'identify'
            ? `Woof! It's ${question.name}!`
            : `Right on! You need a ${question.correct.label} for ${question.scene.name} weather!`;
        speak(msg);

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
        <h2 className="game-title">🌤️ Weather Watch!</h2>
        <StarProgress score={score} />
      </div>

      <div className="game-body">
        <div className="sheriff-side">
          <BunnyCharacter mood={mood} size="medium" />
        </div>

        <div className="game-center">
          {question.type === 'dress' ? (
            <>
              {/* Weather scene */}
              <div className="weather-scene">
                <span className="weather-emoji">{question.scene.emoji}</span>
                <div className="weather-desc">{question.scene.description}</div>
              </div>

              <div className="game-instruction">What should you bring or wear?</div>

              {/* Feedback banner */}
              {feedback && (
                <div className={`feedback-banner ${feedback}`}>
                  {feedback === 'correct' ? '✅ Great weather wisdom!' : '❌ Try again, Deputy!'}
                </div>
              )}

              <div className="answer-buttons">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    className="answer-btn weather-item-btn"
                    onClick={() => handleAnswer(option)}
                    disabled={disabled}
                  >
                    <span className="weather-item-emoji">{option.emoji}</span>
                    <span className="weather-item-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Identify weather */}
              <div className="weather-scene identify-scene">
                <div className="weather-desc large-desc">{question.description}</div>
              </div>

              <div className="game-instruction">What is the weather?</div>

              {/* Feedback banner */}
              {feedback && (
                <div className={`feedback-banner ${feedback}`}>
                  {feedback === 'correct' ? '✅ You know your weather!' : '❌ Try again, Deputy!'}
                </div>
              )}

              <div className="answer-buttons">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    className="answer-btn weather-emoji-btn"
                    onClick={() => handleAnswer(option)}
                    disabled={disabled}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
