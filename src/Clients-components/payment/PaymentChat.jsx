// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   MessageCircle, 
//   Phone, 
//   MoreVertical,
//   Send,
//   X,
//   Search,
//   Filter,
//   AlertCircle,
//   Clock,
//   Users,
//   Home,
//   CreditCard,
//   FileText,
//   Bell,
//   Mail,
//   Calendar,
//   ChevronRight,
//   ArrowLeft,
//   TrendingUp,
//   CheckCircle,
//   Loader2
// } from 'lucide-react';
// import ClientNav from '../Client-Navbar/ClientNav';
// import { bookingAPI } from '../PropertyController';
// import axios from 'axios';

// const getDaysLate = (dateString) => {
//   if (!dateString) return 0;
//   const date = new Date(dateString);
//   const today = new Date();
//   const diffTime = today - date;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays > 0 ? diffDays : 0;
// };

// export default function PaymentChat() {
//   const navigate = useNavigate();
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [requestpay, setRequestpay] = useState(false);
//   const [messagesByBooking, setMessagesByBooking] = useState({});
//   const [bookingUsers, setBookingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sending, setSending] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');

//   const API_BASE_URL = 'http://localhost:5000';

//   // Fetch bookings data
//   useEffect(() => {
//     fetchBookingUsers();
//   }, []);

//   // Fetch booking details when selected
//   useEffect(() => {
//     if (selectedBookingId) {
//       fetchBookingById(selectedBookingId);
//     }
//   }, [selectedBookingId]);

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalUsers = bookingUsers.length;
//     const totalOverdue = bookingUsers.reduce((sum, user) => 
//       sum + (user.overdueDays > 0 ? user.outstandingAmount : 0), 0
//     );
//     const totalPending = bookingUsers.reduce((sum, user) => 
//       sum + (user.outstandingAmount > 0 ? user.outstandingAmount : 0), 0
//     );
//     const overdueCount = bookingUsers.filter(user => user.overdueDays > 0).length;
    
//     return { totalUsers, totalOverdue, totalPending, overdueCount };
//   };

//   // Filter users based on search and filter
//   const filteredUsers = bookingUsers.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (activeFilter === 'overdue') return matchesSearch && user.overdueDays > 0;
//     if (activeFilter === 'pending') return matchesSearch && user.outstandingAmount > 0;
//     return matchesSearch;
//   });

//   const fetchBookingById = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("token");
      
//       if (!token) {
//         console.error("No authentication token found");
//         return;
//       }

//       const response = await bookingAPI.getBookingById(bookingId);
      
//       if (response.data?.success) {
//         const booking = response.data.booking;
        
//         setBookingDetails(prev => ({
//           ...prev,
//           [bookingId]: booking
//         }));

//         // Convert payment requests to chat messages
//         if (booking.paymentrequest?.length > 0) {
//           const paymentRequests = booking.paymentrequest.map(payment => ({
//             id: payment._id,
//             sender: "You",
//             type: "requestpay",
//             amount: payment.amount,
//             requestedTo: booking.user?.name || "Tenant",
//             note: payment.message,
//             time: new Date(payment.date).toLocaleTimeString([], { 
//               hour: "2-digit", 
//               minute: "2-digit" 
//             }),
//             date: new Date(payment.date).toLocaleDateString(),
//             status: payment.status || 'pending',
//             originalData: payment
//           }));

//           setMessagesByBooking(prev => ({
//             ...prev,
//             [bookingId]: paymentRequests
//           }));
//         } else {
//           setMessagesByBooking(prev => ({
//             ...prev,
//             [bookingId]: []
//           }));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching booking:', error);
//     }
//   };

//   const fetchBookingUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const userData = JSON.parse(localStorage.getItem("user") || "{}");
//       const clientId = userData.clientId;
      
//       if (!clientId) {
//         throw new Error("Client ID not found. Please login again.");
//       }

//       const response = await bookingAPI.getBookingsByClientId(clientId);
      
//       if (response.data?.success) {
//         const bookings = response.data.bookings || [];
//         const transformedUsers = bookings.map((booking) => ({
//           _id: booking.user?._id || booking._id,
//           name: booking.user?.name || booking.property?.name || "Unknown Property",
//           email: booking.user?.email || "",
//           phone: booking.user?.phone || "",
//           profileImage: booking.user?.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
//           roomNumber: booking.roomNumber || "N/A",
//           bed: booking.bed || "N/A",
//           rent: booking.pricing?.monthlyRent || booking.rent || 0,
//           outstandingAmount: booking.outstandingAmount || 0,
//           lastPaymentDate: booking.lastPaymentDate || booking.moveInDate,
//           bookingId: booking._id,
//           userId: booking.user?._id,
//           propertyName: booking.property?.name || "Property",
//           status: booking.status || 'active',
//           overdueDays: getDaysLate(booking.lastPaymentDate || booking.moveInDate)
//         }));
        
//         setBookingUsers(transformedUsers);
        
//         // Auto-select first user if none selected
//         if (transformedUsers.length > 0 && !selectedBookingId) {
//           setSelectedBookingId(transformedUsers[0].bookingId);
//         }
//       } else {
//         throw new Error(response.data?.message || "Failed to fetch bookings");
//       }
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       setError(error.message || "Failed to load bookings. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedBooking = bookingUsers.find(b => b.bookingId === selectedBookingId);

//   const createUserNotification = async (bookingData, amount, message) => {
//     try {
//       const token = localStorage.getItem("token");
      
//       if (!token) {
//         console.error("No authentication token found");
//         return false;
//       }

//       const completeBooking = bookingDetails[bookingData.bookingId];
//       if (!completeBooking?.user?._id) {
//         console.warn("No user ID found for notification");
//         return false;
//       }

//       const notificationData = {
//         userId: completeBooking.user._id,
//         type: 'payment_request',
//         title: 'Payment Request Received',
//         message: `Payment request of ₹${amount} for ${bookingData.propertyName}`,
//         priority: 'high',
//         metadata: {
//           amount: amount,
//           bookingId: bookingData.bookingId,
//           propertyName: bookingData.propertyName,
//           paymentType: 'payment_request',
//           timestamp: new Date().toISOString(),
//           clientNote: message || '',
//           requestedBy: 'Client'
//         },
//         isRead: false
//       };

//       // Try main endpoint first
//       try {
//         const response = await axios.post(
//           `${API_BASE_URL}/api/notifications`,
//           notificationData,
//           { 
//             headers: { 
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );
        
//         if (response.data?.success) {
//           return true;
//         }
//       } catch (error) {
//         console.log("Main notification endpoint failed, trying fallback...");
//       }

//       return false;
//     } catch (error) {
//       console.error("Error creating notification:", error);
//       return false;
//     }
//   };

//   const handleSendPaymentRequest = async () => {
//     if (!selectedBooking || sending) return;

//     const amount = selectedBooking.outstandingAmount || selectedBooking.rent;
//     if (!amount || amount <= 0) {
//       alert("Please enter a valid amount");
//       return;
//     }

