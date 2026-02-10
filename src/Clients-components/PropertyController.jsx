import axios from 'axios';
import { getAuthToken } from '../utils/tokenUtils';

//export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
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
    // 'credentials': 'include', // import to cookies
  },
  withCredentials: true,
  timeout: 20000,
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



export const notificationAPI = {
  // Get notifications based on user role
  getNotifications: (params = {}) => 
    api.get('/api/notifications', { params })
      .then(response => {
        console.log('📨 Notifications API response:', response.data);
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch notifications');
        }
        return response;
      })
      .catch(error => {
        console.error('❌ Notifications API error:', error);
        throw error;
      }),

   

  // Get unread count
  getUnreadCount: () => 
    api.get('/api/notifications/unread-count')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch unread count');
        }
        return response;
      }),

  // Mark notification as read
  markAsRead: (notificationId) => 
    api.patch(`/api/notifications/read/${notificationId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to mark notification as read');
        }
        return response;
      }),

  // Mark all notifications as read
  markAllAsRead: () => 
    api.patch('/api/notifications/read-all')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to mark all notifications as read');
        }
        return response;
      }),

  // Delete notification
  deleteNotification: (notificationId) => 
    api.delete(`/api/notifications/${notificationId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete notification');
        }
        return response;
      }),

  // Debug endpoint
  getDebugNotifications: () => 
    api.get('/api/notifications/debug/user')
      .then(response => {
        console.log('🐛 Debug notifications:', response.data);
        return response;
      }),

  // Test endpoints
  createTestUserNotification: () => 
    api.post('/api/notifications/test/user')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to create test notification');
        }
        return response;
      }),

  createTestPaymentNotification: () => 
    api.post('/api/notifications/test/payment')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to create test payment notification');
        }
        return response;
      })
};

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
    //   getNearbyProperties: (lat, lon, radiusKm = 5) =>
    // api.get('/api/auth/properties/nearby', {  
    //   params: { lat, lon, radiusKm }
    // })
   getNearbyProperties: async (city, excludePropertyId) => {
    try {
      // First get all properties using getAllClientProperties
      const response = await propertyAPI.getAllClientProperties({ requireAuth: false });
     
      if (response.data?.success && response.data?.data) {
        const properties = Array.isArray(response.data.data)
          ? response.data.data
          : (response.data.data.data || []);
       
        // Filter properties in same city, exclude current property, and limit to 3
        const nearbyProperties = properties
          .filter(item => {
            const property = item.property || item;
            return (
              property?.city === city &&
              property?._id !== excludePropertyId &&
              property?.status === 'approved'
            );
          })
          .slice(0, 3);
       
        return {
          success: true,
          data: nearbyProperties,
          message: '',
        };
      }
     
      return {
        success: false,
        data: [],
        message: response.data?.message || '',
      };
    } catch (error) {
      console.error('Get nearby properties error:', error);
      return {
        success: false,
        data: [],
        message: error.message || 'Failed to fetch nearby properties',
      };
    }
  }


 
};


// maps
export const mapAPI = {
  addOrUpdateMap: (payload) => api.post("/api/map", payload),
  getAllMaps: () => api.get("/api/map"),
  getMapByProperty: (propertyId) => api.get(`/api/map/${propertyId}`),
};


