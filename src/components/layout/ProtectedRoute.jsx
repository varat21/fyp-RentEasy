// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   // Check for authentication token
//   const isAuthenticated = localStorage.getItem('user');

//   // If not authenticated, redirect to login page with return URL
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
//   }

//   // If authenticated, render the protected component
//   return children;
// };

// export default ProtectedRoute;






import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Extract token if user exists

  // console.log('ProtectedRoute - Is authenticated?', !!isAuthenticated); // Debugging line

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('ProtectedRoute - Redirecting to /login'); // Debugging line

      Navigate('/login');
    }
  }, [isAuthenticated]);


  return children;
};

export default ProtectedRoute;
