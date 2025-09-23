import axios from 'axios';


// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.livyco.com';

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

//whishlist
export const wishlistAPI = {
  // Add property to wishlist (send both userId and propertyId)
  addToWishlist: (userId, propertyId) =>
    api.post('/api/wishlist/add', { userId, propertyId })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add to wishlist');
        }
        return response;
      }),

  // Remove property from wishlist
  removeFromWishlist: (userId, propertyId) =>
    api.delete(`/api/wishlist/remove/${userId}/${propertyId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to remove from wishlist');
        }
        return response;
      }),

  // Get wishlist for a user
  getUserWishlist: (userId) =>
    api.get(`/api/wishlist/user/${userId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch wishlist');
        }
        return response;
      }),

  // Check if property is in wishlist
  checkWishlistStatus: (userId, propertyId) =>
    api.get(`/api/wishlist/check/${userId}/${propertyId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to check wishlist status');
        }
        return response;
      }),

  // Get single wishlist item by ID
  getWishlistItem: (wishlistItemId) =>
    api.get(`/api/wishlist/item/${wishlistItemId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch wishlist item');
        }
        return response;
      }),

  // Admin: Get all wishlist items
  getAllWishlistItems: () =>
    api.get('/api/wishlist/all')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch all wishlist items');
        }
        return response;
      }),
};


export const menuAPI = {
  // Get all food items
  getFoodItems: () => 
    api.get('/api/menu')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch food items');
        }
        return response;
      }),

  // Get weekly menu
  getWeeklyMenu: () => 
    api.get('/api/menu/weekly')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch weekly menu');
        }
        return response;
      }),

  // Add new food item
  addFoodItem: (foodItemData) => 
    api.post('/api/menu', foodItemData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add food item');
        }
        return response;
      }),

  // Delete food item by ID
  deleteFoodItem: (foodItemId) => 
    api.delete(`/api/menu/${foodItemId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete food item');
        }
        return response;
      }),

  // Clear menu for a specific day
  clearDayMenu: (day) => 
    api.delete('/api/menu/clear/day', { params: { day } })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to clear day menu');
        }
        return response;
      }),

  // Clear menu for multiple days
  clearDaysMenu: (days) => 
    api.delete('/api/menu/clear/days', { params: { days } })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to clear days menu');
        }
        return response;
      }),

  // Update food item (optional - if your backend supports it)
  updateFoodItem: (foodItemId, updates) => 
    api.put(`/api/menu/${foodItemId}`, updates)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to update food item');
        }
        return response;
      }),

  // Get menu for specific day (optional - if your backend supports it)
  getDayMenu: (day) => 
    api.get(`/api/menu/day/${day}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch day menu');
        }
        return response;
      }),
};

// Add this to your PropertyController.js file
export const concernAPI = {
  // Submit a new concern
  submitConcern: (concernData) => 
    api.post('/api/concerns/submit', concernData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to submit concern');
        }
        return response;
      }),

  // Get user's concerns
  getUserConcerns: () => 
    api.get('/api/concerns/my-concerns')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch concerns');
        }
        return response;
      }),

  // Get specific concern by ID
  getConcernById: (concernId) => 
    api.get(`/api/concerns/${concernId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch concern');
        }
        return response;
      }),

  // Cancel a concern
  cancelConcern: (concernId) => 
    api.put(`/api/concerns/${concernId}/cancel`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to cancel concern');
        }
        return response;
      }),

  // Get property concerns (for clients)
  getPropertyConcerns: (propertyId) => 
    api.get(`/api/concerns/property/${propertyId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch property concerns');
        }
        return response;
      }),

  // Approve concern (for clients)
  approveConcern: (concernId, adminNotes) => 
    api.put(`/api/concerns/${concernId}/approve`, { adminNotes })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to approve concern');
        }
        return response;
      }),

  // Reject concern (for clients)
  rejectConcern: (concernId, rejectionReason) => 
    api.put(`/api/concerns/${concernId}/reject`, { rejectionReason })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to reject concern');
        }
        return response;
      }),

  // Complete concern (for clients)
  completeConcern: (concernId, completionNotes) => 
    api.put(`/api/concerns/${concernId}/complete`, { completionNotes })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to complete concern');
        }
        return response;
      }),

  // Add internal note (for clients)
  addInternalNote: (concernId, note) => 
    api.post(`/api/concerns/${concernId}/notes`, { note })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add note');
        }
        return response;
      }),
};

