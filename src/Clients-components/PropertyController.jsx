import axios from 'axios';


export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create a separate axios instance without interceptors for token refresh
const refreshApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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

// Response interceptor with token refresh and navigation handling
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle network errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject({ message: 'Request timeout. Please try again.' });
      }
      
      // Redirect to appropriate login page based on user role
      const user = JSON.parse(localStorage.getItem('user'));
      const loginPath = user?.role === 'client' ? '/client/client-login' : '/user/login';
      window.location.href = loginPath;
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    }

    // Handle 401 Unauthorized (token expired)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshResponse = await refreshApi.post(
          '/api/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        
        const newToken = refreshResponse.data.token;
        localStorage.setItem('token', newToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        
        // Clear user data and redirect to appropriate login page
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        const loginPath = refreshError.response?.data?.userType === 'client' 
          ? '/client/client-login' 
          : '/user/login';
        window.location.href = loginPath;
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other error statuses
    if (error.response.status === 403) {
      // Forbidden - redirect to home or appropriate page
      window.location.href = '/';
    }

    return Promise.reject(error.response.data || error);
  }
);

export const propertyAPI = {
  registerProperty: (propertyData) => api.post('/api/auth/properties/register', propertyData),
  reverseGeocode: (lat, lon) => api.get(`/api/auth/properties/geocode?lat=${lat}&lon=${lon}`),
  getProperty: () => api.get(`/api/auth/properties`),
  updateProperty: (propertyId, updates) => api.put(`/api/auth/properties/${propertyId}`, updates),
  deleteProperty: (propertyId) => api.delete(`/api/auth/properties/${propertyId}`),
  
  getCompletePropertyData: () => 
    api.get('/api/auth/properties/complete')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Invalid response format');
        }
        return response;
      }),
  
   toggleFavorite: (propertyId) => 
    api.post('/api/auth/properties/favorite', { propertyId }),
   
   //admin side 
    getAllClientProperties: (params = {}) =>
    api.get('/api/auth/properties/client-all', { params }) // Corrected URL path
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Invalid response format');
        }
        return response;
      }),
};



