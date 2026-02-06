import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Filter, 
  Download, 
  Printer,
  Users,
  Home,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Search
} from 'lucide-react';
import ClientNav from '../Client-Navbar/ClientNav';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock events data
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: 'Property Inspection',
        type: 'inspection',
        date: new Date(2024, 0, 15, 10, 0),
        duration: 2,
        property: 'Sunrise Apartments',
        tenant: 'John Smith',
        status: 'confirmed',
        color: 'bg-blue-500'
      },
      {
        id: 2,
        title: 'Rent Collection',
        type: 'payment',
        date: new Date(2024, 0, 5, 14, 0),
        duration: 1,
        property: 'Mountain View Villa',
        tenant: 'Sarah Johnson',
        status: 'pending',
        color: 'bg-green-500'
      },
      {
        id: 3,
        title: 'Maintenance Check',
        type: 'maintenance',
        date: new Date(2024, 0, 10, 9, 0),
        duration: 3,
        property: 'City Center Loft',
        tenant: 'Mike Wilson',
        status: 'confirmed',
        color: 'bg-yellow-500'
      },
      {
        id: 4,
        title: 'New Tenant Meeting',
        type: 'meeting',
        date: new Date(2024, 0, 20, 11, 0),
        duration: 1.5,
        property: 'Lakeside Condo',
        tenant: 'Emily Davis',
        status: 'pending',
        color: 'bg-purple-500'
      },
      {
        id: 5,
        title: 'Contract Renewal',
        type: 'contract',
        date: new Date(2024, 0, 25, 15, 0),
        duration: 2,
        property: 'Garden Apartments',
        tenant: 'Robert Brown',
        status: 'confirmed',
        color: 'bg-red-500'
      }
    ];
    setEvents(mockEvents);
  }, []);

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
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
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

  // Get upcoming events
  const upcomingEvents = events
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ClientNav />
      
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
                Manage property inspections, tenant meetings, and payment schedules
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowEventModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Add New Event
              </button>
              
              <button className="bg-white text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-3 border border-gray-200 shadow-sm">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              
              <button className="bg-white text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-3 border border-gray-200 shadow-sm">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* View Toggle & Navigation */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  {['month', 'week', 'day'].map((viewType) => (
                    <button
                      key={viewType}
                      onClick={() => setView(viewType)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        view === viewType 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                    </button>
                  ))}
                </div>
                
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
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className={`${event.color} text-white text-xs p-2 rounded-lg truncate cursor-pointer hover:opacity-90 transition-opacity`}
                                title={`${event.title} - ${event.property}`}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="text-xs opacity-90 truncate">{event.property}</div>
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

            {/* Selected Date Events */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Events for {formatDate(selectedDate)}
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {getEventsForDate(selectedDate).length} events
                </span>
              </div>
              
              <div className="space-y-4">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 group hover:shadow-sm"
                    >
                      <div className={`w-3 h-3 rounded-full mt-2 ${event.color.replace('bg-', '')}`}></div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.date.toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })} • {event.duration}h
                              </div>
                              <div className="flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                {event.property}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.tenant}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                            <button className="p-1 hover:bg-gray-100 rounded-lg">
                              <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No events scheduled for this date</p>
                    <button
                      onClick={() => setShowEventModal(true)}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add an event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg ${event.color} flex items-center justify-center`}>
                        <CalendarIcon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.property}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-500">
                            {event.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                            {' • '}
                            {event.date.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            event.status === 'confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Types Legend */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Event Types</h3>
              
              <div className="space-y-3">
                {[
                  { type: 'inspection', label: 'Property Inspection', color: 'bg-blue-500' },
                  { type: 'payment', label: 'Rent Collection', color: 'bg-green-500' },
                  { type: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500' },
                  { type: 'meeting', label: 'Tenant Meeting', color: 'bg-purple-500' },
                  { type: 'contract', label: 'Contract Renewal', color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-gray-700">{item.label}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {events.filter(e => e.type === item.type).length}
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
                  <span>Confirmed</span>
                  <span className="text-2xl font-bold">
                    {events.filter(e => e.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pending</span>
                  <span className="text-2xl font-bold">
                    {events.filter(e => e.status === 'pending').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>This Month</span>
                  <span className="text-2xl font-bold">
                    {events.filter(e => 
                      e.date.getMonth() === currentMonth.getMonth() &&
                      e.date.getFullYear() === currentMonth.getFullYear()
                    ).length}
                  </span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add New Event</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <span className="text-2xl text-gray-500">&times;</span>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="inspection">Property Inspection</option>
                  <option value="payment">Rent Collection</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="meeting">Tenant Meeting</option>
                  <option value="contract">Contract Renewal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="sunrise">Sunrise Apartments</option>
                  <option value="mountain">Mountain View Villa</option>
                  <option value="city">City Center Loft</option>
                  <option value="lake">Lakeside Condo</option>
                  <option value="garden">Garden Apartments</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
                >
                  Add Event
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
              <div className={`w-12 h-12 rounded-lg ${selectedEvent.color} flex items-center justify-center`}>
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <span className="text-2xl text-gray-500">&times;</span>
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium">
                    {selectedEvent.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    {' at '}
                    {selectedEvent.date.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Property</p>
                  <p className="font-medium">{selectedEvent.property}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Tenant</p>
                  <p className="font-medium">{selectedEvent.tenant}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {selectedEvent.status === 'confirmed' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`font-medium ${
                    selectedEvent.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
              <button className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Edit
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;