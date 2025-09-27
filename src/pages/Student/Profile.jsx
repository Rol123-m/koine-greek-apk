import { useAuth } from '../../data/auth.jsx';

const StudentProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <h1>Perfil del Estudiante</h1>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Información Personal</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h3>{currentUser.name}</h3>
                <p>{currentUser.email}</p>
                <p style={{ color: 'var(--purple)', fontWeight: 'bold' }}>Estudiante</p>
              </div>
            </div>
            
            <div style={{ marginTop: '25px' }}>
              <h3>Estadísticas de Aprendizaje</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <div>
                  <strong>Nivel:</strong> {currentUser.progress.level}
                </div>
                <div>
                  <strong>XP Total:</strong> {currentUser.progress.xp}
                </div>
                <div>
                  <strong>Racha Actual:</strong> {currentUser.progress.streak} días
                </div>
                <div>
                  <strong>Semanas Completadas:</strong> {currentUser.progress.completedWeeks.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Progreso por Semana</h2>
            {currentUser.progress.completedWeeks.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {currentUser.progress.completedWeeks.map(week => {
                  const weekProgress = currentUser.progress.weekProgress[week];
                  const weekNumber = parseInt(week.replace('week', ''));
                  const percentage = Math.round((weekProgress.correct / weekProgress.total) * 100);
                  
                  return (
                    <li key={week} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Semana {weekNumber}</span>
                        <span style={{ fontWeight: 'bold', color: percentage >= 80 ? 'var(--green-primary)' : 'var(--red)' }}>
                          {percentage}%
                        </span>
                      </div>
                      <div style={{ height: '8px', background: '#eee', borderRadius: '4px', marginTop: '5px' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${percentage}%`, 
                            background: percentage >= 80 ? 'var(--green-primary)' : 'var(--blue)',
                            borderRadius: '4px'
                          }}
                        ></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Aún no has completado ninguna semana. ¡Comienza a aprender!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;