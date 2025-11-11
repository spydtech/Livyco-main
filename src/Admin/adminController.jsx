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
export const adminPaymentsAPI = {
  // Manual transfer - FIXED
  initiateManualTransfer: async (transferData) => {
    return api.post(`/payments/transfer/initiate/${transferData.bookingId}`, transferData);
  },

  // Get transfer details
  getTransferDetails: async (bookingId) => {
    return api.get(`/transfer/status/${bookingId}`);
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