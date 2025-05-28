import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/auth/refresh-token`, 
          {},
          { withCredentials: true }
        );
        
        const newToken = refreshResponse.data.token;
        localStorage.setItem('token', newToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/client/client-login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const propertyAPI = {
  registerProperty: (propertyData) => api.post('/api/auth/properties/register', propertyData),
  getProperty: () => api.get('/api/auth/properties'),
  updateProperty: (updates) => api.put('/api/auth/properties', updates),
  deleteProperty: () => api.delete('/api/auth/properties'),
};

export const mediaAPI = {
  uploadMedia: (formData) => api.post('/api/auth/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  }),
  getMedia: () => api.get('/api/auth/media'),
  deleteMediaItem: (type, mediaId) => api.delete(`/api/auth/media/${type}/${mediaId}`),
};

export const roomAPI = {
  getRoomTypes: () => api.get('/api/auth/rooms'),
  createRoomTypes: (roomTypes) => api.post('/api/auth/rooms', { roomTypes }),
  updateRoomAvailability: (roomType, count) => 
    api.patch('/api/auth/rooms/availability', { roomType, count }),
  getRoomAvailability: () => api.get('/api/rooms/auth/availability'),
  saveFloorData: (data) => api.post('/api/auth/rooms/floor', data),
   saveRoomRentData: (rentData) => api.post('/api/auth/rooms/rent', rentData)
};

// In your PropertyController.jsx or api configuration
export const pgAPI = {
  savePGProperty: (formData) => api.post('/api/auth/pg', formData),
  getPGProperty: () => api.get('/api/auth/pg'),
  
};
export const handleApiError = (error) => {
  const errorResponse = {
    success: false,
    message: 'An unexpected error occurred',
    status: error.response?.status || 500,
    error: null
  };

  if (error.response) {
    errorResponse.message = error.response.data?.message || 'Request failed';
    errorResponse.error = error.response.data?.error || error.response.data;
  } else if (error.request) {
    errorResponse.message = 'No response from server - please check your connection';
  } else {
    errorResponse.message = error.message || 'Request setup failed';
  }

  console.error('API Error:', {
    message: errorResponse.message,
    status: errorResponse.status,
    config: error.config,
    response: error.response?.data
  });

  return errorResponse;
};

export const apiCallWithRetry = async (apiCall, maxRetries = 2, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await apiCall();
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};