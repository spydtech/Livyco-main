// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { userAPI } from "../../Clients-components/PropertyController";

// const Notifications = () => {
//     const [userId, setUserId] = useState(null);
//     const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserAndNotifications = async () => {
//             try {
//                 const userRes = await userAPI.getUser();
//                 console.log("getUser response:", userRes.data);

//                 const user = userRes.data.user;

//                 if (!user || !user.id) {
//                     console.error("User not found!");
//                     setLoading(false);
//                     return;
//                 }

//                 setUserId(user.id);

//                 const notifRes = await axios.get(`/api/notifications/${user.id}`);
//                 setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching user or notifications", err);
//                 setLoading(false);
//             }
//         };

//         fetchUserAndNotifications();
//     }, []);

//     const markAsRead = async (id) => {
//         try {
//             await axios.patch(`/api/notifications/read/${id}`);
//             setNotifications((prev) =>
//                 prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//             );
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const markAllAsRead = async () => {
//         if (!userId) return;
//         try {
//             await axios.patch(`/api/notifications/read-all/${userId}`);
//             setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     if (loading) return <p className="p-4">Loading...</p>;

//     return (
//         <div className="p-4 w-full h-full overflow-y-auto box-border">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Notifications</h2>
//                 <button
//                     onClick={markAllAsRead}
//                     className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-lg shadow hover:bg-red-600 transition"
//                 >
//                     Clear all <span className="text-lg font-bold">×</span>
//                 </button>
//             </div>

//             {notifications.length === 0 ? (
//                 <p className="text-black">No notifications yet</p>
//             ) : (
//                 <ul className="space-y-2 w-full">
//                     {notifications.map((n) => (
//                         <li
//                             key={n._id}
//                             className={`border p-3 rounded w-full ${n.isRead ? "bg-gray-100" : "bg-white"
//                                 }`}
//                         >
//                             <div className="flex justify-between items-center">
//                                 <p className="text-sm break-words">{n.message}</p>
//                                 {!n.isRead && (
//                                     <button
//                                         onClick={() => markAsRead(n._id)}
//                                         className="text-blue-500 text-xs"
//                                     >
//                                         Mark as read
//                                     </button>
//                                 )}
//                             </div>
//                             <small className="text-gray-400 text-xs">
//                                 {new Date(n.createdAt).toLocaleString()}
//                             </small>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );

// };

// export default Notifications;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";
// import { userAPI } from "../../Clients-components/PropertyController";

// // use environment variable if available, otherwise fall back to localhost:5000
// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// const Notifications = () => {
//   const [userId, setUserId] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch user and their notifications
//   useEffect(() => {
//     const fetchUserAndNotifications = async () => {
//       try {
//         const userRes = await userAPI.getUser();
//         console.log("getUser response:", userRes.data);

//         const user = userRes.data.user;
//         if (!user || !user.id) {
//           console.error("User not found!");
//           setLoading(false);
//           return;
//         }

//         setUserId(user.id);

//         // ✅ use full backend URL or rely on proxy
//         const notifRes = await axios.get(
//           `${API_BASE}/api/notifications/${user.id}`
//         );

//         setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching user or notifications", err);
//         setLoading(false);
//       }
//     };

//     fetchUserAndNotifications();
//   }, []);

//   // mark one notification as read
//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/notifications/read/${id}`);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (err) {
//       console.error("Error marking notification as read", err);
//     }
//   };

//   // mark all notifications as read
//   const markAllAsRead = async () => {
//     if (!userId) return;
//     try {
//       await axios.patch(`${API_BASE}/api/notifications/read-all/${userId}`);
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (err) {
//       console.error("Error marking all notifications as read", err);
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-4 w-full h-full overflow-y-auto box-border">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl text-black font-semibold">Notifications</h2>
//         <button
//           onClick={markAllAsRead}
//           className="flex items-center gap-2 px-3 py-1 text-black text-base font-medium rounded-lg transition"
//         >
//           Clear all <span className="text-lg font-bold">×</span>
//         </button>
//       </div>

//       {notifications.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-20">
//           <img
//             src={notifyImg}
//             alt="No Notifications"
//             className="w-48 h-48 mb-4"
//           />

//         <p className="text-black">No notifications yet</p>
//         </div>
//       ) : (
//         <ul className="space-y-2 w-full">
//           {notifications.map((n) => (
//             <li
//               key={n._id}
//               className={`border p-3 rounded w-full ${
//                 n.isRead ? "bg-gray-100" : "bg-white"
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <p className="text-sm break-words">{n.message}</p>
//                 {!n.isRead && (
//                   <button
//                     onClick={() => markAsRead(n._id)}
//                     className="text-blue-500 text-xs"
//                   >
//                     Mark as read
//                   </button>
//                 )}
//               </div>
//               <small className="text-gray-400 text-xs">
//                 {new Date(n.createdAt).toLocaleString()}
//               </small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Notifications;



// import React, { useEffect, useState } from "react";
// import { notificationAPI } from "../../Clients-components/PropertyController";

// import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

// const UserNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Fetch user notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
        
//         // Get notifications and unread count in parallel
//         const [notifRes, unreadRes] = await Promise.all([
//           notificationAPI.getNotifications(),
//           notificationAPI.getUnreadCount()
//         ]);

//         setNotifications(notifRes.data.notifications || []);
//         setUnreadCount(unreadRes.data.unreadCount || 0);
        
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//         setNotifications([]);
//         setUnreadCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

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

//   // Mark all notifications as read
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
      
//       // Update unread count if the notification was unread
//       if (notification && !notification.isRead) {
//         setUnreadCount(prev => Math.max(0, prev - 1));
//       }
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) {
//       return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//     } else if (diffDays === 1) {
//       return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//     } else if (diffDays < 7) {
//       return `${diffDays} days ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   // Get notification icon based on type
//   const getNotificationIcon = (type) => {
//     const icons = {
//       booking_created: '📋',
//       booking_approved: '✅',
//       booking_rejected: '❌',
//       booking_cancelled: '🚫',
//       payment_received: '💰',
//       payment_failed: '💳',
//       tenant_added: '👤',
//       property_updated: '🏠',
//       system_alert: '⚠️',
//       reminder: '⏰'
//     };
//     return icons[type] || '🔔';
//   };

//   // Get notification background color based on type
//   const getNotificationColor = (type) => {
//     const colors = {
//       booking_created: 'border-l-blue-500',
//       booking_approved: 'border-l-green-500',
//       booking_rejected: 'border-l-red-500',
//       booking_cancelled: 'border-l-orange-500',
//       payment_received: 'border-l-emerald-500',
//       payment_failed: 'border-l-rose-500',
//       tenant_added: 'border-l-purple-500',
//       property_updated: 'border-l-cyan-500',
//       system_alert: 'border-l-amber-500',
//       reminder: 'border-l-indigo-500'
//     };
//     return colors[type] || 'border-l-gray-500';
//   };

//   if (loading) {
//     return (
//       <div className="p-4 flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 w-full h-full overflow-y-auto box-border bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
//             {unreadCount > 0 && (
//               <p className="text-sm text-gray-600 mt-1">
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
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Notifications List */}
//         {notifications.length === 0 ? (
//           <div className="flex flex-col items-center justify-center mt-20 p-8 bg-white rounded-lg shadow-sm">
//             <img
//               src={notifyImg}
//               alt="No Notifications"
//               className="w-48 h-48 mb-6 opacity-60"
//             />
//             <p className="text-gray-500 text-lg font-medium mb-2">No notifications yet</p>
//             <p className="text-gray-400 text-sm text-center max-w-md">
//               We'll notify you when you have new bookings, payment updates, or important announcements.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {notifications.map((notification) => (
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
                          
//                           {!notification.isRead && (
//                             <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
//                           )}
//                         </div>
                        
//                         <p className="text-gray-600 text-sm mb-2 leading-relaxed">
//                           {notification.message}
//                         </p>
                        
//                         {/* Property Info */}
//                         {notification.propertyId && (
//                           <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
//                             <span>🏠</span>
//                             <span>{notification.propertyId.name}</span>
//                             {notification.propertyId.locality && (
//                               <span>• {notification.propertyId.locality}</span>
//                             )}
//                           </div>
//                         )}
                        
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

//         {/* Load More Button (if pagination is implemented) */}
//         {notifications.length > 0 && (
//           <div className="mt-6 text-center">
//             <button className="text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors">
//               Load more notifications
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserNotifications;

import React, { useEffect, useState } from "react";
import { notificationAPI } from "../../Clients-components/PropertyController";
import notifyImg from "../../assets/notification/undraw_my-notifications_fy5v.png";

const UserNotifications = ({ onFilterClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  // Fetch user notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching user notifications...');
        
        const [notifRes, unreadRes] = await Promise.all([
          notificationAPI.getNotifications(),
          notificationAPI.getUnreadCount()
        ]);

        console.log('📨 User Notifications Full Response:', notifRes);
        console.log('🔔 User Unread Count Full Response:', unreadRes);

        let notificationsData = [];
        let unreadCountData = 0;

        // Handle notifications response
        if (notifRes.success) {
          notificationsData = notifRes.data?.notifications || [];
        } else {
          notificationsData = notifRes.notifications || notifRes.data?.notifications || [];
        }

        // Handle unread count response
        if (unreadRes.success) {
          unreadCountData = unreadRes.data?.unreadCount || 0;
        } else {
          unreadCountData = unreadRes.unreadCount || unreadRes.data?.unreadCount || 0;
        }

        console.log('✅ Processed user notifications:', notificationsData);
        console.log('✅ Processed user unread count:', unreadCountData);

        const safeNotifications = Array.isArray(notificationsData) ? notificationsData : [];
        setNotifications(safeNotifications);
        setUnreadCount(Number(unreadCountData) || 0);
        
        if (safeNotifications.length === 0) {
          console.log('ℹ️ No notifications found for user');
        }
        
      } catch (err) {
        console.error("❌ Error fetching user notifications:", err);
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
    if (filter === 'booking') return notification.type && notification.type.includes('booking');
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

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    if (!type) return '🔔';
    
    const icons = {
      booking_created: '📋',
      booking_approved: '✅',
      booking_rejected: '❌',
      booking_cancelled: '🚫',
      booking_paid: '💰',
      payment_received: '💳',
      payment_failed: '❌',
      payment_refunded: '↩️',
      system_alert: '⚠️',
      reminder: '⏰'
    };
    return icons[type] || '🔔';
  };

  // Get notification background color based on type
  const getNotificationColor = (type) => {
    if (!type) return 'border-l-gray-500 bg-gray-50';
    
    const colors = {
      booking_created: 'border-l-blue-500 bg-blue-50',
      booking_approved: 'border-l-green-500 bg-green-50',
      booking_rejected: 'border-l-red-500 bg-red-50',
      booking_cancelled: 'border-l-orange-500 bg-orange-50',
      booking_paid: 'border-l-emerald-500 bg-emerald-50',
      payment_received: 'border-l-green-500 bg-green-50',
      payment_failed: 'border-l-red-500 bg-red-50',
      payment_refunded: 'border-l-yellow-500 bg-yellow-50',
      system_alert: 'border-l-amber-500 bg-amber-50',
      reminder: 'border-l-indigo-500 bg-indigo-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  // Get notification type label
  const getNotificationTypeLabel = (type) => {
    if (!type) return 'Notification';
    
    const labels = {
      booking_created: 'Booking Submitted',
      booking_approved: 'Booking Approved',
      booking_rejected: 'Booking Rejected',
      booking_cancelled: 'Booking Cancelled',
      booking_paid: 'Booking Confirmed',
      payment_received: 'Payment Received',
      payment_failed: 'Payment Failed',
      payment_refunded: 'Payment Refunded',
      system_alert: 'System Alert',
      reminder: 'Reminder'
    };
    return labels[type] || 'Notification';
  };

  // Handle booking action
  const handleBookingAction = (bookingId) => {
    console.log('📅 View booking clicked:', bookingId);
    window.location.href = `/user/bookings/${bookingId}`;
  };

  // Handle filter change - FIXED: Stop event propagation
  const handleFilterChange = (filterKey, event) => {
    // Stop the event from bubbling up to parent elements
    if (event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    
    setFilter(filterKey);
    if (onFilterClick) {
      onFilterClick();
    }
  };

  // Handle button clicks inside notifications - FIXED
  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
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
    <div className="flex-1 bg-gray-50">
      <div className="p-4">
        {/* Header Stats */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 text-sm">Stay updated with your activity</p>
              {unreadCount > 0 && (
                <p className="text-blue-600 font-medium mt-1 text-sm">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => {
                  handleButtonClick(e);
                  refreshNotifications();
                }}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              
              {notifications.length > 0 && unreadCount > 0 && (
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    markAllAsRead();
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark all read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters - FIXED: Added event parameter and stopPropagation */}
        {notifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-3 mb-4">
            <div className="flex flex-wrap gap-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread' },
                { key: 'booking', label: 'Bookings' },
                { key: 'payment', label: 'Payments' }
              ].map((filterType) => (
                <button
                  key={filterType.key}
                  onClick={(e) => handleFilterChange(filterType.key, e)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filter === filterType.key 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{filterType.label}</span>
                  {filterType.key === 'unread' && unreadCount > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full min-w-5 ${
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
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <img
              src={notifyImg}
              alt="No Notifications"
              className="w-32 h-32 mx-auto mb-4 opacity-60"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </h3>
            <p className="text-gray-600 text-sm max-w-xs mx-auto">
              {filter === 'all' 
                ? "You'll see notifications here for booking updates and payment confirmations."
                : `No ${filter} notifications found.`
              }
            </p>
            <button
              onClick={(e) => {
                handleButtonClick(e);
                refreshNotifications();
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-lg shadow-sm border-l-4 ${getNotificationColor(notification.type)} ${
                  notification.isRead ? 'opacity-75' : 'shadow-md'
                } transition-all duration-200 hover:shadow-lg`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`text-xl mt-0.5 ${
                        notification.isRead ? 'text-gray-400' : 'text-blue-500'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <h3 className={`font-semibold text-sm ${
                            notification.isRead ? 'text-gray-600' : 'text-gray-900'
                          }`}>
                            {notification.title || 'Notification'}
                          </h3>
                          
                          {/* Notification Type Badge */}
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                            notification.type && notification.type.includes('booking') 
                              ? 'bg-blue-100 text-blue-800 border-blue-200' 
                              : notification.type && notification.type.includes('payment')
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {getNotificationTypeLabel(notification.type)}
                          </span>
                          
                          {!notification.isRead && (
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          )}
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          {notification.message || 'No message content'}
                        </p>
                        
                        {/* Action buttons for bookings */}
                        {notification.type && notification.type.includes('booking') && notification.metadata?.bookingId && (
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <button
                              onClick={(e) => {
                                handleButtonClick(e);
                                handleBookingAction(notification.metadata.bookingId);
                              }}
                              className="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              View Booking
                            </button>
                          </div>
                        )}

                        {/* Payment amount display */}
                        {notification.metadata?.amount && (
                          <div className="bg-gray-50 rounded p-2 mb-3">
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="font-semibold text-gray-700">Amount:</span>
                              <span className="text-green-600 font-bold">₹{notification.metadata.amount}</span>
                              {notification.metadata.paymentType && (
                                <span className="text-gray-500">• {notification.metadata.paymentType}</span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Metadata information */}
                        {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                          <div className="bg-gray-50 rounded p-2 mb-3">
                            <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-600">
                              {notification.metadata.propertyName && (
                                <div className="flex items-center gap-1.5">
                                  <span>🏠</span>
                                  <span className="font-medium">{notification.metadata.propertyName}</span>
                                </div>
                              )}
                              {notification.metadata.bookingId && (
                                <div className="flex items-center gap-1.5">
                                  <span>📅</span>
                                  <span>Booking: {notification.metadata.bookingId}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  handleButtonClick(e);
                                  markAsRead(notification._id);
                                }}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Read
                              </button>
                            )}
                            
                            <button
                              onClick={(e) => {
                                handleButtonClick(e);
                                deleteNotification(notification._id);
                              }}
                              className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded hover:bg-red-100 transition-colors"
                              title="Delete notification"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="mt-6 text-center">
            <button 
              onClick={handleButtonClick}
              className="text-blue-500 text-xs font-medium hover:text-blue-700 transition-colors"
            >
              Load more notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotifications;