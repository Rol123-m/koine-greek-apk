import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../data/auth';
import { initializeQuiz } from '../../utils/gameLogic';
import { getVocabularyByWeek } from '../../data/vocabulary';
import GameCard from '../../components/Game/GameCard';
import Mascot from '../../components/Game/Mascot';
import ProgressBar from '../../components/Game/ProgressBar';
import ResultsScreen from '../../components/Game/ResultsScreen';

const StudentGame = () => {
  const { week } = useParams();
  const { currentUser, updateUserProgress } = useAuth();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Reiniciar el quiz cuando cambia la semana
  useEffect(() => {
    if (week) {
      const vocabulary = getVocabularyByWeek(week);
      const newQuiz = initializeQuiz(vocabulary);
      setQuiz(newQuiz);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResults(false);
      setIsChecking(false);
    }
  }, [week]);

  const handleAnswer = (isCorrect) => {
    if (isChecking || !quiz) return;
    
    setIsChecking(true);
    
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    // Avanzar después del feedback visual
    setTimeout(() => {
      setIsChecking(false);
      
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Quiz completado
        setShowResults(true);
        updateUserProgress(week, newScore, quiz.questions.length);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    const vocabulary = getVocabularyByWeek(week);
    const newQuiz = initializeQuiz(vocabulary);
    setQuiz(newQuiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setIsChecking(false);
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="container">
        <div className="exercise-card">
          <p>Cargando vocabulario de la semana {week?.replace('week', '')}...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="container">
      <h1>Semana {week?.replace('week', '')} - Práctica de Vocabulario</h1>
      
      <Mascot />
      <ProgressBar progress={progress} />
      
      {!showResults ? (
        <GameCard 
          question={currentQuestion}
          vocabulary={getVocabularyByWeek(week)}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
        />
      ) : (
        <ResultsScreen 
          correctAnswers={score}
          totalQuestions={quiz.questions.length}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
};

export default StudentGame;