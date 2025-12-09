// import React, { useEffect, useState } from "react";
// import { notificationAPI } from "../PropertyController";
// import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

// const ClientNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [filter, setFilter] = useState('all');

//   // Fetch client notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
        
//         const [notifRes, unreadRes] = await Promise.all([
//           notificationAPI.getNotifications(),
//           notificationAPI.getUnreadCount()
//         ]);

//         console.log('Full notifications response:', notifRes);
//         console.log('Full unread count response:', unreadRes);

//         // Extract data from response
//         const notificationsData = notifRes.data?.data?.notifications || notifRes.data?.notifications || [];
//         const unreadCountData = unreadRes.data?.data?.unreadCount || unreadRes.data?.unreadCount || 0;

//         console.log('Processed notifications:', notificationsData);
//         console.log('Processed unread count:', unreadCountData);

//         setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
//         setUnreadCount(Number(unreadCountData));
        
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//         console.error("Error details:", err.response?.data || err.message);
//         setNotifications([]);
//         setUnreadCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Filter notifications
//   const filteredNotifications = notifications.filter(notification => {
//     if (filter === 'all') return true;
//     if (filter === 'unread') return !notification.isRead;
//     if (filter === 'property') return notification.type && notification.type.includes('property');
//     if (filter === 'booking') return notification.type && notification.type.includes('booking');
//     return true;
//   });

//   // Mark one notification as read
//   const markAsRead = async (notificationId) => {
//     try {
//       await notificationAPI.markAsRead(notificationId);
      
//       setNotifications(prev => 
//         prev.map(n => 
//           n._id === notificationId ? { ...n, isRead: true } : n
//         )
//       );
//       setUnreadCount(prev => Math.max(0, prev - 1));
//     } catch (err) {
//       console.error("Error marking notification as read:", err);
//     }
//   };

//   // Mark all as read
//   const markAllAsRead = async () => {
//     try {
//       await notificationAPI.markAllAsRead();
      
//       setNotifications(prev => 
//         prev.map(n => ({ ...n, isRead: true }))
//       );
//       setUnreadCount(0);
//     } catch (err) {
//       console.error("Error marking all notifications as read:", err);
//     }
//   };

//   // Delete notification
//   const deleteNotification = async (notificationId) => {
//     try {
//       await notificationAPI.deleteNotification(notificationId);
      
//       const notification = notifications.find(n => n._id === notificationId);
//       setNotifications(prev => prev.filter(n => n._id !== notificationId));
      
