import { Link } from 'react-router-dom';
import { useAuth } from '../../data/auth.jsx';
import { getAllWeeks } from '../../data/vocabulary';
import ProgressBar from '../../components/Game/ProgressBar';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const weeks = getAllWeeks();

  return (
    <div className="container">
      <h1>Dashboard del Estudiante</h1>
      <p>Bienvenido, {currentUser.name}. Aquí puedes ver tu progreso y acceder a las lecciones.</p>

      <div style={{ display: 'flex', gap: '20px', margin: '30px 0', flexWrap: 'wrap' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', minWidth: '200px' }}>
          <h3>Nivel</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--purple)' }}>
            {currentUser.progress.level}
          </p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', minWidth: '200px' }}>
          <h3>XP Total</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--green-primary)' }}>
            {currentUser.progress.xp}
          </p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', minWidth: '200px' }}>
          <h3>Racha Actual</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--red)' }}>
            {currentUser.progress.streak} días
          </p>
        </div>
      </div>

      <ProgressBar progress={currentUser.progress.xp % 100} />

      <h2 style={{ marginTop: '40px' }}>Semanas de Vocabulario</h2>
      <div className="dashboard-grid">
        {weeks.map(week => {
          const weekProgress = currentUser.progress.weekProgress[week] || { correct: 0, total: 0 };
          const isCompleted = currentUser.progress.completedWeeks.includes(week);
          const weekNumber = parseInt(week.replace('week', ''));

          return (
            <div key={week} className="week-card">
              <h3>Semana {weekNumber}</h3>
              <p>Vocabulario esencial de Griego Koiné</p>
              
              <div className="progress-info">
                <span>Progreso:</span>
                <span>{weekProgress.correct}/{weekProgress.total}</span>
              </div>
              
              {isCompleted && (
                <div style={{ color: 'var(--green-primary)', fontWeight: 'bold', marginTop: '10px' }}>
                  ✅ Completada
                </div>
              )}
              
              <Link 
                to={`/student/game/${week}`} 
                className="btn btn-primary"
                style={{ display: 'block', marginTop: '15px', textAlign: 'center' }}
              >
                {isCompleted ? 'Repasar' : 'Comenzar'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDashboard;