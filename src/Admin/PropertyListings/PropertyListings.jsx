// import React, { useState, useEffect  } from "react";
// import { FaSearch, FaEllipsisV } from "react-icons/fa";
// import { BiSort, BiFilter } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import { propertyAPI } from "../../Clients-components/PropertyController";


// const metrics = [
//   { label: "Total Listing", value: "1,00,000", change: "+8% from yesterday", color: "bg-purple-100", icon: "📊" },
//   { label: "Pending Listings", value: "1,00,000", change: "+8% from yesterday", color: "bg-blue-100", icon: "⏳" },
//   { label: "Listings Reviewed Today", value: "1,00,000", change: "+8% from yesterday", color: "bg-yellow-100", icon: "📝" },
//   { label: "Approval Rate", value: "1,00,000", change: "+8% from yesterday", color: "bg-green-100", icon: "✅" },
//   { label: "Rejected/On hold", value: "1,00,000", change: "+8% from yesterday", color: "bg-red-100", icon: "❌" },
// ];

// // Expanded mock data for pagination demonstration
// // const allListings = [
// //   { id: "L1234", owner: "Alice Writing", contact: "36003", property: "natus tempora a...", date: "01/01/2023", status: "Active", location: "Hyderabad" },
// //   { id: "L1235", owner: "Bob Smith", contact: "36004", property: "lorem ipsum...", date: "02/01/2023", status: "Active", location: "Bangalore" },
// //   // { id: "L1236", owner: "Charlie Brown", contact: "36005", property: "dolor sit amet...", date: "03/01/2023", status: "Inactive", location: "Mumbai" },
// //   // { id: "L1237", owner: "David Wilson", contact: "36006", property: "consectetur...", date: "04/01/2023", status: "Active", location: "Delhi" },
// //   // { id: "L1238", owner: "Eve Johnson", contact: "36007", property: "adipiscing elit...", date: "05/01/2023", status: "Inactive", location: "Chennai" },
// //   // { id: "L1239", owner: "Frank Miller", contact: "36008", property: "sed do eiusmod...", date: "06/01/2023", status: "Active", location: "Kolkata" },
// //   // { id: "L1240", owner: "Grace Lee", contact: "36009", property: "tempor incididunt...", date: "07/01/2023", status: "Inactive", location: "Pune" },
// //   // { id: "L1241", owner: "Henry Davis", contact: "36010", property: "ut labore...", date: "08/01/2023", status: "Active", location: "Ahmedabad" },
// //   // { id: "L1242", owner: "Ivy Wilson", contact: "36011", property: "et dolore...", date: "09/01/2023", status: "Inactive", location: "Jaipur" },
// //   // { id: "L1243", owner: "Jack Brown", contact: "36012", property: "magna aliqua...", date: "10/01/2023", status: "Active", location: "Surat" },
// //   // { id: "L1244", owner: "Karen White", contact: "36013", property: "quis nostrud...", date: "11/01/2023", status: "Inactive", location: "Lucknow" },
// //   // { id: "L1245", owner: "Leo Garcia", contact: "36014", property: "exercitation...", date: "12/01/2023", status: "Active", location: "Kanpur" },
// //   // { id: "L1246", owner: "Mia Martinez", contact: "36015", property: "ullamco laboris...", date: "13/01/2023", status: "Inactive", location: "Nagpur" },
// //   // { id: "L1247", owner: "Noah Rodriguez", contact: "36016", property: "nisi ut...", date: "14/01/2023", status: "Active", location: "Indore" },
// //   // { id: "L1248", owner: "Olivia Lopez", contact: "36017", property: "aliquip ex...", date: "15/01/2023", status: "Inactive", location: "Thane" },
// // ];

// const ITEMS_PER_PAGE = 5;

// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case "active":
//       return "text-green-600 bg-green-100";
//     case "inactive":
//       return "text-gray-600 bg-gray-200";
//     default:
//       return "text-gray-600 bg-gray-200";
//   }
// };

// const PropertyListings = () => {
//   const [searchTerm, setSearchTerm] = useState("");
// //   const [isOpen, setIsOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//    // Function to toggle menu for each row
//    const [openDropdown, setOpenDropdown] = useState(null); // Track which row has an open menu
//   const [allListings, setAllListings] = useState([]); // State to hold all listings

//   // Fetch all listings from the API
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await propertyAPI.getCompletePropertyData();
//         if (response?.data?.success) {
//           // Assuming the API returns an array of listings
//           allListings.push(...response.data.listings); // Append fetched listings to the mock data
//         } else {
//           console.error("Failed to fetch listings:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching listings:", error);
//       }
//     };
//     fetchListings();
//   }, []);

