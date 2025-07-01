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


