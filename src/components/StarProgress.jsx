// 5-star progress bar component
export default function StarProgress({ score, total = 5 }) {
  return (
    <div className="star-progress" aria-label={`${score} out of ${total} stars`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`progress-star ${i < score ? 'filled' : 'empty'}`}
          aria-hidden="true"
        >
          {i < score ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}
