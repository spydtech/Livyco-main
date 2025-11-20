import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { HiOutlineViewGrid, HiUsers, HiChartPie, HiLogout } from "react-icons/hi";
import { BiMoney, BiSupport } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardPage from "./DashboardPage";
import PropertyListings from "../PropertyListings/PropertyListings";
import PropertyDetails from "../PropertyListings/PropertyDetails";
import ManageUsers from "../Manage Users/ManageUsers";
import UserDetails from "../Manage Users/UserDetails";
import RoleActivityForm from "../FinancialReport/FinancialReport";
import Tabs from "../AdminSettings/Tabs";
import Bookings from "../BookingDetails/Bookings";
import SupportDashboard from "../SupportTickets/AdminSupportdashboard";
import CustomReviewsPage from "../CustomReviews/CustomReviewsPage";
import { adminNotificationAPI } from "../adminController";

import axios from "axios";
import AdminNotifications from "../adminNotification/AdminNotifications";

const menuItems = [
  { name: "Dashboard", icon: HiOutlineViewGrid, path: "/admin/dashboard" },
  { name: "Property Listings", icon: HiUsers, path: "/admin/dashboard/propertylistings" },
  { name: "Manage Users", icon: HiUsers, path: "/admin/dashboard/manageusers" },
  { name: "Custom Reviews", icon: HiUsers, path: "/admin/dashboard/reviews" },
  { name:"Bookings", icon: HiUsers, path: "/admin/dashboard/bookings" },
  { name: "Financial Reports", icon: BiMoney, path: "/admin/dashboard/finacialReport" },
  { name: "Support Tickets", icon: BiSupport, path: "/admin/dashboard/support" },
  { name: "Settings", icon: HiChartPie, path: "/admin/dashboard/settings" },
  { name: "Sign Out", icon: HiLogout, path: "/admin/admin-login" },
];

const Dashboard = () => {
  const [adminEmail, setAdminEmail] = useState("");
   const [showNotifications, setShowNotifications] = useState(false);
   const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.admin) {
          setAdminEmail(res.data.admin.email);
        }
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
        navigate("/admin/admin-login");
      }
    };

    fetchAdminProfile();
  }, [navigate]);
// Fetch unread count for the bell icon badge
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
       

        const response = await adminNotificationAPI.getUnreadCount();

        if (response.data.success) {
          setUnreadCount(response.data.unreadCount);
        }
      } catch (error) {
        console.error("Failed to fetch unread count:", error);
      }
    };

    fetchUnreadCount();
    
    // Refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : "";
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleUnreadCountUpdate = (count) => {
    setUnreadCount(count);
  };
  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-[#AFD1FF] p-6 text-white ">
        {/* <h2 className="text-xl font-bold mb-8">Admin Panel</h2> */}
        <nav className="space-y-4 mt-20">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-[#144FB6]" :""
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-[#AFD1FF] p-4 shadow ">
          <div className="relative w-96">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative notification-container">
              <button
                onClick={handleBellClick}
                className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaBell className="text-lg" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-auto overflow-auto">
                  <AdminNotifications 
                    onClose={() => setShowNotifications(false)}
                    onUnreadCountUpdate={handleUnreadCountUpdate}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg cursor-pointer">
              <div className="text-gray-500 text-2xl rounded-full bg-white w-10 h-10 flex items-center justify-center">
               <span>{getInitial(adminEmail)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Inside Dashboard */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="propertylistings" element={<PropertyListings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/manageusers/:id" element={<UserDetails />} />
          <Route path="/finacialReport" element={<RoleActivityForm />} />
          <Route path="/reviews" element={<CustomReviewsPage />} />
          <Route path="/settings" element={<Tabs />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/support" element={<SupportDashboard/>} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
