import React, { useEffect, useState } from "react";
import { 
  Phone, MessageCircle, User, Building, Search, RefreshCw, 
  Calendar, Filter, ChevronDown, ChevronUp, Home, X
} from "lucide-react";
import { adminContactsAPI } from  "../adminController";

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    calls: 0,
    today: 0
  });
  const [expandedContact, setExpandedContact] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [propertySearch, setPropertySearch] = useState("");

  // Fetch ALL contacts from database USING ADMIN API
  const fetchAllContacts = async () => {
    try {
      setLoading(true);
      
      // USE ADMIN API INSTEAD OF DIRECT FETCH
      const response = await adminContactsAPI.getAllContacts();
      
      if (response.data.success) {
        const contactsData = response.data.data || [];
        setContacts(contactsData);
        
        // Extract unique properties
        const propertyMap = new Map();
        
        contactsData.forEach(contact => {
          if (contact.propertyId && contact.propertyName) {
            if (!propertyMap.has(contact.propertyId)) {
              propertyMap.set(contact.propertyId, {
                id: contact.propertyId,
                name: contact.propertyName,
                count: 1
              });
            } else {
              propertyMap.get(contact.propertyId).count++;
            }
          }
        });
        
        const propertiesArray = Array.from(propertyMap.values())
          .sort((a, b) => b.count - a.count);
        
        setAllProperties(propertiesArray);
        
        // Calculate statistics
        const total = contactsData.length;
        const calls = contactsData.filter(c => c.contactMethod === 'call').length;
        const today = contactsData.filter(c => {
          if (!c.contactedAt) return false;
          const contactDate = new Date(c.contactedAt);
          const todayDate = new Date();
          return contactDate.toDateString() === todayDate.toDateString();
        }).length;
        
        setStats({ total, calls, today });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    // Apply search filter
    let matchesSearch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      matchesSearch = (
        (contact.userName && contact.userName.toLowerCase().includes(searchLower)) ||
        (contact.clientName && contact.clientName.toLowerCase().includes(searchLower)) ||
        (contact.propertyName && contact.propertyName.toLowerCase().includes(searchLower)) ||
        (contact.userPhone && contact.userPhone.includes(searchTerm)) ||
        (contact.clientPhone && contact.clientPhone.includes(searchTerm)) ||
        (contact.message && contact.message.toLowerCase().includes(searchLower))
      );
    }

    // Apply property filter
    let matchesProperty = true;
    if (selectedProperty !== "all") {
      matchesProperty = contact.propertyId === selectedProperty;
    }

    return matchesSearch && matchesProperty;
  });

  // Get filtered properties for dropdown
  const filteredProperties = allProperties.filter(property =>
    propertySearch === "" || 
    property.name.toLowerCase().includes(propertySearch.toLowerCase())
  );

  // Get selected property name
  const getSelectedPropertyName = () => {
    if (selectedProperty === "all") return "All Properties";
    const property = allProperties.find(p => p.id === selectedProperty);
    return property ? property.name : "Property";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  // Toggle contact details
  const toggleContactDetails = (contactId) => {
    if (expandedContact === contactId) {
      setExpandedContact(null);
    } else {
      setExpandedContact(contactId);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedProperty("all");
    setPropertySearch("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Records</h1>
            <p className="text-gray-600 mt-1">
              View all user-client contact interactions
            </p>
          </div>
          <button
            onClick={fetchAllContacts}
            className="flex items-center gap-2 px-4 py-2 bg-[#144FB6] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Contacts</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Phone Calls</p>
              <p className="text-2xl font-bold text-green-600">{stats.calls}</p>
            </div>
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.today}</p>
            </div>
            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* General Search */}
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, property, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Property Dropdown */}
          <div className="relative w-full md:w-64">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-gray-500" />
              <div className="relative flex-1">
                <button
                  onClick={() => document.getElementById('property-dropdown').classList.toggle('hidden')}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span className="truncate">{getSelectedPropertyName()}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  id="property-dropdown"
                  className="hidden absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  {/* Search inside dropdown */}
                  <div className="sticky top-0 bg-white p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={propertySearch}
                        onChange={(e) => setPropertySearch(e.target.value)}
                        className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  
                  {/* All Properties Option */}
                  <div
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedProperty === "all" ? "bg-blue-50 text-blue-600" : ""}`}
                    onClick={() => {
                      setSelectedProperty("all");
                      document.getElementById('property-dropdown').classList.add('hidden');
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">All Properties</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {contacts.length}
                      </span>
                    </div>
                  </div>
                  
                  {/* Property List */}
                  {filteredProperties.map(property => (
                    <div
                      key={property.id}
                      className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedProperty === property.id ? "bg-blue-50 text-blue-600" : ""}`}
                      onClick={() => {
                        setSelectedProperty(property.id);
                        document.getElementById('property-dropdown').classList.add('hidden');
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">{property.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {property.count}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {filteredProperties.length === 0 && (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      No properties found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {(searchTerm || selectedProperty !== "all") && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            {contacts.length === 0 ? (
              <>
                <div className="text-gray-400 text-5xl mb-4">📞</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Contacts Found</h3>
                <p className="text-gray-500">No contact records in the system.</p>
              </>
            ) : (
              <>
                <div className="text-gray-400 text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Matching Contacts</h3>
                <p className="text-gray-500">No contacts match your filter criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-4 px-2">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredContacts.length}</span> contact{filteredContacts.length !== 1 ? 's' : ''}
                {selectedProperty !== "all" && (
                  <span> for <span className="font-semibold text-blue-600">{getSelectedPropertyName()}</span></span>
                )}
              </p>
            </div>

            {/* Contacts List */}
            {filteredContacts.map((contact) => (
              <div
                key={contact._id || contact.id}
                className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Contact Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleContactDetails(contact._id || contact.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        contact.contactMethod === 'call' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {contact.contactMethod === 'call' ? (
                          <Phone className="w-5 h-5 text-green-600" />
                        ) : (
                          <MessageCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-800">
                            {contact.userName || "Unknown User"}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="font-semibold text-gray-800">
                            {contact.clientName || "Unknown Client"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 truncate">{contact.propertyName || "Property"}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{getTimeAgo(contact.contactedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.contactMethod === 'call' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {contact.contactMethod === 'call' ? 'Phone Call' : 'Chat'}
                      </div>
                      {expandedContact === (contact._id || contact.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedContact === (contact._id || contact.id) && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* User Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">User Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              <span className="font-medium">Name:</span> {contact.userName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              <span className="font-medium">Phone:</span> {contact.userPhone || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Client Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Client Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              <span className="font-medium">Name:</span> {contact.clientName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              <span className="font-medium">Phone:</span> {contact.clientPhone || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Property Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              <span className="font-medium">Name:</span> {contact.propertyName}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Property ID:</span> {contact.propertyId}
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Contact Details</h4>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Type:</span> 
                            <span className="ml-2 capitalize px-2 py-1 bg-gray-200 rounded text-xs">
                              {contact.contactType || 'inquiry'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Status:</span> 
                            <span className={`ml-2 capitalize px-2 py-1 rounded text-xs ${
                              contact.status === 'contacted' ? 'bg-green-100 text-green-700' :
                              contact.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              contact.status === 'responded' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {contact.status || 'contacted'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Contacted:</span> {formatDate(contact.contactedAt)}
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      {contact.message && (
                        <div className="md:col-span-2 space-y-3">
                          <h4 className="font-semibold text-gray-700">Message</h4>
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <p className="text-sm text-gray-700">{contact.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminContactsPage;