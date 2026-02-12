import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Filter, 
  Download, 
  Printer,
  Home,
  Clock,
  MoreVertical,
  Search,
  Edit,
  Trash2,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
  RefreshCw,
  MapPin
} from 'lucide-react';
import ClientNav from '../Client-Navbar/ClientNav';

// Import your property API - UPDATED TO INCLUDE eventAPI
import { propertyAPI, userAPI, eventAPI } from "../PropertyController";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [filter, setFilter] = useState({
    type: 'all',
    propertyId: 'all'
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Properties state
  const [properties, setProperties] = useState([]);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'inspection',
    startDate: '',
    startTime: '',
    clientId: localStorage.getItem('clientId') || 'N/A',
    propertyId: '',
    propertyName: '',
    location: ''
  });

  // Track if we're editing or creating
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Track which menu is open
  const [openMenuId, setOpenMenuId] = useState(null);

  // Event types with colors
  const eventTypes = [
    { value: 'inspection', label: 'Property Inspection', color: 'bg-blue-500' },
    { value: 'payment', label: 'Rent Collection', color: 'bg-green-500' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500' },
    { value: 'meeting', label: 'Tenant Meeting', color: 'bg-purple-500' },
    { value: 'contract', label: 'Contract Renewal', color: 'bg-red-500' },
    { value: 'other', label: 'Other', color: 'bg-gray-500' }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.relative')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Get notification icon and styles
  const getNotificationConfig = (type) => {
    const config = {
      success: {
        icon: Info,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-400'
      },
      error: {
        icon: AlertCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        iconColor: 'text-red-400'
      },
      info: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-400'
      },
      warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-400'
      }
    };
    return config[type] || config.info;
  };

  // Fetch properties from your API
  const fetchProperties = async () => {
    try {
      setPropertiesLoading(true);
      const response = await propertyAPI.getProperty();
      
      if (response.data?.success) {
        const formattedProperties = response.data.data.map(item => {
          const property = item.property || item;
          const address = `${property.street || ''} ${property.locality || ''} ${property.city || ''}`.trim();
          
          return {
            id: property._id,
            name: property.name || 'Unnamed Property',
            address: address || '',
            city: property.city || '',
            clientId: property.clientId,
            fullData: item
          };
        });
        
        setProperties(formattedProperties);
        
        if (formattedProperties.length === 0) {
          showNotification('No properties found. Please add properties first.', 'info');
        } else {
          showNotification(`Loaded ${formattedProperties.length} properties`, 'success');
        }
      } else {
        showNotification('Failed to load properties', 'warning');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      showNotification('Failed to load properties', 'error');
    } finally {
      setPropertiesLoading(false);
    }
  };

  // Fetch events from backend - UPDATED TO USE eventAPI
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getUser();
      const clientId = data.data.user.clientId || 'N/A';
      
      // Get current month and year
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      
      // Build query parameters based on schema fields
      const params = { 
        month, 
        year,
        clientId,
        ...(filter.type !== 'all' && { type: filter.type }),
        ...(filter.propertyId !== 'all' && { propertyId: filter.propertyId })
      };
      
      const response = await eventAPI.getClientEvents(clientId, params);

      if (response.data.success) {
        const formattedEvents = response.data.events.map(event => ({
          id: event.id || event._id,
          title: event.title,
          type: event.type,
          date: new Date(event.start),
          startDate: event.start,
          propertyId: event.propertyId,
          propertyName: event.propertyName,
          location: event.location,
          clientId: event.clientId,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt
        }));

        setEvents(formattedEvents);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again.');
      showNotification('Could not load events from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Get color by event type
  const getColorByType = (type) => {
    const typeMap = {
      inspection: '#3B82F6',
      payment: '#10B981',
      maintenance: '#F59E0B',
      meeting: '#8B5CF6',
      contract: '#EF4444',
      other: '#6B7280'
    };
    return typeMap[type] || '#3B82F6';
  };

  // Format date for input
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Format time for input
  const formatTimeForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toTimeString().slice(0, 5);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));

    // Update property name and location when property is selected
    if (name === 'propertyId' && value) {
      const selectedProperty = properties.find(p => p.id === value);
      if (selectedProperty) {
        setNewEvent(prev => ({
          ...prev,
          propertyName: selectedProperty.name,
          location: selectedProperty.address || ''
        }));
      }
    }

    // Update clientId from selected property
    if (name === 'propertyId' && value) {
      const selectedProperty = properties.find(p => p.id === value);
      if (selectedProperty && selectedProperty.clientId) {
        setNewEvent(prev => ({
          ...prev,
          clientId: selectedProperty.clientId
        }));
      }
    }
  };
  
  // Handle create event - UPDATED TO USE eventAPI
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    
    try {
      // Combine date and time for start
      const startDateTime = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
      
      // Validate required fields
      if (!newEvent.title.trim()) {
        showNotification('Please enter event title', 'error');
        return;
      }

      if (!newEvent.propertyId) {
        showNotification('Please select a property', 'error');
        return;
      }

      // Get clientId from selected property or localStorage
      const selectedProperty = properties.find(p => p.id === newEvent.propertyId);
      const clientId = selectedProperty?.clientId || localStorage.getItem('clientId') || 'N/A';

      const eventData = {
        title: newEvent.title,
        type: newEvent.type,
        startDate: startDateTime.toISOString(),
        clientId: clientId,
        propertyId: newEvent.propertyId,
        propertyName: newEvent.propertyName,
        location: newEvent.location || ''
      };

      const response = await eventAPI.createEvent(eventData);
      
      if (response.data.success) {
        showNotification('Event created successfully');
        setShowEventModal(false);
        resetNewEventForm();
        fetchEvents();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      showNotification(
        error.response?.data?.message || 'Failed to create event', 
        'error'
      );
    }
  };

  // Handle update event - UPDATED TO USE eventAPI
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    
    if (!editingEventId) {
      showNotification('No event selected for editing', 'error');
      return;
    }
    
    try {
      // Combine date and time for start
      const startDateTime = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
      
      // Validate required fields
      if (!newEvent.title.trim()) {
        showNotification('Please enter event title', 'error');
        return;
      }

      if (!newEvent.propertyId) {
        showNotification('Please select a property', 'error');
        return;
      }

      // Get clientId from selected property or localStorage
      const selectedProperty = properties.find(p => p.id === newEvent.propertyId);
      const clientId = selectedProperty?.clientId || localStorage.getItem('clientId') || 'N/A';

      const updates = {
        title: newEvent.title,
        type: newEvent.type,
        startDate: startDateTime.toISOString(),
        clientId: clientId,
        propertyId: newEvent.propertyId,
        propertyName: newEvent.propertyName,
        location: newEvent.location || ''
      };

      const response = await eventAPI.updateEvent(editingEventId, updates);
      
      if (response.data.success) {
        showNotification('Event updated successfully');
        setShowEventModal(false);
        resetNewEventForm();
        setIsEditing(false);
        setEditingEventId(null);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error updating event:', error);
      showNotification(
        error.response?.data?.message || 'Failed to update event', 
        'error'
      );
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = (e) => {
    if (isEditing && editingEventId) {
      handleUpdateEvent(e);
    } else {
      handleCreateEvent(e);
    }
  };

  // Handle delete event - UPDATED TO USE eventAPI
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await eventAPI.deleteEvent(eventId);
      
      if (response.data.success) {
        showNotification('Event deleted successfully');
        setSelectedEvent(null);
        setShowDeleteConfirm(false);
        setEventToDelete(null);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      showNotification(
        error.response?.data?.message || 'Failed to delete event', 
        'error'
      );
    }
  };

  // Reset new event form
  const resetNewEventForm = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setNewEvent({
      title: '',
      type: 'inspection',
      startDate: formatDateForInput(today),
      startTime: '10:00',
      clientId: localStorage.getItem('clientId') || 'N/A',
      propertyId: '',
      propertyName: '',
      location: ''
    });
  };

  // Open event modal for creation
  const openCreateModal = () => {
    resetNewEventForm();
    setIsEditing(false);
    setEditingEventId(null);
    setShowEventModal(true);
    setOpenMenuId(null);
  };

  // Open event modal for editing
  const openEditModal = (event) => {
    setNewEvent({
      title: event.title,
      type: event.type,
      startDate: formatDateForInput(event.date),
      startTime: formatTimeForInput(event.date),
      clientId: event.clientId,
      propertyId: event.propertyId,
      propertyName: event.propertyName,
      location: event.location || ''
    });
    setIsEditing(true);
    setEditingEventId(event.id);
    setShowEventModal(true);
    setSelectedEvent(null);
    setOpenMenuId(null);
  };

  // Confirm delete
  const confirmDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirm(true);
    setOpenMenuId(null);
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { firstDay, lastDay, daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  // Navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const today = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  // Generate days array
  const daysArray = [];
  for (let i = 0; i < startingDay; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  // Get events for a specific date
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Apply filters
  const applyFilters = () => {
    fetchEvents();
  };

  // Clear filters
  const clearFilters = () => {
    setFilter({
      type: 'all',
      propertyId: 'all'
    });
  };

  // Export events to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Title', 'Type', 'Date', 'Time', 'Property', 'Location', 'Created At'].join(','),
      ...events.map(event => [
        `"${event.title}"`,
        event.type,
        formatDateForInput(event.date),
        formatTimeForInput(event.date),
        `"${event.propertyName}"`,
        `"${event.location || ''}"`,
        new Date(event.createdAt).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-events-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Events exported successfully to CSV');
  };

  // Print calendar
  const printCalendar = () => {
    window.print();
  };

  // Filter properties by current user (client)
  const getFilteredProperties = () => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId || clientId === 'N/A') {
      return properties;
    }
    return properties.filter(property => property.clientId === clientId);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProperties();
    fetchEvents();
  }, []);

  // Fetch events when month or filter changes
  useEffect(() => {
    if (!propertiesLoading) {
      fetchEvents();
    }
  }, [currentMonth, filter, propertiesLoading]);

  if (loading && !events.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <ClientNav />
        <div className="max-w-7xl mx-auto p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  const NotificationIcon = getNotificationConfig(notification.type).icon;
  const notificationConfig = getNotificationConfig(notification.type);
  const filteredProperties = getFilteredProperties();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ClientNav />
      
      {/* Notification Component */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 ${notificationConfig.bgColor} ${notificationConfig.borderColor} border rounded-lg shadow-lg p-4 max-w-sm transition-all duration-300 animate-slide-in`}>
          <div className="flex items-start">
            <NotificationIcon className={`w-5 h-5 mt-0.5 mr-3 ${notificationConfig.iconColor}`} />
            <div className="flex-1">
              <p className={`text-sm font-medium ${notificationConfig.textColor}`}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <CalendarIcon className="w-10 h-10 text-blue-600" />
                Booking Calendar
              </h1>
              <p className="text-gray-600 mt-2">
                Manage property inspections, meetings, and schedules
              </p>
              {error && (
                <div className="mt-2 flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {propertiesLoading && (
                <div className="mt-2 flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Loading properties...</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Add New Event
              </button>
              
              <button 
                onClick={exportToCSV}
                className="bg-white text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-3 border border-gray-200 shadow-sm"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
              
              <button 
                onClick={printCalendar}
                className="bg-white text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-3 border border-gray-200 shadow-sm"
              >
                <Printer className="w-5 h-5" />
                Print
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
                
                <select
                  value={filter.type}
                  onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filter.propertyId}
                  onChange={(e) => setFilter(prev => ({ ...prev, propertyId: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Properties</option>
                  {filteredProperties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* View Toggle & Navigation */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={today}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Today
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <h2 className="text-xl font-bold text-gray-900 min-w-[200px] text-center">
                    {currentMonth.toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h2>
                  
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      if (searchTerm) {
                        const filtered = events.filter(event =>
                          event.title.toLowerCase().includes(searchTerm) ||
                          event.propertyName.toLowerCase().includes(searchTerm) ||
                          event.location?.toLowerCase().includes(searchTerm)
                        );
                        setEvents(filtered);
                      } else {
                        fetchEvents();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="p-4 text-center text-sm font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 auto-rows-[120px]">
                {daysArray.map((date, index) => {
                  const isToday = date && 
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();
                  
                  const isSelected = date && 
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();
                  
                  const dayEvents = getEventsForDate(date);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => date && setSelectedDate(date)}
                      className={`min-h-[120px] border border-gray-100 p-2 transition-all duration-200 ${
                        date ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                      } ${isToday ? 'bg-blue-50' : ''} ${
                        isSelected ? 'bg-blue-100 ring-2 ring-blue-500 ring-inset' : ''
                      }`}
                    >
                      {date && (
                        <>
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-sm font-medium ${
                              isToday 
                                ? 'text-blue-600 bg-blue-100 px-2 py-1 rounded-full'
                                : 'text-gray-900'
                            }`}>
                              {date.getDate()}
                            </span>
                            {dayEvents.length > 0 && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-1 max-h-[80px] overflow-y-auto">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                }}
                                className={`p-2 rounded-lg truncate cursor-pointer hover:opacity-90 transition-opacity`}
                                style={{ backgroundColor: getColorByType(event.type), color: 'white' }}
                                title={`${event.title} - ${event.propertyName}`}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="text-xs opacity-90 truncate">
                                  {formatTimeForInput(event.date)} - {event.propertyName}
                                </div>
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Events List */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  All Calendar Events
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {events.length} total events
                </span>
              </div>
              
              <div className="space-y-4">
                {events.length > 0 ? (
                  events
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 group hover:shadow-sm"
                    >
                      <div className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: getColorByType(event.type) }}></div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                {formatDate(event.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatTimeForInput(event.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                {event.propertyName}
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (openMenuId === event.id) {
                                    setOpenMenuId(null);
                                  } else {
                                    setOpenMenuId(event.id);
                                  }
                                }}
                                className="p-1 hover:bg-gray-100 rounded-lg"
                              >
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                              </button>
                              
                              {/* Menu that appears when clicked */}
                              {openMenuId === event.id && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditModal(event);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit Event
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      confirmDelete(event);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Event
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No events scheduled</p>
                    <button
                      onClick={openCreateModal}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add your first event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Types Legend */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Event Types</h3>
              
              <div className="space-y-3">
                {eventTypes.map((type) => (
                  <div key={type.value} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                    <span className="text-gray-700">{type.label}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {events.filter(e => e.type === type.value).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Calendar Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Events</span>
                  <span className="text-2xl font-bold">{events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upcoming</span>
                  <span className="text-2xl font-bold">
                    {events.filter(e => new Date(e.date) > new Date()).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Properties</span>
                  <span className="text-2xl font-bold">{filteredProperties.length}</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  fetchEvents();
                  fetchProperties();
                }}
                className="w-full mt-6 bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  resetNewEventForm();
                  setIsEditing(false);
                  setEditingEventId(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={newEvent.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={newEvent.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select 
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property *
                </label>
                <select 
                  name="propertyId"
                  value={newEvent.propertyId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a property</option>
                  {filteredProperties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event location (optional)"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false);
                    resetNewEventForm();
                    setIsEditing(false);
                    setEditingEventId(null);
                  }}
                  className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
                >
                  {isEditing ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: getColorByType(selectedEvent.type) }}
              >
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-6">
              {eventTypes.find(t => t.value === selectedEvent.type)?.label}
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium">
                    {formatDate(selectedEvent.date)}
                    {' at '}
                    {formatTimeForInput(selectedEvent.date)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Property</p>
                  <p className="font-medium">{selectedEvent.propertyName}</p>
                </div>
              </div>
              
              {selectedEvent.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{selectedEvent.location}</p>
                  </div>
                </div>
              )}
              
              {selectedEvent.createdAt && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Created</p>
                  <p className="text-gray-700">
                    {new Date(selectedEvent.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
              <button 
                onClick={() => {
                  setSelectedEvent(null);
                  openEditModal(selectedEvent);
                }}
                className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => confirmDelete(selectedEvent)}
                className="flex-1 px-4 py-3 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && eventToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Event</h3>
              <p className="text-gray-600">
                Are you sure you want to delete "{eventToDelete.title}"? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setEventToDelete(null);
                }}
                className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(eventToDelete.id)}
                className="flex-1 px-4 py-3 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;