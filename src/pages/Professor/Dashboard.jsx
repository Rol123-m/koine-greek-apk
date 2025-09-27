import { useState } from 'react';
import { useAuth } from '../../data/auth.jsx';

// Datos de ejemplo para estudiantes
const mockStudents = [
  {
    id: 1,
    name: 'Ana Estudiante',
    email: 'ana@ejemplo.com',
    progress: {
      level: 5,
      xp: 250,
      streak: 3,
      completedWeeks: ['week1', 'week2'],
      weekProgress: {
        week1: { correct: 8, total: 10 },
        week2: { correct: 7, total: 10 }
      }
    }
  },
  {
    id: 2,
    name: 'Carlos Aprendiz',
    email: 'carlos@ejemplo.com',
    progress: {
      level: 3,
      xp: 120,
      streak: 1,
      completedWeeks: ['week1'],
      weekProgress: {
        week1: { correct: 6, total: 10 }
      }
    }
  },
  {
    id: 3,
    name: 'María Estudiante',
    email: 'maria@ejemplo.com',
    progress: {
      level: 7,
      xp: 420,
      streak: 5,
      completedWeeks: ['week1', 'week2', 'week3'],
      weekProgress: {
        week1: { correct: 9, total: 10 },
        week2: { correct: 8, total: 10 },
        week3: { correct: 7, total: 10 }
      }
    }
  }
];

const ProfessorDashboard = () => {
  const { currentUser } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="container">
      <h1>Dashboard del Profesor</h1>
      <p>Bienvenido, Profesor {currentUser.name}. Aquí puedes monitorear el progreso de tus estudiantes.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2>Tus Estudiantes</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mockStudents.map(student => (
              <li 
                key={student.id} 
                style={{ 
                  padding: '15px', 
                  borderBottom: '1px solid #eee', 
                  cursor: 'pointer',
                  backgroundColor: selectedStudent?.id === student.id ? 'var(--gray-light)' : 'transparent'
                }}
                onClick={() => setSelectedStudent(student)}
              >
                <div style={{ fontWeight: 'bold' }}>{student.name}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-dark)' }}>Nivel {student.progress.level}</div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          {selectedStudent ? (
            <>
              <h2>Progreso de {selectedStudent.name}</h2>
              <div style={{ display: 'flex', gap: '20px', margin: '20px 0', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--purple)' }}>
                    {selectedStudent.progress.level}
                  </div>
                  <div>Nivel</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--green-primary)' }}>
                    {selectedStudent.progress.xp}
                  </div>
                  <div>XP Total</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--red)' }}>
                    {selectedStudent.progress.streak}
                  </div>
                  <div>Días de racha</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--blue)' }}>
                    {selectedStudent.progress.completedWeeks.length}
                  </div>
                  <div>Semanas completadas</div>
                </div>
              </div>

              <h3>Progreso por Semana</h3>
              {selectedStudent.progress.completedWeeks.length > 0 ? (
                <div>
                  {selectedStudent.progress.completedWeeks.map(week => {
                    const weekProgress = selectedStudent.progress.weekProgress[week];
                    const weekNumber = parseInt(week.replace('week', ''));
                    const percentage = Math.round((weekProgress.correct / weekProgress.total) * 100);
                    
                    return (
                      <div key={week} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>Semana {weekNumber}</span>
                          <span style={{ fontWeight: 'bold' }}>{weekProgress.correct}/{weekProgress.total} ({percentage}%)</span>
                        </div>
                        <div style={{ height: '10px', background: '#eee', borderRadius: '5px' }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              width: `${percentage}%`, 
                              background: percentage >= 80 ? 'var(--green-primary)' : 
                                        percentage >= 60 ? 'var(--blue)' : 'var(--red)',
                              borderRadius: '5px'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>Este estudiante no ha completado ninguna semana aún.</p>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-dark)' }}>
              Selecciona un estudiante para ver su progreso
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;