import { Link } from 'react-router-dom';
import { useAuth } from '../data/auth';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '40px 0', minHeight: '60vh' }}>
        <h1>Aprende Griego Koiné</h1>
        <p>Ministerio Vivos para Servir - Sección Educativa</p>
        
        {currentUser ? (
          <div>
            <h2>¡Bienvenido de vuelta, {currentUser.name}!</h2>
            <p>Estamos contentos de verte de nuevo.</p>
            <div style={{ marginTop: '30px' }}>
              {currentUser.role === 'student' ? (
                <Link to="/student/dashboard" className="btn btn-primary">
                  Continuar Aprendiendo
                </Link>
              ) : (
                <Link to="/professor/dashboard" className="btn btn-primary">
                  Ver Dashboard
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2>Comienza tu viaje de aprendizaje</h2>
            <p>Descubre el griego koiné de manera interactiva y divertida.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;