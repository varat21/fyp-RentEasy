import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for authentication token
  const isAuthenticated = localStorage.getItem('user');

  // If not authenticated, redirect to login page with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;