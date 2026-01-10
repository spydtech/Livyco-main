export const getAuthToken = () => {
  // Check token in order of priority
  const token = localStorage.getItem('token');
  if (token) return token;
  
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) return adminToken;
  
  // Check in user objects
  try {
    const user = localStorage.getItem('user');
    const client = localStorage.getItem('client');
    
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) return userData.token;
    }
    
    if (client) {
      const clientData = JSON.parse(client);
      if (clientData.token) return clientData.token;
    }
  } catch (error) {
    console.error('Error parsing stored auth data:', error);
  }
  
  return null;
};

export const clearAuthTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('user');
  localStorage.removeItem('client');
};

export const setAuthToken = (token, userData = null) => {
  localStorage.setItem('token', token);
  
  if (userData) {
    const storageKey = userData.role === 'client' ? 'client' : 'user';
    localStorage.setItem(storageKey, JSON.stringify({ ...userData, token }));
    
    if (userData.role === 'admin') {
      localStorage.setItem('adminToken', token);
    }
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    const client = localStorage.getItem('client');
    
    if (user) {
      return JSON.parse(user);
    }
    
    if (client) {
      const clientData = JSON.parse(client);
      return { ...clientData, role: 'client' };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};