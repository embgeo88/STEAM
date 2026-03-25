import { useState } from 'react';
import SceneBg from './components/SceneBg';
import MainMenu from './components/MainMenu';
import MathGame from './games/MathGame';
import ABCGame from './games/ABCGame';
import ScienceGame from './games/ScienceGame';
import ShapesGame from './games/ShapesGame';
import WeatherGame from './games/WeatherGame';
import './App.css';

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);

  const handleBack = () => setCurrentGame(null);

  const renderGame = () => {
    switch (currentGame) {
      case 'math':    return <MathGame    onBack={handleBack} />;
      case 'abc':     return <ABCGame     onBack={handleBack} />;
      case 'science': return <ScienceGame onBack={handleBack} />;
      case 'shapes':  return <ShapesGame  onBack={handleBack} />;
      case 'weather': return <WeatherGame onBack={handleBack} />;
      default:        return <MainMenu    onSelectGame={setCurrentGame} />;
    }
  };

  return (
    <div className="app-root">
      <SceneBg />
      <div className="app-content">
        {renderGame()}
      </div>
    </div>
  );
}
