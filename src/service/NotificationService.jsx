import React, { useEffect, useState } from "react";
import { userAPI } from "../../services/userAPI";
import UserNotifications from "./UserNotifications";
import ClientNotifications from "./ClientNotifications";

const NotificationService = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRes = await userAPI.getUser();
        const user = userRes.data.user;
        
        if (user && user.role) {
          setUserRole(user.role);
        } else {
          console.error("User role not found");
          setUserRole('user'); // Default fallback
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setUserRole('user'); // Default fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render appropriate notifications component based on user role
  return userRole === 'client' ? <ClientNotifications /> : <Notifications />;
};

export default NotificationService;