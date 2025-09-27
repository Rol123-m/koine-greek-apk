import { Navigate } from 'react-router-dom';
import { useAuth } from '../../data/auth.jsx';

const PrivateRoute = ({ children, role }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;