// custom Reviews
// Add this to your PropertyController.jsx file
export const reviewAPI = {
  // Get reviews for a property
  getPropertyReviews: (propertyId, status = 'approved') => 
    api.get(`/api/custom-reviews/property/${propertyId}`, { 
      params: { status } 
    })
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to fetch reviews');
      }
      return response;
    }),

  // Create a new review
  createReview: (reviewData) => 
    api.post('/api/custom-reviews', reviewData)
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to create review');
      }
      return response;
    }),

  // Get user's reviews
  getUserReviews: (userId) => 
    api.get(`/api/custom-reviews/user/${userId}`)
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to fetch user reviews');
      }
      return response;
    }),

  // Update a review
  updateReview: (reviewId, updates) => 
    api.put(`/api/custom-reviews/${reviewId}`, updates)
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to update review');
      }
      return response;
    }),

  // Delete a review
  deleteReview: (reviewId) => 
    api.delete(`/api/custom-reviews/${reviewId}`)
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to delete review');
      }
      return response;
    }),

  // Get review statistics
  getReviewStats: (propertyId) => 
    api.get(`/api/custom-reviews/stats/${propertyId}`)
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to fetch review statistics');
      }
      return response;
    }),

  // Admin: Get all reviews (with filtering)
  getAllReviews: (params = {}) => 
    api.get('/api/custom-reviews/admin/all', { params })
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to fetch all reviews');
      }
      return response;
    }),

  // Admin: Update review status
  updateReviewStatus: (reviewId, status, adminNotes = '') => 
    api.patch(`/api/custom-reviews/admin/${reviewId}/status`, { status, adminNotes })
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to update review status');
      }
      return response;
    })
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
  // Get food items with property and booking filtering
  getFoodItems: (filters = {}) => {
    const params = {};
    if (filters.day) params.day = filters.day;
    if (filters.propertyId) params.propertyId = filters.propertyId;
    if (filters.bookingId) params.bookingId = filters.bookingId;
    if (filters.category) params.category = filters.category;
 
    return api.get('/api/menu', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch food items');
        }
        return response;
      });
  },
 
  // Get weekly menu
  getWeeklyMenu: (filters = {}) => {
    const params = {};
    if (filters.propertyId) params.propertyId = filters.propertyId;
    if (filters.bookingId) params.bookingId = filters.bookingId;
 
    return api.get('/api/menu/weekly', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch weekly menu');
        }
        return response;
      });
  },
 
  // Add new food item
  addFoodItem: (foodItemData) => {
    return api.post('/api/menu', foodItemData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add food item');
        }
        return response;
      });
  },
 
  // Delete food item
  deleteFoodItem: (foodItemId) => {
    return api.delete(`/api/menu/${foodItemId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete food item');
        }
        return response;
      });
  },
 
  // Clear day menu
  clearDayMenu: (filters = {}) => {
    const params = {};
    if (filters.day) params.day = filters.day;
    if (filters.propertyId) params.propertyId = filters.propertyId;
    if (filters.bookingId) params.bookingId = filters.bookingId;
 
    return api.delete('/api/menu/clear/day', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to clear day menu');
        }
        return response;
      });
  },
 
  // Clear multiple days’ menu
  // clearDaysMenu: (filters = {}) => {
  //   const params = {};
  //   if (filters.days) params.days = filters.days;
  //   if (filters.propertyId) params.propertyId = filters.propertyId;
  //   if (filters.bookingId) params.bookingId = filters.bookingId;
 
  //   return api.delete('/api/menu/clear/days', { params })
  //     .then(response => {
  //       if (!response.data?.success) {
  //         throw new Error(response.data?.message || 'Failed to clear days menu');
  //       }
  //       return response;
  //     });
  // },

  getBookingsByUser: () => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
 
  return api
    .get(`/api/auth/bookings/user`, {  // ✅ Fixed path
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
          'Invalid response format for fetching user bookings'
        );
      }
      return response;
    })
    .catch((error) => {
      console.error("Error fetching user bookings:", error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch user bookings'
      );
    });
}, 
 
  // Get food items by specific booking
  getFoodItemsByBooking: (bookingId) => {
    return api.get(`/api/menu/booking/${bookingId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch booking menu');
        }
        return response;
      });
  },
 
  // Get food items by booking and day
  getFoodItemsByBookingAndDay: (bookingId, day) => {
    return api.get(`/api/menu/booking/${bookingId}/day/${day}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch booking day menu');
        }
        return response;
      });
  }
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
 getUserPayments: () => {
    // console.log(' Calling getUserPayments API');
    return api.get('/api/payments/user');
  },
  
  getUserPaymentsAggregate: () => {
    // console.log(' Calling getUserPaymentsAggregate API');
    return api.get('/api/payments/user-payments-aggregate');
  },
  
  getPaymentHistory: (bookingId) => {
    // console.log(' Calling getPaymentHistory for:', bookingId);
    return api.get(`/api/payments/history/${bookingId}`);
  },
  
  debugUserBookings: () => {
    // console.log(' Calling debugUserBookings');
    return api.get('/api/payments/debug-bookings');
  },
  sendPaymentRequest: (data) => api.post('/api/payments/request', data),
  getUserPaymentRequests: (userId) => api.get(`/api/payments/requests/user/${userId}`),
  updatePaymentRequestStatus: (requestId, data) => api.put(`/api/payments/request/${requestId}`, data),
  getClientPaymentsForBooking: (bookingId) => api.get(`/api/payments/client-payments/booking/${bookingId}`),
};

export const bankAccountAPI = {
   addBankAccount: (accountData) => {
    const payload = {
      propertyId: accountData.propertyId,
      bankDetails: {
        accountHolderName: accountData.accountHolderName,
        accountNumber: accountData.accountNumber,
        ifscCode: accountData.ifscCode,
        bankName: accountData.bankName,
        branchName: accountData.branchName,
        accountType: accountData.accountType || 'savings'
      }
    };
    
    console.log('API sending payload:', payload);
    
    return api.post('/api/bank-accounts/add', payload)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add bank account');
        }
        return response;
      });
  },

  getMyBankAccounts: () => 
    api.get('/api/bank-accounts/my-accounts')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch bank accounts');
        }
        return response;
      }),

  getPropertyBankAccount: (propertyId) => 
    api.get(`/api/bank-accounts/property/${propertyId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch property bank account');
        }
        return response;
      }),

  updateBankAccount: (accountId, updates) => 
    api.put(`/api/bank-accounts/${accountId}`, updates)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to update bank account');
        }
        return response;
      }),

  deleteBankAccount: (accountId) => 
    api.delete(`/api/bank-accounts/${accountId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete bank account');
        }
        return response;
      }),

  getAllBankAccounts: (params = {}) => 
    api.get('/api/bank-accounts/admin/all', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch all bank accounts');
        }
        return response;
      }),

  getBankAccountStats: () => 
    api.get('/api/bank-accounts/admin/stats')
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch bank account statistics');
        }
        return response;
      }),

  verifyBankAccount: (accountId, verificationData = {}) => 
    api.patch(`/api/bank-accounts/admin/verify/${accountId}`, verificationData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to verify bank account');
        }
        return response;
      }),

  validateBankAccount: (accountData) => {
    const errors = [];
    
    if (!accountData.accountHolderName?.trim()) {
      errors.push('Account holder name is required');
    }
    
    if (!accountData.accountNumber?.trim()) {
      errors.push('Account number is required');
    } else if (!/^\d{9,18}$/.test(accountData.accountNumber.replace(/\s/g, ''))) {
      errors.push('Account number must be 9-18 digits');
    }
    
    if (!accountData.ifscCode?.trim()) {
      errors.push('IFSC code is required');
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(accountData.ifscCode.toUpperCase())) {
      errors.push('Invalid IFSC code format');
    }
    
    if (!accountData.bankName?.trim()) {
      errors.push('Bank name is required');
    }
    
    if (!accountData.branchName?.trim()) {
      errors.push('Branch name is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  formatAccountNumber: (accountNumber) => {
    if (!accountNumber) return '';
    const cleaned = accountNumber.replace(/\s/g, '');
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  },

  maskAccountNumber: (accountNumber) => {
    if (!accountNumber) return '';
    const cleaned = accountNumber.replace(/\s/g, '');
    if (cleaned.length <= 8) return cleaned;
    return 'X'.repeat(cleaned.length - 4) + cleaned.slice(-4);
  }
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
updateUser: (data) => api.put('/api/auth/user/profile', data),
  getUser: () => api.get('/api/auth/user'),
  //  deleteUserAccount function
  deleteUserAccount: () => {
    console.log("Calling delete account API...");
    return api.delete('/api/auth/profile')
      .then(response => {
        console.log("Delete account response:", response.data);
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete account');
        }
        return response;
      })
      .catch(error => {
        console.error("Delete account error:", error);
        throw error;
      });
  },
 
  // ✅ Profile image upload API
  uploadProfileImage: (formData) => {
    return api.post('/api/auth/user/upload-profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to upload profile image');
      }
      return response;
    });
  },
 
  // ✅ Update user with image
  updateUserWithImage: (formData) => {
    return api.put('/api/auth/user/profile-with-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Failed to update profile with image');
      }
      return response;
    });
  },
 
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
  getBookingDetails: (bookingId) => api.get(`/api/bookings/${bookingId}`) 
    .then(response => {
      // Basic success check for the response structure
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for fetching booking details');
      }
      return response;
    }),
    getBookingsByClientId: (clientId) => {
    const token = localStorage.getItem('token');
    return api
      .get(`/api/bookings/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!response.data?.success) {
          throw new Error(
            response.data?.message || 'Invalid response format for fetching bookings by client ID'
          );
        }
        return response;
      })
      .catch((error) => {
        console.error("Error fetching bookings by client ID:", error);
        throw new Error(
          error.response?.data?.message || 'Failed to fetch bookings for this client'
        );
      });
  },

  getBookingsByUser: () => {
  const token = localStorage.getItem('token');
  return api
    .get('/api/bookings/user', {  
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (!response.data?.success) {
        throw new Error(
          response.data?.message || 'Invalid response format for fetching user bookings'
        );
      }
      return response;
    })
    .catch((error) => {
      console.error("Error fetching user bookings:", error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch user bookings'
      );
    });
},

  approveBooking: (bookingId) => api.patch(`/api/bookings/${bookingId}/approve`)
  .then(response => {
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Booking approval failed');
    }
    return response;
  }),

  rejectBooking: (bookingId, reason) => api.post(`/api/bookings/${bookingId}/reject`, { reason })
    .then(response => {
      // Basic success check for the response structure
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response format for rejecting booking');
      }
      return response;
    }),
  getAllBookings: () => api.get('/api/bookings')
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
    api.get(`/api/bookings/${bookingId}`) // CORRECTED PATH
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch booking details');
        }
        return response;
      }),
   getBookingsByProperty: () => 
    api.get('/api/bookings/property')
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
    api.get('/api/bookings/user')
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
  createBooking: (bookingData) => api.post('/api/bookings', bookingData)
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
  rejectVacateRequest: (requestId, data) =>
    api.put(`/api/auth/vacate/${requestId}/reject`, data),
  initiateRefund: (requestId) =>
    api.post(`/api/auth/vacate/${requestId}/initiate-refund`),
  completeRefund: (requestId, data) =>
    api.post(`/api/auth/vacate/${requestId}/complete-refund`, data),
  addDeduction: (requestId, data) =>
    api.post(`/api/auth/vacate/${requestId}/add-deduction`, data)
};



export const ticketAPI = {
  // Create a new ticket
  createTicket: (ticketData) => 
    api.post('/api/tickets', ticketData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to create ticket');
        }
        return response;
      }),

  // Get all tickets for a specific client
  getTicketsByClient: (clientId) => 
    api.get(`/api/tickets/client/${clientId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch client tickets');
        }
        return response;
      }),

  // Get all tickets (admin only)
  getAllTickets: (params = {}) => 
    api.get('/api/tickets', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch all tickets');
        }
        return response;
      }),

  // Update ticket (admin only)
  updateTicket: (ticketId, updates) => 
    api.put(`/api/tickets/${ticketId}`, updates)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to update ticket');
        }
        return response;
      }),

  // Get ticket by ID (you might want to add this endpoint to your backend)
  getTicketById: (ticketId) => 
    api.get(`/api/tickets/${ticketId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch ticket');
        }
        return response;
      }),

  // Close ticket (you might want to add this endpoint to your backend)
  closeTicket: (ticketId, resolutionNotes = '') => 
    api.patch(`/api/tickets/${ticketId}/close`, { resolutionNotes })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to close ticket');
        }
        return response;
      }),

  // Add comment to ticket (you might want to add this endpoint to your backend)
  addComment: (ticketId, comment) => 
    api.post(`/api/tickets/${ticketId}/comments`, { comment })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add comment');
        }
        return response;
      }),

  // Utility functions for ticket management
  validateTicketData: (ticketData) => {
    const errors = [];
    
    if (!ticketData.title?.trim()) {
      errors.push('Ticket title is required');
    }
    
    if (!ticketData.description?.trim()) {
      errors.push('Ticket description is required');
    }
    
    if (!ticketData.category?.trim()) {
      errors.push('Ticket category is required');
    }
    
    if (!ticketData.priority) {
      errors.push('Ticket priority is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  formatTicketStatus: (status) => {
    const statusMap = {
      'open': 'Open',
      'in_progress': 'In Progress',
      'resolved': 'Resolved',
      'closed': 'Closed',
      'pending': 'Pending'
    };
    return statusMap[status] || status;
  },

  formatPriority: (priority) => {
    const priorityMap = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Urgent'
    };
    return priorityMap[priority] || priority;
  }
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

export const contactAPI = {
  createContact: (contactData) =>
    api.post('/api/contacts/contact', contactData)
      .then(response => {
        console.log('Contact recorded:', response.data);
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to record contact');
        }
        return response;
      })
      .catch(error => {
        console.error('Create contact error:', error);
        throw error;
      }),
 
  getUserContacts: () =>
    api.get('/api/contacts/user/contacts')
      .then(response => {
        console.log('Contacts fetched:', response.data.count);
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch contacts');
        }
        return response;
      })
      .catch(error => {
        console.error('Get contacts error:', error);
        throw error;
      }),
 
  deleteContact: (contactId) =>
    api.delete(`/api/contacts/contact/${contactId}`)
      .then(response => {
        console.log('Contact deleted:', contactId);
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete contact');
        }
        return response;
      })
      .catch(error => {
        console.error('Delete contact error:', error);
        throw error;
      })
};

