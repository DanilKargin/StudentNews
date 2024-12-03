import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user && user.role.length == 0) {
    // Пользователь не авторизован
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // У пользователя недостаточно прав
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;