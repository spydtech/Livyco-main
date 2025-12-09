import axios from "axios";



 export const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const adminNotificationAPI = {
  // Get notifications based on user role
  getNotifications: (params = {}) => 
    api.get('/notifications', { params })
      .then(response => {
        console.log('📨 Notifications API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Notifications API Error:', error.response?.data || error.message);
        throw error;
      }),

  // Get unread count
  getUnreadCount: () => 
    api.get('/notifications/unread-count')
      .then(response => {
        console.log('🔔 Unread Count API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Unread Count API Error:', error.response?.data || error.message);
        throw error;
      }),

  // Mark notification as read
  markAsRead: (notificationId) => 
    api.patch(`/notifications/read/${notificationId}`)
      .then(response => {
        console.log('✅ Mark as Read API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Mark as Read API Error:', error.response?.data || error.message);
        throw error;
      }),

  // Mark all notifications as read
  markAllAsRead: () => 
    api.patch('/notifications/read-all')
      .then(response => {
        console.log('✅ Mark All as Read API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Mark All as Read API Error:', error.response?.data || error.message);
        throw error;
      }),

  // Delete notification
  deleteNotification: (notificationId) => 
    api.delete(`/notifications/${notificationId}`)
      .then(response => {
        console.log('✅ Delete Notification API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Delete Notification API Error:', error.response?.data || error.message);
        throw error;
      }),

  // Debug endpoint to check all notifications
  getDebugNotifications: () => 
    api.get('/notifications/debug/all')
      .then(response => {
        console.log('🐛 Debug Notifications API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Debug Notifications API Error:', error.response?.data || error.message);
        throw error;
      }),

  // Create test notification
  createTestNotification: () => 
    api.post('/notifications/test/admin')
      .then(response => {
        console.log('🧪 Test Notification API Response:', response.data);
        return response;
      })
      .catch(error => {
        console.error('❌ Test Notification API Error:', error.response?.data || error.message);
        throw error;
      })
};

const propertyAPI = {
  getPropertyById: (id) => api.get(`/properties/complete?id=${id}`),
  approveProperty: (id) => api.patch(`/admin/properties/${id}/approve`),
  rejectProperty: (id, data) => api.patch(`/admin/properties/${id}/reject`, data),
  requestRevision: (id, revisionNotes) => api.patch(`/properties/${id}/request-revision`, { revisionNotes }),
  getApprovedProperties: () => api.get("/properties?status=approved"),
  getPendingProperties: () => api.get("/properties?status=pending")
};


export default propertyAPI;

const adminUserAPI = {
  getAllUsers: () => api.get("/auth/users"),
};

export { adminUserAPI };

 export const adminBankAccountsAPI = {
  getAllBankAccounts: () => api.get("/bank-accounts/admin/get/all"),
  
 // Get bank accounts by PROPERTY ID (not clientId)
  getBankAccountsByProperty: (propertyId) => 
    api.get(`/bank-accounts/admin/get/all?propertyId=${propertyId}`),
  // Get bank accounts by CLIENT ID (fallback)
  getBankAccountsByClient: (clientId) => 
    api.get(`/bank-accounts/admin/get/all?clientId=${clientId}`),
  // Verify bank account
  verifyBankAccount: (accountId, verificationData) => 
    api.patch(`/bank-accounts/admin/verify/${accountId}`, verificationData),
  
  // Get bank account stats
  getBankAccountStats: () => 
    api.get("/bank-accounts/admin/stats"),
};

// Admin Bookings API
export const adminBookingsAPI = {
  // Get all bookings
  getAllBookings: () => api.get("/auth/bookings"),
  
  // Get offline bookings
  getOfflineBookings: () => api.get("/offline-bookings"),
  
  // Get booking by ID
  getBookingById: (bookingId) => api.get(`/auth/bookings/${bookingId}`),
  
  // Update booking status
  updateBookingStatus: (bookingId, status, reason = "") => 
    api.patch(`/auth/bookings/${bookingId}/status`, { status, reason }),
};

