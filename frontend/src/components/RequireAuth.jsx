// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const RequireAuth = ({ children }) => {
//   const authToken = localStorage.getItem('authToken');

//   if (!authToken) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default RequireAuth;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const RequireAuth = ({ children }) => {
//   const authToken = localStorage.getItem('authToken');

//   if (!authToken) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default RequireAuth;




import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/check-auth', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        const data = await response.json();
        if (response.ok && data.message === 'User is authenticated') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;






