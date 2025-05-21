import React, { useState } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { BiSort, BiFilter } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const metrics = [
  { label: "Total Listing", value: "1,00,000", change: "+8% from yesterday", color: "bg-purple-100", icon: "📊" },
  { label: "Pending Listings", value: "1,00,000", change: "+8% from yesterday", color: "bg-blue-100", icon: "⏳" },
  { label: "Listings Reviewed Today", value: "1,00,000", change: "+8% from yesterday", color: "bg-yellow-100", icon: "📝" },
  { label: "Approval Rate", value: "1,00,000", change: "+8% from yesterday", color: "bg-green-100", icon: "✅" },
  { label: "Rejected/On hold", value: "1,00,000", change: "+8% from yesterday", color: "bg-red-100", icon: "❌" },
];

// Expanded mock data for pagination demonstration
const allListings = [
  { id: "L1234", owner: "Alice Writing", contact: "36003", email: "natus tempora a...", date: "01/01/2023", status: "Active", role: "User" },
  { id: "L1235", owner: "Bob Smith", contact: "36004", email: "lorem ipsum...", date: "02/01/2023", status: "Active", role: "Owner" },
  { id: "L1236", owner: "Charlie Brown", contact: "36005", email: "dolor sit amet...", date: "03/01/2023", status: "Inactive", role: "User" },
  { id: "L1237", owner: "David Wilson", contact: "36006", property: "consectetur...", date: "04/01/2023", status: "Active", role: "Owner" },
  { id: "L1238", owner: "Eve Johnson", contact: "36007", email: "adipiscing elit...", date: "05/01/2023", status: "Inactive", role: "User" },
  { id: "L1239", owner: "Frank Miller", contact: "36008", email: "sed do eiusmod...", date: "06/01/2023", status: "Active", role: "Owner" },
  { id: "L1240", owner: "Grace Lee", contact: "36009", email: "tempor incididunt...", date: "07/01/2023", status: "Inactive", role: "Owner" },
  { id: "L1241", owner: "Henry Davis", contact: "36010", email: "ut labore...", date: "08/01/2023", status: "Active", role: "Owner" },
  { id: "L1242", owner: "Ivy Wilson", contact: "36011", email: "et dolore...", date: "09/01/2023", status: "Inactive", role: "Owner" },
  { id: "L1243", owner: "Jack Brown", contact: "36012", email: "magna aliqua...", date: "10/01/2023", status: "Active", role: "User" },
  { id: "L1244", owner: "Karen White", contact: "36013", email: "quis nostrud...", date: "11/01/2023", status: "Inactive", role: "User" },
  { id: "L1245", owner: "Leo Garcia", contact: "36014", email: "exercitation...", date: "12/01/2023", status: "Active", role: "User" },
  { id: "L1246", owner: "Mia Martinez", contact: "36015", email: "ullamco laboris...", date: "13/01/2023", status: "Inactive", role: "User" },
  { id: "L1247", owner: "Noah Rodriguez", contact: "36016", email: "nisi ut...", date: "14/01/2023", status: "Active", role: "User" },
  { id: "L1248", owner: "Olivia Lopez", contact: "36017", email: "aliquip ex...", date: "15/01/2023", status: "Inactive", role: "User" },
];

const ITEMS_PER_PAGE = 5;

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-gray-600 bg-gray-200";
    default:
      return "text-gray-600 bg-gray-200";
  }
};

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
   // Function to toggle menu for each row
   const [openDropdown, setOpenDropdown] = useState(null); // Track which row has an open menu

   const navigate = useNavigate(); // For navigation

   const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Filter listings based on search term
  const filteredListings = allListings.filter(listing => 
    listing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedListings.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentListings = sortedListings.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);
      
      if (leftBound > 1) {
        pageNumbers.push(1);
        if (leftBound > 2) pageNumbers.push('...');
      }
      
      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }
      
      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="p-6 bg-wite min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Total Listing</h1>
      
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm ${metric.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <span className="text-2xl">{metric.icon}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by: Listing ID, Owner_name, etc."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          <div className="flex space-x-3">
            <button 
              className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm"
              onClick={() => handleSort('date')}
            >
              <BiSort className="text-gray-500" />
              <span>Sort</span>
            </button>
            <button className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm">
              <BiFilter className="text-gray-500" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr className="border-b">
              <th className="p-4 font-medium">User ID</th>
              <th className="p-4 font-medium">Users Name</th>
              <th className="p-4 font-medium">Contact Number</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Last login</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentListings.length > 0 ? (
              currentListings.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.owner}</td>
                  <td className="p-4">{item.contact}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">{item.role}</td>
                  <td className="p-4 text-right relative">
                  <FaEllipsisV
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={() => toggleDropdown(item.id)}
                  />
                  {openDropdown === item.id && (
                    <div className="absolute text-center right-0 mt-2 w-40 bg-[#AFD1FF] border rounded-lg shadow-lg z-10">
                      <ul className="py-2 text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">Approve</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">Reject</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/dashboard/manageusers/${item.id}`, { state: item })}>View Details</li>
                      </ul>
                    </div>
                  )}
                </td>

                 
                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No listings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedListings.length)} of {sortedListings.length} entries
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Previous
          </button>
          
          {getPageNumbers().map((number, index) => (
            number === '...' ? (
              <span key={index} className="px-4 py-2">...</span>
            ) : (
              <button
                key={index}
                onClick={() => paginate(number)}
                className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            )
          ))}
          
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;