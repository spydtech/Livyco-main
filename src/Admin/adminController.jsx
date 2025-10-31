import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
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

const getbankAccountsAPI = {
  getAllBankAccounts: () => api.get("/bank-accounts/admin/get/all"),
};

export { getbankAccountsAPI };



export const adminTicketAPI = {
  

  // Get all tickets (admin only)
  getAllTickets: (params = {}) => 
    api.get('/tickets', { params })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch all tickets');
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

  // Get ticket by ID (you might want to add this endpoint to your backend)
  getTicketById: (ticketId) => 
    api.get(`/tickets/${ticketId}`)
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch ticket');
        }
        return response;
      }),

  // Close ticket (you might want to add this endpoint to your backend)
  closeTicket: (ticketId, resolutionNotes = '') => 
    api.patch(`/tickets/${ticketId}/close`, { resolutionNotes })
      .then(response => {
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to close ticket');
        }
        return response;
      }),

  // Add comment to ticket (you might want to add this endpoint to your backend)
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