import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('userEmail');
  
  // If no token, redirect to login
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected content)
  return children;
};

export default PrivateRoute;
