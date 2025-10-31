import React, { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV, FaUsers, FaCheckCircle, FaUserPlus, FaHome, FaBan } from "react-icons/fa";
import { BiSort, BiFilter } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminUserAPI } from "../adminController"; 


const ITEMS_PER_PAGE = 5;

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-gray-600 bg-gray-200";
    case "suspended":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-200";
  }
};

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
       const response = await adminUserAPI.getAllUsers();


        if (response.data.success) {
          setUsers(response.data.users || []);
        } else {
          setError(response.data.message || "Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || "An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => !u.status || u.status?.toLowerCase() === "active").length;
    const newUsersToday = users.filter((u) => {
      const createdAt = new Date(u.createdAt);
      const today = new Date();
      return (
        createdAt.getDate() === today.getDate() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()
      );
    }).length;
    const tenantUsers = users.filter((u) => u.role?.toLowerCase() === "client").length;
    const suspendedUsers = users.filter((u) => u.status?.toLowerCase() === "suspended").length;

    setMetrics([
      { label: "Total Users", value: totalUsers, color: "bg-purple-100", icon: <FaUsers className="text-xl text-gray-700" /> },
      { label: "Active Users", value: activeUsers, color: "bg-blue-100", icon: <FaCheckCircle className="text-xl text-gray-700" /> },
      { label: "New Users Today", value: newUsersToday, color: "bg-yellow-100", icon: <FaUserPlus className="text-xl text-gray-700" /> },
      { label: "Tenants", value: tenantUsers, color: "bg-green-100", icon: <FaHome className="text-xl text-gray-700" /> },
      { label: "Suspended Users", value: suspendedUsers, color: "bg-red-100", icon: <FaBan className="text-xl text-gray-700" /> },
    ]);
  }, [users]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const matchesRole = roleFilter === "all" ? true : user.role?.toLowerCase() === roleFilter;
    const matchesSearch =
      user._id?.toLowerCase().includes(term) ||
      user.name?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.location?.toLowerCase().includes(term) ||
      user.clientId?.toLowerCase().includes(term);

    return matchesRole && matchesSearch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);
      if (leftBound > 1) {
        pageNumbers.push(1);
        if (leftBound > 2) pageNumbers.push("...");
      }
      for (let i = leftBound; i <= rightBound; i++) pageNumbers.push(i);
      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  if (loading) return <div className="p-6 text-center">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="relative p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <div key={i} className={`p-4 rounded-lg shadow-sm ${metric.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <span>{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, Name, Phone, Email, Location"
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex space-x-3 relative">
          <button
            className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
            onClick={() => handleSort("createdAt")}
          >
            <BiSort className="text-gray-500" />
            <span>Sort</span>
          </button>

          <button
            className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
            onClick={() => setFilterMenuOpen((prev) => !prev)}
          >
            <BiFilter className="text-gray-500" />
            <span>Filter</span>
          </button>

          {filterMenuOpen && (
            <div className="absolute right-0 mt-12 bg-white border rounded-lg shadow-lg w-48 z-20 p-3">
              <div>
                <p className="text-gray-700 font-medium mb-1 text-sm">Role</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {["all", "client", "user"].map((role) => (
                    <li
                      key={role}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer rounded"
                      onClick={() => {
                        setRoleFilter(role);
                        setFilterMenuOpen(false);
                      }}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr className="border-b">
              <th className="p-4 font-medium">User ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.clientId || "N/A"}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.location}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status || "active"}
                    </span>
                  </td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4 text-right relative">
                    <FaEllipsisV
                      className="text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={() => toggleDropdown(user._id)}
                    />
                    {openDropdown === user._id && (
                      <div className="absolute right-0 mt-2 w-40 bg-[#AFD1FF] border rounded-lg shadow-md z-10">
                        <ul className="py-1 text-gray-700 text-sm">
                         
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              navigate(`/admin/dashboard/manageusers/${user._id}`, { state: user });
                              setOpenDropdown(null);
                            }}
                          >
                            View Details
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedUsers.length)} of {sortedUsers.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {getPageNumbers().map((num, i) =>
            num === "..." ? (
              <span key={i} className="px-4 py-2">...</span>
            ) : (
              <button
                key={i}
                onClick={() => paginate(num)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === num ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            )
          )}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
