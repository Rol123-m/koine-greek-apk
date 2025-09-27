import { useState, useEffect } from 'react';

export const useUserProgress = () => {
  const [progress, setProgress] = useState(() => {
    // Cargar desde localStorage si existe
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      streak: 0,
      level: 1,
      completedWeeks: [],
      weekProgress: {}
    };
  });

  useEffect(() => {
    // Guardar en localStorage cuando cambie
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const addXP = (points, week, correct, total) => {
    setProgress(prev => {
      const newXP = prev.xp + points;
      const newStreak = prev.streak + 1;
      
      // Calcular nuevo progreso basado en XP (100 XP por nivel)
      const newLevel = Math.floor(newXP / 100) + 1;
      const newProgress = (newXP % 100);
      
      // Actualizar progreso de la semana
      const newWeekProgress = {
        ...prev.weekProgress,
        [week]: { correct, total }
      };
      
      // Añadir semana completada si no está ya
      const newCompletedWeeks = prev.completedWeeks.includes(week)
        ? prev.completedWeeks
        : [...prev.completedWeeks, week];
      
      return {
        ...prev,
        xp: newXP,
        streak: newStreak,
        level: newLevel,
        progress: newProgress,
        completedWeeks: newCompletedWeeks,
        weekProgress: newWeekProgress
      };
    });
  };

  const resetProgress = () => {
    setProgress({
      xp: 0,
      streak: 0,
      level: 1,
      progress: 0,
      completedWeeks: [],
      weekProgress: {}
    });
  };

  const getWeekProgress = (week) => {
    return progress.weekProgress[week] || { correct: 0, total: 0 };
  };

  const isWeekCompleted = (week) => {
    return progress.completedWeeks.includes(week);
  };

  return {
    progress,
    addXP,
    resetProgress,
    getWeekProgress,
    isWeekCompleted
  };
};

export default useUserProgress;