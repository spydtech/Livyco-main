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






// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { user, loading } = useAuth();
  
//   // Show loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
  
//   // If no user is logged in, redirect to appropriate login
//   if (!user) {
//     // Determine which login page to redirect to based on the route
//     const path = window.location.pathname;
    
//     if (path.startsWith('/client/') || path.includes('/client-')) {
//       return <Navigate to="/client/client-login" replace />;
//     } else if (path.startsWith('/admin/')) {
//       return <Navigate to="/admin/login" replace />;
//     } else {
//       return <Navigate to="/user/login" replace />;
//     }
//   }

//   // If no specific roles required, allow access
//   if (allowedRoles.length === 0) {
//     return children;
//   }

//   // Check if user has any of the allowed roles
//   if (!allowedRoles.includes(user.role)) {
//     // Redirect to appropriate dashboard based on role
//     switch (user.role) {
//       case 'client':
//         return <Navigate to="/client/dashboard" replace />;
//       case 'admin':
//         return <Navigate to="/admin/dashboard" replace />;
//       case 'user':
//       case 'tenant':
//         return <Navigate to="/user/my-stay" replace />;
//       default:
//         return <Navigate to="/" replace />;
//     }
//   }

//   return children;
// };

// export default ProtectedRoute;