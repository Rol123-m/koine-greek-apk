import { launchConfetti } from '../../utils/animations';
import { calculateScore } from '../../utils/gameLogic';

const ResultsScreen = ({ correctAnswers, totalQuestions, onRestart }) => {
  const { percentage, message } = calculateScore(correctAnswers, totalQuestions);
  
  // Lanzar confeti al mostrar resultados
  launchConfetti();

  return (
    <div className="results-screen">
      <div className="celebration">🎉</div>
      <h2 className="results-title">¡Examen Completado!</h2>
      <div className="results-stats">
        <p>Has terminado todas las preguntas</p>
        <div className="results-score">
          {correctAnswers} / {totalQuestions} ({percentage}%)
        </div>
        <p>{message}</p>
      </div>
      <button className="btn btn-primary" onClick={onRestart}>
        Volver a Intentar
      </button>
    </div>
  );
};

export default ResultsScreen;