// adminController.js - Fix the manual transfer API
// export const adminPaymentsAPI = {
//   // Manual transfer - CORRECTED
//   initiateManualTransfer: async (transferData) => {
//     try {
//       console.log("🔄 SEND TRANSFER DATA:", {
//         endpoint: `/transfer/initiate/${transferData.bookingId}`,
//         data: transferData,
//         hasPaymentId: !!transferData.paymentId,
//         hasBankAccountId: !!transferData.bankAccountId
//       });

//       const response = await api.post(
//         `/transfer/initiate/${transferData.bookingId}`,
//         transferData
//       );
      
//       console.log("✅ TRANSFER RESPONSE:", response.data);
//       return response;
      
//     } catch (error) {
//       console.error("❌ TRANSFER ERROR DETAILS:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//         url: error.config?.url
//       });
//       throw error;
//     }
//   },

//   // Get transfer details
//   getTransferDetails: async (bookingId) => {
//     try {
//       const response = await api.get(`/transfer/status/${bookingId}`);
//       return response;
//     } catch (error) {
//       console.error('Get transfer details error:', error);
//       throw error;
//     }
//   },

//   // Get payment history
//   getPaymentHistory: async (bookingId) => {
//     try {
//       const response = await api.get(`/payments/history/${bookingId}`);
//       return response;
//     } catch (error) {
//       console.error('Get payment history error:', error);
//       throw error;
//     }
//   },

//   // Get payments by client
//   getPaymentsByClient: async (clientId) => {
//     try {
//       const response = await api.get(`/payments/by-client/${clientId}`);
//       return response;
//     } catch (error) {
//       console.error('Get payments by client error:', error);
//       throw error;
//     }
//   },

//   // Get payment details
//   getPaymentDetails: async (paymentId) => {
//     try {
//       const response = await api.get(`/payments/${paymentId}`);
//       return response;
//     } catch (error) {
//       console.error('Get payment details error:', error);
//       throw error;
//     }
//   },

//   // Create payment order
//   createOrder: async (orderData) => {
//     try {
//       const response = await api.post('/payments/create-order', orderData);
//       return response;
//     } catch (error) {
//       console.error('Create order error:', error);
//       throw error;
//     }
//   },

//   // Validate payment
//   validatePayment: async (paymentData) => {
//     try {
//       const response = await api.post('/payments/validate-payment', paymentData);
//       return response;
//     } catch (error) {
//       console.error('Validate payment error:', error);
//       throw error;
//     }
//   },

//   // Refund payment
//   refundPayment: async (refundData) => {
//     try {
//       const response = await api.post('/payments/refund', refundData);
//       return response;
//     } catch (error) {
//       console.error('Refund payment error:', error);
//       throw error;
//     }
//   }
// };


// export const adminPaymentsAPI = {
//   // Razorpay transfer - Main function
//    initiateRazorpayTransfer: async (transferData) => {
//     try {
//       console.log("🔄 Calling Razorpay transfer API:", {
//         endpoint: `/razorpay/transfer/initiate/${transferData.bookingId}`,
//         data: transferData
//       });
      
//       const response = await api.post(`/razorpay/transfer/initiate/${transferData.bookingId}`, transferData);
      
//       console.log("✅ Razorpay transfer API response:", response.data);
//       return response;
      
//     } catch (error) {
//       console.error("❌ Razorpay transfer API error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   },

//   // Manual transfer - FIXED: This function exists and calls the right endpoint
//   initiateManualTransfer: async (transferData) => {
//     try {
//       console.log("🔄 Calling Manual transfer API:", {
//         endpoint: `/manual/transfer/initiate/${transferData.bookingId}`,
//         data: transferData
//       });
      
//       const response = await api.post(`/manual/transfer/initiate/${transferData.bookingId}`, transferData);
      
//       console.log("✅ Manual transfer API response:", response.data);
//       return response;
      
//     } catch (error) {
//       console.error("❌ Manual transfer API error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   },


//   // Check payout status
//   checkPayoutStatus: async (payoutId) => {
//     try {
//       const response = await api.get(`/razorpay/payout/status/${payoutId}`);
//       return response;
//     } catch (error) {
//       console.error('Check payout status API error:', error);
//       throw error;
//     }
//   },

//   // Get Razorpay balance
//   getRazorpayBalance: async () => {
//     try {
//       const response = await api.get(`/razorpay/balance`);
//       return response;
//     } catch (error) {
//       console.error('Get Razorpay balance API error:', error);
//       throw error;
//     }
//   },

//   // Verify bank account
//   verifyBankAccount: async (verificationData) => {
//     try {
//       const response = await api.post(`/razorpay/verify-bank-account`, verificationData);
//       return response;
//     } catch (error) {
//       console.error('Verify bank account API error:', error);
//       throw error;
//     }
//   },

//   // Get transfer history
//   getTransferHistory: async (bookingId) => {
//     try {
//       const response = await api.get(`/razorpay/transfers/${bookingId}`);
//       return response;
//     } catch (error) {
//       console.error('Get transfer history API error:', error);
//       throw error;
//     }
//   },

//   // Test Razorpay connection
//   testRazorpayConnection: async () => {
//     try {
//       const response = await api.get(`/razorpay/test-connection`);
//       return response;
//     } catch (error) {
//       console.error('Test Razorpay connection API error:', error);
//       throw error;
//     }
//   },

//   // Get payment history
//   getPaymentHistory: async (bookingId) => {
//     try {
//       const response = await api.get(`/payments/history/${bookingId}`);
//       return response;
//     } catch (error) {
//       console.error('Get payment history API error:', error);
//       throw error;
//     }
//   }
// };

// Admin Payments API
export const adminPaymentsAPI = {
  // Razorpay transfer - Actual money transfer
  initiateRazorpayTransfer: async (transferData) => {
    try {
      console.log("🔄 Calling Razorpay transfer API:", {
        endpoint: `/razorpay/transfer/initiate/${transferData.bookingId}`,
        data: transferData
      });
      
      const response = await api.post(`/razorpay/transfer/initiate/${transferData.bookingId}`, transferData);
      
      console.log("✅ Razorpay transfer API response:", response.data);
      return response;
      
    } catch (error) {
      console.error("❌ Razorpay transfer API error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  // Manual transfer - Recording only
  initiateManualTransfer: async (transferData) => {
    try {
      console.log("🔄 Calling Manual transfer API:", {
        endpoint: `/manual/transfer/initiate/${transferData.bookingId}`,
        data: transferData
      });
      
      const response = await api.post(`/manual/transfer/initiate/${transferData.bookingId}`, transferData);
      
      console.log("✅ Manual transfer API response:", response.data);
      return response;
      
    } catch (error) {
      console.error("❌ Manual transfer API error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  // Check payout status
  checkPayoutStatus: async (payoutId) => {
    try {
      const response = await api.get(`/razorpay/payout/status/${payoutId}`);
      return response;
    } catch (error) {
      console.error('Check payout status API error:', error);
      throw error;
    }
  },

  // Get Razorpay balance
  getRazorpayBalance: async () => {
    try {
      const response = await api.get(`/razorpay/balance`);
      return response;
    } catch (error) {
      console.error('Get Razorpay balance API error:', error);
      throw error;
    }
  },

  // Get transfer details
  getTransferDetails: async (bookingId) => {
    try {
      const response = await api.get(`/transfer/details/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Get transfer details API error:', error);
      throw error;
    }
  },

  // Get payment history
  getPaymentHistory: async (bookingId) => {
    try {
      const response = await api.get(`/payments/history/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Get payment history API error:', error);
      throw error;
    }
  },

  // Get payments by client
  getPaymentsByClient: async (clientId) => {
    try {
      const response = await api.get(`/payments/by-client/${clientId}`);
      return response;
    } catch (error) {
      console.error('Get payments by client API error:', error);
      throw error;
    }
  },

  // Health check
  getPaymentHealth: async () => {
    try {
      const response = await api.get(`/payments/health`);
      return response;
    } catch (error) {
      console.error('Get payment health API error:', error);
      throw error;
    }
  }
};
export const adminTicketAPI = {
  // Get all tickets (admin only)
  getAllTickets: (params = {}) =>
    api.get('/tickets', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch tickets');
        }
        return response;
      }),
 
  // Update ticket (admin only)
  updateTicket: (ticketId, updates) =>
    api.put(`/tickets/${ticketId}`, updates)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to update ticket');
        }
        return response;
      }),
 
  // Get ticket by ID
  getTicketById: (ticketId) =>
    api.get(`/tickets/${ticketId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch ticket');
        }
        return response;
      }),
 
  // Close ticket
  closeTicket: (ticketId, resolutionNotes = '') =>
    api.patch(`/tickets/${ticketId}/close`, { resolutionNotes })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to close ticket');
        }
        return response;
      }),
 
  // Add comment to ticket
  addComment: (ticketId, comment) =>
    api.post(`/tickets/${ticketId}/comments`, { comment })
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
      'Open': 'Open',
      'in_progress': 'In Progress',
      'In Progress': 'In Progress',
      'resolved': 'Resolved',
      'Resolved': 'Resolved',
      'closed': 'Closed',
      'Closed': 'Closed'
    };
    return statusMap[status] || status;
  },
 
  formatPriority: (priority) => {
    const priorityMap = {
      'low': 'Low',
      'Low': 'Low',
      'medium': 'Medium',
      'Medium': 'Medium',
      'high': 'High',
      'High': 'High'
    };
    return priorityMap[priority] || priority;
  },
 
  getStatusColor: (status) => {
    const colorMap = {
      'Open': 'bg-yellow-400',
      'In Progress': 'bg-blue-400',
      'Resolved': 'bg-green-400',
      'Closed': 'bg-purple-400'
    };
    return colorMap[status] || 'bg-gray-400';
  },
 
  getPriorityColor: (priority) => {
    const colorMap = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colorMap[priority] || 'bg-gray-100 text-gray-800';
  }
};




export const pgAPIadmin = {
  // ✅ Create or update PG property
  savePGProperty: (propertyId, formData) => {
   
    

    return propertyId
      ? api.put(`/auth/pg/${propertyId}`, formData) 
      : api.post('/auth/pg', formData) 
  },
        


  // ✅ Get PG property details
  getPGProperty: (propertyId) => {
  

    return api.get(`/auth/pg/${propertyId}`);
  },

  // ✅ Delete a PG property
  deletePGProperty: (pgId) => {
    

    return api.delete(`/auth/pg/${pgId}`);
  },
};


export const roomAPIadmin = {
  // ✅ Create room types
  createRoomTypes: (propertyId, data) => {
   

    return api.post(`/auth/${propertyId}/rooms`, data);
  },

  // ✅ Get all room types
  getRoomTypes: (propertyId) => {
  

    return api.get(`/auth/${propertyId}/rooms`);
  },

  // ✅ Get floor data
  getFloorData: (propertyId) => {
    

    return api.get(`/auth/${propertyId}/rooms/floor`) ;
  },

  // ✅ Save floor data
  saveFloorData: (propertyId, data) => {
   
    return api.post(`/auth/${propertyId}/rooms/floor`, data);
  },

  // ✅ Get room rent data
  getRoomRentData: (propertyId) => {
    

    return api.get(`/auth/${propertyId}/rooms/rent`);
  },

  // ✅ Save room rent data
  saveRoomRentData: (propertyId, data) => {
   

    return api.post(`/auth/${propertyId}/rooms/rent`, data);
  },

  // ✅ Delete a room type
  deleteRoomType: (propertyId, roomTypeId) => {
    
    return api.delete(`/auth/rooms/${propertyId}/${roomTypeId}`);
  },

  // ✅ Update a room type
  updateRoomType: (propertyId, roomTypeId, data) => {
   

    return api.put(`/auth/${propertyId}/rooms/${roomTypeId}`, data);
  },
};


export const mediaAPI = {
  // ✅ Get media by property ID
  getMediaByProperty: (propertyId) => {
   
    
    return api.get(`/auth/media/property/${propertyId}`);
  },
  
  // ✅ Upload media
};


export const mapAPI = {
  getMapByProperty: (propertyId) => api.get(`/map/${propertyId}`),
};