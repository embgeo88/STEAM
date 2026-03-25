import { useState, useEffect, useCallback } from 'react';
import Sheriff from '../components/Sheriff';
import StarProgress from '../components/StarProgress';
import BackButton from '../components/BackButton';
import CelebrationScreen from '../components/CelebrationScreen';
import { speak, cancelSpeech } from '../utils/speech';
import { playCorrect, playWrong } from '../utils/audio';
import { animalData, habitats, diets, allSounds } from '../data/gameData';

const ROUNDS = 10;
const QUESTION_TYPES = ['habitat', 'diet', 'sound'];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getRandomExcluding(arr, value) {
  const filtered = arr.filter((v) => v !== value);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function generateQuestion(roundNum) {
  const animal = animalData[roundNum % animalData.length];
  const qType = QUESTION_TYPES[roundNum % QUESTION_TYPES.length];

  if (qType === 'habitat') {
    const correctHabitat = habitats.find((h) => h.value === animal.habitat);
    const wrongOptions = shuffleArray(habitats.filter((h) => h.value !== animal.habitat)).slice(0, 2);
    const options = shuffleArray([correctHabitat, ...wrongOptions]);
    return {
      type: 'habitat',
      animal,
      question: `Where does a ${animal.name} live?`,
      options,
      correct: correctHabitat,
    };
  } else if (qType === 'diet') {
    const correctDiet = diets.find((d) => d.value === animal.diet);
    const wrongOptions = shuffleArray(diets.filter((d) => d.value !== animal.diet));
    const options = shuffleArray([correctDiet, ...wrongOptions]);
    return {
      type: 'diet',
      animal,
      question: `What does a ${animal.name} eat?`,
      options,
      correct: correctDiet,
    };
  } else {
    // sound
    const correctSound = animal.sound;
    const wrongSounds = shuffleArray(allSounds.filter((s) => s !== correctSound)).slice(0, 2);
    const options = shuffleArray([correctSound, ...wrongSounds]);
    return {
      type: 'sound',
      animal,
      question: `What sound does a ${animal.name} make?`,
      options,
      correct: correctSound,
    };
  }
}

export default function ScienceGame({ onBack }) {
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
      speak(q.question);
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
        question.type === 'sound'
          ? option === question.correct
          : option.value === question.correct.value;

      if (isCorrect) {
        playCorrect();
        setMood('celebrate');
        setFeedback('correct');

        const msg =
          question.type === 'habitat'
            ? `Woof! ${question.animal.name}s live on the ${question.animal.habitat}!`
            : question.type === 'diet'
            ? `Right on! ${question.animal.name}s eat ${question.animal.diet}!`
            : `Yee-haw! A ${question.animal.name} says ${question.animal.sound}!`;
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
        <h2 className="game-title">🔬 Critter Science!</h2>
        <StarProgress score={score} />
      </div>

      <div className="game-body">
        <div className="sheriff-side">
          <Sheriff mood={mood} size="medium" />
        </div>

        <div className="game-center">
          {/* Animal display */}
          <div className="animal-display" aria-label={question.animal.name}>
            <span className="animal-emoji">{question.animal.emoji}</span>
            <span className="animal-name">{question.animal.name}</span>
          </div>

          <div className="game-instruction">{question.question}</div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`feedback-banner ${feedback}`}>
              {feedback === 'correct' ? '✅ Great science, deputy!' : '❌ Try again, Deputy!'}
            </div>
          )}

          {/* Answer buttons */}
          <div className={`answer-buttons ${question.type === 'sound' ? 'sound-buttons' : ''}`}>
            {question.options.map((option, i) => (
              <button
                key={i}
                className={`answer-btn ${question.type === 'sound' ? 'sound-btn' : 'habitat-btn'}`}
                onClick={() => handleAnswer(option)}
                disabled={disabled}
              >
                {question.type === 'sound' ? option : option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