export const offlineBookingAPI = {
  // Get all offline bookings for current client
  getOfflineBookings: () =>
    api.get('/api/offline-bookings')
      .then(response => {
        console.log('Offline bookings API response:', response.data);
        if (!Array.isArray(response.data)) {
          // If response is not an array, check if it's wrapped in success structure
          if (response.data?.success && Array.isArray(response.data.data)) {
            return response.data.data;
          }
          throw new Error('Invalid response format for offline bookings');
        }
        return response.data;
      })
      .catch(error => {
        console.error('Offline booking API error:', error);
        // Return empty array instead of throwing to prevent component crash
        return [];
      }),
 
  // Get offline booking by ID
  getOfflineBookingById: (bookingId) =>
    api.get(`/api/offline-bookings/${bookingId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch offline booking');
        }
        return response;
      }),
 
  // Create offline booking
  createOfflineBooking: (bookingData) =>
    api.post('/api/offline-bookings', bookingData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to create offline booking');
        }
        return response;
      }),
 
  // Update offline booking
  updateOfflineBooking: (bookingId, updates) =>
    api.put(`/api/offline-bookings/${bookingId}`, updates)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to update offline booking');
        }
        return response;
      }),
 
  // Delete offline booking
  deleteOfflineBooking: (bookingId) =>
    api.delete(`/api/offline-bookings/${bookingId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to delete offline booking');
        }
        return response;
      }),
 
  // Update offline booking status
  updateOfflineBookingStatus: (bookingId, statusData) =>
    api.patch(`/api/offline-bookings/${bookingId}/status`, statusData)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to update booking status');
        }
        return response;
      })
};

// PropertyController.jsx
// export const manualTransferAPI = {
//   // Get payments by client
//   getPaymentsByClient: async (clientId) => {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('clientToken');
//       console.log("🔑 Using token for payments API:", token ? "Token exists" : "No token");
      
//       const response = await api.get(`/api/payments/by-client/${clientId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log("✅ Payments API response:", response.data);
//       return response;
//     } catch (error) {
//       console.error('❌ Get payments by client API error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   // UNCOMMENT AND FIX THIS FUNCTION
//   getManualTransfersByClient: async (clientId, filters = {}) => {
//     try {
//       console.log("🔄 Getting manual transfers for client:", clientId);
      
//       const token = localStorage.getItem('token') || localStorage.getItem('clientToken');
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
     
//       const params = new URLSearchParams();
//       params.append('page', filters.page || 1);
//       params.append('limit', filters.limit || 10);
     
//       if (filters.status) params.append('status', filters.status);
//       if (filters.startDate) params.append('startDate', filters.startDate);
//       if (filters.endDate) params.append('endDate', filters.endDate);
     
//       const response = await api.get(`/api/admin/manual-transfers/client/${clientId}?${params.toString()}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
     
//       console.log("✅ Manual transfers by client response:", {
//         count: response.data.data?.transfers?.length,
//         total: response.data.data?.pagination?.totalItems
//       });
     
//       return response;
     
//     } catch (error) {
//       console.error("❌ Get manual transfers by client error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   },
// };