export const chatAPI = {
  getConversations: async () => {
    try {
      const response = await api.get('/api/chat/conversations');
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },
    
  getMessages: async (recipientId, propertyId) => {
    try {
      if (!recipientId || !propertyId) {
        console.error('Missing parameters:', { recipientId, propertyId });
        throw new Error('Recipient ID and Property ID are required');
      }
      
      const response = await api.get(`/api/chat/messages/${recipientId}/${propertyId}`);
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format');
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for ${recipientId}/${propertyId}:`, error);
      throw error;
    }
  },
      
  sendMessage: async (messageData) => {
    try {
      const requiredFields = ['recipientId', 'propertyId', 'content'];
      const missingFields = requiredFields.filter(field => !messageData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const response = await api.post('/api/chat/messages', messageData);
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to send message');
      }
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  getUnreadCount: async () => {
    try {
      const response = await api.get('/api/chat/messages/unread');
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to get unread count');
      }
      return response.data;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  },
  
  markAsRead: async (messageIds) => {
    try {
      if (!messageIds || messageIds.length === 0) {
        throw new Error('Message IDs are required');
      }
      const response = await api.patch('/api/chat/messages/read', { messageIds });
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to mark messages as read');
      }
      return response.data;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }
};
export const userAPI = {
// registerByClient: (userData) => {
//   // ... existing code ...
//   return api.post('/client/register', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     }
//   });
// }
updateUser: (data) => api.put('/api/auth/user/profile', data),
getUser: () => api.get('/api/auth/user'),
addTenantByClient: (formData) => {
  return api.post('/api/auth/client/register-by-client', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
}
};

export const bookingAPI = {
  /**
   * Fetches all bookings from the backend.
   * Requires client role on the backend for this endpoint.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the API response.
   */
  getBookingDetails: (bookingId) => api.get(`/api/auth/bookings/${bookingId}`)
    .then(response => {
      // Basic success check for the response structure
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for fetching booking details');
      }
      return response;
    }),

  approveBooking: (bookingId) => api.patch(`/api/auth/bookings/${bookingId}/approve`)
  .then(response => {
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Booking approval failed');
    }
    return response;
  }),

  rejectBooking: (bookingId, reason) => api.post(`/api/auth/bookings/${bookingId}/reject`, { reason })
    .then(response => {
      // Basic success check for the response structure
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for rejecting booking');
      }
      return response;
    }),
  getAllBookings: () => api.get('/api/auth/bookings')
    .then(response => {
      // Basic success check for the response structure
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for fetching bookings');
      }
      return response;
    }),
  getBookingsByProperty: () => api.get('/api/auth/bookings/property')
    .then(response => {
      // Basic success check for the response structure
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for fetching bookings by property');
      }
      return response;
    }),

  /**
   * Creates a new booking.
   * @param {object} bookingData - The booking details (propertyId, roomTypeId, roomId, moveInDate, moveOutDate).
   * @returns {Promise<AxiosResponse>} A promise that resolves to the API response.
   */
  createBooking: (bookingData) => api.post('/api/auth/bookings', bookingData)
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for creating booking');
      }
      return response;
    }),

 
};

export const mediaAPI = {
  uploadMedia: (formData) => api.post('/api/auth/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  }),
  getMedia: () => api.get('/api/auth/media'),
  deleteMediaItem: (mediaId) => api.delete(`/api/auth/media/${mediaId}`),
  editMediaItem: (type, mediaId, updates) =>
    api.put(`/api/auth/media/${type}/${mediaId}`, updates),
  getMediaByProperty: (propertyId) => api.get(`/api/auth/media/property/${propertyId}`),
};

// export const roomAPI = {
//   getRoomTypes: () => api.get('/api/auth/rooms'),
//   createRoomTypes: (roomTypes, propertyId) => api.post(`/api/auth/rooms/${propertyId}`, { roomTypes }),
//   updateRoomAvailability: (roomType, count) => 
//     api.patch('/api/auth/rooms/availability', { roomType, count }),
//   getRoomAvailability: () => api.get('/api/rooms/auth/availability'),
//   saveFloorData: (data) => api.post('/api/auth/rooms/floor', data),
//   saveRoomRentData: (rentData) => api.post('/api/auth/rooms/rent', rentData),
//   deleteRoomType: (roomTypeId) =>
//     api.delete(`/api/auth/rooms/${roomTypeId}`),
//   updateRoomType: ( propertyId, updates) =>
//     api.put(`/api/auth/rooms/${propertyId}`, updates),
// };

export const roomAPI = {
  // Create or update room types
  createRoomTypes: (propertyId, data) => 
    api.post(`/api/auth/${propertyId}/rooms`, data),
  
  // Get room types
  getRoomTypes: (propertyId) => 
    api.get(`/api/auth/${propertyId}/rooms`),
  
  // Get floor data
  getFloorData: (propertyId) => 
    api.get(`/api/auth/${propertyId}/rooms/floor`),
  
  // Save floor data
  saveFloorData: (propertyId, data) => 
    api.post(`/api/auth/${propertyId}/rooms/floor`, data),
  
  // Get room rent data
  getRoomRentData: (propertyId) => 
    api.get(`/api/auth/${propertyId}/rooms/rent`),
  
  // Save room rent data
  saveRoomRentData: (propertyId, data) => 
    api.post(`/api/auth/${propertyId}/rooms/rent`, data),
  
  // Delete room type
  deleteRoomType: (propertyId, roomTypeId) =>
    api.delete(`/api/auth/rooms/${propertyId}/${roomTypeId}`),
  
  // Update room type
  updateRoomType: (propertyId, roomTypeId, data) =>
    api.put(`/api/auth/${propertyId}/rooms/${roomTypeId}`, data),
};






// In your PropertyController.jsx or api configuration
// export const pgAPI = {
//   savePGProperty: (formData) => api.post('/api/auth/pg', formData),
//   getPGProperty: () => api.get('/api/auth/pg'),
//   updatePGProperty: (propertyId, formData) => 
//     api.put('/api/auth/pg', { ...formData, propertyId }),
  
//   deletePGProperty: (propertyId) => 
//     api.delete(`/api/auth/pg/${propertyId}`),
  
// };

export const pgAPI = {
  savePGProperty: (propertyId, formData) => 
    propertyId
      ? api.put(`/api/auth/pg/${propertyId}`, formData)
      : api.post('/api/auth/pg', formData),
  
  getPGProperty: (propertyId) => 
    api.get(`/api/auth/pg/${propertyId}`),
  
  deletePGProperty: (pgId) => 
    api.delete(`/api/auth/pg/${pgId}`),
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