export const paymentAPI = {
  createOrder: (data) => api.post('/api/payments/create-order', data),
  validatePayment: (data) => api.post('/api/payments/validate-payment', data),
  getPaymentDetails: (paymentId) => api.get(`/api/payments/${paymentId}`),
  refundPayment: (data) => api.post('/api/payments/refund', data),
  getPaymentHistory: (bookingId) => api.get(`/api/payments/history/${bookingId}`),
  sendPaymentRequest: (data) => api.post('/api/payments/request', data),
  getUserPaymentRequests: (userId) => api.get(`/api/payments/requests/user/${userId}`),
  updatePaymentRequestStatus: (requestId, data) => api.put(`/api/payments/request/${requestId}`, data),
  getClientPaymentsForBooking: (bookingId) => api.get(`/api/payments/client-payments/booking/${bookingId}`),
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

  // getAllBookings: (propertyId) => 
  //   api.get('/api/auth/bookings', {
  //     params: propertyId ? { propertyId } : {}
  //   })
  //   .then(response => {
  //     console.log('Bookings API response:', response.data);
  //     if (!response.data?.success) {
  //       throw new Error(response.data?.message || 'Failed to fetch bookings');
  //     }
  //     return response;
  //   })
  //   .catch(error => {
  //     console.error('Booking API error:', error);
  //     throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
  //   }),
    getBookingById: (bookingId) => 
    api.get(`/api/auth/bookings/${bookingId}`) // CORRECTED PATH
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch booking details');
        }
        return response;
      }),
   getBookingsByProperty: () => 
    api.get('/api/auth/bookings/property')
      .then(response => {
        console.log('Bookings API response:', response.data);
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch bookings');
        }
        return response;
      })
      .catch(error => {
        console.error('Booking API error:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
      }),
      getUserBookings: () =>
    api.get('/api/auth/bookings/user')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Invalid response format for fetching user bookings');
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

export const vacateAPI = {
  requestVacate: (bookingId, data) => 
    api.post(`/api/auth/vacate/${bookingId}/request`, data),
  getVacateStatus: (bookingId) => 
    api.get(`/api/auth/vacate/${bookingId}/status`),
  getVacateRequests: () => 
    api.get('/api/auth/vacate/requests'),
  getVacateRequestById: (requestId) => 
    api.get(`/api/auth/vacate/${requestId}`),
  processDuePayment: (requestId, data) => 
    api.post(`/api/auth/vacate/${requestId}/process-due-payment`, data),
  approveVacateRequest: (requestId, data) => 
    api.put(`/api/auth/vacate/${requestId}/approve`, data),
  initiateRefund: (requestId) => 
    api.post(`/api/auth/vacate/${requestId}/initiate-refund`),
  completeRefund: (requestId, data) => 
    api.post(`/api/auth/vacate/${requestId}/complete-refund`, data),
  addDeduction: (requestId, data) => 
    api.post(`/api/auth/vacate/${requestId}/add-deduction`, data)
};


// export const vacateAPI = {
//   // Request to vacate
//   requestVacate: (bookingId, data) => {
//     return api.post(`/api/auth/vacate/${bookingId}/request`, data)
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to submit vacate request');
//         }
//         return response;
//       })
//       .catch(error => {
//         // Handle specific error cases
//         if (error.response?.data?.message) {
//           throw new Error(error.response.data.message);
//         }
//         if (error.response?.status === 400) {
//           throw new Error(error.response.data?.message || 'Vacate request already exists');
//         }
//         throw error;
//       });
//   },

//   // Get vacate status - FIXED
//   getVacateStatus: (bookingId) => {
//     return api.get(`/api/auth/vacate/${bookingId}/status`)
//       .then(response => {
//         // Handle the actual response structure from backend
//         if (response.data.success) {
//           if (response.data.exists && response.data.request) {
//             // Return in expected format
//             return { 
//               data: { 
//                 success: true, 
//                 exists: true, 
//                 request: response.data.request 
//               } 
//             };
//           } else if (response.data.exists === false) {
//             // No vacate request exists
//             return { data: { success: true, exists: false } };
//           } else if (response.data.request) {
//             // Backward compatibility: if request exists but no 'exists' field
//             return { 
//               data: { 
//                 success: true, 
//                 exists: true, 
//                 request: response.data.request 
//               } 
//             };
//           }
//         }
//         throw new Error(response.data?.message || 'Failed to fetch vacate status');
//       })
//       .catch(error => {
//         if (error.response?.status === 404) {
//           // No vacate request exists yet
//           return { data: { success: true, exists: false, message: 'No vacate request found' } };
//         }
//         // For other errors, re-throw
//         if (error.response?.data?.message) {
//           throw new Error(error.response.data.message);
//         }
//         throw error;
//       });
//   },

//   // For clients - get vacate requests
//   getVacateRequests: () => {
//     return api.get('/api/auth/vacate/requests')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch vacate requests');
//         }
//         return response;
//       });
//   },

//   // For clients - process vacate request
//   processVacateRequest: (bookingId, data) => {
//     return api.post(`/api/auth/vacate/${bookingId}/process`, data)
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to process vacate request');
//         }
//         return response;
//       });
//   },

//    // Complete refund process
//   completeRefund: (requestId, data) => {
//     return api.post(`/api/auth/vacate/${requestId}/complete-refund`, data)
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to complete refund');
//         }
//         return response;
//       });
//   },

//   // Add deduction to vacate request
//   addDeduction: (requestId, data) => {
//     return api.post(`/api/auth/vacate/${requestId}/add-deduction`, data)
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to add deduction');
//         }
//         return response;
//       });
//   },

//   // Create payment order for Razorpay
//   createPaymentOrder: (data) => {
//     return api.post('/api/payments/create-order', data)
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to create payment order');
//         }
//         return response;
//       });
//   },

//   // Verify payment
//   verifyPayment: (data) => {
//     return api.post('/api/payments/validate-payment', data)
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Payment verification failed');
//         }
//         return response;
//       });
//   }

  
// };

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