export const achievements = {
  // Logros por XP
  xp_100: {
    id: 'xp_100',
    name: 'Principiante Entusiasta',
    description: 'Alcanza 100 puntos de experiencia',
    icon: '🌟',
    condition: (user) => user.progress.xp >= 100
  },
  xp_500: {
    id: 'xp_500',
    name: 'Aprendiz Dedicado',
    description: 'Alcanza 500 puntos de experiencia',
    icon: '💫',
    condition: (user) => user.progress.xp >= 500
  },
  xp_1000: {
    id: 'xp_1000',
    name: 'Maestro del Griego',
    description: 'Alcanza 1000 puntos de experiencia',
    icon: '👑',
    condition: (user) => user.progress.xp >= 1000
  },

  // Logros por racha
  streak_7: {
    id: 'streak_7',
    name: 'Consistencia Semanal',
    description: 'Mantén una racha de 7 días',
    icon: '🔥',
    condition: (user) => user.progress.streak >= 7
  },
  streak_30: {
    id: 'streak_30',
    name: 'Compromiso Mensual',
    description: 'Mantén una racha de 30 días',
    icon: '⚡',
    condition: (user) => user.progress.streak >= 30
  },

  // Logros por semanas completadas
  weeks_3: {
    id: 'weeks_3',
    name: 'Explorador Vocabulario',
    description: 'Completa 3 semanas de vocabulario',
    icon: '📚',
    condition: (user) => user.progress.completedWeeks.length >= 3
  },
  weeks_all: {
    id: 'weeks_all',
    name: 'Dominador del Vocabulario',
    description: 'Completa todas las semanas disponibles',
    icon: '🏆',
    condition: (user) => user.progress.completedWeeks.length >= 5
  },

  // Logros por precisión
  perfect_week: {
    id: 'perfect_week',
    name: 'Perfeccionista',
    description: 'Completa una semana con 100% de precisión',
    icon: '🎯',
    condition: (user) => {
      return Object.values(user.progress.weekProgress).some(week => 
        week.correct === week.total && week.total > 0
      );
    }
  },

  // Logros especiales
  first_login: {
    id: 'first_login',
    name: 'Primeros Pasos',
    description: 'Inicia sesión por primera vez',
    icon: '🚀',
    condition: (user) => user.progress.xp > 0
  },
  speed_learner: {
    id: 'speed_learner',
    name: 'Aprendiz Rápido',
    description: 'Completa 2 semanas en un día',
    icon: '⚡',
    condition: (user) => {
      // Esto sería más complejo de implementar, es un ejemplo
      return user.progress.completedWeeks.length >= 2;
    }
  }
};

export const checkAchievements = (user) => {
  if (!user || !user.progress) return [];
  
  const unlocked = [];
  Object.values(achievements).forEach(achievement => {
    if (achievement.condition(user)) {
      unlocked.push(achievement);
    }
  });
  return unlocked;
};