import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../src/context/userContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useContext(UserContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  
  return children;
};

export default ProtectedRoute;