//     try {
//       setSending(true);
//       const token = localStorage.getItem("token");
      
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       const payload = {
//         bookingId: selectedBooking.bookingId,
//         userId: selectedBooking._id,
//         message: messageInput.trim() || `Payment request for ₹${amount}`,
//         amount: amount
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/api/payments/request`,
//         payload,
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           timeout: 10000
//         }
//       );

//       if (response.data?.success) {
//         // Add message to local state
//         const newMessage = {
//           id: response.data.paymentRequest?._id || Date.now(),
//           sender: "You",
//           type: "requestpay",
//           amount: amount,
//           requestedTo: selectedBooking.name,
//           note: messageInput.trim() || `Payment request for ₹${amount}`,
//           time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//           date: new Date().toLocaleDateString(),
//           status: 'pending'
//         };

//         setMessagesByBooking(prev => ({
//           ...prev,
//           [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage]
//         }));

//         // Send notification
//         await createUserNotification(selectedBooking, amount, messageInput.trim());

//         // Reset form
//         setRequestpay(false);
//         setMessageInput("");
        
//         // Show success message
//         alert("Payment request sent successfully!");
        
//         // Refresh data
//         fetchBookingById(selectedBookingId);
//       } else {
//         throw new Error(response.data?.message || "Failed to send payment request");
//       }
//     } catch (error) {
//       console.error("Error sending payment request:", error);
//       alert(error.message || "Failed to send payment request. Please try again.");
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleAlternativePaymentRequest = async () => {
//     if (!selectedBooking || sending) return;

//     try {
//       setSending(true);
//       const token = localStorage.getItem("token");
//       const amount = selectedBooking.outstandingAmount || selectedBooking.rent;

//       const payload = {
//         bookingId: selectedBooking.bookingId,
//         amount: amount,
//         message: messageInput.trim() || `Payment request for ₹${amount}`
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/api/payments/send-payment-request`,
//         payload,
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           timeout: 10000
//         }
//       );

//       if (response.data?.success) {
//         // Similar success handling as above
//         alert("Payment request sent successfully via alternative endpoint!");
//         setRequestpay(false);
//         setMessageInput("");
//         fetchBookingById(selectedBookingId);
//       }
//     } catch (error) {
//       console.error("Alternative endpoint failed:", error);
//       alert("Failed to send payment request");
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleProcessRefund = () => {
//     if (!selectedBooking) {
//       alert("Please select a tenant first");
//       return;
//     }
//     navigate(`/client/vacate-request/${selectedBooking.bookingId}`, {
//       state: { user: selectedBooking, booking: selectedBooking }
//     });
//   };

//   const getValidMessages = () => {
//     if (!selectedBookingId) return [];
//     const messages = messagesByBooking[selectedBookingId] || [];
//     return messages.filter(msg => msg.type === "requestpay");
//   };

//   // Get stats for display
//   const stats = calculateStats();

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//             <p className="text-gray-600">Loading payment dashboard...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <AlertCircle className="w-10 h-10 text-red-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
//                 <p className="text-gray-600 mb-6">{error}</p>
//                 <button
//                   onClick={fetchBookingUsers}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <ClientNav />
      
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
//         {/* Header */}
//         <div className="mb-6 md:mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Payment Management</h1>
//                   <p className="text-gray-600 mt-1">Manage payments and communicate with tenants</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Total Tenants</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <Users className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Overdue Amount</p>
//                   <p className="text-2xl font-bold text-red-600">₹{stats.totalOverdue.toLocaleString()}</p>
//                 </div>
//                 <div className="p-3 bg-red-50 rounded-lg">
//                   <AlertCircle className="w-6 h-6 text-red-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Pending Amount</p>
//                   <p className="text-2xl font-bold text-amber-600">₹{stats.totalPending.toLocaleString()}</p>
//                 </div>
//                 <div className="p-3 bg-amber-50 rounded-lg">
//                   <Clock className="w-6 h-6 text-amber-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Overdue Tenants</p>
//                   <p className="text-2xl font-bold text-orange-600">{stats.overdueCount}</p>
//                 </div>
//                 <div className="p-3 bg-orange-50 rounded-lg">
//                   <TrendingUp className="w-6 h-6 text-orange-600" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         {bookingUsers.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Users className="w-12 h-12 text-gray-400" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-3">No Active Bookings</h2>
//             <p className="text-gray-600 max-w-md mx-auto mb-8">
//               You don't have any active bookings at the moment. When you have bookings, they will appear here for payment management.
//             </p>
//             <button
//               onClick={() => navigate('/client/dashboard')}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Tenant List Sidebar */}
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//                 {/* Sidebar Header */}
//                 <div className="p-4 md:p-6 border-b border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg md:text-xl font-bold text-gray-900">Tenants</h2>
//                     <span className="text-sm text-gray-500">
//                       {filteredUsers.length} of {bookingUsers.length}
//                     </span>
//                   </div>

//                   {/* Search */}
//                   <div className="relative mb-4">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search tenants..."
//                       className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>

//                   {/* Filters */}
//                   <div className="flex flex-wrap gap-2">
//                     {['all', 'overdue', 'pending'].map((filter) => (
//                       <button
//                         key={filter}
//                         onClick={() => setActiveFilter(filter)}
//                         className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
//                           activeFilter === filter
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         {filter.charAt(0).toUpperCase() + filter.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Tenant List */}
//                 <div className="overflow-y-auto max-h-[500px]">
//                   {filteredUsers.length === 0 ? (
//                     <div className="p-8 text-center text-gray-500">
//                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                       <p>No tenants found</p>
//                     </div>
//                   ) : (
//                     filteredUsers.map((booking) => (
//                       <div
//                         key={booking.bookingId}
//                         onClick={() => setSelectedBookingId(booking.bookingId)}
//                         className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
//                           selectedBookingId === booking.bookingId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
//                         }`}
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className="relative">
//                             <img
//                               src={booking.profileImage}
//                               alt={booking.name}
//                               className="w-12 h-12 rounded-full object-cover border-2 border-white"
//                             />
//                             {booking.overdueDays > 0 && (
//                               <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
//                                 <span className="text-xs text-white font-bold">{booking.overdueDays}</span>
//                               </div>
//                             )}
//                           </div>
                          
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between mb-1">
//                               <h3 className="font-semibold text-gray-900 truncate">{booking.name}</h3>
//                               <span className="text-lg font-bold text-gray-900">
//                                 ₹{booking.outstandingAmount || booking.rent}
//                               </span>
//                             </div>
                            
//                             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                               <Home className="w-4 h-4" />
//                               <span className="truncate">{booking.propertyName}</span>
//                             </div>
                            
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-2">
//                                 <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                                   Room {booking.roomNumber}
//                                 </span>
//                                 {booking.overdueDays > 0 && (
//                                   <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
//                                     {booking.overdueDays}d overdue
//                                   </span>
//                                 )}
//                               </div>
//                               <ChevronRight className={`w-5 h-5 text-gray-400 ${
//                                 selectedBookingId === booking.bookingId ? 'rotate-90' : ''
//                               }`} />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Chat Panel */}
//             <div className="lg:flex-1">
//               {selectedBooking ? (
//                 <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
//                   {/* Chat Header */}
//                   <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="relative">
//                           <img
//                             src={selectedBooking.profileImage}
//                             alt={selectedBooking.name}
//                             className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow"
//                           />
//                           {selectedBooking.overdueDays > 0 && (
//                             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow">
//                               <span className="text-xs text-white font-bold">{selectedBooking.overdueDays}</span>
//                             </div>
//                           )}
//                         </div>
                        
//                         <div>
//                           <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedBooking.name}</h2>
//                           <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
//                             <div className="flex items-center gap-1 text-sm text-gray-600">
//                               <Home className="w-4 h-4" />
//                               {selectedBooking.propertyName}
//                             </div>
//                             <div className="flex items-center gap-1 text-sm text-gray-600">
//                               <CreditCard className="w-4 h-4" />
//                               ₹{selectedBooking.rent}/month
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2">
//                         <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Call">
//                           <Phone className="w-5 h-5 text-gray-600" />
//                         </button>
//                         <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Message">
//                           <MessageCircle className="w-5 h-5 text-gray-600" />
//                         </button>
//                         <button className="p-2 hover:bg-white rounded-lg transition-colors" title="More">
//                           <MoreVertical className="w-5 h-5 text-gray-600" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     {/* Quick Stats */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//                       <div className="bg-white rounded-lg p-3 shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1">Outstanding</p>
//                         <p className="text-lg font-bold text-gray-900">₹{selectedBooking.outstandingAmount || 0}</p>
//                       </div>
//                       <div className="bg-white rounded-lg p-3 shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1">Overdue Days</p>
//                         <p className="text-lg font-bold text-red-600">{selectedBooking.overdueDays}</p>
//                       </div>
//                       <div className="bg-white rounded-lg p-3 shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1">Monthly Rent</p>
//                         <p className="text-lg font-bold text-green-600">₹{selectedBooking.rent}</p>
//                       </div>
//                       <div className="bg-white rounded-lg p-3 shadow-sm">
//                         <p className="text-sm text-gray-500 mb-1">Room</p>
//                         <p className="text-lg font-medium text-gray-900">{selectedBooking.roomNumber}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chat Messages */}
//                   <div className="flex-1 overflow-y-auto p-4 md:p-6">
//                     {getValidMessages().length === 0 ? (
//                       <div className="flex flex-col items-center justify-center py-12 text-center">
//                         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//                           <CreditCard className="w-10 h-10 text-gray-400" />
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-3">No Payment Requests</h3>
//                         <p className="text-gray-600 max-w-md mb-6">
//                           Send your first payment request to {selectedBooking.name}
//                         </p>
//                         <button
//                           onClick={() => setRequestpay(true)}
//                           className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
//                         >
//                           Send Payment Request
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Requests</h3>
//                         {getValidMessages().map((msg) => (
//                           <div key={msg.id} className="flex justify-end">
//                             <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-none p-4 md:p-6 max-w-md shadow-lg">
//                               <div className="flex items-center justify-between mb-4">
//                                 <div className="flex items-center gap-2">
//                                   <CheckCircle className="w-5 h-5" />
//                                   <span className="font-semibold">Payment Request</span>
//                                 </div>
//                                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                   msg.status === 'paid' ? 'bg-green-500/30 text-green-200' :
//                                   msg.status === 'pending' ? 'bg-amber-500/30 text-amber-200' :
//                                   'bg-gray-500/30 text-gray-200'
//                                 }`}>
//                                   {msg.status?.toUpperCase() || 'PENDING'}
//                                 </span>
//                               </div>
                              
//                               <div className="mb-4">
//                                 <p className="text-2xl md:text-3xl font-bold mb-2">₹{msg.amount}</p>
//                                 {msg.note && (
//                                   <div className="bg-white/10 rounded-xl p-3 mb-3">
//                                     <p className="text-sm">{msg.note}</p>
//                                   </div>
//                                 )}
//                               </div>
                              
//                               <div className="flex items-center justify-between text-sm text-blue-100">
//                                 <div className="flex items-center gap-2">
//                                   <Calendar className="w-4 h-4" />
//                                   <span>{msg.date}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   <Clock className="w-4 h-4" />
//                                   <span>{msg.time}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="border-t border-gray-200 p-4 md:p-6">
//                     {!requestpay ? (
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <button 
//                           onClick={() => setRequestpay(true)} 
//                           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3"
//                         >
//                           <CreditCard className="w-5 h-5" />
//                           Request Payment
//                         </button>
//                         <button 
//                           onClick={handleProcessRefund} 
//                           className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3"
//                         >
//                           <FileText className="w-5 h-5" />
//                           Process Refund
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="bg-blue-50 rounded-xl p-4 md:p-6 border border-blue-100">
//                         <div className="flex items-center justify-between mb-4">
//                           <h3 className="text-lg font-semibold text-gray-900">New Payment Request</h3>
//                           <button 
//                             onClick={() => {
//                               setRequestpay(false);
//                               setMessageInput("");
//                             }}
//                             className="p-2 hover:bg-white rounded-lg transition-colors"
//                             disabled={sending}
//                           >
//                             <X className="w-5 h-5 text-gray-500" />
//                           </button>
//                         </div>
                        
//                         <div className="mb-6">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                             <div className="bg-white rounded-lg p-4">
//                               <p className="text-sm text-gray-500 mb-1">Amount</p>
//                               <p className="text-2xl font-bold text-gray-900">
//                                 ₹{selectedBooking.outstandingAmount || selectedBooking.rent}
//                               </p>
//                             </div>
//                             <div className="bg-white rounded-lg p-4">
//                               <p className="text-sm text-gray-500 mb-1">Tenant</p>
//                               <p className="text-lg font-semibold text-gray-900">{selectedBooking.name}</p>
//                             </div>
//                           </div>
                          
//                           <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Add Note (Optional)
//                             </label>
//                             <textarea
//                               placeholder="Enter a note for this payment request..."
//                               className="w-full h-32 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                               value={messageInput}
//                               onChange={(e) => setMessageInput(e.target.value)}
//                               disabled={sending}
//                             />
//                           </div>
//                         </div>
                        
//                         <div className="flex flex-col sm:flex-row gap-3">
//                           <button 
//                             onClick={handleSendPaymentRequest} 
//                             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                             disabled={sending}
//                           >
//                             {sending ? (
//                               <>
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                 Sending...
//                               </>
//                             ) : (
//                               <>
//                                 <Send className="w-5 h-5" />
//                                 Send Payment Request
//                               </>
//                             )}
//                           </button>
//                           <button 
//                             onClick={() => {
//                               setRequestpay(false);
//                               setMessageInput("");
//                             }}
//                             className="px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
//                             disabled={sending}
//                           >
//                             Cancel
//                           </button>
//                         </div>
                        
//                         <div className="mt-4 text-sm text-gray-500 text-center">
//                           <button 
//                             onClick={handleAlternativePaymentRequest} 
//                             className="text-blue-600 hover:text-blue-800 underline font-medium"
//                             disabled={sending}
//                           >
//                             Try alternative endpoint
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center h-full flex flex-col items-center justify-center">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//                     <Users className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">Select a Tenant</h3>
//                   <p className="text-gray-600 max-w-md mb-6">
//                     Choose a tenant from the list to view payment details and send requests
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
import ClientNav from '../Client-Navbar/ClientNav';
import { bookingAPI } from '../PropertyController';
import axios from 'axios';
import { API_BASE_URL } from '../PropertyController';

const getDaysLate = (dateString) => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const PaymentChat = () => {
  const navigate = useNavigate();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messagesByBooking, setMessagesByBooking] = useState({});
  const [requestpay, setRequestpay] = useState(false);
  const [bookingUsers, setBookingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

  //const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchBookingUsers();
  }, []);

  // Add useEffect to fetch booking by ID when selectedBookingId changes
  useEffect(() => {
    if (selectedBookingId) {
      fetchBookingById(selectedBookingId);
    }
  }, [selectedBookingId]);

  // Function to fetch booking by ID and extract payment requests
  const fetchBookingById = async (bookingId) => {
    try {
      console.log(`Fetching booking details for ID: ${bookingId}`);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Using the bookingAPI method to get booking by ID
      const response = await bookingAPI.getAllBookings(bookingId);
      
      if (response.data?.success) {
        console.log('✅ Booking details fetched successfully:', response.data);
        const booking = response.data.booking;
        
        // Store booking details
        setBookingDetails(prev => ({
          ...prev,
          [bookingId]: booking
        }));

        // Extract payment requests and convert to chat messages
        if (booking.paymentrequest && booking.paymentrequest.length > 0) {
          const paymentRequests = booking.paymentrequest.map(payment => ({
            id: payment._id,
            sender: "You",
            type: "requestpay",
            amount: payment.amount,
            requestedTo: booking.user?.name || "Tenant",
            note: payment.message,
            time: new Date(payment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: new Date(payment.date).toLocaleDateString(),
            status: payment.status,
            originalData: payment
          }));

          console.log('📋 Converted payment requests:', paymentRequests);

          // Update messages state
          setMessagesByBooking(prev => ({
            ...prev,
            [bookingId]: paymentRequests
          }));
        } else {
          // No payment requests found
          setMessagesByBooking(prev => ({
            ...prev,
            [bookingId]: []
          }));
        }
        
      } else {
        console.error('❌ Failed to fetch booking details:', response.data?.message);
      }
    } catch (error) {
      console.error('❌ Error fetching booking by ID:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

  const fetchBookingUsers = async () => {
  try {
    setLoading(true);
    setError(null);
   
    // Get client ID from user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const clientId = userData.clientId;
    console.log("Fetching bookings for client ID:", userData);
    if (!clientId) {
      setError("Client ID not found. Please login again.");
      setLoading(false);
      return;
    }
 
    // Use the new API method
    const response = await bookingAPI.getBookingsByClientId(clientId);
   
    if (response.data?.success) {
      const bookings = response.data.bookings || [];
      const transformedUsers = bookings.map((booking) => ({
        _id: booking.user?._id || booking._id,
        name: booking.user?.name || booking.property?.name || "Unknown Property",
        email: booking.user?.email || "",
        phone: booking.user?.phone || "",
        profileImage: booking.user?.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
        roomNumber: booking.roomNumber || "N/A",
        bed: booking.bed || "N/A",
        rent: booking.pricing?.monthlyRent || booking.rent || 0,
        outstandingAmount: booking.outstandingAmount || 0,
        lastPaymentDate: booking.lastPaymentDate || booking.moveInDate,
        bookingId: booking._id,
        userId: booking.user?._id,
        propertyName: booking.property?.name || "Property",
      }));
     
      setBookingUsers(transformedUsers);
      // No auto-selection - let user click first
    } else {
      setError("Failed to fetch bookings: " + (response.data?.message || "Unknown error"));
    }
  } catch (error) {
    console.error("❌ Error fetching bookings by client ID:", error);
    const errorMessage = error.response?.data?.message ||
                        error.message ||
                        "Failed to load users. Please check your connection.";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const selectedBooking = bookingUsers.find(
    (b) => b.bookingId === selectedBookingId
  );

  // Get complete booking details for the selected booking
  const getCompleteBookingDetails = () => {
    if (!selectedBookingId) return null;
    return bookingDetails[selectedBookingId];
  };

  // ✅ Create notification for user when payment request is sent
  const createUserNotification = async (bookingData, amount, message) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No authentication token found for notification");
        return false;
      }

      // Get the complete booking details to ensure we have the user ID
      const completeBooking = getCompleteBookingDetails();
      if (!completeBooking || !completeBooking.user?._id) {
        console.warn('⚠️ No user ID found for tenant notification in complete booking data');
        console.log('Complete booking data:', completeBooking);
        return false;
      }

      const notificationData = {
        userId: completeBooking.user._id, // Use the user ID from complete booking data
        type: 'payment_request',
        title: 'Payment Request Received 💰',
        message: `You have a payment request of ₹${amount} for ${bookingData.propertyName}. ${message ? `Note: ${message}` : ''}`,
        priority: 'high',
        metadata: {
          amount: amount,
          bookingId: bookingData.bookingId,
          propertyName: bookingData.propertyName,
          paymentType: 'payment_request',
          timestamp: new Date().toISOString(),
          clientNote: message || '',
          requestedBy: 'Client'
        },
        isRead: false
      };

      console.log('📧 Creating user notification:', notificationData);

      // Try the main POST endpoint first
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/notifications`,
          notificationData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data?.success) {
          console.log('✅ User notification created successfully via main endpoint');
          return true;
        }
      } catch (mainError) {
        console.log('⚠️ Main endpoint failed, trying test endpoint...');
        
        // Fallback to test endpoint
        const testResponse = await axios.post(
          `${API_BASE_URL}/api/notifications/test/user`,
          notificationData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (testResponse.data?.success) {
          console.log('✅ User notification created successfully via test endpoint');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error creating user notification:', error);
      return false;
    }
  };

  // ✅ Send payment request and create user notification
  const handleSendPaymentRequest = async () => {
    if (!selectedBooking) {
      alert("No tenant selected");
      return;
    }

    if (sending) return;

    const amount = selectedBooking.outstandingAmount || selectedBooking.rent;
    if (!amount || amount <= 0) {
      alert("Invalid amount to request");
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const payload = {
        bookingId: selectedBooking.bookingId,
        userId: selectedBooking._id,
        message: messageInput.trim() || `Payment request for ₹${amount}`,
        amount: amount
      };

      console.log('Sending payment request with payload:', payload);

      const response = await axios.post(
        `${API_BASE_URL}/api/payments/request`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log('Payment request response:', response.data);

      if (response.data?.success) {
        // Add to local state
        const newMessage = {
          id: response.data.paymentRequest?._id || Date.now(),
          sender: "You",
          type: "requestpay",
          amount: amount,
          requestedTo: selectedBooking.name,
          note: messageInput.trim() || `Payment request for ₹${amount}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: new Date().toLocaleDateString(),
          status: 'pending'
        };

        setMessagesByBooking((prev) => ({
          ...prev,
          [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage],
        }));
        
        // ✅ CREATE NOTIFICATION FOR USER
        console.log('💰 Payment request successful, creating user notification...');
        
        // Create notification for the user (tenant)
        const notificationSent = await createUserNotification(selectedBooking, amount, messageInput.trim());
        
        setRequestpay(false);
        setMessageInput("");
        setSending(false);
        
        if (notificationSent) {
          alert("Payment request sent successfully! Notification has been sent to the tenant.");
        } else {
          alert("Payment request sent successfully! (Notification failed to send)");
        }
        
        // Refresh the booking data to get the updated payment requests from server
        fetchBookingById(selectedBookingId);
      } else {
        throw new Error(response.data?.message || 'Failed to send payment request');
      }
      
    } catch (error) {
      setSending(false);
      console.error("❌ Error sending payment request:", error); 
      
      let errorMessage = "Failed to send payment request";
      
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
        
        if (error.response.status === 404) {
          errorMessage = "Payment request endpoint not found. Please check the server route.";
        } else if (error.response.status === 401) {
          errorMessage = "Authentication failed. Please login again.";
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "Invalid request data";
        } else if (error.response.status === 500) {
          errorMessage = error.response.data?.message || "Server error. Please try again later.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        console.error('No response received');
        errorMessage = "No response from server. Please check if the server is running.";
      } else {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  // Alternative endpoint attempt if the main one fails
  const handleSendPaymentRequestAlternative = async () => {
    if (!selectedBooking) {
      alert("No tenant selected");
      return;
    }

    if (sending) return;

    const amount = selectedBooking.outstandingAmount || selectedBooking.rent;
    if (!amount || amount <= 0) {
      alert("Invalid amount to request");
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const payload = {
        bookingId: selectedBooking.bookingId,
        amount: amount,
        message: messageInput.trim() || `Payment request for ₹${amount}`
      };

      console.log('Trying alternative endpoint with payload:', payload);

      const response = await axios.post(
        `${API_BASE_URL}/api/payments/send-payment-request`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log('Alternative payment request response:', response.data);

      if (response.data?.success) {
        // Add to local state
        const newMessage = {
          id: response.data.paymentRequest?._id || Date.now(),
          sender: "You",
          type: "requestpay",
          amount: amount,
          requestedTo: selectedBooking.name,
          note: messageInput.trim() || `Payment request for ₹${amount}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: new Date().toLocaleDateString(),
          status: 'pending'
        };

        setMessagesByBooking((prev) => ({
          ...prev,
          [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage],
        }));
        
        // ✅ CREATE NOTIFICATION FOR USER
        console.log('💰 Alternative payment request successful, creating user notification...');
        
        // Create notification for the user (tenant)
        const notificationSent = await createUserNotification(selectedBooking, amount, messageInput.trim());
        
        setRequestpay(false);
        setMessageInput("");
        setSending(false);
        
        if (notificationSent) {
          alert("Payment request sent successfully! Notification has been sent to the tenant.");
        } else {
          alert("Payment request sent successfully! (Notification failed to send)");
        }
        
        // Refresh the booking data to get the updated payment requests from server
        fetchBookingById(selectedBookingId);
      } else {
        throw new Error(response.data?.message || 'Failed to send payment request');
      }
      
    } catch (error) {
      setSending(false);
      console.error("❌ Error sending payment request via alternative endpoint:", error);
      alert("Failed to send payment request. Please try again or contact support.");
    }
  };

  const handlePayRefund = () => {
    if (!selectedBooking) {
      alert("Please select a tenant first");
      return;
    }
    navigate(`/client/vacate-request/${selectedBooking.bookingId}`, {
      state: { user: selectedBooking, booking: selectedBooking },
    });
  };

  const getValidMessages = () => {
    const messages = messagesByBooking[selectedBookingId] || [];
    return messages.filter((msg) => msg.type === "requestpay");
  };

  if (loading) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading bookings...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
            <strong>Error:</strong> {error}
          </div>
          <button
            onClick={fetchBookingUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNav />
      <div className="bg-cover bg-center bg-no-repeat font-sans px-4 sm:px-8 md:px-12 lg:px-20 py-5 min-h-screen"
        style={{ backgroundImage: "url('./src/assets/images/image')" }}>
       
        <div className="flex flex-wrap gap-1 mb-4 text-sm sm:text-base">
          <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded hover:bg-gray-100 transition">Home</button>
          <div className="flex items-center justify-center">/</div>
          <button className="flex items-center px-2 py-2 rounded hover:bg-gray-100 transition">Tenant List</button>
        </div>

        {/* Main */}
        {bookingUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 min-h-[400px]">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Bookings Available</h2>
              <p className="text-gray-500 max-w-md">
                You don't have any active bookings or tenants at the moment. When you have bookings, they will appear here where you can manage payments and send payment requests.
              </p>
            </div>
            <button
              onClick={() => navigate('/client/dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-auto">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white border rounded-md shadow-md p-3 overflow-y-auto max-h-[400px] lg:max-h-[80vh]">
              {bookingUsers.map((booking) => (
                <div
                  key={booking.bookingId}
                  onClick={() => setSelectedBookingId(booking.bookingId)}
                  className={`p-4 cursor-pointer mb-3 rounded-md shadow-md hover:bg-[#AFD1FF] transition ${
                    booking.bookingId === selectedBookingId ? "bg-[#AFD1FF] font-semibold" : "bg-white"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={booking.profileImage}
                      alt={booking.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-sm w-full">
                      <p className="font-bold mb-1">Payment From</p>
                      <div className="flex justify-between w-full text-gray-800">
                        <p className="truncate">{booking.name}</p>
                        <p className="text-sm text-gray-500 whitespace-nowrap ml-2">
                          ₹{booking.outstandingAmount || booking.rent}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Room {booking.roomNumber} • {getDaysLate(booking.lastPaymentDate)} days late
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Section */}
            {selectedBooking ? (
              <div className="flex-1 flex flex-col bg-white rounded-md shadow-md h-auto min-h-[500px]">
                <div className="border-b bg-[#AFD1FF] p-3 sm:p-4 font-semibold flex items-center justify-between flex-wrap">
                  <div className="flex items-center gap-2">
                    <img src={selectedBooking.profileImage} alt="profile"
                      className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm sm:text-base">{selectedBooking.name}</p>
                      <p className="text-xs text-gray-500">
                        Room: {selectedBooking.roomNumber} • Bed: {selectedBooking.bed}
                      </p>
                      <p className="text-xs text-gray-500">
                        Outstanding: ₹{selectedBooking.outstandingAmount || 0}
                      </p>
                      <p className="text-xs text-red-500 font-semibold">
                        {getDaysLate(selectedBooking.lastPaymentDate)} days overdue
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                    {[MessageCircle, Phone, MoreVertical].map((Icon, i) => (
                      <div key={i} className="w-8 h-8 bg-[#0827B2] flex justify-center items-center rounded-full cursor-pointer hover:bg-blue-800 transition">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Request Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 min-h-[300px] max-h-[400px]">
                  {getValidMessages().length === 0 ? (
                    <div className="flex justify-center items-center h-32 text-gray-500">
                      No payment requests sent yet. Send your first request!
                    </div>
                  ) : (
                    getValidMessages().map((msg) => (
                      <div key={msg.id} className="flex justify-end">
                        <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
                          <div className="bg-[#AFD1FF] border border-blue-300 p-3 sm:p-4 rounded-xl">
                            <p className="text-sm font-semibold">Payment Request Sent</p>
                            <p className="text-xl sm:text-2xl font-bold text-black">₹{msg.amount}/-</p>
                            {msg.note && (
                              <p className="text-sm mt-2 p-2 bg-blue-50 rounded">
                                <strong>Note:</strong> {msg.note}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              Status: <span className={msg.status === 'pending' ? 'text-orange-500 font-semibold' : 'text-green-500 font-semibold'}>
                                {msg.status || 'pending'}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {getDaysLate(selectedBooking.lastPaymentDate)} day
                              {getDaysLate(selectedBooking.lastPaymentDate) !== 1 ? "s" : ""} overdue
                            </p>
                          </div>
                          <div className="flex gap-2 text-[11px] mt-1 text-gray-500 justify-end">
                            <p>{msg.date}</p>
                            <p>{msg.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Controls */}
                {!requestpay ? (
                  <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => setRequestpay(true)} 
                      className="flex-1 bg-[#FEE123] py-2 rounded text-sm sm:text-base hover:bg-yellow-400 transition font-semibold"
                      disabled={sending}
                    >
                      Request Payment
                    </button>
                    <button 
                      onClick={handlePayRefund} 
                      className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded text-sm sm:text-base hover:bg-yellow-50 transition font-semibold"
                    >
                      Process Refund
                    </button>
                  </div>
                ) : (
                  <div className="border-t p-3 sm:p-4 bg-gray-50">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg mb-2">Send Payment Request</h3>
                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <p className="text-sm">
                          <strong>Amount:</strong> ₹{selectedBooking.outstandingAmount || selectedBooking.rent}
                        </p>
                        <p className="text-sm">
                          <strong>Tenant:</strong> {selectedBooking.name}
                        </p>
                        <p className="text-sm text-red-500">
                          <strong>Overdue:</strong> {getDaysLate(selectedBooking.lastPaymentDate)} days
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Add a note (optional)..."
                        className="flex-1 border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendPaymentRequest();
                          }
                        }}
                        disabled={sending}
                      />
                      <button 
                        onClick={handleSendPaymentRequest} 
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
                        disabled={sending}
                      >
                        {sending ? 'Sending...' : 'Send Payment Request'}
                      </button>
                      <button 
                        onClick={() => {
                          setRequestpay(false);
                          setMessageInput("");
                        }} 
                        className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition font-semibold"
                        disabled={sending}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>If the main endpoint fails, <button 
                        onClick={handleSendPaymentRequestAlternative} 
                        className="text-blue-600 underline hover:text-blue-800"
                        disabled={sending}
                      >
                        try alternative endpoint
                      </button></p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-white rounded-md shadow-md p-5">
                <div className="text-gray-500 text-center">
                  Select a tenant to send payment requests
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default PaymentChat;