//       if (notification && !notification.isRead) {
//         setUnreadCount(prev => Math.max(0, prev - 1));
//       }
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown date';
    
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 0) {
//         return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//       } else if (diffDays === 1) {
//         return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//       } else if (diffDays < 7) {
//         return `${diffDays} days ago`;
//       } else {
//         return date.toLocaleDateString();
//       }
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   // Get notification icon
//   const getNotificationIcon = (type) => {
//     if (!type) return '🔔';
    
//     const icons = {
//       property_submitted: '📝',
//       property_approved: '✅',
//       property_rejected: '❌',
//       property_revision_requested: '📋',
//       property_deleted: '🗑️',
//       booking_created: '📋',
//       booking_approved: '✅',
//       booking_rejected: '❌',
//       booking_cancelled: '🚫',
//       payment_received: '💰',
//       payment_failed: '💳'
//     };
//     return icons[type] || '🔔';
//   };

//   // Get notification color
//   const getNotificationColor = (type) => {
//     if (!type) return 'border-l-gray-500 bg-gray-50';
    
//     const colors = {
//       property_submitted: 'border-l-blue-500 bg-blue-50',
//       property_approved: 'border-l-green-500 bg-green-50',
//       property_rejected: 'border-l-red-500 bg-red-50',
//       property_revision_requested: 'border-l-orange-500 bg-orange-50',
//       property_deleted: 'border-l-gray-500 bg-gray-50',
//       booking_created: 'border-l-blue-500 bg-blue-50',
//       booking_approved: 'border-l-green-500 bg-green-50',
//       booking_rejected: 'border-l-red-500 bg-red-50'
//     };
//     return colors[type] || 'border-l-gray-500 bg-gray-50';
//   };

//   // Get notification type label
//   const getNotificationTypeLabel = (type) => {
//     if (!type) return 'Notification';
    
//     const labels = {
//       property_submitted: 'Property Submitted',
//       property_approved: 'Property Approved',
//       property_rejected: 'Property Rejected',
//       property_revision_requested: 'Revision Requested',
//       property_deleted: 'Property Deleted',
//       booking_created: 'New Booking',
//       booking_approved: 'Booking Approved',
//       booking_rejected: 'Booking Rejected'
//     };
//     return labels[type] || 'Notification';
//   };

//   if (loading) {
//     return (
//       <div className="p-4 flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 w-full h-full overflow-y-auto box-border bg-white min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 p-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Manage your property and booking notifications
//             </p>
//             {unreadCount > 0 && (
//               <p className="text-sm text-blue-600 mt-1 font-medium">
//                 {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//               </p>
//             )}
//           </div>
          
//           {notifications.length > 0 && unreadCount > 0 && (
//             <button
//               onClick={markAllAsRead}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
//             >
//               <span>Mark all as read</span>
//             </button>
//           )}
//         </div>

//         {/* Filters */}
//         {notifications.length > 0 && (
//           <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
//             <div className="flex flex-wrap gap-2">
//               {['all', 'unread', 'property', 'booking'].map((filterType) => (
//                 <button
//                   key={filterType}
//                   onClick={() => setFilter(filterType)}
//                   className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                     filter === filterType 
//                       ? 'bg-blue-500 text-white' 
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {filterType === 'all' && 'All Notifications'}
//                   {filterType === 'unread' && `Unread (${unreadCount})`}
//                   {filterType === 'property' && 'Properties'}
//                   {filterType === 'booking' && 'Bookings'}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notifications List */}
//         {filteredNotifications.length === 0 ? (
//           <div className="flex flex-col items-center justify-center mt-20 p-8 bg-white">
//             <img
//               src={notifyImg}
//               alt="No Notifications"
//               className="w-48 h-48 mb-6 opacity-60"
//             />
//             <p className="text-gray-500 text-lg font-medium mb-2">
//               {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
//             </p>
//             <p className="text-gray-400 text-sm text-center max-w-md">
//               {filter === 'all' 
//                 ? "You'll see notifications here for property updates and booking activities."
//                 : `No ${filter} notifications found.`
//               }
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredNotifications.map((notification) => (
//               <div
//                 key={notification._id}
//                 className={`bg-white rounded-lg shadow-sm border-l-4 ${getNotificationColor(notification.type)} ${
//                   notification.isRead ? 'opacity-75' : 'shadow-md'
//                 } transition-all duration-200 hover:shadow-lg`}
//               >
//                 <div className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-3 flex-1">
//                       <div className={`text-xl mt-1 ${
//                         notification.isRead ? 'text-gray-400' : 'text-blue-500'
//                       }`}>
//                         {getNotificationIcon(notification.type)}
//                       </div>
                      
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center space-x-2 mb-1">
//                           <h3 className={`font-semibold text-sm ${
//                             notification.isRead ? 'text-gray-600' : 'text-gray-900'
//                           }`}>
//                             {notification.title}
//                           </h3>
                          
//                           <span className={`px-2 py-1 text-xs rounded-full ${
//                             notification.type && notification.type.includes('property') ? 'bg-purple-100 text-purple-800' :
//                             notification.type && notification.type.includes('booking') ? 'bg-blue-100 text-blue-800' :
//                             'bg-gray-100 text-gray-800'
//                           }`}>
//                             {getNotificationTypeLabel(notification.type)}
//                           </span>
                          
//                           {!notification.isRead && (
//                             <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
//                           )}
//                         </div>
                        
//                         <p className="text-gray-600 text-sm mb-2 leading-relaxed">
//                           {notification.message}
//                         </p>
                        
//                         <div className="flex items-center justify-between">
//                           <div className="text-xs text-gray-500">
//                             {formatDate(notification.createdAt)}
//                           </div>
                          
//                           <div className="flex items-center space-x-2">
//                             {!notification.isRead && (
//                               <button
//                                 onClick={() => markAsRead(notification._id)}
//                                 className="text-blue-500 text-xs hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
//                               >
//                                 Mark read
//                               </button>
//                             )}
                            
//                             <button
//                               onClick={() => deleteNotification(notification._id)}
//                               className="text-gray-400 hover:text-red-500 text-xs p-1 rounded hover:bg-red-50 transition-colors"
//                               title="Delete notification"
//                             >
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientNotifications;


// import React, { useEffect, useState } from "react";
// import { notificationAPI } from "../PropertyController";
// import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

// const ClientNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [filter, setFilter] = useState('all');
//   const [error, setError] = useState(null);

//   // Fetch client notifications - FIXED version
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         console.log('🔄 Fetching client notifications...');
        
//         const [notifRes, unreadRes] = await Promise.all([
//           notificationAPI.getNotifications(),
//           notificationAPI.getUnreadCount()
//         ]);

//         console.log('📨 Client Notifications Full Response:', notifRes);
//         console.log('🔔 Client Unread Count Full Response:', unreadRes);

//         // FIXED: Properly handle the response structure
//         let notificationsData = [];
//         let unreadCountData = 0;

//         // Handle notifications response
//         if (notifRes.success) {
//           notificationsData = notifRes.data?.notifications || [];
//         } else {
//           // Fallback to direct access
//           notificationsData = notifRes.notifications || notifRes.data?.notifications || [];
//         }

//         // Handle unread count response
//         if (unreadRes.success) {
//           unreadCountData = unreadRes.data?.unreadCount || 0;
//         } else {
//           unreadCountData = unreadRes.unreadCount || unreadRes.data?.unreadCount || 0;
//         }

//         console.log('✅ Processed notifications:', notificationsData);
//         console.log('✅ Processed unread count:', unreadCountData);

//         // Ensure we have an array
//         const safeNotifications = Array.isArray(notificationsData) ? notificationsData : [];
//         setNotifications(safeNotifications);
//         setUnreadCount(Number(unreadCountData) || 0);
        
//         if (safeNotifications.length === 0) {
//           console.log('ℹ️ No notifications found for client');
//         }
        
//       } catch (err) {
//         console.error("❌ Error fetching client notifications:", err);
//         console.error("📋 Error details:", err.response?.data || err.message || err);
//         setError(err.response?.data?.message || err.message || "Failed to fetch notifications");
        
//         // Set empty state on error
//         setNotifications([]);
//         setUnreadCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Filter notifications
//   const filteredNotifications = notifications.filter(notification => {
//     if (filter === 'all') return true;
//     if (filter === 'unread') return !notification.isRead;
//     if (filter === 'property') return notification.type && notification.type.includes('property');
//     if (filter === 'booking') return notification.type && notification.type.includes('booking');
//     if (filter === 'payment') return notification.type && notification.type.includes('payment');
//     return true;
//   });

//   // Mark one notification as read
//   const markAsRead = async (notificationId) => {
//     try {
//       await notificationAPI.markAsRead(notificationId);
      
//       setNotifications(prev => 
//         prev.map(n => 
//           n._id === notificationId ? { ...n, isRead: true } : n
//         )
//       );
//       setUnreadCount(prev => Math.max(0, prev - 1));
//     } catch (err) {
//       console.error("❌ Error marking notification as read:", err);
//       alert("Failed to mark notification as read");
//     }
//   };

//   // Mark all as read
//   const markAllAsRead = async () => {
//     try {
//       await notificationAPI.markAllAsRead();
      
//       setNotifications(prev => 
//         prev.map(n => ({ ...n, isRead: true }))
//       );
//       setUnreadCount(0);
//     } catch (err) {
//       console.error("❌ Error marking all notifications as read:", err);
//       alert("Failed to mark all notifications as read");
//     }
//   };

//   // Delete notification
//   const deleteNotification = async (notificationId) => {
//     try {
//       await notificationAPI.deleteNotification(notificationId);
      
//       const notification = notifications.find(n => n._id === notificationId);
//       setNotifications(prev => prev.filter(n => n._id !== notificationId));
      
//       if (notification && !notification.isRead) {
//         setUnreadCount(prev => Math.max(0, prev - 1));
//       }
//     } catch (err) {
//       console.error("❌ Error deleting notification:", err);
//       alert("Failed to delete notification");
//     }
//   };

//   // Refresh notifications
//   const refreshNotifications = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [notifRes, unreadRes] = await Promise.all([
//         notificationAPI.getNotifications(),
//         notificationAPI.getUnreadCount()
//       ]);

//       let notificationsData = [];
//       let unreadCountData = 0;

//       if (notifRes.success) {
//         notificationsData = notifRes.data?.notifications || [];
//       } else {
//         notificationsData = notifRes.notifications || notifRes.data?.notifications || [];
//       }

//       if (unreadRes.success) {
//         unreadCountData = unreadRes.data?.unreadCount || 0;
//       } else {
//         unreadCountData = unreadRes.unreadCount || unreadRes.data?.unreadCount || 0;
//       }

//       setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
//       setUnreadCount(Number(unreadCountData) || 0);
      
//     } catch (err) {
//       console.error("❌ Error refreshing notifications:", err);
//       setError(err.response?.data?.message || err.message || "Failed to refresh notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown date';
    
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//       const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//       const diffMinutes = Math.floor(diffTime / (1000 * 60));
      
//       if (diffMinutes < 1) return 'Just now';
//       if (diffMinutes < 60) return `${diffMinutes}m ago`;
//       if (diffHours < 24) return `${diffHours}h ago`;
//       if (diffDays === 1) return 'Yesterday';
//       if (diffDays < 7) return `${diffDays}d ago`;
      
//       return date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   // Get notification icon
//   const getNotificationIcon = (type) => {
//     if (!type) return '🔔';
    
//     const icons = {
//       property_submitted: '📝',
//       property_approved: '✅',
//       property_rejected: '❌',
//       property_revision_requested: '📋',
//       property_deleted: '🗑️',
//       booking_created: '📋',
//       booking_approved: '✅',
//       booking_rejected: '❌',
//       booking_cancelled: '🚫',
//       payment_received: '💰',
//       payment_failed: '💳',
//       rent_payment_received: '💰'
//     };
//     return icons[type] || '🔔';
//   };

//   // Get notification color
//   const getNotificationColor = (type) => {
//     if (!type) return 'border-l-gray-500 bg-gray-50';
    
//     const colors = {
//       property_submitted: 'border-l-blue-500 bg-blue-50',
//       property_approved: 'border-l-green-500 bg-green-50',
//       property_rejected: 'border-l-red-500 bg-red-50',
//       property_revision_requested: 'border-l-orange-500 bg-orange-50',
//       property_deleted: 'border-l-gray-500 bg-gray-50',
//       booking_created: 'border-l-blue-500 bg-blue-50',
//       booking_approved: 'border-l-green-500 bg-green-50',
//       booking_rejected: 'border-l-red-500 bg-red-50',
//       payment_received: 'border-l-green-500 bg-green-50',
//       payment_failed: 'border-l-red-500 bg-red-50',
//       rent_payment_received: 'border-l-green-500 bg-green-50'
//     };
//     return colors[type] || 'border-l-gray-500 bg-gray-50';
//   };

//   // Get notification type label
//   const getNotificationTypeLabel = (type) => {
//     if (!type) return 'Notification';
    
//     const labels = {
//       property_submitted: 'Property Submitted',
//       property_approved: 'Property Approved',
//       property_rejected: 'Property Rejected',
//       property_revision_requested: 'Revision Requested',
//       property_deleted: 'Property Deleted',
//       booking_created: 'New Booking',
//       booking_approved: 'Booking Approved',
//       booking_rejected: 'Booking Rejected',
//       payment_received: 'Payment Received',
//       payment_failed: 'Payment Failed',
//       rent_payment_received: 'Rent Payment Received'
//     };
//     return labels[type] || 'Notification';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading notifications...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Notifications</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={refreshNotifications}
//             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
//               <p className="text-gray-600">Manage your property and booking notifications</p>
//               {unreadCount > 0 && (
//                 <p className="text-blue-600 font-medium mt-2">
//                   {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//                 </p>
//               )}
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={refreshNotifications}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Refresh
//               </button>
              
//               {notifications.length > 0 && unreadCount > 0 && (
//                 <button
//                   onClick={markAllAsRead}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Mark all as read
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         {notifications.length > 0 && (
//           <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//             <div className="flex flex-wrap gap-2">
//               {[
//                 { key: 'all', label: 'All Notifications' },
//                 { key: 'unread', label: 'Unread' },
//                 { key: 'property', label: 'Property' },
//                 { key: 'booking', label: 'Booking' },
//                 { key: 'payment', label: 'Payment' },
//               ].map((filterType) => (
//                 <button
//                   key={filterType.key}
//                   onClick={() => setFilter(filterType.key)}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                     filter === filterType.key 
//                       ? 'bg-blue-500 text-white' 
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <span>{filterType.label}</span>
//                   {filterType.key === 'unread' && unreadCount > 0 && (
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       filter === filterType.key 
//                         ? 'bg-blue-200 text-blue-800' 
//                         : 'bg-gray-200 text-gray-700'
//                     }`}>
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Notifications List */}
//         {filteredNotifications.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//             <img
//               src={notifyImg}
//               alt="No Notifications"
//               className="w-48 h-48 mx-auto mb-6 opacity-60"
//             />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
//             </h3>
//             <p className="text-gray-600 max-w-md mx-auto">
//               {filter === 'all' 
//                 ? "You'll see notifications here for property updates and booking activities."
//                 : `No ${filter} notifications found. Try changing the filter.`
//               }
//             </p>
//             <button
//               onClick={refreshNotifications}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Refresh
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredNotifications.map((notification) => (
//               <div
//                 key={notification._id}
//                 className={`bg-white rounded-xl shadow-sm border-l-4 ${getNotificationColor(notification.type)} ${
//                   notification.isRead ? 'opacity-75' : 'shadow-md border-l-4'
//                 } transition-all duration-200 hover:shadow-lg`}
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4 flex-1">
//                       <div className={`text-2xl mt-1 ${
//                         notification.isRead ? 'text-gray-400' : 'text-blue-500'
//                       }`}>
//                         {getNotificationIcon(notification.type)}
//                       </div>
                      
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap items-center gap-2 mb-3">
//                           <h3 className={`font-semibold text-lg ${
//                             notification.isRead ? 'text-gray-600' : 'text-gray-900'
//                           }`}>
//                             {notification.title || 'Notification'}
//                           </h3>
                          
//                           {/* Notification Type Badge */}
//                           <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
//                             notification.type && notification.type.includes('property') 
//                               ? 'bg-purple-100 text-purple-800 border-purple-200' 
//                               : notification.type && notification.type.includes('booking')
//                               ? 'bg-blue-100 text-blue-800 border-blue-200'
//                               : notification.type && notification.type.includes('payment')
//                               ? 'bg-green-100 text-green-800 border-green-200'
//                               : 'bg-gray-100 text-gray-800 border-gray-200'
//                           }`}>
//                             {getNotificationTypeLabel(notification.type)}
//                           </span>
                          
//                           {!notification.isRead && (
//                             <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
//                           )}
//                         </div>
                        
//                         <p className="text-gray-700 text-base mb-4 leading-relaxed">
//                           {notification.message || 'No message content'}
//                         </p>
                        
//                         {/* Metadata information */}
//                         {notification.metadata && Object.keys(notification.metadata).length > 0 && (
//                           <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
//                               {notification.metadata.propertyName && (
//                                 <div className="flex items-center gap-2">
//                                   <span>🏠</span>
//                                   <span className="font-medium">{notification.metadata.propertyName}</span>
//                                 </div>
//                               )}
//                               {notification.metadata.clientId && (
//                                 <div className="flex items-center gap-2">
//                                   <span>👤</span>
//                                   <span>Client: {notification.metadata.clientId}</span>
//                                 </div>
//                               )}
//                               {notification.metadata.action && (
//                                 <div className="flex items-center gap-2">
//                                   <span>⚡</span>
//                                   <span>Action: {notification.metadata.action}</span>
//                                 </div>
//                               )}
//                               {notification.metadata.transactionId && (
//                                 <div className="flex items-center gap-2">
//                                   <span>🆔</span>
//                                   <span>Transaction: {notification.metadata.transactionId}</span>
//                                 </div>
//                               )}
//                               {notification.metadata.amount && (
//                                 <div className="flex items-center gap-2">
//                                   <span>💰</span>
//                                   <span>Amount: ₹{notification.metadata.amount}</span>
//                                 </div>
//                               )}
//                               {notification.metadata.tenantName && (
//                                 <div className="flex items-center gap-2">
//                                   <span>👤</span>
//                                   <span>Tenant: {notification.metadata.tenantName}</span>
//                                 </div>
//                               )}
//                               {notification.metadata.month && notification.metadata.year && (
//                                 <div className="flex items-center gap-2">
//                                   <span>📅</span>
//                                   <span>Period: {notification.metadata.month} {notification.metadata.year}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         )}
                        
//                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                           <div className="flex items-center space-x-4 text-sm text-gray-500">
//                             <span className="flex items-center gap-1">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                               </svg>
//                               {formatDate(notification.createdAt)}
//                             </span>
//                           </div>
                          
//                           <div className="flex items-center space-x-3">
//                             {!notification.isRead && (
//                               <button
//                                 onClick={() => markAsRead(notification._id)}
//                                 className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
//                               >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                                 Mark read
//                               </button>
//                             )}
                            
//                             <button
//                               onClick={() => deleteNotification(notification._id)}
//                               className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
//                               title="Delete notification"
//                             >
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                               </svg>
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientNotifications;




import React, { useEffect, useState } from "react";
import { notificationAPI } from "../PropertyController";
import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  // Fetch client notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching client notifications...');
        
        const [notifRes, unreadRes] = await Promise.all([
          notificationAPI.getNotifications(),
          notificationAPI.getUnreadCount()
        ]);

        console.log('📨 Client Notifications Full Response:', notifRes);
        console.log('🔔 Client Unread Count Full Response:', unreadRes);

        let notificationsData = [];
        let unreadCountData = 0;

        if (notifRes.success) {
          notificationsData = notifRes.data?.notifications || [];
        } else {
          notificationsData = notifRes.notifications || notifRes.data?.notifications || [];
        }

        if (unreadRes.success) {
          unreadCountData = unreadRes.data?.unreadCount || 0;
        } else {
          unreadCountData = unreadRes.unreadCount || unreadRes.data?.unreadCount || 0;
        }

        console.log('✅ Processed notifications:', notificationsData);
        console.log('✅ Processed unread count:', unreadCountData);

        const safeNotifications = Array.isArray(notificationsData) ? notificationsData : [];
        setNotifications(safeNotifications);
        setUnreadCount(Number(unreadCountData) || 0);
        
        if (safeNotifications.length === 0) {
          console.log('ℹ️ No notifications found for client');
        }
        
      } catch (err) {
        console.error("❌ Error fetching client notifications:", err);
        console.error("📋 Error details:", err.response?.data || err.message || err);
        setError(err.response?.data?.message || err.message || "Failed to fetch notifications");
        
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Filter notifications 
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'property') return notification.type && notification.type.includes('property');
    if (filter === 'booking') return notification.type && notification.type.includes('booking');
    if (filter === 'vacate') return notification.type && notification.type.includes('vacate');
    if (filter === 'concern') return notification.type && notification.type.includes('concern');
    if (filter === 'chat') return notification.type && notification.type.includes('chat');
    if (filter === 'food') return notification.type && notification.type.includes('food');
    if (filter === 'payment') return notification.type && notification.type.includes('payment'); 
    return true;
  });

  // Mark one notification as read
  const markAsRead = async (notificationId) => {
    try {
      await notificationAPI.markAsRead(notificationId);
      
      setNotifications(prev => 
        prev.map(n => 
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("❌ Error marking notification as read:", err);
      alert("Failed to mark notification as read");
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("❌ Error marking all notifications as read:", err);
      alert("Failed to mark all notifications as read");
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await notificationAPI.deleteNotification(notificationId);
      
      const notification = notifications.find(n => n._id === notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("❌ Error deleting notification:", err);
      alert("Failed to delete notification");
    }
  };

  // Refresh notifications
  const refreshNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [notifRes, unreadRes] = await Promise.all([
        notificationAPI.getNotifications(),
        notificationAPI.getUnreadCount()
      ]);

      let notificationsData = [];
      let unreadCountData = 0;

      if (notifRes.success) {
        notificationsData = notifRes.data?.notifications || [];
      } else {
        notificationsData = notifRes.notifications || notifRes.data?.notifications || [];
      }

      if (unreadRes.success) {
        unreadCountData = unreadRes.data?.unreadCount || 0;
      } else {
        unreadCountData = unreadRes.unreadCount || unreadRes.data?.unreadCount || 0;
      }

      setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
      setUnreadCount(Number(unreadCountData) || 0);
      
    } catch (err) {
      console.error("❌ Error refreshing notifications:", err);
      setError(err.response?.data?.message || err.message || "Failed to refresh notifications");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Get notification icon 
  const getNotificationIcon = (type) => {
    if (!type) return '🔔';
    
    const icons = {
      property_submitted: '📝',
      property_approved: '✅',
      property_rejected: '❌',
      property_revision_requested: '📋',
      property_deleted: '🗑️',
      booking_created: '📋',
      booking_approved: '✅',
      booking_rejected: '❌',
      payment_received: '💰', 
      payment_failed: '💳',
      
      // Vacate room notifications
      vacate_requested: '🚪',
      vacate_approved: '✅',
      vacate_rejected: '❌',
      vacate_refund_initiated: '💰',
      vacate_refund_completed: '✅',
      vacate_payment_received: '💳',
      vacate_deduction_added: '📝',
      
      // Concern notifications
      concern_submitted: '📝',
      concern_approved: '✅',
      concern_rejected: '❌',
      concern_completed: '✅',
      concern_priority_updated: '⚠️',

      // Chat notifications
      chat_message_received: '💬',
      chat_urgent_message: '🚨',

      // Food Menu notifications
      food_item_added: '🍽️',
      food_item_updated: '✏️',
      food_item_deleted: '🗑️',
      food_price_changed: '💰',
      food_menu_cleared: '📋',
      food_bulk_updated: '📅'
    };
    return icons[type] || '🔔';
  };

  // Get notification color 
  const getNotificationColor = (type) => {
    if (!type) return 'border-l-gray-500 bg-gray-50';
    
    const colors = {
      property_submitted: 'border-l-blue-500 bg-blue-50',
      property_approved: 'border-l-green-500 bg-green-50',
      property_rejected: 'border-l-red-500 bg-red-50',
      property_revision_requested: 'border-l-orange-500 bg-orange-50',
      property_deleted: 'border-l-gray-500 bg-gray-50',
      booking_created: 'border-l-blue-500 bg-blue-50',
      booking_approved: 'border-l-green-500 bg-green-50',
      booking_rejected: 'border-l-red-500 bg-red-50',
      
      // Payment notifications
      payment_received: 'border-l-green-500 bg-green-50',
      payment_failed: 'border-l-red-500 bg-red-50',
      
      // Vacate room notifications
      vacate_requested: 'border-l-purple-500 bg-purple-50',
      vacate_approved: 'border-l-green-500 bg-green-50',
      vacate_rejected: 'border-l-red-500 bg-red-50',
      vacate_refund_initiated: 'border-l-blue-500 bg-blue-50',
      vacate_refund_completed: 'border-l-emerald-500 bg-emerald-50',
      vacate_payment_received: 'border-l-green-500 bg-green-50',
      vacate_deduction_added: 'border-l-orange-500 bg-orange-50',
      
      // Concern notifications
      concern_submitted: 'border-l-indigo-500 bg-indigo-50',
      concern_approved: 'border-l-green-500 bg-green-50',
      concern_rejected: 'border-l-red-500 bg-red-50',
      concern_completed: 'border-l-emerald-500 bg-emerald-50',
      concern_priority_updated: 'border-l-orange-500 bg-orange-50',

      // Chat notifications
      chat_message_received: 'border-l-cyan-500 bg-cyan-50',
      chat_urgent_message: 'border-l-red-500 bg-red-50',

      // Food Menu notifications
      food_item_added: 'border-l-amber-500 bg-amber-50',
      food_item_updated: 'border-l-orange-500 bg-orange-50',
      food_item_deleted: 'border-l-rose-500 bg-rose-50',
      food_price_changed: 'border-l-lime-500 bg-lime-50',
      food_menu_cleared: 'border-l-gray-500 bg-gray-50',
      food_bulk_updated: 'border-l-teal-500 bg-teal-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  // Get notification type label 
  const getNotificationTypeLabel = (type) => {
    if (!type) return 'Notification';
    
    const labels = {
      property_submitted: 'Property Submitted',
      property_approved: 'Property Approved',
      property_rejected: 'Property Rejected',
      property_revision_requested: 'Revision Requested',
      property_deleted: 'Property Deleted',
      booking_created: 'New Booking',
      booking_approved: 'Booking Approved',
      booking_rejected: 'Booking Rejected',
      
      // Payment notifications
      payment_received: 'Payment Received',
      payment_failed: 'Payment Failed',
      
      // Vacate room notifications
      vacate_requested: 'Vacate Request',
      vacate_approved: 'Vacate Approved',
      vacate_rejected: 'Vacate Rejected',
      vacate_refund_initiated: 'Refund Initiated',
      vacate_refund_completed: 'Refund Completed',
      vacate_payment_received: 'Payment Received',
      vacate_deduction_added: 'Deduction Applied',
      
      // Concern notifications
      concern_submitted: 'Concern Submitted',
      concern_approved: 'Concern Approved',
      concern_rejected: 'Concern Rejected',
      concern_completed: 'Concern Completed',
      concern_priority_updated: 'Priority Updated',

      // Chat notifications
      chat_message_received: 'New Message',
      chat_urgent_message: 'Urgent Message',

      // Food Menu notifications
      food_item_added: 'Food Item Added',
      food_item_updated: 'Food Item Updated',
      food_item_deleted: 'Food Item Deleted',
      food_price_changed: 'Price Changed',
      food_menu_cleared: 'Day Menu Cleared',
      food_bulk_updated: 'Weekly Menu Updated'
    };
    return labels[type] || 'Notification';
  };

  // Handle vacate action
  const handleVacateAction = (vacateRequestId) => {
    console.log('🚪 View vacate request clicked:', vacateRequestId);
    window.location.href = `/client/vacate-requests/${vacateRequestId}`;
  };

  // Handle concern action
  const handleConcernAction = (concernId) => {
    console.log('📝 View concern clicked:', concernId);
    window.location.href = `/client/concerns/${concernId}`;
  };

  // Handle chat action
  const handleChatAction = (propertyId, senderId) => {
    console.log('💬 Open chat clicked:', { propertyId, senderId });
    window.location.href = `/client/chat?property=${propertyId}&user=${senderId}`;
  };

  // Handle property action
  const handlePropertyAction = (propertyId) => {
    console.log('🏠 View property clicked:', propertyId);
    window.location.href = `/client/properties/${propertyId}`;
  };

  // Handle food menu action
  const handleFoodMenuAction = (propertyId, bookingId) => {
    console.log('🍽️ Manage food menu clicked:', { propertyId, bookingId });
    window.location.href = `/client/food-menu?property=${propertyId}${bookingId ? `&booking=${bookingId}` : ''}`;
  };

  // Handle payment action 
  const handlePaymentAction = (paymentId, propertyId) => {
    console.log('💰 View payment clicked:', { paymentId, propertyId });
    if (paymentId && propertyId) {
      window.location.href = `/client/payments/${paymentId}?property=${propertyId}`;
    } else if (propertyId) {
      window.location.href = `/client/payments?property=${propertyId}`;
    } else {
      window.location.href = `/client/payments`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Notifications</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshNotifications}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Manage your property and booking notifications</p>
              {unreadCount > 0 && (
                <p className="text-blue-600 font-medium mt-2">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={refreshNotifications}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              
              {notifications.length > 0 && unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        {notifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Notifications' },
                { key: 'unread', label: 'Unread' },
                { key: 'property', label: 'Property' },
                { key: 'booking', label: 'Booking' },
                { key: 'vacate', label: 'Vacate' },
                { key: 'concern', label: 'Concerns' },
                { key: 'chat', label: 'Chat' },
                { key: 'food', label: 'Food Menu' },
                { key: 'payment', label: 'Payments' } 
              ].map((filterType) => (
                <button
                  key={filterType.key}
                  onClick={() => setFilter(filterType.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === filterType.key 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{filterType.label}</span>
                  {filterType.key === 'unread' && unreadCount > 0 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      filter === filterType.key 
                        ? 'bg-blue-200 text-blue-800' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <img
              src={notifyImg}
              alt="No Notifications"
              className="w-48 h-48 mx-auto mb-6 opacity-60"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {filter === 'all' 
                ? "You'll see notifications here for property updates, booking activities, vacate requests, concerns, chat messages, food menu changes, and payments."
                : `No ${filter} notifications found. Try changing the filter.`
              }
            </p>
            <button
              onClick={refreshNotifications}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-xl shadow-sm border-l-4 ${getNotificationColor(notification.type)} ${
                  notification.isRead ? 'opacity-75' : 'shadow-md border-l-4'
                } transition-all duration-200 hover:shadow-lg`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`text-2xl mt-1 ${
                        notification.isRead ? 'text-gray-400' : 'text-blue-500'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <h3 className={`font-semibold text-lg ${
                            notification.isRead ? 'text-gray-600' : 'text-gray-900'
                          }`}>
                            {notification.title || 'Notification'}
                          </h3>
                          
                          {/* Notification Type Badge*/}
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                            notification.type && notification.type.includes('property') 
                              ? 'bg-purple-100 text-purple-800 border-purple-200' 
                              : notification.type && notification.type.includes('booking')
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : notification.type && notification.type.includes('payment')
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : notification.type && notification.type.includes('vacate')
                              ? 'bg-purple-100 text-purple-800 border-purple-200'
                              : notification.type && notification.type.includes('concern')
                              ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                              : notification.type && notification.type.includes('chat')
                              ? 'bg-cyan-100 text-cyan-800 border-cyan-200'
                              : notification.type && notification.type.includes('food')
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {getNotificationTypeLabel(notification.type)}
                          </span>
                          
                          {!notification.isRead && (
                            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                          )}
                        </div>
                        
                        <p className="text-gray-700 text-base mb-4 leading-relaxed">
                          {notification.message || 'No message content'}
                        </p>
                        
                        {/* Action buttons - UPDATED WITH PAYMENT ACTION */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {notification.type === 'property_submitted' && notification.metadata?.propertyId && (
                            <button
                              onClick={() => handlePropertyAction(notification.metadata.propertyId)}
                              className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                            >
                              View Property
                            </button>
                          )}
                          
                          {notification.type && notification.type.includes('vacate') && notification.metadata?.vacateRequestId && (
                            <button
                              onClick={() => handleVacateAction(notification.metadata.vacateRequestId)}
                              className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                            >
                              Manage Vacate Request
                            </button>
                          )}

                          {notification.type && notification.type.includes('concern') && notification.metadata?.concernId && (
                            <button
                              onClick={() => handleConcernAction(notification.metadata.concernId)}
                              className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                              Manage Concern
                            </button>
                          )}

                          {notification.type && notification.type.includes('chat') && notification.metadata?.propertyId && (
                            <button
                              onClick={() => handleChatAction(notification.metadata.propertyId, notification.metadata.senderId)}
                              className="px-4 py-2 bg-cyan-500 text-white text-sm font-medium rounded-lg hover:bg-cyan-600 transition-colors"
                            >
                              Open Chat
                            </button>
                          )}

                          {notification.type && notification.type.includes('food') && notification.metadata?.propertyId && (
                            <button
                              onClick={() => handleFoodMenuAction(notification.metadata.propertyId, notification.metadata.bookingId)}
                              className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                            >
                              Manage Food Menu
                            </button>
                          )}

                          {/* Payment Action Button */}
                          {notification.type && notification.type.includes('payment') && notification.metadata?.propertyId && (
                            <button
                              onClick={() => handlePaymentAction(notification.metadata.paymentId, notification.metadata.propertyId)}
                              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                            >
                              View Payment
                            </button>
                          )}
                        </div>

                        {/* Payment amount display*/}
                        {notification.metadata?.amount && (
                          <div className={`rounded p-3 mb-4 ${
                            notification.type && notification.type.includes('payment') 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-gray-50'
                          }`}>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-semibold text-gray-700">Amount:</span>
                              <span className={`font-bold ${
                                notification.type && notification.type.includes('payment') 
                                  ? 'text-green-600' 
                                  : 'text-gray-800'
                              }`}>
                                ₹{notification.metadata.amount}
                              </span>
                              {notification.metadata.paymentType && (
                                <span className="text-gray-500">• {notification.metadata.paymentType}</span>
                              )}
                              {notification.metadata.tenantName && (
                                <span className="text-gray-500">• From: {notification.metadata.tenantName}</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Food menu change details */}
                        {notification.type && notification.type.includes('food') && (
                          <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                            <div className="space-y-2 text-sm">
                              {notification.metadata?.foodItemName && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-amber-700">Food Item:</span>
                                  <span className="text-amber-800">{notification.metadata.foodItemName}</span>
                                </div>
                              )}
                              {notification.metadata?.day && notification.metadata?.category && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-amber-700">When:</span>
                                  <span className="text-amber-800">{notification.metadata.day} - {notification.metadata.category}</span>
                                </div>
                              )}
                              {notification.metadata?.oldData?.price && notification.metadata?.newData?.price && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-amber-700">Price Change:</span>
                                  <span className="text-amber-800">
                                    ₹{notification.metadata.oldData.price} → ₹{notification.metadata.newData.price}
                                  </span>
                                </div>
                              )}
                              {notification.metadata?.changesSummary && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-amber-700">Summary:</span>
                                  <span className="text-amber-800">{notification.metadata.changesSummary}</span>
                                </div>
                              )}
                              {notification.metadata?.action === 'item_updated' && notification.metadata?.oldData && notification.metadata?.newData && (
                                <div className="mt-2">
                                  <p className="font-semibold text-amber-700 mb-1">Changes Made:</p>
                                  <ul className="text-amber-800 text-xs space-y-1">
                                    {notification.metadata.oldData.name !== notification.metadata.newData.name && (
                                      <li>• Name: "{notification.metadata.oldData.name}" → "{notification.metadata.newData.name}"</li>
                                    )}
                                    {notification.metadata.oldData.price !== notification.metadata.newData.price && (
                                      <li>• Price: ₹{notification.metadata.oldData.price} → ₹{notification.metadata.newData.price}</li>
                                    )}
                                    {notification.metadata.oldData.description !== notification.metadata.newData.description && (
                                      <li>• Description updated</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Chat message preview */}
                        {notification.type && notification.type.includes('chat') && notification.metadata?.content && (
                          <div className="bg-cyan-50 rounded-lg p-3 mb-4 border border-cyan-200">
                            <div className="flex items-start gap-2 text-sm">
                              <span className="text-cyan-600 mt-0.5">💬</span>
                              <div>
                                <p className="text-cyan-800 font-medium mb-1">Message Preview:</p>
                                <p className="text-cyan-700 italic">"{notification.metadata.content}"</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Refund amount display for vacate */}
                        {notification.metadata?.refundAmount && (
                          <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-semibold text-green-700">Refund Amount:</span>
                              <span className="text-green-600 font-bold">₹{notification.metadata.refundAmount}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Rejection reason display */}
                        {notification.metadata?.rejectionReason && (
                          <div className="bg-red-50 rounded-lg p-3 mb-4 border border-red-200">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-semibold text-red-700">Reason:</span>
                              <span className="text-red-600">{notification.metadata.rejectionReason}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Metadata information - UPDATED WITH PAYMENT METADATA */}
                        {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              {notification.metadata.propertyName && (
                                <div className="flex items-center gap-2">
                                  <span>🏠</span>
                                  <span className="font-medium">{notification.metadata.propertyName}</span>
                                </div>
                              )}
                              {notification.metadata.clientId && (
                                <div className="flex items-center gap-2">
                                  <span>👤</span>
                                  <span>Client: {notification.metadata.clientId}</span>
                                </div>
                              )}
                              {notification.metadata.bookingId && (
                                <div className="flex items-center gap-2">
                                  <span>📅</span>
                                  <span>Booking: {notification.metadata.bookingId.substring(0, 8)}...</span>
                                </div>
                              )}
                              {notification.metadata.vacateRequestId && (
                                <div className="flex items-center gap-2">
                                  <span>🚪</span>
                                  <span>Vacate Request: {notification.metadata.vacateRequestId.substring(0, 8)}...</span>
                                </div>
                              )}
                              {notification.metadata.concernId && (
                                <div className="flex items-center gap-2">
                                  <span>📝</span>
                                  <span>Concern: {notification.metadata.concernId.substring(0, 8)}...</span>
                                </div>
                              )}
                              {notification.metadata.senderName && (
                                <div className="flex items-center gap-2">
                                  <span>👤</span>
                                  <span>From: {notification.metadata.senderName}</span>
                                </div>
                              )}
                              {notification.metadata.foodItemName && (
                                <div className="flex items-center gap-2">
                                  <span>🍽️</span>
                                  <span>Food: {notification.metadata.foodItemName}</span>
                                </div>
                              )}
                              {notification.metadata.concernType && (
                                <div className="flex items-center gap-2">
                                  <span>⚡</span>
                                  <span>Type: {notification.metadata.concernType.replace('-', ' ')}</span>
                                </div>
                              )}
                              {notification.metadata.action && (
                                <div className="flex items-center gap-2">
                                  <span>🎯</span>
                                  <span>Action: {notification.metadata.action}</span>
                                </div>
                              )}
                              {/* Payment Metadata - ADDED */}
                              {notification.metadata.paymentId && (
                                <div className="flex items-center gap-2">
                                  <span>💰</span>
                                  <span>Payment ID: {notification.metadata.paymentId.substring(0, 8)}...</span>
                                </div>
                              )}
                              {notification.metadata.transactionId && (
                                <div className="flex items-center gap-2">
                                  <span>🆔</span>
                                  <span>Transaction: {notification.metadata.transactionId.substring(0, 8)}...</span>
                                </div>
                              )}
                              {notification.metadata.tenantName && (
                                <div className="flex items-center gap-2">
                                  <span>👤</span>
                                  <span>Tenant: {notification.metadata.tenantName}</span>
                                </div>
                              )}
                              {notification.metadata.month && notification.metadata.year && (
                                <div className="flex items-center gap-2">
                                  <span>📅</span>
                                  <span>Period: {notification.metadata.month} {notification.metadata.year}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Mark read
                              </button>
                            )}
                            
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                              title="Delete notification"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotifications;