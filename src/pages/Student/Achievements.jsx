import { useAuth } from '../../data/auth';
import { achievements } from '../../data/achievements';

const Achievements = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Acceso restringido</h2>
          <p>Esta página es solo para estudiantes.</p>
        </div>
      </div>
    );
  }

  const userAchievements = currentUser.progress?.achievements || [];
  const totalAchievements = Object.keys(achievements).length;
  const unlockedCount = userAchievements.length;
  const progressPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const getAchievementProgress = (achievementId) => {
    const achievement = achievements[achievementId];
    if (!achievement) return 0;
    
    // Esto es un ejemplo simple, podrías hacerlo más detallado
    return achievement.condition(currentUser) ? 100 : 0;
  };

  return (
    <div className="container">
      <h1>Mis Logros</h1>
      
      <div className="achievements-stats">
        <div className="stat-card">
          <div className="stat-number">{unlockedCount}</div>
          <div className="stat-label">Logros Desbloqueados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalAchievements}</div>
          <div className="stat-label">Logros Totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{progressPercentage}%</div>
          <div className="stat-label">Progreso Total</div>
        </div>
      </div>

      <div className="achievements-grid">
        {Object.entries(achievements).map(([key, achievement]) => {
          const isUnlocked = userAchievements.includes(achievement.id);
          
          return (
            <div 
              key={key} 
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-name">{achievement.name}</div>
              <div className="achievement-description">{achievement.description}</div>
              
              {!isUnlocked && (
                <div className="achievement-progress">
                  <div 
                    className="achievement-progress-bar" 
                    style={{ width: `${getAchievementProgress(achievement.id)}%` }}
                  ></div>
                </div>
              )}
              
              {isUnlocked && (
                <div style={{ 
                  marginTop: '1rem', 
                  color: 'var(--gold)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  ✅ Desbloqueado
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;