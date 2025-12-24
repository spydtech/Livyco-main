// import React, { useEffect, useState } from "react";
// import { adminNotificationAPI } from "../adminController";
// import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

// const AdminNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [filter, setFilter] = useState('all'); // 'all', 'unread', 'property', 'booking'

//   // Fetch admin notifications
//  // Fetch admin notifications - FIXED version
// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
      
//       console.log('Fetching admin notifications...');
      
//       const [notifRes, unreadRes] = await Promise.all([
//         adminNotificationAPI.getNotifications(),
//         adminNotificationAPI.getUnreadCount()
//       ]);

//       console.log('Admin Notifications Full Response:', notifRes);
//       console.log('Admin Unread Count Full Response:', unreadRes);

//       // FIXED: Properly handle the response structure
//       let notificationsData = [];
//       let unreadCountData = 0;

//       // Handle notifications response
//       if (notifRes.data?.success) {
//         notificationsData = notifRes.data.notifications || notifRes.data.data || [];
//       } else {
//         // If no success flag, try direct access
//         notificationsData = notifRes.data?.notifications || notifRes.data || [];
//       }

//       // Handle unread count response
//       if (unreadRes.data?.success) {
//         unreadCountData = unreadRes.data.unreadCount || unreadRes.data.count || 0;
//       } else {
//         unreadCountData = unreadRes.data?.unreadCount || unreadRes.data?.count || 0;
//       }

//       console.log('Processed notifications:', notificationsData);
//       console.log('Processed unread count:', unreadCountData);

//       // Ensure we have an array
//       setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
//       setUnreadCount(Number(unreadCountData) || 0);
      
//     } catch (err) {
//       console.error("Error fetching admin notifications:", err);
//       console.error("Error response:", err.response);
//       console.error("Error details:", err.response?.data || err.message);
      
//       // Set empty state on error
//       setNotifications([]);
//       setUnreadCount(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchNotifications();
// }, []);
//   // Filter notifications based on selected filter
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
//       await adminNotificationAPI.markAsRead(notificationId);
      
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

//   // Mark all notifications as read
//   const markAllAsRead = async () => {
//     try {
//       await adminNotificationAPI.markAllAsRead();
      
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
//       await adminNotificationAPI.deleteNotification(notificationId);
      
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

//   // Get notification icon based on type
//   const getNotificationIcon = (type) => {
//     if (!type) return '🔔';
    
//     const icons = {
//       //property approval icon
//        property_submitted: '📝',
//         property_approved: '✅',
//         property_rejected: '❌',
//         property_revision_requested: '📋',
//         property_deleted: '🗑️',
//         property_approval: '🏠', // keep existing for backward compatibility
//       //booking notification icons
//       booking_created: '📋',
//       booking_approved: '✅',
//       booking_rejected: '❌',
//       booking_cancelled: '🚫',
//       payment_received: '💰',
//       payment_failed: '💳',
//       system_alert: '⚠️',
//       reminder: '⏰'
//     };
//     return icons[type] || '🔔';
//   };

//   // Get notification background color based on type
//   const getNotificationColor = (type) => {
//     if (!type) return 'border-l-gray-500 bg-gray-50';
    
//     const colors = {
//       //property approval colors
//        property_submitted: 'border-l-blue-500 bg-blue-50',
//         property_approved: 'border-l-green-500 bg-green-50',
//         property_rejected: 'border-l-red-500 bg-red-50',
//         property_revision_requested: 'border-l-orange-500 bg-orange-50',
//         property_deleted: 'border-l-gray-500 bg-gray-50',
//         property_approval: 'border-l-purple-500 bg-purple-50',

//       //booking notification colors
//       booking_created: 'border-l-blue-500 bg-blue-50',
//       booking_approved: 'border-l-green-500 bg-green-50',
//       booking_rejected: 'border-l-red-500 bg-red-50',
//       booking_cancelled: 'border-l-orange-500 bg-orange-50',
//       payment_received: 'border-l-emerald-500 bg-emerald-50',
//       payment_failed: 'border-l-rose-500 bg-rose-50',
//       system_alert: 'border-l-amber-500 bg-amber-50',
//       reminder: 'border-l-indigo-500 bg-indigo-50'
//     };
//     return colors[type] || 'border-l-gray-500 bg-gray-50';
//   };

//   // Get notification type label
//   const getNotificationTypeLabel = (type) => {
//     if (!type) return 'Notification';
    
//     const labels = {
//       property_approval: 'Property Approval',
//       booking_created: 'New Booking',
//       booking_approved: 'Booking Approved',
//       booking_rejected: 'Booking Rejected',
//       booking_cancelled: 'Booking Cancelled',
//       payment_received: 'Payment Received',
//       payment_failed: 'Payment Failed',
//       system_alert: 'System Alert',
//       reminder: 'Reminder'
//     };
//     return labels[type] || 'Notification';
//   };

//   // Handle property approval action
//   const handlePropertyAction = (propertyId, action) => {
//     // Navigate to property approval page or open modal
//     console.log(`Property ${action} clicked for:`, propertyId);
//     // You can implement navigation or modal opening here
//     window.location.href = `/admin/properties/${propertyId}`;
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
//             <h2 className="text-2xl font-bold text-gray-800">Admin Notifications</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Manage system notifications and property approvals
//             </p>
//             {unreadCount > 0 && (
//               <p className="text-sm text-blue-600 mt-1 font-medium">
//                 {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//               </p>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-3">
//             {notifications.length > 0 && unreadCount > 0 && (
//               <button
//                 onClick={markAllAsRead}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
//               >
//                 <span>Mark all as read</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Filters */}
//         {notifications.length > 0 && (
//           <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   filter === 'all' 
//                     ? 'bg-blue-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 All Notifications
//               </button>
//               <button
//                 onClick={() => setFilter('unread')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   filter === 'unread' 
//                     ? 'bg-blue-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Unread ({unreadCount})
//               </button>
//               <button
//                 onClick={() => setFilter('property')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   filter === 'property' 
//                     ? 'bg-blue-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Property Approvals
//               </button>
//               <button
//                 onClick={() => setFilter('booking')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   filter === 'booking' 
//                     ? 'bg-blue-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Bookings
//               </button>
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
//                 ? "You'll see notifications here for property approvals, bookings, and system alerts."
//                 : `No ${filter} notifications found. Try changing the filter.`
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
//                             {notification.title || 'Notification'}
//                           </h3>
                          
//                           {/* Notification Type Badge */}
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
//                           {notification.message || 'No message content'}
//                         </p>
                        
//                         {/* Action buttons for property approvals */}
//                         {notification.type === 'property_approval' && notification.metadata?.propertyId && (
//                           <div className="flex items-center space-x-2 mb-2">
//                             <button
//                               onClick={() => handlePropertyAction(notification.metadata.propertyId, 'review')}
//                               className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
//                             >
//                               Review Property
//                             </button>
//                           </div>
//                         )}
                        
//                         {/* Property and Booking Info */}
//                         <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-2">
//                           {notification.propertyId && (
//                             <div className="flex items-center space-x-1">
//                               <span>🏠</span>
//                               <span className="font-medium">
//                                 {notification.propertyId.name || 'Property'}
//                               </span>
//                               {notification.propertyId.locality && (
//                                 <span>• {notification.propertyId.locality}</span>
//                               )}
//                             </div>
//                           )}
                          
//                           {notification.bookingId && (
//                             <div className="flex items-center space-x-1">
//                               <span>📅</span>
//                               <span className="font-medium">
//                                 Booking #{notification.bookingId._id ? notification.bookingId._id.slice(-6) : 'N/A'}
//                               </span>
//                               {notification.bookingId.bookingStatus && (
//                                 <span>• {notification.bookingId.bookingStatus}</span>
//                               )}
//                             </div>
//                           )}
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-4 text-xs text-gray-500">
//                             <span>{formatDate(notification.createdAt)}</span>
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

//         {/* Statistics */}
//         {notifications.length > 0 && (
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-blue-500">
//               <div className="text-2xl font-bold text-gray-800">{notifications.length}</div>
//               <div className="text-sm text-gray-600">Total Notifications</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-green-500">
//               <div className="text-2xl font-bold text-gray-800">{unreadCount}</div>
//               <div className="text-sm text-gray-600">Unread</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-purple-500">
//               <div className="text-2xl font-bold text-gray-800">
//                 {notifications.filter(n => n.type && n.type.includes('property')).length}
//               </div>
//               <div className="text-sm text-gray-600">Property Related</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-emerald-500">
//               <div className="text-2xl font-bold text-gray-800">
//                 {notifications.filter(n => n.type && n.type.includes('booking')).length}
//               </div>
//               <div className="text-sm text-gray-600">Booking Related</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminNotifications;




// import React, { useEffect, useState } from "react";
// import { adminNotificationAPI } from "../adminController";
// import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

// const AdminNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [filter, setFilter] = useState('all'); // 'all', 'unread', 'property', 'booking'
//   const [error, setError] = useState(null);

//   // Fetch admin notifications - FIXED version
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         console.log('🔄 Fetching admin notifications...');
        
//         const [notifRes, unreadRes] = await Promise.all([
//           adminNotificationAPI.getNotifications(),
//           adminNotificationAPI.getUnreadCount()
//         ]);

//         console.log('📨 Admin Notifications Full Response:', notifRes);
//         console.log('🔔 Admin Unread Count Full Response:', unreadRes);

//         // FIXED: Properly handle the response structure
//         let notificationsData = [];
//         let unreadCountData = 0;

//         // Handle notifications response - Check for data.data structure
//         if (notifRes.data?.success) {
//           // Try different possible response structures
//           notificationsData = notifRes.data.data?.notifications || 
//                             notifRes.data.notifications || 
//                             notifRes.data || 
//                             [];
//         } else {
//           // If no success flag, try direct access
//           notificationsData = notifRes.data?.notifications || 
//                             notifRes.data?.data?.notifications || 
//                             notifRes.data || 
//                             [];
//         }

//         // Handle unread count response
//         if (unreadRes.data?.success) {
//           unreadCountData = unreadRes.data.data?.unreadCount || 
//                            unreadRes.data.unreadCount || 
//                            unreadRes.data.count || 
//                            0;
//         } else {
//           unreadCountData = unreadRes.data?.unreadCount || 
//                            unreadRes.data?.data?.unreadCount || 
//                            unreadRes.data?.count || 
//                            0;
//         }

//         console.log('✅ Processed notifications:', notificationsData);
//         console.log('✅ Processed unread count:', unreadCountData);

//         // Ensure we have an array
//         const safeNotifications = Array.isArray(notificationsData) ? notificationsData : [];
//         setNotifications(safeNotifications);
//         setUnreadCount(Number(unreadCountData) || 0);
        
//         if (safeNotifications.length === 0) {
//           console.log('ℹ️ No notifications found in response');
//         }
        
//       } catch (err) {
//         console.error("❌ Error fetching admin notifications:", err);
//         console.error("📋 Error details:", err.response?.data || err.message);
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

//   // Filter notifications based on selected filter
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
//       await adminNotificationAPI.markAsRead(notificationId);
      
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

//   // Mark all notifications as read
//   const markAllAsRead = async () => {
//     try {
//       await adminNotificationAPI.markAllAsRead();
      
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
//       await adminNotificationAPI.deleteNotification(notificationId);
      
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
//         adminNotificationAPI.getNotifications(),
//         adminNotificationAPI.getUnreadCount()
//       ]);

//       let notificationsData = [];
//       let unreadCountData = 0;

//       if (notifRes.data?.success) {
//         notificationsData = notifRes.data.data?.notifications || 
//                           notifRes.data.notifications || 
//                           notifRes.data || 
//                           [];
//       } else {
//         notificationsData = notifRes.data?.notifications || 
//                           notifRes.data?.data?.notifications || 
//                           notifRes.data || 
//                           [];
//       }

//       if (unreadRes.data?.success) {
//         unreadCountData = unreadRes.data.data?.unreadCount || 
//                          unreadRes.data.unreadCount || 
//                          unreadRes.data.count || 
//                          0;
//       } else {
//         unreadCountData = unreadRes.data?.unreadCount || 
//                          unreadRes.data?.data?.unreadCount || 
//                          unreadRes.data?.count || 
//                          0;
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

//   // Get notification icon based on type
//   const getNotificationIcon = (type) => {
//     if (!type) return '🔔';
    
//     const icons = {
//       // Property notifications
//       property_submitted: '📝',
//       property_approved: '✅',
//       property_rejected: '❌',
//       property_revision_requested: '📋',
//       property_deleted: '🗑️',
      
//       // Booking notifications
//       booking_created: '📋',
//       booking_approved: '✅',
//       booking_rejected: '❌',
//       booking_cancelled: '🚫',
//       payment_received: '💰',
//       payment_failed: '💳',
      
//       // System notifications
//       system_alert: '⚠️',
//       reminder: '⏰'
//     };
//     return icons[type] || '🔔';
//   };

//   // Get notification background color based on type
//   const getNotificationColor = (type) => {
//     if (!type) return 'border-l-gray-500 bg-gray-50';
    
//     const colors = {
//       // Property notifications
//       property_submitted: 'border-l-blue-500 bg-blue-50',
//       property_approved: 'border-l-green-500 bg-green-50',
//       property_rejected: 'border-l-red-500 bg-red-50',
//       property_revision_requested: 'border-l-orange-500 bg-orange-50',
//       property_deleted: 'border-l-gray-500 bg-gray-50',

//       // Booking notifications
//       booking_created: 'border-l-blue-500 bg-blue-50',
//       booking_approved: 'border-l-green-500 bg-green-50',
//       booking_rejected: 'border-l-red-500 bg-red-50',
//       booking_cancelled: 'border-l-orange-500 bg-orange-50',
//       payment_received: 'border-l-emerald-500 bg-emerald-50',
//       payment_failed: 'border-l-rose-500 bg-rose-50',

//       // System notifications
//       system_alert: 'border-l-amber-500 bg-amber-50',
//       reminder: 'border-l-indigo-500 bg-indigo-50'
//     };
//     return colors[type] || 'border-l-gray-500 bg-gray-50';
//   };

//   // Get notification type label
//   const getNotificationTypeLabel = (type) => {
//     if (!type) return 'Notification';
    
//     const labels = {
//       // Property notifications
//       property_submitted: 'Property Submitted',
//       property_approved: 'Property Approved',
//       property_rejected: 'Property Rejected',
//       property_revision_requested: 'Revision Requested',
//       property_deleted: 'Property Deleted',

//       // Booking notifications
//       booking_created: 'New Booking',
//       booking_approved: 'Booking Approved',
//       booking_rejected: 'Booking Rejected',
//       booking_cancelled: 'Booking Cancelled',
//       payment_received: 'Payment Received',
//       payment_failed: 'Payment Failed',

//       // System notifications
//       system_alert: 'System Alert',
//       reminder: 'Reminder'
//     };
//     return labels[type] || 'Notification';
//   };

//   // Handle property action
//   const handlePropertyAction = (propertyId, action) => {
//     console.log(`🏠 Property ${action} clicked for:`, propertyId);
//     // Navigate to property management page
//     window.location.href = `/admin/properties/${propertyId}`;
//   };

//   // Handle booking action
//   const handleBookingAction = (bookingId, action) => {
//     console.log(`📅 Booking ${action} clicked for:`, bookingId);
//     // Navigate to booking management page
//     window.location.href = `/admin/bookings/${bookingId}`;
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
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="border-2  rounded-xl  p-6 mb-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex-4">
//               <h1 className="text-xl font-bold text-gray-900 mb-2"> Notifications</h1>
             
//               {unreadCount > 0 && (
//                 <p className="text-blue-600 font-medium mt-2">
//                   {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//                 </p>
//               )}
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={refreshNotifications}
//                 className="flex items-center gap-2 px-4 py-2  border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Refresh
//               </button>
              
//               {notifications.length > 0 && unreadCount > 0 && (
//                 <button
//                   onClick={markAllAsRead}
//                   className="flex flex-row items-center gap-0 px-1  py-2 bg-blue-500 text-white text-xs font-medium  rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
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
//           <div className=" border-2 rounded-xl shadow-sm p-2 mb-6">
//             <div className="flex flex-wrap gap-2">
//               {[
//                 { key: 'all', label: 'All Notifications' },
//                 { key: 'unread', label: 'Unread' },
//                 { key: 'property', label: 'Property' },
//                 { key: 'booking', label: 'Booking' }
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
//                 ? "You'll see notifications here for property approvals, bookings, and system alerts."
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
//           <div className="space-y-4 border-2 rounded-xl">
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
                        
//                         {/* Action buttons */}
//                         <div className="flex flex-wrap items-center gap-3 mb-4">
//                           {notification.type === 'property_submitted' && notification.metadata?.propertyId && (
//                             <button
//                               onClick={() => handlePropertyAction(notification.metadata.propertyId, 'review')}
//                               className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
//                             >
//                               Review Property
//                             </button>
//                           )}
                          
