import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user, client', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user, client');
    
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Initialize user from localStorage if available
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (userData, token, role) => {
//     const userObj = {
//       ...userData,
//       token,
//       role
//     };
    
//     setUser(userObj);
    
//     // Store based on role
//     if (role === 'client') {
//       localStorage.setItem('clientToken', token);
//       localStorage.setItem('client', JSON.stringify(userData));
//     } else {
//       localStorage.setItem('userToken', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     // Clear all auth data
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('user');
//     localStorage.removeItem('clientToken');
//     localStorage.removeItem('client');
//   };

//   useEffect(() => {
//     // Check both user and client authentication on mount
//     const initializeAuth = () => {
//       // Check for client auth first
//       const clientToken = localStorage.getItem('clientToken');
//       const clientData = localStorage.getItem('client');
      
//       if (clientToken && clientData) {
//         try {
//           const parsedClientData = JSON.parse(clientData);
//           setUser({
//             ...parsedClientData,
//             token: clientToken,
//             role: 'client'
//           });
//           setLoading(false);
//           return;
//         } catch (error) {
//           console.error('Error parsing client data:', error);
//         }
//       }
      
//       // Check for regular user auth
//       const userToken = localStorage.getItem('userToken');
//       const userData = localStorage.getItem('user');
      
//       if (userToken && userData) {
//         try {
//           const parsedUserData = JSON.parse(userData);
//           setUser({
//             ...parsedUserData,
//             token: userToken,
//             role: parsedUserData.role || 'user'
//           });
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//         }
//       }
      
//       setLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const value = {
//     user,
//     login,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);