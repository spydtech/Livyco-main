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


import React, { useEffect, useState } from "react";
import axios from "axios";
import { userAPI } from "../../Clients-components/PropertyController";

// use environment variable if available, otherwise fall back to localhost:5000
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Notifications = () => {
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch user and their notifications
  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      try {
        const userRes = await userAPI.getUser();
        console.log("getUser response:", userRes.data);

        const user = userRes.data.user;
        if (!user || !user.id) {
          console.error("User not found!");
          setLoading(false);
          return;
        }

        setUserId(user.id);

        // ✅ use full backend URL or rely on proxy
        const notifRes = await axios.get(
          `${API_BASE}/api/notifications/${user.id}`
        );

        setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user or notifications", err);
        setLoading(false);
      }
    };

    fetchUserAndNotifications();
  }, []);

  // mark one notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_BASE}/api/notifications/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };

  // mark all notifications as read
  const markAllAsRead = async () => {
    if (!userId) return;
    try {
      await axios.patch(`${API_BASE}/api/notifications/read-all/${userId}`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Error marking all notifications as read", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 w-full h-full overflow-y-auto box-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-black font-semibold">Notifications</h2>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-3 py-1 text-black text-base font-medium rounded-lg transition"
        >
          Clear all <span className="text-lg font-bold">×</span>
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-black">No notifications yet</p>
      ) : (
        <ul className="space-y-2 w-full">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`border p-3 rounded w-full ${
                n.isRead ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm break-words">{n.message}</p>
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="text-blue-500 text-xs"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <small className="text-gray-400 text-xs">
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