//                           {notification.type === 'booking_created' && notification.metadata?.bookingId && (
//                             <button
//                               onClick={() => handleBookingAction(notification.metadata.bookingId, 'review')}
//                               className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
//                             >
//                               View Booking
//                             </button>
//                           )}
                          
//                           {notification.metadata?.clientId && (
//                             <span className="text-sm text-gray-500">
//                               Client: {notification.metadata.clientId}
//                             </span>
//                           )}
//                         </div>
                        
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

// export default AdminNotifications;






import React, { useEffect, useState } from "react";
import { adminNotificationAPI } from "../adminController";
import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  // Fetch admin notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching admin notifications...');
        
        const [notifRes, unreadRes] = await Promise.all([
          adminNotificationAPI.getNotifications(),
          adminNotificationAPI.getUnreadCount()
        ]);

        console.log('📨 Admin Notifications Full Response:', notifRes);
        console.log('🔔 Admin Unread Count Full Response:', unreadRes);

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

        console.log('✅ Processed admin notifications:', notificationsData);
        console.log('✅ Processed admin unread count:', unreadCountData);

        const safeNotifications = Array.isArray(notificationsData) ? notificationsData : [];
        setNotifications(safeNotifications);
        setUnreadCount(Number(unreadCountData) || 0);
        
        if (safeNotifications.length === 0) {
          console.log('ℹ️ No notifications found for admin');
        }
        
      } catch (err) {
        console.error("❌ Error fetching admin notifications:", err);
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

  // Filter notifications - UPDATED WITH FOOD MENU FILTER
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'property') return notification.type && notification.type.includes('property');
    if (filter === 'booking') return notification.type && notification.type.includes('booking');
    if (filter === 'payment') return notification.type && notification.type.includes('payment');
    if (filter === 'vacate') return notification.type && notification.type.includes('vacate');
    if (filter === 'concern') return notification.type && notification.type.includes('concern');
    if (filter === 'food') return notification.type && notification.type.includes('food'); // NEW FOOD FILTER
    return true;
  });

  // Mark one notification as read
  const markAsRead = async (notificationId) => {
    try {
      await adminNotificationAPI.markAsRead(notificationId);
      
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

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await adminNotificationAPI.markAllAsRead();
      
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
      await adminNotificationAPI.deleteNotification(notificationId);
      
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
        adminNotificationAPI.getNotifications(),
        adminNotificationAPI.getUnreadCount()
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

  // Get notification icon based on type - UPDATED WITH FOOD MENU ICONS
  const getNotificationIcon = (type) => {
    if (!type) return '🔔';
    
    const icons = {
      // Property notifications
      property_submitted: '📝',
      property_approved: '✅',
      property_rejected: '❌',
      property_revision_requested: '📋',
      property_deleted: '🗑️',
      
      // Booking notifications
      booking_created: '📋',
      booking_approved: '✅',
      booking_rejected: '❌',
      booking_cancelled: '🚫',
      booking_paid: '💰',
      
      // Payment notifications
      payment_received: '💳',
      payment_failed: '❌',
      payment_refunded: '↩️',
      
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
      
      // Food Menu notifications - NEW
      food_item_added: '🍽️',
      food_item_updated: '✏️',
      food_item_deleted: '🗑️',
      food_price_changed: '💰',
      food_menu_cleared: '📋',
      food_bulk_updated: '📅',
      
      // System notifications
      system_alert: '⚠️',
      reminder: '⏰'
    };
    return icons[type] || '🔔';
  };

  // Get notification background color based on type - UPDATED WITH FOOD MENU COLORS
  const getNotificationColor = (type) => {
    if (!type) return 'border-l-gray-500 bg-gray-50';
    
    const colors = {
      // Property notifications
      property_submitted: 'border-l-blue-500 bg-blue-50',
      property_approved: 'border-l-green-500 bg-green-50',
      property_rejected: 'border-l-red-500 bg-red-50',
      property_revision_requested: 'border-l-orange-500 bg-orange-50',
      property_deleted: 'border-l-gray-500 bg-gray-50',

      // Booking notifications
      booking_created: 'border-l-blue-500 bg-blue-50',
      booking_approved: 'border-l-green-500 bg-green-50',
      booking_rejected: 'border-l-red-500 bg-red-50',
      booking_cancelled: 'border-l-orange-500 bg-orange-50',
      booking_paid: 'border-l-emerald-500 bg-emerald-50',

      // Payment notifications
      payment_received: 'border-l-green-500 bg-green-50',
      payment_failed: 'border-l-red-500 bg-red-50',
      payment_refunded: 'border-l-yellow-500 bg-yellow-50',

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

      // Food Menu notifications - NEW
      food_item_added: 'border-l-amber-500 bg-amber-50',
      food_item_updated: 'border-l-orange-500 bg-orange-50',
      food_item_deleted: 'border-l-rose-500 bg-rose-50',
      food_price_changed: 'border-l-lime-500 bg-lime-50',
      food_menu_cleared: 'border-l-gray-500 bg-gray-50',
      food_bulk_updated: 'border-l-teal-500 bg-teal-50',

      // System notifications
      system_alert: 'border-l-amber-500 bg-amber-50',
      reminder: 'border-l-indigo-500 bg-indigo-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  // Get notification type label - UPDATED WITH FOOD MENU LABELS
  const getNotificationTypeLabel = (type) => {
    if (!type) return 'Notification';
    
    const labels = {
      // Property notifications
      property_submitted: 'Property Submitted',
      property_approved: 'Property Approved',
      property_rejected: 'Property Rejected',
      property_revision_requested: 'Revision Requested',
      property_deleted: 'Property Deleted',

      // Booking notifications
      booking_created: 'New Booking',
      booking_approved: 'Booking Approved',
      booking_rejected: 'Booking Rejected',
      booking_cancelled: 'Booking Cancelled',
      booking_paid: 'Booking Paid',

      // Payment notifications
      payment_received: 'Payment Received',
      payment_failed: 'Payment Failed',
      payment_refunded: 'Payment Refunded',

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

      // Food Menu notifications - NEW
      food_item_added: 'Food Item Added',
      food_item_updated: 'Food Item Updated',
      food_item_deleted: 'Food Item Deleted',
      food_price_changed: 'Price Changed',
      food_menu_cleared: 'Day Menu Cleared',
      food_bulk_updated: 'Weekly Menu Updated',

      // System notifications
      system_alert: 'System Alert',
      reminder: 'Reminder'
    };
    return labels[type] || 'Notification';
  };

  // Handle property action
  const handlePropertyAction = (propertyId, action) => {
    console.log(`🏠 Property ${action} clicked for:`, propertyId);
    window.location.href = `/admin/properties/${propertyId}`;
  };

  // Handle booking action
  const handleBookingAction = (bookingId, action) => {
    console.log(`📅 Booking ${action} clicked for:`, bookingId);
    window.location.href = `/admin/bookings/${bookingId}`;
  };

  // Handle vacate action
  const handleVacateAction = (vacateRequestId, action) => {
    console.log(`🚪 Vacate ${action} clicked for:`, vacateRequestId);
    window.location.href = `/admin/vacate-requests/${vacateRequestId}`;
  };

  // Handle concern action
  const handleConcernAction = (concernId, action) => {
    console.log(`📝 Concern ${action} clicked for:`, concernId);
    window.location.href = `/admin/concerns/${concernId}`;
  };

  // Handle food menu action - NEW
  const handleFoodMenuAction = (propertyId, bookingId) => {
    console.log(`🍽️ View food menu clicked for:`, { propertyId, bookingId });
    window.location.href = `/admin/food-menu?property=${propertyId}${bookingId ? `&booking=${bookingId}` : ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin notifications...</p>
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
    <div className="min-h-screen bg-white p-6  " >
      <div className="max-w-7xl mx-auto overflow-y-auto" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Notifications</h1>
              <p className="text-gray-600">Manage property approvals, bookings, payments, vacate requests, concerns, and food menu changes</p>
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

        {/* Filters - UPDATED WITH FOOD FILTER */}
        {notifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Notifications' },
                { key: 'unread', label: 'Unread' },
                { key: 'property', label: 'Properties' },
                { key: 'booking', label: 'Bookings' },
                { key: 'payment', label: 'Payments' },
                { key: 'vacate', label: 'Vacate Requests' },
                { key: 'concern', label: 'Concerns' },
                { key: 'food', label: 'Food Menu' } // NEW FILTER
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
                ? "You'll see notifications here for property approvals, bookings, payments, vacate requests, concerns, and food menu changes."
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
                          
                          {/* Notification Type Badge - UPDATED WITH FOOD COLORS */}
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
                              : notification.type && notification.type.includes('food')
                              ? 'bg-amber-100 text-amber-800 border-amber-200' // NEW FOOD COLOR
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
                        
                        {/* Action buttons - UPDATED WITH FOOD ACTIONS */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {notification.type === 'property_submitted' && notification.metadata?.propertyId && (
                            <button
                              onClick={() => handlePropertyAction(notification.metadata.propertyId, 'review')}
                              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              Review Property
                            </button>
                          )}
                          
                          {notification.type === 'booking_created' && notification.metadata?.bookingId && (
                            <button
                              onClick={() => handleBookingAction(notification.metadata.bookingId, 'review')}
                              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                            >
                              View Booking
                            </button>
                          )}
                          
                          {notification.type && notification.type.includes('vacate') && notification.metadata?.vacateRequestId && (
                            <button
                              onClick={() => handleVacateAction(notification.metadata.vacateRequestId, 'view')}
                              className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                            >
                              View Vacate Request
                            </button>
                          )}
                          
                          {notification.type && notification.type.includes('concern') && notification.metadata?.concernId && (
                            <button
                              onClick={() => handleConcernAction(notification.metadata.concernId, 'view')}
                              className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                              View Concern
                            </button>
                          )}
                          
                          {notification.type && notification.type.includes('food') && notification.metadata?.propertyId && (
                            <button
                              onClick={() => handleFoodMenuAction(notification.metadata.propertyId, notification.metadata.bookingId)}
                              className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                            >
                              View Food Menu
                            </button>
                          )}
                          
                          {notification.metadata?.clientId && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              Client: {notification.metadata.clientId}
                            </span>
                          )}
                        </div>
                        
                        {/* Food menu change details - NEW */}
                        {notification.type && notification.type.includes('food') && (
                          <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                            <div className="space-y-2 text-sm">
                              {notification.metadata?.foodItemName && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-amber-700">Food Item:</span>
                                  <span className="text-amber-800">{notification.metadata.foodItemName}</span>
                                </div>
                              )}
                              {notification.metadata?.changedByName && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-amber-700">Changed By:</span>
                                  <span className="text-amber-800">{notification.metadata.changedByName}</span>
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
                                  <p className="font-semibold text-amber-700 mb-1">Detailed Changes:</p>
                                  <ul className="text-amber-800 text-xs space-y-1">
                                    {notification.metadata.oldData.name !== notification.metadata.newData.name && (
                                      <li>• <span className="font-medium">Name:</span> "{notification.metadata.oldData.name}" → "{notification.metadata.newData.name}"</li>
                                    )}
                                    {notification.metadata.oldData.price !== notification.metadata.newData.price && (
                                      <li>• <span className="font-medium">Price:</span> ₹{notification.metadata.oldData.price} → ₹{notification.metadata.newData.price}</li>
                                    )}
                                    {notification.metadata.oldData.description !== notification.metadata.newData.description && (
                                      <li>• <span className="font-medium">Description</span> was updated</li>
                                    )}
                                    {notification.metadata.oldData.category !== notification.metadata.newData.category && (
                                      <li>• <span className="font-medium">Category:</span> {notification.metadata.oldData.category} → {notification.metadata.newData.category}</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Payment amount display */}
                        {notification.metadata?.amount && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-semibold text-gray-700">Amount:</span>
                              <span className="text-green-600 font-bold">₹{notification.metadata.amount}</span>
                              {notification.metadata.paymentType && (
                                <span className="text-gray-500">• {notification.metadata.paymentType}</span>
                              )}
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
                        
                        {/* Metadata information - UPDATED WITH FOOD METADATA */}
                        {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
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
                                  <span>Booking ID: {notification.metadata.bookingId.substring(0, 8)}...</span>
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
                              {notification.metadata.changedByName && (
                                <div className="flex items-center gap-2">
                                  <span>👤</span>
                                  <span>Changed By: {notification.metadata.changedByName}</span>
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

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors">
              Load more notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;