// Add these to your PropertyController.js
export const manualTransferAPI = {
  // NEW: Get manual transfers by client ID
  getManualTransfersByClient: async (clientId, filters = {}) => {
    try {
      console.log("🔄 Getting manual transfers for client:", clientId);
     
      const params = new URLSearchParams();
      params.append('page', filters.page || 1);
      params.append('limit', filters.limit || 10);
     
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
     
      const response = await api.get(`/api/manual-transfers/client/${clientId}?${params.toString()}`);
     
      console.log("✅ Manual transfers by client response:", {
        count: response.data.data?.transfers?.length,
        total: response.data.data?.pagination?.totalItems
      });
     
      return response;
     
    } catch (error) {
      console.error("❌ Get manual transfers by client error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },
 
  // NEW: Get manual transfers by booking ID
  // getManualTransfersByBooking: async (bookingId) => {
  //   try {
  //     console.log("🔄 Getting manual transfers for booking:", bookingId);
     
  //     const response = await api.get(`/api/manual-transfers/booking/${bookingId}`);
     
  //     console.log("✅ Manual transfers by booking response:", {
  //       count: response.data.data?.length
  //     });
     
  //     return response;
     
  //   } catch (error) {
  //     console.error("❌ Get manual transfers by booking error:", {
  //       status: error.response?.status,
  //       data: error.response?.data,
  //       message: error.message
  //     });
  //     throw error;
  //   }
  // },
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





// //testing api encription
// import axios from 'axios';
// import { EncryptionUtils } from '../utils/encryptionUtils.js';

// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// // TEMPORARY FIX - Disable encryption until backend is properly configured
// const ENCRYPTION_ENABLED = false;


// // Encrypted API route mapping (must match backend)
// const encryptedRoutes = {
//   "auth": {
//     "base": "U2FsdGVkX1/4m5z6X8A2rD9gH1jK3lM7nO0pQ2sT4uV6wX8yZ==",
//     "endpoints": {
//       "checkUserExists": "U2FsdGVkX19Q7uJ4J8wJ6K8n7M2V1X6Y9zA8bR2tH4fC6vD3gE==",
//       "verifyFirebaseOTP": "U2FsdGVkX1+3k5m7n9p1q3s5u7w9y2b4d6f8h0j2k4l6==",
//       "register": "U2FsdGVkX1+2j4l6k8m0n2p4r6t8v1x3z5b7d9f1h3==",
//       "getUser": "U2FsdGVkX1+1i3k5m7o9q1s3u5w7y9z2b4d6f8h0j2l4==",
//       "sendOTP": "U2FsdGVkX1+0h2j4l6n8p0r2t4v6x8z1b3d5f7h9j1l3==",
//       "verifyOTP": "U2FsdGVkX1+9g1i3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//       "updateUserProfile": "U2FsdGVkX1+8f0h2j4l6n8p0r2t4v6x8z1b3d5f7h9j==",
//       "getAllUsers": "U2FsdGVkX1+7e9g1i3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "addTenantByClient": "U2FsdGVkX1+6d8f0h2j4l6n8p0r2t4v6x8z1b3d5f7h9==",
//       "healthCheck": "U2FsdGVkX1+5c7e9g1i3k5m7o9q1s3u5w7y9z2b4d6=="
//     }
//   },
//   "properties": {
//     "base": "U2FsdGVkX1+4b6d8f0h2j4l6n8p0r2t4v6x8z1b3d5f7==",
//     "endpoints": {
//       "registerProperty": "U2FsdGVkX1+3a5c7e9g1i3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "getProperty": "U2FsdGVkX1+2z4b6d8f0h2j4l6n8p0r2t4v6x8z1b3d5==",
//       "updateProperty": "U2FsdGVkX1+1y3a5c7e9g1i3k5m7o9q1s3u5w7y9z2b4==",
//       "getCompletePropertyData": "U2FsdGVkX1+0x2z4b6d8f0h2j4l6n8p0r2t4v6x8z1b3==",
//       "getAllClientProperties": "U2FsdGVkX1+9w1y3a5c7e9g1i3k5m7o9q1s3u5w7y9z2==",
//       "deleteProperty": "U2FsdGVkX1+8v0x2z4b6d8f0h2j4l6n8p0r2t4v6x8z1=="
//     }
//   },
//   "media": {
//     "base": "U2FsdGVkX1+7u9w1y3a5c7e9g1i3k5m7o9q1s3u5w7y9==",
//     "endpoints": {
//       "upload": "U2FsdGVkX1+6t8v0x2z4b6d8f0h2j4l6n8p0r2t4v6x8==",
//       "getMedia": "U2FsdGVkX1+5s7u9w1y3a5c7e9g1i3k5m7o9q1s3u5w7==",
//       "deleteMediaItem": "U2FsdGVkX1+4r6t8v0x2z4b6d8f0h2j4l6n8p0r2t4v6==",
//       "editMediaItem": "U2FsdGVkX1+3q5s7u9w1y3a5c7e9g1i3k5m7o9q1s3u5==",
//       "getMediaByPropertyId": "U2FsdGVkX1+2p4r6t8v0x2z4b6d8f0h2j4l6n8p0r2t4=="
//     }
//   },
//   "rooms": {
//     "base": "U2FsdGVkX1+1o3q5s7u9w1y3a5c7e9g1i3k5m7o9q1s3==",
//     "endpoints": {
//       "createRoomTypes": "U2FsdGVkX1+0n2p4r6t8v0x2z4b6d8f0h2j4l6n8p0r2==",
//       "getRoomTypes": "U2FsdGVkX1+9m1o3q5s7u9w1y3a5c7e9g1i3k5m7o9q1==",
//       "saveFloorData": "U2FsdGVkX1+8l0n2p4r6t8v0x2z4b6d8f0h2j4l6n8p0==",
//       "getFloorData": "U2FsdGVkX1+7k9m1o3q5s7u9w1y3a5c7e9g1i3k5m7o9==",
//       "saveRoomRentData": "U2FsdGVkX1+6j8l0n2p4r6t8v0x2z4b6d8f0h2j4l6n8==",
//       "getRoomRentData": "U2FsdGVkX1+5i7k9m1o3q5s7u9w1y3a5c7e9g1i3k5m7==",
//       "deleteRoomType": "U2FsdGVkX1+4h6j8l0n2p4r6t8v0x2z4b6d8f0h2j4l6==",
//       "updateRoomType": "U2FsdGVkX1+3g5i7k9m1o3q5s7u9w1y3a5c7e9g1i3k5=="
//     }
//   },
//   "bookings": {
//     "base": "U2FsdGVkX1+2f4h6j8l0n2p4r6t8v0x2z4b6d8f0h2j4==",
//     "endpoints": {
//       "createBooking": "U2FsdGVkX1+1e3g5i7k9m1o3q5s7u9w1y3a5c7e9g1i3==",
//       "cancelBooking": "U2FsdGVkX1+0d2f4h6j8l0n2p4r6t8v0x2z4b6d8f0h2==",
//       "getBookingsByProperty": "U2FsdGVkX1+9c1e3g5i7k9m1o3q5s7u9w1y3a5c7e9g1==",
//       "getUserBookings": "U2FsdGVkX1+8b0d2f4h6j8l0n2p4r6t8v0x2z4b6d8f0==",
//       "getBookingById": "U2FsdGVkX1+7a9c1e3g5i7k9m1o3q5s7u9w1y3a5c7e9==",
//       "approveBooking": "U2FsdGVkX1+6z8b0d2f4h6j8l0n2p4r6t8v0x2z4b6d8==",
//       "rejectBooking": "U2FsdGVkX1+5y7a9c1e3g5i7k9m1o3q5s7u9w1y3a5c7==",
//       "getallBookings": "U2FsdGVkX1+4x6z8b0d2f4h6j8l0n2p4r6t8v0x2z4b6==",
//       "checkRoomAvailability": "U2FsdGVkX1+3w5y7a9c1e3g5i7k9m1o3q5s7u9w1y3a5==",
//       "getAvailableRoomsAndBeds": "U2FsdGVkX1+2v4x6z8b0d2f4h6j8l0n2p4r6t8v0x2z4==",
//       "getAvailableBedsByRoomType": "U2FsdGVkX1+1u3w5y7a9c1e3g5i7k9m1o3q5s7u9w1y3==",
//       "getAllAvailableBeds": "U2FsdGVkX1+0t2v4x6z8b0d2f4h6j8l0n2p4r6t8v0x2=="
//     }
//   },
//   "vacate": {
//     "base": "U2FsdGVkX1+9s1u3w5y7a9c1e3g5i7k9m1o3q5s7u9w1==",
//     "endpoints": {
//       "requestVacate": "U2FsdGVkX1+8r0t2v4x6z8b0d2f4h6j8l0n2p4r6t8v0==",
//       "getVacateRequests": "U2FsdGVkX1+7q9s1u3w5y7a9c1e3g5i7k9m1o3q5s7u9==",
//       "getVacateRequestById": "U2FsdGVkX1+6p8r0t2v4x6z8b0d2f4h6j8l0n2p4r6t8==",
//       "processDuePayment": "U2FsdGVkX1+5o7q9s1u3w5y7a9c1e3g5i7k9m1o3q5s7==",
//       "approveVacateRequest": "U2FsdGVkX1+4n6p8r0t2v4x6z8b0d2f4h6j8l0n2p4r6==",
//       "initiateRefund": "U2FsdGVkX1+3m5o7q9s1u3w5y7a9c1e3g5i7k9m1o3q5==",
//       "completeRefund": "U2FsdGVkX1+2l4n6p8r0t2v4x6z8b0d2f4h6j8l0n2p4==",
//       "getVacateStatus": "U2FsdGVkX1+1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m1o3==",
//       "getUserVacateRequests": "U2FsdGVkX1+0j2l4n6p8r0t2v4x6z8b0d2f4h6j8l0n2==",
//       "addDeduction": "U2FsdGVkX1+9i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m1=="
//     }
//   },
//   "pg": {
//     "base": "U2FsdGVkX1+8h0j2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//     "endpoints": {
//       "savePGProperty": "U2FsdGVkX1+7g9i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9==",
//       "getPGProperty": "U2FsdGVkX1+6f8h0j2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "deletePGProperty": "U2FsdGVkX1+5e7g9i1k3m5o7q9s1u3w5y7a9c1e3g5i7=="
//     }
//   },
//   "admin": {
//     "base": "U2FsdGVkX1+4d6f8h0j2l4n6p8r0t2v4x6z8b0d2f4h6==",
//     "endpoints": {
//       "login": "U2FsdGVkX1+3c5e7g9i1k3m5o7q9s1u3w5y7a9c1e3g5==",
//       "getProfile": "U2FsdGVkX1+2b4d6f8h0j2l4n6p8r0t2v4x6z8b0d2f4==",
//       "approveProperty": "U2FsdGVkX1+1a3c5e7g9i1k3m5o7q9s1u3w5y7a9c1e3==",
//       "rejectProperty": "U2FsdGVkX1+0z2b4d6f8h0j2l4n6p8r0t2v4x6z8b0d2=="
//     }
//   },
//   "notifications": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "getNotifications": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getUnreadCount": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "markAsRead": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "markAllAsRead": "U2FsdGVkX1+5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "deleteNotification": "U2FsdGVkX1+4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6=="
//     }
//   },
//   "payments": {
//     "base": "U2FsdGVkX1+3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6==",
//     "endpoints": {
//       "createOrder": "U2FsdGVkX1+2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4==",
//       "validatePayment": "U2FsdGVkX1+1z3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4==",
//       "getPaymentDetails": "U2FsdGVkX1+0y2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2==",
//       "refundPayment": "U2FsdGVkX1+9x1z3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b==",
//       "getUserPayments": "U2FsdGVkX1+8w0y2a4c6e8g0i2l4n6p8r0t2v4x6z8b0=="
//     }
//   },
//    "concerns": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "submitConcern": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getUserConcerns": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "getPropertyConcerns": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "getConcernById": "U2FsdGVkX1+5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "cancelConcern": "U2FsdGVkX1+4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6==",
//       "approveConcern": "U2FsdGVkX1+3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6==",
//       "rejectConcern": "U2FsdGVkX1+2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4==",
//       "completeConcern": "U2FsdGVkX1+1z3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4==",
//       "addInternalNote": "U2FsdGVkX1+0y2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2=="
//     }
//   },

//   "menu": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "getFoodItems": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getWeeklyMenu": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "addFoodItem": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "deleteFoodItem": "U2FsdGVkX1+5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "clearDayMenu": "U2FsdGVkX1+4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6==",
//       "getFoodItemsByBooking": "U2FsdGVkX1+3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6==",
//       "getFoodItemsByBookingAndDay": "U2FsdGVkX1+2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4=="
//     }
//   },
//   "map": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "addOrUpdateMap": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getAllMaps": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "getMapByProperty": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8=="
//     }
//   },
//   "tickets": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "createTicket": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getTicketsByClient": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "getAllTickets": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "updateTicket": "U2FsdGVkX1+5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "getTicketById": "U2FsdGVkX1+4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6==",
//       "closeTicket": "U2FsdGVkX1+3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6==",
//       "addComment": "U2FsdGVkX1+2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4=="
//     }
//   },
//    "chat": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "getConversations": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getMessages": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "sendMessage": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "getUnreadCount": "U2FsdGVkX1+5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "markAsRead": "U2FsdGVkX1+4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6=="
//     }
//   },
//   "bankAccounts": {
//     "base": "U2FsdGVkX1+9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0j2==",
//     "endpoints": {
//       "addBankAccount": "U2FsdGVkX1+8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8l0==",
//       "getMyBankAccounts": "U2FsdGVkX1+7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8h0==",
//       "getPropertyBankAccount": "U2FsdGVkX1+6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6j8==",
//       "updateBankAccount": "U2FsdGVkX1+5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6f8==",
//       "deleteBankAccount": "U2FsdGVkX1+4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4h6==",
//       "getAllBankAccounts": "U2FsdGVkX1+3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4d6==",
//       "getBankAccountStats": "U2FsdGVkX1+2a4c6e8g0i2l4n6p8r0t2v4x6z8b0d2f4==",
//       "verifyBankAccount": "U2FsdGVkX1+1z3b5d7f9h1j3k5m7o9q1s3u5w7y9z2b4=="
//     }
//   }

// };

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
//   timeout: 10000,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Get encrypted token
//     const encryptedToken = localStorage.getItem('encryptedToken');
//     if (encryptedToken) {
//       config.headers.Authorization = `Bearer ${encryptedToken}`;
//     }

//     // Only encrypt if encryption is enabled
//     if (ENCRYPTION_ENABLED && config.data && (config.method === 'post' || config.method === 'put' || config.method === 'patch')) {
//       try {
//         config.data = {
//           encryptedData: EncryptionUtils.encryptPayload(config.data)
//         };
//         console.log('🔐 Request encrypted');
//       } catch (error) {
//         console.error('Request encryption failed:', error);
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Decrypt response if encryption is enabled
//     if (ENCRYPTION_ENABLED && response.data && response.data.encryptedData) {
//       try {
//         response.data = EncryptionUtils.decryptResponse(response.data.encryptedData);
//         console.log('🔓 Response decrypted');
//       } catch (error) {
//         console.error('Response decryption failed:', error);
//       }
//     }
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Handle network errors
//     if (!error.response) {
//       if (error.code === 'ECONNABORTED') {
//         return Promise.reject({ message: 'Request timeout. Please try again.' });
//       }
//       return Promise.reject({ message: 'Network error. Please check your connection.' });
//     }

//     // Handle 401 Unauthorized (token expired)
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const refreshResponse = await api.post('/api/auth/refresh-token', {}, { withCredentials: true });
//         const newEncryptedToken = refreshResponse.data.token;
//         localStorage.setItem('encryptedToken', newEncryptedToken);
//         originalRequest.headers.Authorization = `Bearer ${newEncryptedToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('encryptedToken');
//         localStorage.removeItem('user');
//         window.location.href = '/user/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error.response.data || error);
//   }
// );

// // Secure API Client Class
// class SecureApiClient {
//   constructor() {
//     this.routes = encryptedRoutes;
//   }

//   // Generic method to make API calls
//   async makeEncryptedCall(route, endpoint, data = null, method = 'GET', options = {}) {
//     let url;
    
//     if (ENCRYPTION_ENABLED) {
//       const encryptedRoute = this.routes[route]?.base;
//       const encryptedEndpoint = this.routes[route]?.endpoints[endpoint];
      
//       if (encryptedRoute && encryptedEndpoint) {
//         url = `/api/${encryptedRoute}/${encryptedEndpoint}`;
//       } else {
//         console.warn(`Encrypted route not found for ${route}/${endpoint}, using unencrypted`);
//         url = `/api/${route}/${endpoint}`;
//       }
//     } else {
//       url = `/api/${route}/${endpoint}`;
//     }

//     console.log(`🌐 Making ${method} request to: ${url}`);

//     const config = {
//       method: method.toLowerCase(),
//       url,
//       ...options
//     };

//     if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
//       config.data = data;
//     }

//     try {
//       const response = await api(config);
//       return response;
//     } catch (error) {
//       console.error(`API call failed for ${route}/${endpoint}:`, error);
//       throw error;
//     }
//   }

//   // Store encrypted token
//   storeEncryptedToken(token) {
//     localStorage.setItem('encryptedToken', token);
//   }

//   // Get encrypted token
//   getEncryptedToken() {
//     return localStorage.getItem('encryptedToken');
//   }

//   // Remove token
//   removeToken() {
//     localStorage.removeItem('encryptedToken');
//     localStorage.removeItem('user');
//   }

//   // Check if encryption is enabled
//   isEncryptionEnabled() {
//     return ENCRYPTION_ENABLED;
//   }
// }

// // Create singleton instance
// const secureApiClient = new SecureApiClient();

// // Export the secure API methods
// export const secureAPI = secureApiClient;

// // Individual API modules using the secure client
// export const notificationAPI = {
//   getNotifications: (params = {}) => 
//     secureApiClient.makeEncryptedCall('notifications', 'getNotifications', null, 'GET', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch notifications');
//         }
//         return response;
//       }),

//   getUnreadCount: () => 
//     secureApiClient.makeEncryptedCall('notifications', 'getUnreadCount')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch unread count');
//         }
//         return response;
//       }),

//   markAsRead: (notificationId) => 
//     secureApiClient.makeEncryptedCall('notifications', 'markAsRead', { notificationId }, 'PATCH')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to mark notification as read');
//         }
//         return response;
//       }),

//   markAllAsRead: () => 
//     secureApiClient.makeEncryptedCall('notifications', 'markAllAsRead', {}, 'PATCH')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to mark all notifications as read');
//         }
//         return response;
//       }),

//   deleteNotification: (notificationId) => 
//     secureApiClient.makeEncryptedCall('notifications', 'deleteNotification', null, 'DELETE', {
//       data: { notificationId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to delete notification');
//         }
//         return response;
//       })
// };

// export const propertyAPI = {
//   registerProperty: (propertyData) => 
//     secureApiClient.makeEncryptedCall('properties', 'registerProperty', propertyData, 'POST'),

//   getProperty: () => 
//     secureApiClient.makeEncryptedCall('properties', 'getProperty'),

//   updateProperty: (propertyId, updates) => 
//     secureApiClient.makeEncryptedCall('properties', 'updateProperty', { propertyId, ...updates }, 'PUT'),

//   deleteProperty: (propertyId) => 
//     secureApiClient.makeEncryptedCall('properties', 'deleteProperty', { propertyId }, 'DELETE'),

//   getCompletePropertyData: () => 
//     secureApiClient.makeEncryptedCall('properties', 'getCompletePropertyData')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Invalid response format');
//         }
//         return response;
//       }),

//   getAllClientProperties: (params = {}) =>
//     secureApiClient.makeEncryptedCall('properties', 'getAllClientProperties', null, 'GET', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Invalid response format');
//         }
//         return response;
//       }),

//   reverseGeocode: (lat, lon) => 
//     api.get(`/api/map/geocode?lat=${lat}&lon=${lon}`) // This endpoint might not be encrypted
// };

// export const authAPI = {
//   checkUserExists: (phone) => 
//     secureApiClient.makeEncryptedCall('auth', 'checkUserExists', { phone }, 'POST'),

//   sendOTP: (phone) => 
//     secureApiClient.makeEncryptedCall('auth', 'sendOTP', { phone }, 'POST'),

//   verifyOTP: (otpData) => 
//     secureApiClient.makeEncryptedCall('auth', 'verifyOTP', otpData, 'POST'),

//   register: (userData) => 
//     secureApiClient.makeEncryptedCall('auth', 'register', userData, 'POST'),

//   getUser: () => 
//     secureApiClient.makeEncryptedCall('auth', 'getUser'),

//   updateUserProfile: (userData) => 
//     secureApiClient.makeEncryptedCall('auth', 'updateUserProfile', userData, 'PUT'),

//   addTenantByClient: (formData) => {
//     // For file uploads, use FormData directly with unencrypted endpoint for now
//     return api.post('/api/auth/client/register-by-client', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });
//   }
// };

// export const bookingAPI = {
//   createBooking: (bookingData) => 
//     secureApiClient.makeEncryptedCall('bookings', 'createBooking', bookingData, 'POST'),

//   getBookingDetails: (bookingId) => 
//     secureApiClient.makeEncryptedCall('bookings', 'getBookingById', null, 'GET', {
//       params: { bookingId }
//     }),

//   getUserBookings: () => 
//     secureApiClient.makeEncryptedCall('bookings', 'getUserBookings'),

//   getBookingsByProperty: () => 
//     secureApiClient.makeEncryptedCall('bookings', 'getBookingsByProperty'),

//   approveBooking: (bookingId) => 
//     secureApiClient.makeEncryptedCall('bookings', 'approveBooking', { bookingId }, 'PATCH'),

//   rejectBooking: (bookingId, reason) => 
//     secureApiClient.makeEncryptedCall('bookings', 'rejectBooking', { bookingId, reason }, 'POST'),

//   cancelBooking: (bookingId) => 
//     secureApiClient.makeEncryptedCall('bookings', 'cancelBooking', { bookingId }, 'POST'),

//   checkRoomAvailability: (data) => 
//     secureApiClient.makeEncryptedCall('bookings', 'checkRoomAvailability', data, 'POST')
// };

// export const paymentAPI = {
//   createOrder: (data) => 
//     secureApiClient.makeEncryptedCall('payments', 'createOrder', data, 'POST'),

//   validatePayment: (data) => 
//     secureApiClient.makeEncryptedCall('payments', 'validatePayment', data, 'POST'),

//   getPaymentDetails: (paymentId) => 
//     secureApiClient.makeEncryptedCall('payments', 'getPaymentDetails', null, 'GET', {
//       params: { paymentId }
//     }),

//   getUserPayments: () => 
//     secureApiClient.makeEncryptedCall('payments', 'getUserPayments')
// };

// export const mediaAPI = {
//   uploadMedia: (formData) => {
//     const encryptedRoute = encryptedRoutes.media.base;
//     const encryptedEndpoint = encryptedRoutes.media.endpoints.upload;
    
//     return api.post(`/api/${encryptedRoute}/${encryptedEndpoint}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       timeout: 30000,
//     });
//   },

//   getMedia: () => 
//     secureApiClient.makeEncryptedCall('media', 'getMedia'),

//   deleteMediaItem: (mediaId) => 
//     secureApiClient.makeEncryptedCall('media', 'deleteMediaItem', { mediaId }, 'DELETE'),

//   getMediaByProperty: (propertyId) => 
//     secureApiClient.makeEncryptedCall('media', 'getMediaByPropertyId', null, 'GET', {
//       params: { propertyId }
//     })
// };

// export const roomAPI = {
//   createRoomTypes: (propertyId, data) => 
//     secureApiClient.makeEncryptedCall('rooms', 'createRoomTypes', { propertyId, ...data }, 'POST'),

//   getRoomTypes: (propertyId) => 
//     secureApiClient.makeEncryptedCall('rooms', 'getRoomTypes', null, 'GET', {
//       params: { propertyId }
//     }),

//   saveFloorData: (propertyId, data) => 
//     secureApiClient.makeEncryptedCall('rooms', 'saveFloorData', { propertyId, ...data }, 'POST'),

//   getFloorData: (propertyId) => 
//     secureApiClient.makeEncryptedCall('rooms', 'getFloorData', null, 'GET', {
//       params: { propertyId }
//     }),

//   saveRoomRentData: (propertyId, data) => 
//     secureApiClient.makeEncryptedCall('rooms', 'saveRoomRentData', { propertyId, ...data }, 'POST'),

//   getRoomRentData: (propertyId) => 
//     secureApiClient.makeEncryptedCall('rooms', 'getRoomRentData', null, 'GET', {
//       params: { propertyId }
//     })
// };

// export const vacateAPI = {
//   requestVacate: (bookingId, data) => 
//     secureApiClient.makeEncryptedCall('vacate', 'requestVacate', { bookingId, ...data }, 'POST'),

//   getVacateStatus: (bookingId) => 
//     secureApiClient.makeEncryptedCall('vacate', 'getVacateStatus', null, 'GET', {
//       params: { bookingId }
//     }),

//   getVacateRequests: () => 
//     secureApiClient.makeEncryptedCall('vacate', 'getVacateRequests'),

//   approveVacateRequest: (requestId, data) => 
//     secureApiClient.makeEncryptedCall('vacate', 'approveVacateRequest', { requestId, ...data }, 'PUT')
// };

// export const pgAPI = {
//   savePGProperty: (propertyId, formData) => {
//     const encryptedRoute = encryptedRoutes.pg.base;
//     const encryptedEndpoint = encryptedRoutes.pg.endpoints.savePGProperty;
    
//     const url = propertyId 
//       ? `/api/${encryptedRoute}/${encryptedEndpoint}?propertyId=${propertyId}`
//       : `/api/${encryptedRoute}/${encryptedEndpoint}`;
    
//     return api.put(url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });
//   },

//   getPGProperty: (propertyId) => 
//     secureApiClient.makeEncryptedCall('pg', 'getPGProperty', null, 'GET', {
//       params: { propertyId }
//     }),

//   deletePGProperty: (pgId) => 
//     secureApiClient.makeEncryptedCall('pg', 'deletePGProperty', { pgId }, 'DELETE')
// };

// export const concernAPI = {
//   // Submit a new concern
//   submitConcern: (concernData) => 
//     secureApiClient.makeEncryptedCall('concerns', 'submitConcern', concernData, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to submit concern');
//         }
//         return response;
//       }),

//   // Get user's concerns
//   getUserConcerns: () => 
//     secureApiClient.makeEncryptedCall('concerns', 'getUserConcerns')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch concerns');
//         }
//         return response;
//       }),

//   // Get specific concern by ID
//   getConcernById: (concernId) => 
//     secureApiClient.makeEncryptedCall('concerns', 'getConcernById', null, 'GET', {
//       params: { concernId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch concern');
//         }
//         return response;
//       }),

//   // Cancel a concern
//   cancelConcern: (concernId) => 
//     secureApiClient.makeEncryptedCall('concerns', 'cancelConcern', { concernId }, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to cancel concern');
//         }
//         return response;
//       }),

//   // Get property concerns (for clients)
//   getPropertyConcerns: (propertyId) => 
//     secureApiClient.makeEncryptedCall('concerns', 'getPropertyConcerns', null, 'GET', {
//       params: { propertyId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch property concerns');
//         }
//         return response;
//       }),

//   // Approve concern (for clients)
//   approveConcern: (concernId, adminNotes) => 
//     secureApiClient.makeEncryptedCall('concerns', 'approveConcern', { concernId, adminNotes }, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to approve concern');
//         }
//         return response;
//       }),

//   // Reject concern (for clients)
//   rejectConcern: (concernId, rejectionReason) => 
//     secureApiClient.makeEncryptedCall('concerns', 'rejectConcern', { concernId, rejectionReason }, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to reject concern');
//         }
//         return response;
//       }),

//   // Complete concern (for clients)
//   completeConcern: (concernId, completionNotes) => 
//     secureApiClient.makeEncryptedCall('concerns', 'completeConcern', { concernId, completionNotes }, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to complete concern');
//         }
//         return response;
//       }),

//   // Add internal note (for clients)
//   addInternalNote: (concernId, note) => 
//     secureApiClient.makeEncryptedCall('concerns', 'addInternalNote', { concernId, note }, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to add note');
//         }
//         return response;
//       })
// };


// export const menuAPI = {
//   // Get food items with property and booking filtering
//   getFoodItems: (filters = {}) => {
//     const params = {};
//     if (filters.day) params.day = filters.day;
//     if (filters.propertyId) params.propertyId = filters.propertyId;
//     if (filters.bookingId) params.bookingId = filters.bookingId;
//     if (filters.category) params.category = filters.category;
 
//     return secureApiClient.makeEncryptedCall('menu', 'getFoodItems', null, 'GET', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch food items');
//         }
//         return response;
//       });
//   },
 
//   // Get weekly menu
//   getWeeklyMenu: (filters = {}) => {
//     const params = {};
//     if (filters.propertyId) params.propertyId = filters.propertyId;
//     if (filters.bookingId) params.bookingId = filters.bookingId;
 
//     return secureApiClient.makeEncryptedCall('menu', 'getWeeklyMenu', null, 'GET', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch weekly menu');
//         }
//         return response;
//       });
//   },
 
//   // Add new food item
//   addFoodItem: (foodItemData) => {
//     return secureApiClient.makeEncryptedCall('menu', 'addFoodItem', foodItemData, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to add food item');
//         }
//         return response;
//       });
//   },
 
//   // Delete food item
//   deleteFoodItem: (foodItemId) => {
//     return secureApiClient.makeEncryptedCall('menu', 'deleteFoodItem', { foodItemId }, 'DELETE')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to delete food item');
//         }
//         return response;
//       });
//   },
 
//   // Clear day menu
//   clearDayMenu: (filters = {}) => {
//     const params = {};
//     if (filters.day) params.day = filters.day;
//     if (filters.propertyId) params.propertyId = filters.propertyId;
//     if (filters.bookingId) params.bookingId = filters.bookingId;
 
//     return secureApiClient.makeEncryptedCall('menu', 'clearDayMenu', null, 'DELETE', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to clear day menu');
//         }
//         return response;
//       });
//   },
 
//   // Get food items by specific booking
//   getFoodItemsByBooking: (bookingId) => {
//     return secureApiClient.makeEncryptedCall('menu', 'getFoodItemsByBooking', null, 'GET', {
//       params: { bookingId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch booking menu');
//         }
//         return response;
//       });
//   },
 
//   // Get food items by booking and day
//   getFoodItemsByBookingAndDay: (bookingId, day) => {
//     return secureApiClient.makeEncryptedCall('menu', 'getFoodItemsByBookingAndDay', null, 'GET', {
//       params: { bookingId, day }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch booking day menu');
//         }
//         return response;
//       });
//   }
// };


// export const userAPI = {
//   // Update user profile
//   updateUser: (userData) => 
//     secureApiClient.makeEncryptedCall('user', 'updateUser', userData, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to update user');
//         }
//         return response;
//       }),

//   // Get user data
//   getUser: () => 
//     secureApiClient.makeEncryptedCall('user', 'getUser')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch user data');
//         }
//         return response;
//       }),

//   // Add tenant by client (with file upload)
//   addTenantByClient: (formData) => {
//     const encryptedRoute = encryptedRoutes.user.base;
//     const encryptedEndpoint = encryptedRoutes.user.endpoints.addTenantByClient;
    
//     return api.post(`/api/${encryptedRoute}/${encryptedEndpoint}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });
//   }
// };

// export const mapAPI = {
//   // Add or update map location
//   addOrUpdateMap: (payload) => 
//     secureApiClient.makeEncryptedCall('map', 'addOrUpdateMap', payload, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to save map location');
//         }
//         return response;
//       }),

//   // Get all maps
//   getAllMaps: () => 
//     secureApiClient.makeEncryptedCall('map', 'getAllMaps')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch maps');
//         }
//         return response;
//       }),

//   // Get map by property ID
//   getMapByProperty: (propertyId) => 
//     secureApiClient.makeEncryptedCall('map', 'getMapByProperty', null, 'GET', {
//       params: { propertyId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch map data');
//         }
//         return response;
//       })
// };

// export const ticketAPI = {
//   // Create a new ticket
//   createTicket: (ticketData) => 
//     secureApiClient.makeEncryptedCall('tickets', 'createTicket', ticketData, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to create ticket');
//         }
//         return response;
//       }),

//   // Get all tickets for a specific client
//   getTicketsByClient: (clientId) => 
//     secureApiClient.makeEncryptedCall('tickets', 'getTicketsByClient', null, 'GET', {
//       params: { clientId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch client tickets');
//         }
//         return response;
//       }),

//   // Get all tickets (admin only)
//   getAllTickets: (params = {}) => 
//     secureApiClient.makeEncryptedCall('tickets', 'getAllTickets', null, 'GET', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch all tickets');
//         }
//         return response;
//       }),

//   // Update ticket (admin only)
//   updateTicket: (ticketId, updates) => 
//     secureApiClient.makeEncryptedCall('tickets', 'updateTicket', { ticketId, ...updates }, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to update ticket');
//         }
//         return response;
//       }),

//   // Get ticket by ID
//   getTicketById: (ticketId) => 
//     secureApiClient.makeEncryptedCall('tickets', 'getTicketById', null, 'GET', {
//       params: { ticketId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch ticket');
//         }
//         return response;
//       }),

//   // Close ticket
//   closeTicket: (ticketId, resolutionNotes = '') => 
//     secureApiClient.makeEncryptedCall('tickets', 'closeTicket', { ticketId, resolutionNotes }, 'PATCH')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to close ticket');
//         }
//         return response;
//       }),

//   // Add comment to ticket
//   addComment: (ticketId, comment) => 
//     secureApiClient.makeEncryptedCall('tickets', 'addComment', { ticketId, comment }, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to add comment');
//         }
//         return response;
//       }),

//   // Utility functions for ticket management
//   validateTicketData: (ticketData) => {
//     const errors = [];
    
//     if (!ticketData.title?.trim()) {
//       errors.push('Ticket title is required');
//     }
    
//     if (!ticketData.description?.trim()) {
//       errors.push('Ticket description is required');
//     }
    
//     if (!ticketData.category?.trim()) {
//       errors.push('Ticket category is required');
//     }
    
//     if (!ticketData.priority) {
//       errors.push('Ticket priority is required');
//     }
    
//     return {
//       isValid: errors.length === 0,
//       errors
//     };
//   },

//   formatTicketStatus: (status) => {
//     const statusMap = {
//       'open': 'Open',
//       'in_progress': 'In Progress',
//       'resolved': 'Resolved',
//       'closed': 'Closed',
//       'pending': 'Pending'
//     };
//     return statusMap[status] || status;
//   },

//   formatPriority: (priority) => {
//     const priorityMap = {
//       'low': 'Low',
//       'medium': 'Medium',
//       'high': 'High',
//       'urgent': 'Urgent'
//     };
//     return priorityMap[priority] || priority;
//   }
// };

// export const chatAPI = {
//   // Get conversations
//   getConversations: async () => {
//     try {
//       const response = await secureApiClient.makeEncryptedCall('chat', 'getConversations');
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Invalid response format');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//       throw error;
//     }
//   },
    
//   // Get messages for a specific conversation
//   getMessages: async (recipientId, propertyId) => {
//     try {
//       if (!recipientId || !propertyId) {
//         console.error('Missing parameters:', { recipientId, propertyId });
//         throw new Error('Recipient ID and Property ID are required');
//       }
      
//       const response = await secureApiClient.makeEncryptedCall('chat', 'getMessages', null, 'GET', {
//         params: { recipientId, propertyId }
//       });
      
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Invalid response format');
//       }
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching messages for ${recipientId}/${propertyId}:`, error);
//       throw error;
//     }
//   },
      
//   // Send a message
//   sendMessage: async (messageData) => {
//     try {
//       const requiredFields = ['recipientId', 'propertyId', 'content'];
//       const missingFields = requiredFields.filter(field => !messageData[field]);
      
//       if (missingFields.length > 0) {
//         throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
//       }

//       const response = await secureApiClient.makeEncryptedCall('chat', 'sendMessage', messageData, 'POST');
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to send message');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw error;
//     }
//   },
  
//   // Get unread message count
//   getUnreadCount: async () => {
//     try {
//       const response = await secureApiClient.makeEncryptedCall('chat', 'getUnreadCount');
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to get unread count');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error getting unread count:', error);
//       throw error;
//     }
//   },
  
//   // Mark messages as read
//   markAsRead: async (messageIds) => {
//     try {
//       if (!messageIds || messageIds.length === 0) {
//         throw new Error('Message IDs are required');
//       }
//       const response = await secureApiClient.makeEncryptedCall('chat', 'markAsRead', { messageIds }, 'PATCH');
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to mark messages as read');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error marking messages as read:', error);
//       throw error;
//     }
//   }
// };


// export const bankAccountAPI = {
//   // Add bank account
//   addBankAccount: (accountData) => {
//     const payload = {
//       propertyId: accountData.propertyId,
//       bankDetails: {
//         accountHolderName: accountData.accountHolderName,
//         accountNumber: accountData.accountNumber,
//         ifscCode: accountData.ifscCode,
//         bankName: accountData.bankName,
//         branchName: accountData.branchName,
//         accountType: accountData.accountType || 'savings'
//       }
//     };
    
//     console.log('API sending payload:', payload);
    
//     return secureApiClient.makeEncryptedCall('bankAccounts', 'addBankAccount', payload, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to add bank account');
//         }
//         return response;
//       });
//   },

//   // Get my bank accounts
//   getMyBankAccounts: () => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'getMyBankAccounts')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch bank accounts');
//         }
//         return response;
//       }),

//   // Get property bank account
//   getPropertyBankAccount: (propertyId) => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'getPropertyBankAccount', null, 'GET', {
//       params: { propertyId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch property bank account');
//         }
//         return response;
//       }),

//   // Update bank account
//   updateBankAccount: (accountId, updates) => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'updateBankAccount', { accountId, ...updates }, 'PUT')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to update bank account');
//         }
//         return response;
//       }),

//   // Delete bank account
//   deleteBankAccount: (accountId) => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'deleteBankAccount', { accountId }, 'DELETE')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to delete bank account');
//         }
//         return response;
//       }),

//   // Get all bank accounts (admin)
//   getAllBankAccounts: (params = {}) => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'getAllBankAccounts', null, 'GET', { params })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch all bank accounts');
//         }
//         return response;
//       }),

//   // Get bank account statistics (admin)
//   getBankAccountStats: () => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'getBankAccountStats')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch bank account statistics');
//         }
//         return response;
//       }),

//   // Verify bank account (admin)
//   verifyBankAccount: (accountId, verificationData = {}) => 
//     secureApiClient.makeEncryptedCall('bankAccounts', 'verifyBankAccount', { accountId, ...verificationData }, 'PATCH')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to verify bank account');
//         }
//         return response;
//       }),

//   // Utility functions for bank account validation
//   validateBankAccount: (accountData) => {
//     const errors = [];
    
//     if (!accountData.accountHolderName?.trim()) {
//       errors.push('Account holder name is required');
//     }
    
//     if (!accountData.accountNumber?.trim()) {
//       errors.push('Account number is required');
//     } else if (!/^\d{9,18}$/.test(accountData.accountNumber.replace(/\s/g, ''))) {
//       errors.push('Account number must be 9-18 digits');
//     }
    
//     if (!accountData.ifscCode?.trim()) {
//       errors.push('IFSC code is required');
//     } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(accountData.ifscCode.toUpperCase())) {
//       errors.push('Invalid IFSC code format');
//     }
    
//     if (!accountData.bankName?.trim()) {
//       errors.push('Bank name is required');
//     }
    
//     if (!accountData.branchName?.trim()) {
//       errors.push('Branch name is required');
//     }
    
//     return {
//       isValid: errors.length === 0,
//       errors
//     };
//   },

//   formatAccountNumber: (accountNumber) => {
//     if (!accountNumber) return '';
//     const cleaned = accountNumber.replace(/\s/g, '');
//     return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
//   },

//   maskAccountNumber: (accountNumber) => {
//     if (!accountNumber) return '';
//     const cleaned = accountNumber.replace(/\s/g, '');
//     if (cleaned.length <= 8) return cleaned;
//     return 'X'.repeat(cleaned.length - 4) + cleaned.slice(-4);
//   },

//   validateIFSC: (ifscCode) => {
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
//     return ifscRegex.test(ifscCode.toUpperCase());
//   }
// };



// // WISHLIST API - This was missing and causing the error
// export const wishlistAPI = {
//   // Add property to wishlist (send both userId and propertyId)
//   addToWishlist: (userId, propertyId) =>
//     secureApiClient.makeEncryptedCall('wishlist', 'addToWishlist', { userId, propertyId }, 'POST')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to add to wishlist');
//         }
//         return response;
//       }),

//   // Remove property from wishlist
//   removeFromWishlist: (userId, propertyId) =>
//     secureApiClient.makeEncryptedCall('wishlist', 'removeFromWishlist', { userId, propertyId }, 'DELETE')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to remove from wishlist');
//         }
//         return response;
//       }),

//   // Get wishlist for a user
//   getUserWishlist: (userId) =>
//     secureApiClient.makeEncryptedCall('wishlist', 'getUserWishlist', null, 'GET', {
//       params: { userId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch wishlist');
//         }
//         return response;
//       }),

//   // Check if property is in wishlist
//   checkWishlistStatus: (userId, propertyId) =>
//     secureApiClient.makeEncryptedCall('wishlist', 'checkWishlistStatus', null, 'GET', {
//       params: { userId, propertyId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to check wishlist status');
//         }
//         return response;
//       }),

//   // Get single wishlist item by ID
//   getWishlistItem: (wishlistItemId) =>
//     secureApiClient.makeEncryptedCall('wishlist', 'getWishlistItem', null, 'GET', {
//       params: { wishlistItemId }
//     })
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch wishlist item');
//         }
//         return response;
//       }),

//   // Admin: Get all wishlist items
//   getAllWishlistItems: () =>
//     secureApiClient.makeEncryptedCall('wishlist', 'getAllWishlistItems')
//       .then(response => {
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || 'Failed to fetch all wishlist items');
//         }
//         return response;
//       })
// };

// // REVIEW API
// export const reviewAPI = {
//   // Get reviews for a property
//   getPropertyReviews: (propertyId, status = 'approved') => 
//     secureApiClient.makeEncryptedCall('reviews', 'getPropertyReviews', null, 'GET', { 
//       params: { propertyId, status } 
//     })
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to fetch reviews');
//       }
//       return response;
//     }),

//   // Create a new review
//   createReview: (reviewData) => 
//     secureApiClient.makeEncryptedCall('reviews', 'createReview', reviewData, 'POST')
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to create review');
//       }
//       return response;
//     }),

//   // Get user's reviews
//   getUserReviews: (userId) => 
//     secureApiClient.makeEncryptedCall('reviews', 'getUserReviews', null, 'GET', {
//       params: { userId }
//     })
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to fetch user reviews');
//       }
//       return response;
//     }),

//   // Update a review
//   updateReview: (reviewId, updates) => 
//     secureApiClient.makeEncryptedCall('reviews', 'updateReview', { reviewId, ...updates }, 'PUT')
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to update review');
//       }
//       return response;
//     }),

//   // Delete a review
//   deleteReview: (reviewId) => 
//     secureApiClient.makeEncryptedCall('reviews', 'deleteReview', { reviewId }, 'DELETE')
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to delete review');
//       }
//       return response;
//     }),

//   // Get review statistics
//   getReviewStats: (propertyId) => 
//     secureApiClient.makeEncryptedCall('reviews', 'getReviewStats', null, 'GET', {
//       params: { propertyId }
//     })
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to fetch review statistics');
//       }
//       return response;
//     }),

//   // Admin: Get all reviews (with filtering)
//   getAllReviews: (params = {}) => 
//     secureApiClient.makeEncryptedCall('reviews', 'getAllReviews', null, 'GET', { params })
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to fetch all reviews');
//       }
//       return response;
//     }),

//   // Admin: Update review status
//   updateReviewStatus: (reviewId, status, adminNotes = '') => 
//     secureApiClient.makeEncryptedCall('reviews', 'updateReviewStatus', { reviewId, status, adminNotes }, 'PATCH')
//     .then(response => {
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to update review status');
//       }
//       return response;
//     })
// };
// // Utility functions
// export const handleApiError = (error) => {
//   const errorResponse = {
//     success: false,
//     message: 'An unexpected error occurred',
//     status: error.response?.status || 500,
//     error: null
//   };

//   if (error.response) {
//     errorResponse.message = error.response.data?.message || 'Request failed';
//     errorResponse.error = error.response.data?.error || error.response.data;
//   } else if (error.request) {
//     errorResponse.message = 'No response from server - please check your connection';
//   } else {
//     errorResponse.message = error.message || 'Request setup failed';
//   }

//   console.error('API Error:', {
//     message: errorResponse.message,
//     status: errorResponse.status,
//     config: error.config,
//     response: error.response?.data
//   });

//   return errorResponse;
// };

// export const apiCallWithRetry = async (apiCall, maxRetries = 2, delay = 1000) => {
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       const response = await apiCall();
//       return response;
//     } catch (error) {
//       if (i === maxRetries - 1) throw error;
//       await new Promise(resolve => setTimeout(resolve, delay));
//       delay *= 2;
//     }
//   }
// };

// // Export the main API instance for direct use if needed
// export { api, secureApiClient };

// export default secureApiClient;