//     useEffect(() => {
//      const handleClickOutside = (event) => {
//        if (!event.target.closest(".dropdown-parent")) {
//          setOpenDropdown(null);
//        }
//      };
//      document.addEventListener("mousedown", handleClickOutside);
//      return () => {
//        document.removeEventListener("mousedown", handleClickOutside);
//      };
//    }, []);

//    const navigate = useNavigate(); // For navigation

//    const toggleDropdown = (id) => {
//     setOpenDropdown((prev) => (prev === id ? null : id));
//   };

//   // Filter listings based on search term
//   const filteredListings = allListings.filter(listing => 
//     listing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     listing.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     listing.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     listing.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Sort listings
//   const sortedListings = [...filteredListings].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(sortedListings.length / ITEMS_PER_PAGE);
//   const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentListings = sortedListings.slice(indexOfFirstItem, indexOfLastItem);

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

//   // Generate page numbers with ellipsis
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       const leftBound = Math.max(1, currentPage - 2);
//       const rightBound = Math.min(totalPages, currentPage + 2);
      
//       if (leftBound > 1) {
//         pageNumbers.push(1);
//         if (leftBound > 2) pageNumbers.push('...');
//       }
      
//       for (let i = leftBound; i <= rightBound; i++) {
//         pageNumbers.push(i);
//       }
      
//       if (rightBound < totalPages) {
//         if (rightBound < totalPages - 1) pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Total Listing</h1>
      
//       {/* Key Metrics Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//         {metrics.map((metric, index) => (
//           <div key={index} className={`p-4 rounded-lg shadow-sm ${metric.color}`}>
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-600">{metric.label}</p>
//                 <p className="text-2xl font-bold mt-1">{metric.value}</p>
//               </div>
//               <span className="text-2xl">{metric.icon}</span>
//             </div>
//             <p className="text-xs text-gray-600 mt-2">{metric.change}</p>
//           </div>
//         ))}
//       </div>

