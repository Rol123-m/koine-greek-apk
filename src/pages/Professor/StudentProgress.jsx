import { useState } from 'react';
import { useAuth } from '../../data/auth.jsx';
import { getAllWeeks } from '../../data/vocabulary';

// Datos de ejemplo para estudiantes (los mismos que en Dashboard)
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

const StudentProgress = () => {
  const { currentUser } = useAuth();
  const [selectedWeek, setSelectedWeek] = useState('week1');
  const weeks = getAllWeeks();

  // Calcular estadísticas para la semana seleccionada
  const getWeekStats = () => {
    const studentsWithProgress = mockStudents.filter(student => 
      student.progress.completedWeeks.includes(selectedWeek)
    );

    const totalStudents = mockStudents.length;
    const completedStudents = studentsWithProgress.length;
    const completionRate = Math.round((completedStudents / totalStudents) * 100);
    
    let totalCorrect = 0;
    let totalQuestions = 0;
    let averageScore = 0;

    if (completedStudents > 0) {
      studentsWithProgress.forEach(student => {
        const weekProgress = student.progress.weekProgress[selectedWeek];
        totalCorrect += weekProgress.correct;
        totalQuestions += weekProgress.total;
      });
      
      averageScore = Math.round((totalCorrect / totalQuestions) * 100);
    }

    return {
      totalStudents,
      completedStudents,
      completionRate,
      averageScore
    };
  };

  const weekStats = getWeekStats();
  const weekNumber = parseInt(selectedWeek.replace('week', ''));

  return (
    <div className="container">
      <h1>Progreso de Estudiantes</h1>
      <p>Bienvenido, Profesor {currentUser.name}. Aquí puedes ver el progreso de todos tus estudiantes.</p>

      <div style={{ margin: '30px 0' }}>
        <label htmlFor="week-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Seleccionar Semana:
        </label>
        <select 
          id="week-select"
          value={selectedWeek} 
          onChange={(e) => setSelectedWeek(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '2px solid var(--gray)' }}
        >
          {weeks.map(week => (
            <option key={week} value={week}>
              Semana {week.replace('week', '')}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3>Total Estudiantes</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--purple)' }}>
            {weekStats.totalStudents}
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3>Completaron</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--green-primary)' }}>
            {weekStats.completedStudents}
          </div>
          <div>({weekStats.completionRate}%)</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3>Puntuación Promedio</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--blue)' }}>
            {weekStats.averageScore}%
          </div>
        </div>
      </div>

      <h2>Progreso Individual - Semana {weekNumber}</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--gray)' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Estudiante</th>
              <th style={{ padding: '12px' }}>Estado</th>
              <th style={{ padding: '12px' }}>Puntuación</th>
              <th style={{ padding: '12px' }}>Progreso</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map(student => {
              const hasCompleted = student.progress.completedWeeks.includes(selectedWeek);
              const weekProgress = hasCompleted ? student.progress.weekProgress[selectedWeek] : null;
              const percentage = hasCompleted ? Math.round((weekProgress.correct / weekProgress.total) * 100) : 0;
              
              return (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--gray-light)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{student.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--gray-dark)' }}>{student.email}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {hasCompleted ? (
                      <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>Completado</span>
                    ) : (
                      <span style={{ color: 'var(--gray-dark)' }}>Pendiente</span>
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {hasCompleted ? `${weekProgress.correct}/${weekProgress.total} (${percentage}%)` : '-'}
                  </td>
                  <td style={{ padding: '12px', width: '30%' }}>
                    <div style={{ height: '10px', background: '#eee', borderRadius: '5px' }}>
                      {hasCompleted && (
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${percentage}%`, 
                            background: percentage >= 80 ? 'var(--green-primary)' : 
                                      percentage >= 60 ? 'var(--blue)' : 'var(--red)',
                            borderRadius: '5px'
                          }}
                        ></div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProgress;