import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  // If no user is logged in, redirect to login
  
  

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }
  

 // If no specific roles required, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user has any of the allowed roles
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default ProtectedRoute;