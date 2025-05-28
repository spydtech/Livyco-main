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
import axios from "axios";

const menuItems = [
  { name: "Dashboard", icon: HiOutlineViewGrid, path: "/admin/dashboard" },
  { name: "Property Listings", icon: HiUsers, path: "/admin/dashboard/propertylistings" },
  { name: "Manage Users", icon: HiUsers, path: "/admin/dashboard/manageusers" },
  { name: "Financial Reports", icon: BiMoney, path: "/admin/reports" },
  { name: "Support Tickets", icon: BiSupport, path: "/admin/support" },
  { name: "Settings", icon: HiChartPie, path: "/admin/settings" },
  { name: "Sign Out", icon: HiLogout, path: "/admin/admin-login" },
];

const Dashboard = () => {
  const [adminEmail, setAdminEmail] = useState("");
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
        navigate("/admin/login");
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : "";
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
            <FaBell className="text-gray-500 text-lg cursor-pointer" />
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
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
