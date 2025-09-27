// SOLO mantener UNA declaración de shuffleArray
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Obtener opciones aleatorias para una pregunta
export const getRandomOptions = (correctAnswer, vocabulary, count = 3) => {
  if (!vocabulary || vocabulary.length === 0) return [];
  
  const otherOptions = vocabulary
    .filter(item => item.greek !== correctAnswer.greek)
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .map(item => item.greek);
  
  const allOptions = [...otherOptions, correctAnswer.greek];
  return shuffleArray(allOptions);
};

// Inicializar el quiz
export const initializeQuiz = (vocabulary) => {
  if (!vocabulary || vocabulary.length === 0) {
    return {
      questions: [],
      currentQuestion: 0,
      score: 0,
      totalQuestions: 0
    };
  }
  
  const quizQuestions = shuffleArray([...vocabulary]);
  return {
    questions: quizQuestions,
    currentQuestion: 0,
    score: 0,
    totalQuestions: quizQuestions.length
  };
};

// Calcular puntuación final
export const calculateScore = (correctAnswers, totalQuestions) => {
  if (totalQuestions === 0) return { percentage: 0, message: "No hay preguntas" };
  
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  let message = '';
  
  if (percentage >= 80) {
    message = "¡Excelente trabajo! Dominas estas palabras griegas.";
  } else if (percentage >= 60) {
    message = "¡Buen trabajo! Sigue practicando para mejorar.";
  } else {
    message = "Sigue estudiando. ¡Puedes mejorar!";
  }
  
  return {
    percentage,
    message
  };
};