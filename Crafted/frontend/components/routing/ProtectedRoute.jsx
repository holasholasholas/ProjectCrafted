import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../src/context/userContext';

const ProtectedRoute = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
// https://dev.to/mana95/understanding-about-react-outlet-with-proper-routing-2mo
  return <Outlet />;
};

export default ProtectedRoute;