//       {/* Search and Filters */}
//       <div className="mb-6">
//         <div className="flex justify-between items-center">
//           <div className="relative w-64">
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by: Listing ID, Owner_name, etc."
//               className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1); // Reset to first page on search
//               }}
//             />
//           </div>
//           <div className="flex space-x-3">
//             <button 
//               className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm"
//               onClick={() => handleSort('date')}
//             >
//               <BiSort className="text-gray-500" />
//               <span>Sort</span>
//             </button>
//             <button className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm">
//               <BiFilter className="text-gray-500" />
//               <span>Filters</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Data Table */}
//       <div className="relative bg-white rounded-lg shadow-sm overflow-hidden border">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-600 text-sm">
//             <tr className="border-b">
//               <th className="p-4 font-medium">Listing ID</th>
//               <th className="p-4 font-medium">Owner Name</th>
//               <th className="p-4 font-medium">Contact Number</th>
//               <th className="p-4 font-medium">Property Name</th>
//               <th className="p-4 font-medium">Submission Date</th>
//               <th className="p-4 font-medium">Status</th>
//               <th className="p-4 font-medium">Location</th>
//               <th className="p-4"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentListings.length > 0 ? (
//               currentListings.map((item, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="p-4">{item.id}</td>
//                   <td className="p-4">{item.owner}</td>
//                   <td className="p-4">{item.contact}</td>
//                   <td className="p-4">{item.property}</td>
//                   <td className="p-4">{item.date}</td>
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="p-4">{item.location}</td>
//                   <td className="p-4 text-right relative">
//                   <FaEllipsisV
//                     className="text-gray-400 cursor-pointer hover:text-gray-600"
//                     onClick={() => toggleDropdown(item.id)}
//                   />
//                   {openDropdown === item.id && (
//                     <div className="absolute dropdown-parent text-center  justify-center items-center right-0 -mt-10 w-40 bg-[#AFD1FF] border rounded-lg shadow-lg overflow-y-auto z-10">
//                       <ul className="py-2 text-gray-700">
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">Approve</li>
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">Reject</li>
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/dashboard/property/${item.id}`)}>View Details</li>
//                       </ul>
//                     </div>
//                   )}
//                 </td>

                 
//                 </tr>

//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="p-4 text-center text-gray-500">
//                   No listings found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
      

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-6">
//         <div className="text-sm text-gray-600">
//           Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedListings.length)} of {sortedListings.length} entries
//         </div>
//         <div className="flex space-x-2">
//           <button 
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//           >
//             Previous
//           </button>
          
//           {getPageNumbers().map((number, index) => (
//             number === '...' ? (
//               <span key={index} className="px-4 py-2">...</span>
//             ) : (
//               <button
//                 key={index}
//                 onClick={() => paginate(number)}
//                 className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//               >
//                 {number}
//               </button>
//             )
//           ))}
          
//           <button 
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyListings;



import React, { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { BiSort, BiFilter } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { propertyAPI } from "../../Clients-components/PropertyController";
import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

const metrics = [
  { label: "Total Listing", value: "1,00,000", change: "+8% from yesterday", color: "bg-purple-100", icon: "📊" },
  { label: "Pending Listings", value: "1,00,000", change: "+8% from yesterday", color: "bg-blue-100", icon: "⏳" },
  { label: "Listings Reviewed Today", value: "1,00,000", change: "+8% from yesterday", color: "bg-yellow-100", icon: "📝" },
  { label: "Approval Rate", value: "1,00,000", change: "+8% from yesterday", color: "bg-green-100", icon: "✅" },
  { label: "Rejected/On hold", value: "1,00,000", change: "+8% from yesterday", color: "bg-red-100", icon: "❌" },
];

const ITEMS_PER_PAGE = 5;

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "approved":
      return "text-green-600 bg-green-100";
    case "inactive":
    case "rejected":
      return "text-red-600 bg-red-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "revision_requested":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-gray-600 bg-gray-200";
  }
};

const PropertyListings = () => {
   const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();


  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_BASE_URL}/api/auth/users`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.data.success) {
            setUsers(response.data.users || []);
            console.log("Fetched users:", response.data.users);
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

  // Transform API data to match frontend expectations
 // Enhanced transform function with proper fallbacks
  const transformListingData = (propertyData) => {
    if (!propertyData?.property) return null;

     const ownerUser = users.find(u => u.clientId === propertyData.property.clientId);
     console.log("User data:", ownerUser);
    
    return {
      id: propertyData.property._id || '',
      clientId: propertyData.property.clientId || '',
      name: ownerUser ?.name || propertyData.property.owner || "N/A",
      phone: ownerUser ?.phone || propertyData.property.contact || "N/A",
      property: propertyData.property.name || '',
      date: propertyData.property.createdAt 
        ? new Date(propertyData.property.createdAt).toLocaleDateString() 
        : "N/A",
      status: propertyData.property.status || "active",
      location: propertyData.property.city || '',
      // Handle location object safely
      coordinates: propertyData.property.location?.coordinates || [],

      
    };
  };

  // Fetch all listings from the API
  useEffect(() => {
    const fetchAdminListings = async () => {
      // Only proceed if users data is loaded or if there was an error loading users.
      // This prevents trying to transform properties with an empty `users` array.
      if (users.length === 0 && !error) { // If users are still loading and no error, wait
          return;
      }

      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        // *** IMPORTANT: Use propertyAPI.getAllPropertiesForAdmin() for admin view ***
        const response = await propertyAPI.getAllClientProperties();

        // Check if the API call was successful and data.data is an array
        if (response?.data?.success && Array.isArray(response.data.data)) {
          // Map each raw property object to the desired table format
          const transformedListings = response.data.data
            .map(item => transformListingData(item))
            .filter(item => item !== null); // Remove any items that failed transformation

          setAllListings(transformedListings);
        } else {
          // Handle cases where response indicates failure or unexpected data format
          setError(response?.data?.message || "Invalid data format or failed to fetch listings from API.");
          setAllListings([]); // Clear listings on unexpected data
        }
      } catch (err) {
        // Catch network errors or errors from the API service
        console.error("Error fetching admin listings:", err);
        setError(handleApiError(err).message || "An error occurred while fetching listings.");
        setAllListings([]); // Clear listings on error
      } finally {
        setIsLoading(false); // Set loading to false once fetching is complete (or failed)
      }
    };

    fetchAdminListings();
    // Re-run this effect when the `users` state changes, as `transformListingData` depends on it
  }, [users]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-parent")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Filter listings based on search term
 
  // Filter listings based on search term
  const filteredListings = allListings.filter(listing => 
    (listing.clientId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (listing.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (listing.property?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (listing.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
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
    setCurrentPage(1); // Reset to first page when sorting
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

   const handleViewDetails = (property) => {
    navigate(`/admin/dashboard/property/${property.id}`, { 
      state: { property } 
    });
  };


  // Handle approve action
  const handleApprove = async (propertyId) => {
    try {
      const response = await propertyAPI.approveProperty(propertyId);
      if (response.data.success) {
        alert("Property approved successfully!");
        // Update local state
        setAllListings(prev => prev.map(item => 
          item.id === propertyId ? { ...item, status: "approved" } : item
        ));
        setOpenDropdown(null);
      }
    } catch (err) {
      console.error("Approval error:", err);
      alert(err.response?.data?.message || "Error approving property");
    }
  };

  // Handle reject action
  const handleReject = async (propertyId) => {
    const reason = prompt("Please enter rejection reason:");
    if (reason && reason.trim().length >= 10) {
      try {
        const response = await propertyAPI.rejectProperty(propertyId, { rejectionReason: reason });
        if (response.data.success) {
          alert("Property rejected successfully!");
          setAllListings(prev => prev.map(item => 
            item.id === propertyId ? { ...item, status: "rejected" } : item
          ));
          setOpenDropdown(null);
        }
      } catch (err) {
        console.error("Rejection error:", err);
        alert(err.response?.data?.message || "Error rejecting property");
      }
    } else if (reason) {
      alert("Rejection reason must be at least 10 characters.");
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
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
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex space-x-3">
            <button 
              className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm"
              onClick={() => handleSort('date')}
              aria-label="Sort by date"
            >
              <BiSort className="text-gray-500" />
              <span>Sort {sortConfig.key === 'date' && (
                sortConfig.direction === 'ascending' ? '↑' : '↓'
              )}</span>
            </button>
            <button 
              className="flex items-center space-x-1 bg-white border px-3 py-2 rounded-lg text-sm"
              aria-label="Filter listings"
            >
              <BiFilter className="text-gray-500" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Data Table */}
      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden border h-[500px]">
       {/* Updated table rendering to use correct field names */}
      <table className="w-full text-left relative ">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr className="border-b">
            <th className="p-4 font-medium">Client ID</th>
            <th className="p-4 font-medium">Owner Name</th>
            <th className="p-4 font-medium">Contact Number</th>
            <th className="p-4 font-medium">Property Name</th>
            <th className="p-4 font-medium">Created Date</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Location</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              </td>
            </tr>
          ) : currentListings.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                {filteredListings.length === 0 
                  ? "No listings available" 
                  : "No matching listings found"}
              </td>
            </tr>
          ) : (
            sortedListings.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.clientId}</td>
                <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.property}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {item.status || "N/A"}
                  </span>
                </td>
                <td className="p-4">{item.location}</td>
                {/* <td className="p-4 text-right relative dropdown-parent">
                  <button 
                    onClick={() => toggleDropdown(item.id)}
                    aria-label="Open actions menu"
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <FaEllipsisV className="text-gray-400 hover:text-gray-600" />
                  </button>
                  {openDropdown === item.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#AFD1FF] justify-center text-center  border rounded-lg shadow-lg z-10">
                      <ul className="py-2 text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">Approve</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">Reject</li>
                        <li 
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleViewDetails(item)} // Pass propertyId to details page
                        >
                          View Details
                        </li>
                      </ul>
                    </div>
                  )}
                </td> */}


                 <td className="p-4 text-right relative dropdown-parent">
                    <button 
                      onClick={() => toggleDropdown(item.id)}
                      aria-label="Open actions menu"
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FaEllipsisV className="text-gray-400 hover:text-gray-600" />
                    </button>
                    {openDropdown === item.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-[#AFD1FF] justify-center text-center  border rounded-lg shadow-lg z-10">
                        <ul className="py-2 text-gray-700">
                          {item.status !== "approved" && (
                            <li 
                              className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b text-green-600"
                              onClick={() => handleApprove(item.id)}
                            >
                              Approve
                            </li>
                          )}
                          {item.status !== "rejected" && (
                            <li 
                              className="px-4 py-2 hover:bg-red-50 cursor-pointer border-b text-red-600"
                              onClick={() => handleReject(item.id)}
                            >
                              Reject
                            </li>
                          )}
                          <li 
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-blue-600"
                            onClick={() => handleViewDetails(item)}
                          >
                            View Details
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

      {/* Pagination */}
      {!isLoading && sortedListings.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedListings.length)} of {sortedListings.length} entries
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              aria-label="Previous page"
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
                  aria-label={`Page ${number}`}
                >
                  {number}
                </button>
              )
            ))}
            
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListings;