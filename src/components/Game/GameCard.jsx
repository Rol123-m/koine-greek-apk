import { useState, useEffect } from 'react';
import { getRandomOptions } from '../../utils/gameLogic';
import { launchConfetti, showXPPopup } from '../../utils/animations';

const GameCard = ({ question, vocabulary, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [options, setOptions] = useState([]);

  // Reiniciar el estado cuando cambia la pregunta
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (question && vocabulary && vocabulary.length > 0) {
      const newOptions = getRandomOptions(question, vocabulary);
      setOptions(newOptions);
    }
  }, [question, vocabulary]);

  const handleAnswer = (option) => {
    if (showFeedback) return;
    
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    const isCorrect = option === question.greek;
    
    if (isCorrect) {
      launchConfetti();
      showXPPopup(10);
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  if (!question || options.length === 0) {
    return (
      <div className="exercise-card">
        <p>Cargando pregunta...</p>
      </div>
    );
  }

  return (
    <div className="exercise-card">
      <div style={{ textAlign: 'right', marginBottom: '10px', color: 'var(--gray-dark)' }}>
        Pregunta {questionNumber} de {totalQuestions}
      </div>
      
      <p className="instruction">Selecciona la palabra en griego que corresponde a:</p>
      <div className="word-bubble">{question.spanish}</div>
      
      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              showFeedback && option === question.greek ? 'correct' : ''
            } ${
              showFeedback && selectedAnswer === option && option !== question.greek ? 'incorrect' : ''
            } ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameCard;