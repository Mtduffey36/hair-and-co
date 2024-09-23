import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading  } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  if (user.role === 1 && user.isDefaultPassword && location.pathname !== '/ChangeDefaultPassword') {
    return <Navigate to="/ChangeDefaultPassword" replace />;
  }else if(user.role === 1 && !user.isDefaultPassword && location.pathname === '/ChangeDefaultPassword'){
    return   <Navigate to="/StylistsDashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;