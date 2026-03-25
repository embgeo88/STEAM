// Western-styled back button (arrow sign shape)
export default function BackButton({ onBack }) {
  return (
    <button
      className="back-button"
      onClick={onBack}
      aria-label="Back to main menu"
    >
      <span className="back-arrow">◀</span>
      <span className="back-text">Home</span>
    </button>
  );
}
