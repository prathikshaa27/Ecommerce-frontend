import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes('authToken'); 

  return isAuthenticated ? children : <Navigate to="/signinform" />;
};

export default ProtectedRoute;
