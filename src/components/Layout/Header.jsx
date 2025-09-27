import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../data/auth';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir a la página principal después de logout
  };

  return (
    <header className="header">
      <Link to="/">
        <img 
          src="https://i.postimg.cc/wMJ2bCgV/mas-logos.jpg" 
          alt="Ministerio Vivos para Servir" 
          className="logo" 
        />
      </Link>
      
      <nav className="nav">
        {currentUser ? (
          <>
            {currentUser.role === 'student' && (
              <>
                <Link to="/student/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/student/profile" className="nav-link">Perfil</Link>
                <Link to="/student/achievements" className="nav-link">Logros</Link>
              </>
            )}
            {currentUser.role === 'professor' && (
              <>
                <Link to="/professor/dashboard" className="nav-link">Dashboard</Link>
              </>
            )}
            <button onClick={handleLogout} className="btn btn-secondary">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            <Link to="/register" className="nav-link">Registrarse</Link>
          </>
        )}
      </nav>

      {currentUser && (
        <div className="user-info">
          <div className="streak">
            <span>🔥</span>
            <span className="streak-count">
              {currentUser.role === 'student' ? currentUser.progress?.streak || 0 : '0'}
            </span>
          </div>
          <div className="avatar">
            {currentUser.name?.charAt(0) || 'U'}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;