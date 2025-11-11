// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaArrowLeft, FaBars, FaSearch, FaUser, FaHome, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle, FaAngleDoubleRight } from "react-icons/fa";

// const API_BASE_URL = "http://localhost:5000/api";
// const ITEMS_PER_PAGE = 5;

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   timeout: 10000,
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [bookingType, setBookingType] = useState("online");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showTransferPopup, setShowTransferPopup] = useState(false);
//   const [bankAccounts, setBankAccounts] = useState([]);
//   const [bankAccountLoading, setBankAccountLoading] = useState(false);
//   const [selectedBankAccount, setSelectedBankAccount] = useState(null);
//   const [showMorePaymentInfo, setShowMorePaymentInfo] = useState(false);

//   const fetchBookings = async (type = "online") => {
//     try {
//       setLoading(true);
//       setError("");

//       let url = "/api/auth/bookings";
//       if (type === "offline") url = "/api/offline-bookings";

//       const response = await api.get(url);
//       // console.log("📦 Bookings API Response:", response);
//       if (Array.isArray(response.data)) setBookings(response.data);
//       else if (response.data.bookings && Array.isArray(response.data.bookings))
//         setBookings(response.data.bookings);
//       else setBookings([]);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message || "Failed to fetch bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMyBankAccounts = async (clientId) => {
//     try {
//       setBankAccountLoading(true);
//       setBankAccounts([]);
//       setSelectedBankAccount(null);

//       // console.log("🔍 Fetching bank accounts for user ID:", clientId);

//       // Use the getAllBankAccounts endpoint with clientId filter
//       const response = await api.get(`/api/bank-accounts/admin/get/all?clientId=${clientId}`);
//       // console.log("✅ Bank Accounts API Response:", response);

//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Failed to fetch bank accounts');
//       }

//       // Get bank accounts from the response
//       const allAccounts = response.data.bankAccounts || [];
//       // console.log("📦 All bank accounts received:", allAccounts);

//       // Filter accounts by clientId (the user's MongoDB _id)
//       const accountsToShow = allAccounts.filter(account => {
//         // Check if account.clientId matches the provided clientId
//         // account.clientId could be an object (populated) or string
//         const accountClientId = typeof account.clientId === 'object'
//           ? account.clientId._id
//           : account.clientId;

//         return accountClientId === clientId;
//       });

//       // console.log("💰 Filtered Bank Accounts to Show:", accountsToShow);

//       setBankAccounts(accountsToShow);

//       // Auto-select the first verified account if available
//       if (accountsToShow.length > 0) {
//         const verifiedAccount = accountsToShow.find(acc => acc.isVerified) || accountsToShow[0];
//         setSelectedBankAccount(verifiedAccount);
//         // console.log("✅ Auto-selected account:", verifiedAccount);
//       } else {
//         // console.log("ℹ️ No bank accounts found for this user");
//       }

//       return accountsToShow;

//     } catch (err) {
//       console.error("❌ Error fetching bank accounts:", err);

//       if (err.response) {
//         console.error("📊 Server Error Details:", {
//           status: err.response.status,
//           statusText: err.response.statusText,
//           data: err.response.data
//         });
//       }

//       setBankAccounts([]);
//       throw err;
//     } finally {
//       setBankAccountLoading(false);
//     }
//   };

//   // Test function to check if API endpoint exists
//   const testBankAccountEndpoint = async () => {
//     try {
//       // console.log("🧪 Testing bank account endpoint...");
//       const response = await fetch('http://localhost:5000/api/bank-accounts/my-accounts', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken")}`,
//         }
//       });

//       // console.log("🧪 Test Response Status:", response.status, response.statusText);
//       const text = await response.text();
//       // console.log("🧪 Response Type:", typeof text);
//       // console.log("🧪 First 200 chars:", text.substring(0, 200));

//       return {
//         status: response.status,
//         isJson: text.trim().startsWith('{') || text.trim().startsWith('['),
//         text: text
//       };
//     } catch (error) {
//       console.error("🧪 Test failed:", error);
//       return { error: error.message };
//     }
//   };

//   const handleTransferClick = async (booking) => {
//     try {
//       console.log("🚀 Transfer initiated for booking:", booking);

//       // Get the client ID from the booking - ALWAYS use property.clientId
//       let clientId = null;

//       if (bookingType === "online") {
//         // For online bookings, client ID is in property object
//         const property = booking.property || {};
//         clientId = booking.approvedBy
//         // console.log("🏢 Property object:", property);
//         // console.log("🆔 Property Client ID:", booking.approvedBy);
//       } else {
//         // For offline bookings, try property first, then fallback
//         const property = booking.property || booking.approvedBy || {};
//         clientId = property.clientId || booking.approvedBy;
//         // console.log("🏢 Property object:", property);
//         // console.log("🆔 Property Client ID:", property.clientId);
//         // console.log("📝 Created By Fallback:", booking.approvedBy);
//       }

//       // console.log("🎯 Final Client ID:", clientId);

//       if (!clientId) {
//         alert("Error: Could not find client information for this booking. Please check the booking details.");
//         return;
//       }

//       // Show transfer popup and fetch bank accounts for this specific client
//       setShowTransferPopup(true);
//       await fetchMyBankAccounts(clientId);

//     } catch (error) {
//       // console.error("❌ Transfer process failed:", error);
//       alert(`Failed to fetch bank accounts: ${error.message}`);
//     }
//   };

//   const handleProceedWithTransfer = () => {
//     if (!selectedBankAccount) {
//       alert("Please select a bank account to proceed with the transfer.");
//       return;
//     }

//     // console.log("🔄 Proceeding with transfer to:", selectedBankAccount);

//     alert(`Transfer initiated to account: ${selectedBankAccount.accountHolderName} (${selectedBankAccount.accountNumber})`);
//     setShowTransferPopup(false);
//   };

//   useEffect(() => {
//     fetchBookings(bookingType);
//   }, [bookingType]);

//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const filteredBookings = bookings.filter((b) => {
//     const tenant =
//       bookingType === "online"
//         ? b.user || {}
//         : typeof b.tenant === "object"
//           ? b.tenant
//           : { name: b.tenant };
//     const property = bookingType === "online" ? b.property || {} : b.propertyId || {};
//     const clientId = bookingType === "online" ? property.clientId : b.
//       approvedBy || "";

//     return (
//       tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       tenant.phone?.toString().includes(searchTerm) ||
//       property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       clientId?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//   const handlePageChange = (page) => page >= 1 && page <= totalPages && setCurrentPage(page);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//           <p className="text-gray-600 text-sm">Loading bookings...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-sm">
//           <div className="text-red-500 text-2xl mb-2">⚠️</div>
//           <h2 className="text-lg text-red-600 mb-2 font-semibold">Failed to load bookings</h2>
//           <p className="text-gray-600 mb-3 text-sm">{error}</p>
//           <button
//             onClick={() => fetchBookings(bookingType)}
//             className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   if (!Array.isArray(bookings) || bookings.length === 0)
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         <p className="text-gray-600 text-sm">No bookings found.</p>
//       </div>
//     );

//   // ---------- View Details Card  ----------
//   if (selectedBooking) {
//     const tenant =
//       bookingType === "online"
//         ? selectedBooking.user || {}
//         : typeof selectedBooking.tenant === "object"
//           ? selectedBooking.tenant
//           : { name: selectedBooking.tenant };
//     const property = bookingType === "online" ? selectedBooking.property || {} : selectedBooking.propertyId || {};
//     const room =
//       bookingType === "online"
//         ? selectedBooking.roomDetails?.[0] || {}
//         : selectedBooking.roomDetails || {};

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={() => setSelectedBooking(null)}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 bg-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md border border-gray-100"
//             >
//               <FaArrowLeft className="text-sm" /> Back to Bookings
//             </button>

//             <div className="flex gap-2">


//               <button
//                 onClick={() => handleTransferClick(selectedBooking)}
//                 className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
//               >
//                 <FaAngleDoubleRight className="text-sm" />
//                 Transfer
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="bg-[#1e3b8a] p-6 text-white">
//               <h2 className="text-2xl font-bold">Booking Details</h2>
//             </div>

//             <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Tenant Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaUser className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Tenant Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Name" value={tenant.name || "N/A"} />
//                   <InfoRow label="Email" value={tenant.email || "N/A"} />
//                   <InfoRow label="Phone" value={tenant.phone || "N/A"} />
//                   <InfoRow label="Tenant ID" value={tenant.clientId || "N/A"} />
//                   <InfoRow label="Owner ID" value={property.OwnerID || "N/A"} />
//                   {/* <InfoRow
//                     label="Transfer Client ID"
//                     value={
//                       <span className="font-semibold text-blue-600">
//                         {property.clientId || selectedBooking.
//                           approvedBy || "N/A"}
//                       </span>
//                     }
//                   /> */}
//                 </div>
//               </div>

//               {/* Property Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaHome className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Property Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Property Name" value={property.name || "N/A"} />
//                   <InfoRow label="Address" value={property.address || "N/A"} />
//                   <InfoRow label="Room No/ID" value={room.roomNumber || room.roomIdentifier || "N/A"} />
//                   <InfoRow label="Room Type/Sharing" value={room.sharingType || room.roomType || "N/A"} />
                  
//                 </div>
//               </div>

//               {/* Booking Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaCalendarAlt className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Booking Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Move In" value={new Date(selectedBooking.checkInDate || selectedBooking.moveInDate).toLocaleDateString()} />
//                   <InfoRow label="Move Out" value={new Date(selectedBooking.checkOutDate || selectedBooking.moveOutDate).toLocaleDateString()} />
//                   <InfoRow
//                     label="Status"
//                     value={
//                       <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(selectedBooking.status || selectedBooking.bookingStatus)}`}>
//                         {(selectedBooking.status || selectedBooking.bookingStatus)?.toUpperCase()}
//                       </span>
//                     }
//                   />
//                   <InfoRow label="Booking ID" value={selectedBooking._id || selectedBooking.id || "N/A"} />
//                   <InfoRow label="Created By" value={selectedBooking.
//                     approvedAt || "N/A"} />
//                 </div>
//               </div>

//               {/* Payment & Additional Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaMoneyBillWave className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Payment & Additional Info</h3>
//                 </div>

//                 <div className="space-y-3">
//                   {/* First 6 lines - always visible */}
//                   <InfoRow label="Payment Status" value={selectedBooking.paymentStatus || "N/A"} />
//                   <InfoRow label="Amount Paid" value={selectedBooking.paymentInfo?.paidAmount ? `₹${selectedBooking.paymentInfo.paidAmount}` : "N/A"} />
//                   <InfoRow label="Total Amount" value={selectedBooking.pricing?.totalAmount ? `₹${selectedBooking.pricing.totalAmount}` : "N/A"} />
//                   <InfoRow label="Payment Method" value={selectedBooking.paymentInfo?.paymentMethod || "N/A"} />
//                   <InfoRow label="Transaction ID" value={selectedBooking.paymentInfo?.transactionId || "N/A"} />
//                   <InfoRow label="Payment Date" value={
//                     selectedBooking.paymentInfo?.paymentDate
//                       ? new Date(selectedBooking.paymentInfo.paymentDate).toLocaleString()
//                       : "N/A"
//                   } />

//                   {/* Additional fields - conditionally rendered */}
//                   {showMorePaymentInfo && (
//                     <div className="space-y-3 border-t border-gray-200 pt-3">
//                       <InfoRow label="Transfer Status" value={selectedBooking.transferStatus || "N/A"} />
//                       <InfoRow label="Client Amount" value={
//                         selectedBooking.transferDetails?.clientAmount
//                           ? `₹${selectedBooking.transferDetails.clientAmount}`
//                           : "N/A"
//                       } />
//                       <InfoRow label="Platform Commission" value={
//                         selectedBooking.transferDetails?.platformCommission
//                           ? `₹${selectedBooking.transferDetails.platformCommission}`
//                           : "N/A"
//                       } />
//                       <InfoRow label="GST on Commission" value={
//                         selectedBooking.transferDetails?.gstOnCommission
//                           ? `₹${selectedBooking.transferDetails.gstOnCommission}`
//                           : "N/A"
//                       } />
//                       <InfoRow label="Total Platform Earnings" value={
//                         selectedBooking.transferDetails?.totalPlatformEarnings
//                           ? `₹${selectedBooking.transferDetails.totalPlatformEarnings}`
//                           : "N/A"
//                       } />
//                       <InfoRow label="Transfer Notes" value={selectedBooking.transferDetails?.transferNotes || "N/A"} />
//                       <InfoRow label="Booking Source" value={bookingType} />
                     
//                     </div>
//                   )}

//                   {/* Toggle button */}
//                   <button
//                     onClick={() => setShowMorePaymentInfo(!showMorePaymentInfo)}
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors mt-2"
//                   >
//                     {showMorePaymentInfo ? (
//                       <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
//                         <span className="opacity-50 hover:opacity-100">Show Less</span>
//                         <svg className=" w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="opacity-70 hover:opacity-100 flex gap-3 items-center" >
//                         <span >Show More Payment Details</span>
//                         <svg  className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transfer Popup */}
//         {showTransferPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
//               <div className="bg-[#1e3b8a] p-3 text-white">
//                 <h3 className="text-xl font-bold">Select Bank Account for Transfer</h3>
//                 <p className="text-blue-100 mt-1">Choose a bank account to receive the transfer</p>
//               </div>

//               <div className="p-6">
//                 {bankAccountLoading ? (
//                   <div className="text-center py-8">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//                     <p className="text-gray-600">Loading bank accounts...</p>
//                   </div>
//                 ) : bankAccounts.length > 0 ? (
//                   <div className="space-y-4">
//                     <div className="max-h-96 overflow-y-auto">
//                       {bankAccounts.map((account, index) => (
//                         <div
//                           key={account._id || index}
//                           className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedBankAccount?._id === account._id
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-gray-300"
//                             }`}
//                           onClick={() => setSelectedBankAccount(account)}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex-1">
//                               <div className="flex items-center gap-3 mb-2">
//                                 <h4 className="font-semibold text-gray-800">
//                                   {account.accountHolderName || "N/A"}
//                                 </h4>
//                                 {account.isVerified && (
//                                   <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
//                                     Verified
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <InfoRow label="Account Number" value={account.accountNumber || "N/A"} />
//                                 <InfoRow label="Bank Name" value={account.bankName || "N/A"} />
//                                 <InfoRow label="Branch" value={account.branchName || "N/A"} />
//                                 <InfoRow label="IFSC Code" value={account.ifscCode || account.ifsc || "N/A"} />
//                               </div>
//                             </div>
//                             <div className="ml-4">
//                               <div className={`w-4 h-4 rounded-full border-2 ${selectedBankAccount?._id === account._id
//                                 ? "bg-blue-500 border-blue-500"
//                                 : "border-gray-300"
//                                 }`}></div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {selectedBankAccount && (
//                       <div className="bg-gray-50 rounded-lg p-4 border">
//                         <h4 className="font-semibold text-gray-800 mb-3">Selected Account</h4>
//                         <div className="grid grid-cols-2 gap-3">
//                           <InfoRow label="Account Holder" value={selectedBankAccount.accountHolderName || "N/A"} />
//                           <InfoRow label="Account Number" value={selectedBankAccount.accountNumber || "N/A"} />
//                           <InfoRow label="Bank Name" value={selectedBankAccount.bankName || "N/A"} />
//                           <InfoRow label="IFSC Code" value={selectedBankAccount.ifscCode || selectedBankAccount.ifsc || "N/A"} />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                       <p className="text-yellow-800 font-semibold">Bank Accounts Not Available</p>
//                       <p className="text-yellow-700 text-sm mt-1">
//                         The bank accounts feature is not implemented yet. Please check with your administrator.
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => {
//                         // Redirect to add bank account page or show message
//                         alert("Bank account management is not available yet.");
//                       }}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Contact Administrator
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex gap-3 p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     setShowTransferPopup(false);
//                     setSelectedBankAccount(null);
//                   }}
//                   className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 font-medium transition-all"
//                 >
//                   Close
//                 </button>
//                 {bankAccounts.length > 0 && (
//                   <button
//                     onClick={handleProceedWithTransfer}
//                     disabled={!selectedBankAccount}
//                     className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${selectedBankAccount
//                       ? "bg-green-600 text-white hover:bg-green-700"
//                       : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }`}
//                   >
//                     Proceed with Transfer
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ---------- Main Page & Table ----------
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-3">
//           <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
//         </div>

//         <div className="flex items-center justify-between mb-6">
//           <div className="relative w-72 mt-6">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search bookings..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border border-gray-300 px-10 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition text-sm"
//             >
//               <FaBars className="text-gray-600" />
//               Filter
//             </button>
//             {menuOpen && (
//               <div className="absolute right-0 mt-1 w-40 bg-white border rounded text-sm z-50">
//                 <button
//                   className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-100"
//                   onClick={() => {
//                     setMenuOpen(false);
//                     setBookingType("offline");
//                     setCurrentPage(1);
//                   }}
//                 >
//                   Offline Bookings
//                 </button>
//                 <button
//                   className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-100"
//                   onClick={() => {
//                     setMenuOpen(false);
//                     setBookingType("online");
//                     setCurrentPage(1);
//                   }}
//                 >
//                   Online Bookings
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto hide-scrollbar">
//           <table className="min-w-full border text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 font-semibold text-xs uppercase">
//               <tr>
//                 <th className="px-4 py-2 border w-40">Client ID</th>
//                 <th className="px-4 py-2 border w-40">Tenant</th>
//                 <th className="px-4 py-2 border w-32">Phone</th>
//                 <th className="px-4 py-2 border w-52">Email</th>
//                 <th className="px-4 py-2 border w-52">Property</th>
//                 {bookingType === "online" ? (
//                   <>
//                     <th className="px-4 py-2 border w-32">Room No</th>
//                     <th className="px-4 py-2 border w-40">Room Type</th>
//                   </>
//                 ) : (
//                   <>
//                     <th className="px-4 py-2 border w-32">Room ID</th>
//                     <th className="px-4 py-2 border w-40">Sharing</th>
//                   </>
//                 )}
//                 <th className="px-4 py-2 border w-40">Move In</th>
//                 <th className="px-4 py-2 border w-40">Move Out</th>
//                 <th className="px-4 py-2 border w-36">Status</th>
//                 <th className="px-4 py-2 border w-36">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedBookings.map((b) => {
//                 const room =
//                   bookingType === "online"
//                     ? b.roomDetails?.[0] || {}
//                     : b.roomDetails || {};
//                 const property =
//                   bookingType === "online" ? b.property || {} : b.propertyId || {};
//                 const tenant =
//                   bookingType === "online"
//                     ? b.user || {}
//                     : typeof b.tenant === "object"
//                       ? b.tenant
//                       : { name: b.tenant };
//                 // Use property.clientId for both online and offline bookings
//                 const clientId = property.clientId || b.
//                   approvedBy || "N/A";

//                 return (
//                   <tr key={b._id || b.id} className="hover:bg-gray-50 cursor-pointer transition-all">
//                     <td className="px-4 py-2 border">{tenant.clientId}</td>
//                     <td className="px-4 py-2 border">{tenant.name || "N/A"}</td>
//                     <td className="px-4 py-2 border">{tenant.phone || "N/A"}</td>
//                     <td className="px-4 py-2 border">{tenant.email || "N/A"}</td>
//                     <td className="px-4 py-2 border">{property.name || "N/A"}</td>
//                     {bookingType === "online" ? (
//                       <>
//                         <td className="px-4 py-2 border">{room.roomNumber || "N/A"}</td>
//                         <td className="px-4 py-2 border">{room.sharingType || room.roomType || "N/A"}</td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="px-4 py-2 border">{room.roomIdentifier || "N/A"}</td>
//                         <td className="px-4 py-2 border">{room.sharingType || room.roomType || "N/A"}</td>
//                       </>
//                     )}
//                     <td className="px-4 py-2 border">
//                       {new Date(b.checkInDate || b.moveInDate).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {new Date(b.checkOutDate || b.moveOutDate).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <span
//                         className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(
//                           b.status || b.bookingStatus
//                         )}`}
//                       >
//                         {(b.status || b.bookingStatus)?.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <div className="flex gap-1">
//                         <button
//                           className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
//                           onClick={() => setSelectedBooking(b)}
//                         >
//                           View Details
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-end items-center mt-4 space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`px-3 py-1 text-sm rounded border ${currentPage === 1
//               ? "text-gray-400 border-gray-200 cursor-not-allowed"
//               : "text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               className={`px-3 py-1 text-sm rounded border ${currentPage === index + 1
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={`px-3 py-1 text-sm rounded border ${currentPage === totalPages
//               ? "text-gray-400 border-gray-200 cursor-not-allowed"
//               : "text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// };

// // Helper component for detail view
// const InfoRow = ({ label, value }) => (
//   <div className="flex justify-between items-start">
//     <span className="text-sm font-medium text-gray-600 min-w-[120px]">{label}:</span>
//     <span className="text-sm text-gray-800 text-right flex-1">{value}</span>
//   </div>
// );

// export default Bookings;



// import React, { useEffect, useState } from "react";
// import { 
//   FaArrowLeft, 
//   FaBars, 
//   FaSearch, 
//   FaUser, 
//   FaHome, 
//   FaCalendarAlt, 
//   FaMoneyBillWave, 
//   FaAngleDoubleRight 
// } from "react-icons/fa";
// import { 
//   adminBookingsAPI, 
//   adminBankAccountsAPI, adminPaymentsAPI 
// } from "../adminController";

// const ITEMS_PER_PAGE = 5;

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [bookingType, setBookingType] = useState("online");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showTransferPopup, setShowTransferPopup] = useState(false);
//   const [bankAccounts, setBankAccounts] = useState([]);
//   const [bankAccountLoading, setBankAccountLoading] = useState(false);
//   const [selectedBankAccount, setSelectedBankAccount] = useState(null);
//   const [showMorePaymentInfo, setShowMorePaymentInfo] = useState(false);

//   const fetchBookings = async (type = "online") => {
//     try {
//       setLoading(true);
//       setError("");

//       let response;
//       if (type === "online") {
//         response = await adminBookingsAPI.getAllBookings();
//       } else {
//         response = await adminBookingsAPI.getOfflineBookings();
//       }

//       console.log("Bookings API Response:", response);
      
//       // Handle different response structures
//       if (response.data && Array.isArray(response.data)) {
//         setBookings(response.data);
//       } else if (response.data && Array.isArray(response.data.bookings)) {
//         setBookings(response.data.bookings);
//       } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         setBookings(response.data.data);
//       } else {
//         console.warn("Unexpected response structure:", response.data);
//         setBookings([]);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError(
//         err.response?.data?.message || 
//         err.message || 
//         "Failed to fetch bookings. Please check your connection."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to extract accounts from response
//   const extractAccountsFromResponse = (response) => {
//     let accounts = [];
//     if (response.data && response.data.success && Array.isArray(response.data.bankAccounts)) {
//       accounts = response.data.bankAccounts;
//     } else if (response.data && Array.isArray(response.data)) {
//       accounts = response.data;
//     } else if (response.data && Array.isArray(response.data.data)) {
//       accounts = response.data.data;
//     }
//     return accounts;
//   };

//   const fetchBankAccountsWithFallback = async (booking) => {
//     try {
//       setBankAccountLoading(true);
//       setBankAccounts([]);
//       setSelectedBankAccount(null);

//       // Extract both propertyId and clientId as fallbacks
//       const property = bookingType === "online" 
//         ? booking.property || {} 
//         : booking.property || booking.propertyId || {};
      
//       const propertyId = property._id || property.id;
//       const clientId = property.OwnerID || booking.approvedBy || booking.createdBy;

//       console.log("Trying with Property ID:", propertyId);
//       console.log("Fallback Client ID:", clientId);

//       let accounts = [];
//       let lastError = null;

//       // Try propertyId first (primary approach)
//       if (propertyId) {
//         try {
//           const response = await adminBankAccountsAPI.getBankAccountsByProperty(propertyId);
//           accounts = extractAccountsFromResponse(response);
//           console.log("Found accounts with propertyId:", accounts.length);
//         } catch (error) {
//           console.log("Failed with propertyId:", error.message);
//           lastError = error;
//         }
//       }

//       // If no accounts found with propertyId, try clientId as fallback
//       if (accounts.length === 0 && clientId) {
//         try {
//           console.log("Trying fallback with Client ID:", clientId);
//           const response = await adminBankAccountsAPI.getBankAccountsByClient(clientId);
//           accounts = extractAccountsFromResponse(response);
//           console.log("Found accounts with clientId:", accounts.length);
//         } catch (error) {
//           console.log("Failed with clientId:", error.message);
//           lastError = error;
//         }
//       }

//       // Process the accounts
//       const verifiedAccounts = accounts.filter(acc => acc.isVerified === true);
//       const unverifiedAccounts = accounts.filter(acc => !acc.isVerified || acc.isVerified === false);
//       const sortedAccounts = [...verifiedAccounts, ...unverifiedAccounts];

//       setBankAccounts(sortedAccounts);

//       if (sortedAccounts.length > 0) {
//         const accountToSelect = verifiedAccounts[0] || sortedAccounts[0];
//         setSelectedBankAccount(accountToSelect);
//       }

//       return sortedAccounts;

//     } catch (err) {
//       console.error("Error in fetchBankAccountsWithFallback:", err);
//       setBankAccounts([]);
//       throw err;
//     } finally {
//       setBankAccountLoading(false);
//     }
//   };

//   const handleTransferClick = async (booking) => {
//     try {
//       console.log("Transfer initiated for booking:", booking);

//       // Show transfer popup
//       setSelectedBooking(booking);
//       setShowTransferPopup(true);
      
//       // Use the enhanced function with fallbacks
//       const accounts = await fetchBankAccountsWithFallback(booking);
      
//       if (accounts.length === 0) {
//         const property = bookingType === "online" 
//           ? booking.property || {} 
//           : booking.property || booking.propertyId || {};
//         const propertyName = property.name || "this property";
//         alert(`No bank accounts found for ${propertyName}`);
//       }

//     } catch (error) {
//       console.error("Transfer process failed:", error);
//       alert(`Failed to fetch bank accounts: ${error.message}`);
//     }
//   };

//   const handleProceedWithTransfer = async () => {
//     if (!selectedBankAccount) {
//       alert("Please select a bank account to proceed with the transfer.");
//       return;
//     }

//     try {
//       console.log("Proceeding with transfer to:", selectedBankAccount);
      
//       // Here you would typically call your transfer API
//       // For now, we'll just show a success message
//       alert(`Transfer initiated successfully!\n\nAccount: ${selectedBankAccount.accountHolderName}\nAccount Number: ${selectedBankAccount.accountNumber}\nBank: ${selectedBankAccount.bankName}`);
      
//       setShowTransferPopup(false);
//       setSelectedBankAccount(null);
      
//     } catch (error) {
//       console.error("Transfer failed:", error);
//       alert(`Transfer failed: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(bookingType);
//   }, [bookingType]);

//   const getStatusBadge = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800";
    
//     const statusLower = status.toLowerCase();
//     switch (statusLower) {
//       case "approved":
//       case "confirmed":
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//       case "processing":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//       case "rejected":
//       case "failed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Filter bookings based on search term
//   const filteredBookings = bookings.filter((booking) => {
//     const searchLower = searchTerm.toLowerCase();
    
//     // Tenant information
//     const tenant = bookingType === "online" 
//       ? booking.user || {} 
//       : (typeof booking.tenant === "object" ? booking.tenant : { 
//           name: booking.tenant,
//           phone: booking.tenantPhone,
//           email: booking.tenantEmail,
//           clientId: booking.tenantClientId
//         });
    
//     // Property information
//     const property = bookingType === "online" 
//       ? booking.property || {} 
//       : booking.propertyId || {};
    
//     // Client IDs for search
//     const tenantClientId = tenant.clientId || "";
//     const propertyOwnerId = booking.clientId;
//     // console.log("searching ClientID", propertyOwnerId)

//     return (
//       (tenant.name || "").toLowerCase().includes(searchLower) ||
//       (tenant.email || "").toLowerCase().includes(searchLower) ||
//       (tenant.phone || "").toString().includes(searchTerm) ||
//       (property.name || "").toLowerCase().includes(searchLower) ||
//       tenantClientId.toLowerCase().includes(searchLower) ||
//       propertyOwnerId.toLowerCase().includes(searchLower) ||
//       (booking._id || "").toLowerCase().includes(searchLower)
//     );
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//           <p className="text-gray-600 text-sm">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-sm">
//           <div className="text-red-500 text-2xl mb-2">⚠️</div>
//           <h2 className="text-lg text-red-600 mb-2 font-semibold">Failed to load bookings</h2>
//           <p className="text-gray-600 mb-3 text-sm">{error}</p>
//           <button
//             onClick={() => fetchBookings(bookingType)}
//             className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!Array.isArray(bookings) || bookings.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
//           <div className="text-gray-400 text-4xl mb-4">📋</div>
//           <h2 className="text-lg text-gray-600 mb-2 font-semibold">No Bookings Found</h2>
//           <p className="text-gray-500 text-sm mb-4">
//             {bookingType === "online" 
//               ? "No online bookings available." 
//               : "No offline bookings available."}
//           </p>
//           <button
//             onClick={() => fetchBookings(bookingType)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ---------- View Details Card ----------
//   if (selectedBooking) {
//     const tenant = bookingType === "online"
//       ? selectedBooking.user || {}
//       : (typeof selectedBooking.tenant === "object" 
//           ? selectedBooking.tenant 
//           : { name: selectedBooking.tenant });
    
//     const property = bookingType === "online" 
//       ? selectedBooking.property || {} 
//       : selectedBooking.propertyId || {};
      
     
    
//     const room = bookingType === "online"
//       ? selectedBooking.roomDetails?.[0] || {}
//       : selectedBooking.roomDetails || {};

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={() => setSelectedBooking(null)}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200  px-4 py-2.5 rounded-lg  hover:shadow-md border border-gray-100"
//             >
//               <FaArrowLeft className="text-sm" /> Back to Bookings
//             </button>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleTransferClick(selectedBooking)}
//                 className="flex items-center gap-2 bg-[#1e3b8a] text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
//               >
//                 <FaAngleDoubleRight className="text-sm" />
//                 Transfer
//               </button>
//             </div>
//           </div>

//           <div className=" rounded-2xl  border-2 border-gray-200 overflow-hidden">
//             <div className="bg-[#1e3b8a] p-6 text-white">
//               <h2 className="text-2xl font-bold">Booking Details</h2>
//               <p className="text-blue-100 mt-1">Booking ID: {selectedBooking._id || selectedBooking.id || "N/A"}</p>
//             </div>

//             <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Tenant Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaUser className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Tenant Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Name" value={tenant.name || "N/A"} />
//                   <InfoRow label="Email" value={tenant.email || "N/A"} />
//                   <InfoRow label="Phone" value={tenant.phone || "N/A"} />
//                   <InfoRow label="Tenant Client ID" value={tenant.clientId || "N/A"} />
//                 </div>
//               </div>

//               {/* Property Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaHome className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Property Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Property Name" value={property.name || "N/A"} />
//                   <InfoRow label="Address" value={property.locality || property.address || "N/A"} />
//                   <InfoRow label="Room No/ID" value={room.roomNumber || room.roomIdentifier || "N/A"} />
//                   <InfoRow label="Room Type/Sharing" value={room.sharingType || room.roomType || selectedBooking.roomType || "N/A"} />
//                   <InfoRow label="Property Owner ID" value={selectedBooking.clientId || "N/A"} />
//                   <InfoRow label="Property ID" value={property._id || property.id || "N/A"} />
//                 </div>
//               </div>

//               {/* Booking Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaCalendarAlt className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Booking Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow 
//                     label="Move In" 
//                     value={new Date(selectedBooking.checkInDate || selectedBooking.moveInDate).toLocaleDateString()} 
//                   />
//                   <InfoRow 
//                     label="Move Out" 
//                     value={new Date(selectedBooking.checkOutDate || selectedBooking.moveOutDate).toLocaleDateString()} 
//                   />
//                   <InfoRow
//                     label="Status"
//                     value={
//                       <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(selectedBooking.status || selectedBooking.bookingStatus)}`}>
//                         {(selectedBooking.status || selectedBooking.bookingStatus || "N/A")?.toUpperCase()}
//                       </span>
//                     }
//                   />
//                   <InfoRow label="Booking ID" value={selectedBooking._id || selectedBooking.id || "N/A"} />
//                   <InfoRow 
//                     label="Approved At" 
//                     value={selectedBooking.approvedAt 
//                       ? new Date(selectedBooking.approvedAt).toLocaleString() 
//                       : "N/A"} 
//                   />
//                 </div>
//               </div>

//               {/* Payment & Additional Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaMoneyBillWave className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Payment & Additional Info</h3>
//                 </div>

//                 <div className="space-y-3">
//                   <InfoRow label="Payment Status" value={selectedBooking.paymentStatus || "N/A"} />
//                   <InfoRow 
//                     label="Amount Paid" 
//                     value={selectedBooking.paymentInfo?.paidAmount 
//                       ? `₹${selectedBooking.paymentInfo.paidAmount}` 
//                       : "N/A"} 
//                   />
//                   <InfoRow 
//                     label="Total Amount" 
//                     value={selectedBooking.pricing?.totalAmount 
//                       ? `₹${selectedBooking.pricing.totalAmount}` 
//                       : "N/A"} 
//                   />
//                   <InfoRow label="Payment Method" value={selectedBooking.paymentInfo?.paymentMethod || "N/A"} />
//                   <InfoRow label="Transaction ID" value={selectedBooking.paymentInfo?.transactionId || "N/A"} />
//                   <InfoRow 
//                     label="Payment Date" 
//                     value={
//                       selectedBooking.paymentInfo?.paymentDate
//                         ? new Date(selectedBooking.paymentInfo.paymentDate).toLocaleString()
//                         : "N/A"
//                     }
//                   />

//                   {/* Additional fields - conditionally rendered */}
//                   {showMorePaymentInfo && (
//                     <div className="space-y-3 border-t border-gray-200 pt-3">
//                       <InfoRow label="Transfer Status" value={selectedBooking.transferStatus || "N/A"} />
//                       <InfoRow 
//                         label="Client Amount" 
//                         value={
//                           selectedBooking.transferDetails?.clientAmount
//                             ? `₹${selectedBooking.transferDetails.clientAmount}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow 
//                         label="Platform Commission" 
//                         value={
//                           selectedBooking.transferDetails?.platformCommission
//                             ? `₹${selectedBooking.transferDetails.platformCommission}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow 
//                         label="GST on Commission" 
//                         value={
//                           selectedBooking.transferDetails?.gstOnCommission
//                             ? `₹${selectedBooking.transferDetails.gstOnCommission}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow 
//                         label="Total Platform Earnings" 
//                         value={
//                           selectedBooking.transferDetails?.totalPlatformEarnings
//                             ? `₹${selectedBooking.transferDetails.totalPlatformEarnings}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow label="Transfer Notes" value={selectedBooking.transferDetails?.transferNotes || "N/A"} />
//                       <InfoRow label="Booking Source" value={bookingType} />
//                     </div>
//                   )}

//                   {/* Toggle button */}
//                   <button
//                     onClick={() => setShowMorePaymentInfo(!showMorePaymentInfo)}
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors mt-2"
//                   >
//                     {showMorePaymentInfo ? (
//                       <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
//                         <span className="opacity-50 hover:opacity-100">Show Less</span>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
//                         <span>Show More Payment Details</span>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transfer Popup */}
//         {showTransferPopup && (
//           <TransferPopup
//             bankAccounts={bankAccounts}
//             bankAccountLoading={bankAccountLoading}
//             selectedBankAccount={selectedBankAccount}
//             onSelectBankAccount={setSelectedBankAccount}
//             onProceed={handleProceedWithTransfer}
//             onClose={() => {
//               setShowTransferPopup(false);
//               setSelectedBankAccount(null);
//             }}
//           />
//         )}
//       </div>
//     );
//   }

//   // ---------- Main Page & Table ----------
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search bookings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-72 border border-gray-300 px-10 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition text-sm"
//               >
//                 <FaBars className="text-gray-600" />
//                 {bookingType === "online" ? "Online Bookings" : "Offline Bookings"}
//               </button>
//               {menuOpen && (
//                 <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                   <button
//                     className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                       bookingType === "online" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                     }`}
//                     onClick={() => {
//                       setBookingType("online");
//                       setMenuOpen(false);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     Online Bookings
//                   </button>
//                   <button
//                     className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                       bookingType === "offline" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                     }`}
//                     onClick={() => {
//                       setBookingType("offline");
//                       setMenuOpen(false);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     Offline Bookings
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bookings Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Tenant Client ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Tenant Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Phone
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Property Owner ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Property
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     {bookingType === "online" ? "Room No" : "Room ID"}
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     {bookingType === "online" ? "Room Type" : "Sharing"}
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Move In
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Move Out
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedBookings.map((booking) => {
//                   const room = bookingType === "online"
//                     ? booking.roomDetails?.[0] || {}
//                     : booking.roomDetails || {};
//                   const property = bookingType === "online" 
//                     ? booking.property || {} 
//                     : booking.propertyId || {};
//                   const tenant = bookingType === "online"
//                     ? booking.user || {}
//                     : (typeof booking.tenant === "object" 
//                         ? booking.tenant 
//                         : { name: booking.tenant });
                  
//                   const tenantClientId = tenant.clientId || "N/A";
//                   const propertyOwnerId = booking.clientId || "N/A";

//                   return (
//                     <tr 
//                       key={booking._id || booking.id} 
//                       className="hover:bg-gray-50 transition-colors cursor-pointer"
//                       onClick={() => setSelectedBooking(booking)}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {tenantClientId}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {tenant.name || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {tenant.phone || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {propertyOwnerId}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {property.name || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {room.roomNumber || room.roomIdentifier || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {room.sharingType || room.roomType || booking.roomType || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(booking.checkInDate || booking.moveInDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(booking.checkOutDate || booking.moveOutDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
//                             booking.status || booking.bookingStatus
//                           )}`}
//                         >
//                           {(booking.status || booking.bookingStatus || "N/A")?.toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedBooking(booking);
//                           }}
//                           className="text-blue-600 hover:text-blue-900 font-medium text-sm"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center mt-4 px-2">
//             <div className="text-sm text-gray-700">
//               Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredBookings.length)} of{" "}
//               {filteredBookings.length} entries
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 text-sm rounded border ${
//                   currentPage === 1
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 Previous
//               </button>
              
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`px-3 py-1 text-sm rounded border ${
//                     currentPage === index + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 text-sm rounded border ${
//                   currentPage === totalPages
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Helper component for detail view
// const InfoRow = ({ label, value }) => (
//   <div className="flex justify-between items-start">
//     <span className="text-sm font-medium text-gray-600 min-w-[140px]">{label}:</span>
//     <span className="text-sm text-gray-800 text-right flex-1 break-words max-w-[200px]">
//       {value}
//     </span>
//   </div>
// );

// // Transfer Popup Component
// const TransferPopup = ({
//   bankAccounts,
//   bankAccountLoading,
//   selectedBankAccount,
//   onSelectBankAccount,
//   onProceed,
//   onClose
// }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
//       <div className="bg-[#1e3b8a] p-6 text-white">
//         <h3 className="text-xl font-bold">Select Bank Account for Transfer</h3>
//         <p className="text-blue-100 mt-1">Choose a bank account to receive the transfer</p>
//       </div>

//       <div className="p-6">
//         {bankAccountLoading ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-gray-600">Loading bank accounts...</p>
//           </div>
//         ) : bankAccounts.length > 0 ? (
//           <div className="space-y-4">
//             <div className="max-h-96 overflow-y-auto">
//               {bankAccounts.map((account, index) => (
//                 <div
//                   key={account._id || index}
//                   className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                     selectedBankAccount?._id === account._id
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => onSelectBankAccount(account)}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-semibold text-gray-800">
//                           {account.accountHolderName || "N/A"}
//                         </h4>
//                         {account.isVerified && (
//                           <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
//                             Verified
//                           </span>
//                         )}
//                         {!account.isVerified && (
//                           <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-semibold rounded-full">
//                             Unverified
//                           </span>
//                         )}
//                       </div>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <InfoRow label="Account Number" value={account.accountNumber || "N/A"} />
//                         <InfoRow label="Bank Name" value={account.bankName || "N/A"} />
//                         <InfoRow label="Branch" value={account.branchName || "N/A"} />
//                         <InfoRow label="IFSC Code" value={account.ifscCode || account.ifsc || "N/A"} />
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <div
//                         className={`w-4 h-4 rounded-full border-2 ${
//                           selectedBankAccount?._id === account._id
//                             ? "bg-blue-500 border-blue-500"
//                             : "border-gray-300"
//                         }`}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {selectedBankAccount && (
//               <div className="bg-gray-50 rounded-lg p-4 border">
//                 <h4 className="font-semibold text-gray-800 mb-3">Selected Account</h4>
//                 <div className="grid grid-cols-2 gap-3">
//                   <InfoRow label="Account Holder" value={selectedBankAccount.accountHolderName || "N/A"} />
//                   <InfoRow label="Account Number" value={selectedBankAccount.accountNumber || "N/A"} />
//                   <InfoRow label="Bank Name" value={selectedBankAccount.bankName || "N/A"} />
//                   <InfoRow label="IFSC Code" value={selectedBankAccount.ifscCode || selectedBankAccount.ifsc || "N/A"} />
//                   <InfoRow 
//                     label="Verification Status" 
//                     value={
//                       selectedBankAccount.isVerified 
//                         ? "Verified ✅" 
//                         : "Unverified ⚠️"
//                     } 
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//               <p className="text-yellow-800 font-semibold">No Bank Accounts Found</p>
//               <p className="text-yellow-700 text-sm mt-1">
//                 This client doesn't have any bank accounts registered yet.
//                 Please ask them to add a bank account before proceeding with the transfer.
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="flex gap-3 p-6 border-t border-gray-200">
//         <button
//           onClick={onClose}
//           className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 font-medium transition-all"
//         >
//           Close
//         </button>
//         {bankAccounts.length > 0 && (
//           <button
//             onClick={onProceed}
//             disabled={!selectedBankAccount}
//             className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
//               selectedBankAccount
//                 ? "bg-[#1e3b8a] text-white hover:bg-gray-200"
//                 : "bg-gray-400 text-gray-200 cursor-not-allowed"
//             }`}
//           >
//             {selectedBankAccount && !selectedBankAccount.isVerified 
//               ? "Proceed with Unverified Account" 
//               : "Proceed with Transfer"
//             }
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// );

// export default Bookings;






import React, { useEffect, useState } from "react";
import { 
  FaArrowLeft, 
  FaBars, 
  FaSearch, 
  FaUser, 
  FaHome, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaAngleDoubleRight,
  FaTimes,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import image from "../../assets/payment-Icons/undraw_mobile-payments_uate.png"
import { 
  adminBookingsAPI, 
  adminBankAccountsAPI, 
  adminPaymentsAPI 
} from "../adminController";

const ITEMS_PER_PAGE = 5;

// Helper component for detail view - MOVE TO TOP
const InfoRow = ({ label, value, highlight = false }) => (
  <div className="flex justify-between items-start">
    <span className={`text-sm font-medium ${highlight ? 'text-blue-600' : 'text-gray-600'} min-w-[140px]`}>
      {label}:
    </span>
    <span className={`text-sm ${highlight ? 'text-blue-600 font-semibold' : 'text-gray-800'} text-right flex-1 break-words max-w-[200px]`}>
      {value}
    </span>
  </div>
);

// Transfer Popup Component - MOVE TO TOP
const TransferPopup = ({
  booking,
  bankAccounts,
  bankAccountLoading,
  selectedBankAccount,
  onSelectBankAccount,
  onClose,
  onTransferComplete
}) => {
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferStatus, setTransferStatus] = useState(null);
  const [transferNotes, setTransferNotes] = useState('');

  const handleProceedTransfer = async () => {
    if (!selectedBankAccount) {
      alert('Please select a bank account to proceed with the transfer.');
      return;
    }

    try {
      setTransferLoading(true);
      setTransferStatus(null);

      const transferData = {
        bookingId: booking._id || booking.id,
        bankAccountId: selectedBankAccount._id,
        notes: transferNotes || `Manual transfer for booking ${booking._id || booking.id}`
      };

      console.log('🔄 Initiating manual transfer with data:', transferData);

      // Call manual transfer API
      const response = await adminPaymentsAPI.initiateManualTransfer(transferData);
      
      console.log('Transfer API response:', response);
      
      if (response.data && response.data.success) {
        setTransferStatus({
          type: 'success',
          message: response.data.message || 'Manual transfer recorded successfully!',
          details: response.data.transferDetails
        });
        
        // Callback to refresh parent component
        if (onTransferComplete) {
          onTransferComplete(response.data.transferDetails);
        }

        // Auto-close after success
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setTransferStatus({
          type: 'error',
          message: response.data?.message || 'Transfer failed',
          details: response.data?.error
        });
      }

    } catch (error) {
      console.error(' Transfer process error:', error);
      setTransferStatus({
        type: 'error',
        message: 'Transfer process failed. Please try again.',
        details: error.response?.data?.message || error.message
      });
    } finally {
      setTransferLoading(false);
    }
  };

  const getTransferAmount = () => {
    return booking.transferDetails?.clientAmount || 0;
  };

  const getPlatformCommission = () => {
    return booking.transferDetails?.platformCommission || 0;
  };

  const getTotalPaidAmount = () => {
    return booking.paymentInfo?.paidAmount || 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e3b8a] p-6 text-white relative">
          <h3 className="text-xl font-bold">Manual Transfer to Property Owner</h3>
          <p className="text-blue-100 mt-1">
            Transfer client amount to property owner's bank account
          </p>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-blue-200 transition-colors"
            disabled={transferLoading}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Transfer Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <FaMoneyBillWave className="text-blue-600 text-xl" />
              <h4 className="font-semibold text-blue-800 text-lg">Transfer Summary</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <InfoRow label="Booking ID" value={booking._id || booking.id} />
                <InfoRow label="Property" value={booking.property?.name || 'N/A'} />
                <InfoRow label="Property Owner ID" value={booking.clientId || 'N/A'} />
              </div>
              <div className="space-y-2">
                <InfoRow 
                  label="Total Paid" 
                  value={`₹${getTotalPaidAmount().toLocaleString('en-IN')}`} 
                />
                <InfoRow 
                  label="Platform Commission" 
                  value={`₹${getPlatformCommission().toLocaleString('en-IN')}`} 
                />
                <InfoRow 
                  label="Amount to Transfer" 
                  value={`₹${getTransferAmount().toLocaleString('en-IN')}`} 
                  highlight 
                />
              </div>
            </div>
          </div>

          {/* Transfer Status Display */}
          {transferStatus && (
            <div className={`p-4 rounded-lg mb-6 ${
              transferStatus.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                {transferStatus.type === 'success' ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaExclamationTriangle className="text-red-500 text-xl" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    transferStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {transferStatus.message}
                  </p>
                  {transferStatus.details && (
                    <div className="mt-2 space-y-1">
                      <p className={`text-sm ${
                        transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Amount: ₹{transferStatus.details.amount?.toLocaleString('en-IN')}
                      </p>
                      <p className={`text-sm ${
                        transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Status: {transferStatus.details.status}
                      </p>
                      {transferStatus.details.bankAccount && (
                        <p className={`text-sm ${
                          transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          Account: {transferStatus.details.bankAccount.accountHolderName}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bank Account Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Select Property Owner's Bank Account</h4>
            
            {bankAccountLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading bank accounts...</p>
              </div>
            ) : bankAccounts.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {bankAccounts.map((account, index) => (
                  <div
                    key={account._id || index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedBankAccount?._id === account._id
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => onSelectBankAccount(account)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {account.accountHolderName || 'N/A'}
                          </h4>
                          {account.isVerified ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-semibold rounded-full">
                              Unverified
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <InfoRow label="Account Number" value={account.accountNumber || 'N/A'} />
                          <InfoRow label="Bank Name" value={account.bankName || 'N/A'} />
                          <InfoRow label="Branch" value={account.branchName || 'N/A'} />
                          <InfoRow label="IFSC Code" value={account.ifscCode || account.ifsc || 'N/A'} />
                        </div>
                      </div>
                      <div className="ml-4 pt-1">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedBankAccount?._id === account._id
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedBankAccount?._id === account._id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
                <FaExclamationTriangle className="text-yellow-500 text-2xl mx-auto mb-2" />
                <image src={image} className="" />
                <p className="text-yellow-800 font-semibold">No Bank Accounts Found</p>
                <p className="text-yellow-700 text-sm mt-1">
                  This property owner doesn't have any bank accounts registered yet.
                  Please ask them to add a bank account before proceeding with the transfer.
                </p>
              </div>
            )}
          </div>

          {/* Transfer Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transfer Notes (Optional)
            </label>
            <textarea
              value={transferNotes}
              onChange={(e) => setTransferNotes(e.target.value)}
              placeholder="Add any notes about this manual transfer (e.g., UTR number, transaction reference, etc.)..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
              disabled={transferLoading}
            />
          </div>

          {/* Selected Account Summary */}
          {selectedBankAccount && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Transfer Confirmation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <InfoRow label="Account Holder" value={selectedBankAccount.accountHolderName || 'N/A'} />
                  <InfoRow label="Account Number" value={selectedBankAccount.accountNumber || 'N/A'} />
                  <InfoRow label="Bank Name" value={selectedBankAccount.bankName || 'N/A'} />
                </div>
                <div>
                  <InfoRow label="IFSC Code" value={selectedBankAccount.ifscCode || selectedBankAccount.ifsc || 'N/A'} />
                  <InfoRow 
                    label="Transfer Amount" 
                    value={`₹${getTransferAmount().toLocaleString('en-IN')}`} 
                    highlight 
                  />
                  <InfoRow 
                    label="Verification Status" 
                    value={
                      selectedBankAccount.isVerified 
                        ? 'Verified ✅' 
                        : 'Unverified ⚠️'
                    } 
                  />
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-blue-700 text-sm font-medium">
                  💡 Manual Transfer Note: This action will record the transfer in the system. 
                  Please ensure the actual bank transfer has been completed externally.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={transferLoading}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          {bankAccounts.length > 0 && (
            <button
              onClick={handleProceedTransfer}
              disabled={!selectedBankAccount || transferLoading}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                selectedBankAccount && !transferLoading
                  ? 'bg-[#1e3b8a] text-white hover:bg-blue-700 shadow-sm'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {transferLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Recording Transfer...
                </>
              ) : (
                <>
                  <FaMoneyBillWave />
                  {selectedBankAccount && !selectedBankAccount.isVerified 
                    ? 'Proceed with Unverified Account' 
                    : 'Confirm Manual Transfer'
                  }
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Bookings Component
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingType, setBookingType] = useState("online");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankAccountLoading, setBankAccountLoading] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [showMorePaymentInfo, setShowMorePaymentInfo] = useState(false);

  const fetchBookings = async (type = "online") => {
    try {
      setLoading(true);
      setError("");

      let response;
      if (type === "online") {
        response = await adminBookingsAPI.getAllBookings();
      } else {
        response = await adminBookingsAPI.getOfflineBookings();
      }

      console.log("Bookings API Response:", response);
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        setBookings(response.data);
      } else if (response.data && Array.isArray(response.data.bookings)) {
        setBookings(response.data.bookings);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setBookings(response.data.data);
      } else {
        console.warn("Unexpected response structure:", response.data);
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to fetch bookings. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract accounts from response
  const extractAccountsFromResponse = (response) => {
    let accounts = [];
    if (response.data && response.data.success && Array.isArray(response.data.bankAccounts)) {
      accounts = response.data.bankAccounts;
    } else if (response.data && Array.isArray(response.data)) {
      accounts = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      accounts = response.data.data;
    }
    return accounts;
  };

  const fetchBankAccountsWithFallback = async (booking) => {
    try {
      setBankAccountLoading(true);
      setBankAccounts([]);
      setSelectedBankAccount(null);

      // Extract both propertyId and clientId as fallbacks
      const property = bookingType === "online" 
        ? booking.property || {} 
        : booking.property || booking.propertyId || {};
      
      const propertyId = property._id || property.id;
      const clientId = property.OwnerID || booking.approvedBy || booking.createdBy;

      console.log("Trying with Property ID:", propertyId);
      console.log("Fallback Client ID:", clientId);

      let accounts = [];
      let lastError = null;

      // Try propertyId first (primary approach)
      if (propertyId) {
        try {
          const response = await adminBankAccountsAPI.getBankAccountsByProperty(propertyId);
          accounts = extractAccountsFromResponse(response);
          console.log("Found accounts with propertyId:", accounts.length);
        } catch (error) {
          console.log("Failed with propertyId:", error.message);
          lastError = error;
        }
      }

      // If no accounts found with propertyId, try clientId as fallback
      if (accounts.length === 0 && clientId) {
        try {
          console.log("Trying fallback with Client ID:", clientId);
          const response = await adminBankAccountsAPI.getBankAccountsByClient(clientId);
          accounts = extractAccountsFromResponse(response);
          console.log("Found accounts with clientId:", accounts.length);
        } catch (error) {
          console.log("Failed with clientId:", error.message);
          lastError = error;
        }
      }

      // Process the accounts
      const verifiedAccounts = accounts.filter(acc => acc.isVerified === true);
      const unverifiedAccounts = accounts.filter(acc => !acc.isVerified || acc.isVerified === false);
      const sortedAccounts = [...verifiedAccounts, ...unverifiedAccounts];

      setBankAccounts(sortedAccounts);

      if (sortedAccounts.length > 0) {
        const accountToSelect = verifiedAccounts[0] || sortedAccounts[0];
        setSelectedBankAccount(accountToSelect);
      }

      return sortedAccounts;

    } catch (err) {
      console.error("Error in fetchBankAccountsWithFallback:", err);
      setBankAccounts([]);
      throw err;
    } finally {
      setBankAccountLoading(false);
    }
  };

  const handleTransferClick = async (booking) => {
    try {
      console.log("Transfer initiated for booking:", booking);

      // Show transfer popup
      setSelectedBooking(booking);
      setShowTransferPopup(true);
      
      // Use the enhanced function with fallbacks
      const accounts = await fetchBankAccountsWithFallback(booking);
      
      if (accounts.length === 0) {
        const property = bookingType === "online" 
          ? booking.property || {} 
          : booking.property || booking.propertyId || {};
        const propertyName = property.name || "this property";
        alert(`No bank accounts found for ${propertyName}`);
      }

    } catch (error) {
      console.error("Transfer process failed:", error);
      alert(`Failed to fetch bank accounts: ${error.message}`);
    }
  };

  const handleProceedWithTransfer = async () => {
    if (!selectedBankAccount) {
      alert("Please select a bank account to proceed with the transfer.");
      return;
    }

    try {
      console.log("Proceeding with manual transfer to:", selectedBankAccount);
      
      const transferData = {
        bookingId: selectedBooking._id || selectedBooking.id,
        bankAccountId: selectedBankAccount._id,
        notes: `Manual transfer for booking ${selectedBooking._id || selectedBooking.id}`
      };

      // Call the manual transfer API
      const response = await adminPaymentsAPI.initiateManualTransfer(transferData);
      
      if (response.data && response.data.success) {
        alert(`${response.data.message}\n\nAmount: ₹${response.data.transferDetails.amount}\nAccount: ${response.data.transferDetails.bankAccount.accountHolderName}\nStatus: ${response.data.transferDetails.status}`);
        
        // Refresh bookings to update status
        fetchBookings(bookingType);
        
        setShowTransferPopup(false);
        setSelectedBankAccount(null);
        setSelectedBooking(null); // Go back to main list
      } else {
        alert(`Transfer failed: ${response.data?.message || 'Unknown error'}`);
      }
      
    } catch (error) {
      console.error(" Transfer failed:", error);
      alert(`Transfer failed: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchBookings(bookingType);
  }, [bookingType]);

  const getStatusBadge = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "approved":
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Tenant information
    const tenant = bookingType === "online" 
      ? booking.user || {} 
      : (typeof booking.tenant === "object" ? booking.tenant : { 
          name: booking.tenant,
          phone: booking.tenantPhone,
          email: booking.tenantEmail,
          clientId: booking.tenantClientId
        });
    
    // Property information
    const property = bookingType === "online" 
      ? booking.property || {} 
      : booking.propertyId || {};
    
    // Client IDs for search
    const tenantClientId = tenant.clientId || "";
    const propertyOwnerId = booking.clientId;

    return (
      (tenant.name || "").toLowerCase().includes(searchLower) ||
      (tenant.email || "").toLowerCase().includes(searchLower) ||
      (tenant.phone || "").toString().includes(searchTerm) ||
      (property.name || "").toLowerCase().includes(searchLower) ||
      tenantClientId.toLowerCase().includes(searchLower) ||
      propertyOwnerId.toLowerCase().includes(searchLower) ||
      (booking._id || "").toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading bookings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-sm">
          {/* <div className="text-red-500 text-2xl mb-2">⚠️</div> */}
          <div>
            <image src={image} className="w-full h-auto" />
          </div>
          <h2 className="text-lg text-red-600 mb-2 font-semibold">Failed to load bookings</h2>
          <p className="text-gray-600 mb-3 text-sm">{error}</p>
          <button
            onClick={() => fetchBookings(bookingType)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <h2 className="text-lg text-gray-600 mb-2 font-semibold">No Bookings Found</h2>
          <p className="text-gray-500 text-sm mb-4">
            {bookingType === "online" 
              ? "No online bookings available." 
              : "No offline bookings available."}
          </p>
          <button
            onClick={() => fetchBookings(bookingType)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // ---------- View Details Card ----------
  if (selectedBooking) {
    const tenant = bookingType === "online"
      ? selectedBooking.user || {}
      : (typeof selectedBooking.tenant === "object" 
          ? selectedBooking.tenant 
          : { name: selectedBooking.tenant });
    
    const property = bookingType === "online" 
      ? selectedBooking.property || {} 
      : selectedBooking.propertyId || {};
      
    const room = bookingType === "online"
      ? selectedBooking.roomDetails?.[0] || {}
      : selectedBooking.roomDetails || {};

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSelectedBooking(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200  px-4 py-2.5 rounded-lg  hover:shadow-md border border-gray-100"
            >
              <FaArrowLeft className="text-sm" /> Back to Bookings
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleTransferClick(selectedBooking)}
                className="flex items-center gap-2 bg-[#1e3b8a] text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <FaAngleDoubleRight className="text-sm" />
                Transfer
              </button>
            </div>
          </div>

          <div className=" rounded-2xl  border-2 border-gray-200 overflow-hidden">
            <div className="bg-[#1e3b8a] p-6 text-white">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <p className="text-blue-100 mt-1">Booking ID: {selectedBooking._id || selectedBooking.id || "N/A"}</p>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tenant Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaUser className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Tenant Information</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow label="Name" value={tenant.name || "N/A"} />
                  <InfoRow label="Email" value={tenant.email || "N/A"} />
                  <InfoRow label="Phone" value={tenant.phone || "N/A"} />
                  <InfoRow label="Tenant Client ID" value={tenant.clientId || "N/A"} />
                </div>
              </div>

              {/* Property Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaHome className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Property Information</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow label="Property Name" value={property.name || "N/A"} />
                  <InfoRow label="Address" value={property.locality || property.address || "N/A"} />
                  <InfoRow label="Room No/ID" value={room.roomNumber || room.roomIdentifier || "N/A"} />
                  <InfoRow label="Room Type/Sharing" value={room.sharingType || room.roomType || selectedBooking.roomType || "N/A"} />
                  <InfoRow label="Property Owner ID" value={selectedBooking.clientId || "N/A"} />
                  <InfoRow label="Property ID" value={property._id || property.id || "N/A"} />
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaCalendarAlt className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Booking Information</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow 
                    label="Move In" 
                    value={new Date(selectedBooking.checkInDate || selectedBooking.moveInDate).toLocaleDateString()} 
                  />
                  <InfoRow 
                    label="Move Out" 
                    value={new Date(selectedBooking.checkOutDate || selectedBooking.moveOutDate).toLocaleDateString()} 
                  />
                  <InfoRow
                    label="Status"
                    value={
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(selectedBooking.status || selectedBooking.bookingStatus)}`}>
                        {(selectedBooking.status || selectedBooking.bookingStatus || "N/A")?.toUpperCase()}
                      </span>
                    }
                  />
                  <InfoRow label="Booking ID" value={selectedBooking._id || selectedBooking.id || "N/A"} />
                  <InfoRow 
                    label="Approved At" 
                    value={selectedBooking.approvedAt 
                      ? new Date(selectedBooking.approvedAt).toLocaleString() 
                      : "N/A"} 
                  />
                </div>
              </div>

              {/* Payment & Additional Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaMoneyBillWave className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Payment & Additional Info</h3>
                </div>

                <div className="space-y-3">
                  <InfoRow label="Payment Status" value={selectedBooking.paymentStatus || "N/A"} />
                  <InfoRow 
                    label="Amount Paid" 
                    value={selectedBooking.paymentInfo?.paidAmount 
                      ? `₹${selectedBooking.paymentInfo.paidAmount}` 
                      : "N/A"} 
                  />
                  <InfoRow 
                    label="Total Amount" 
                    value={selectedBooking.pricing?.totalAmount 
                      ? `₹${selectedBooking.pricing.totalAmount}` 
                      : "N/A"} 
                  />
                  <InfoRow label="Payment Method" value={selectedBooking.paymentInfo?.paymentMethod || "N/A"} />
                  <InfoRow label="Transaction ID" value={selectedBooking.paymentInfo?.transactionId || "N/A"} />
                  <InfoRow 
                    label="Payment Date" 
                    value={
                      selectedBooking.paymentInfo?.paymentDate
                        ? new Date(selectedBooking.paymentInfo.paymentDate).toLocaleString()
                        : "N/A"
                    }
                  />

                  {/* Additional fields - conditionally rendered */}
                  {showMorePaymentInfo && (
                    <div className="space-y-3 border-t border-gray-200 pt-3">
                      <InfoRow label="Transfer Status" value={selectedBooking.transferStatus || "N/A"} />
                      <InfoRow 
                        label="Client Amount" 
                        value={
                          selectedBooking.transferDetails?.clientAmount
                            ? `₹${selectedBooking.transferDetails.clientAmount}`
                            : "N/A"
                        } 
                      />
                      <InfoRow 
                        label="Platform Commission" 
                        value={
                          selectedBooking.transferDetails?.platformCommission
                            ? `₹${selectedBooking.transferDetails.platformCommission}`
                            : "N/A"
                        } 
                      />
                      <InfoRow 
                        label="GST on Commission" 
                        value={
                          selectedBooking.transferDetails?.gstOnCommission
                            ? `₹${selectedBooking.transferDetails.gstOnCommission}`
                            : "N/A"
                        } 
                      />
                      <InfoRow 
                        label="Total Platform Earnings" 
                        value={
                          selectedBooking.transferDetails?.totalPlatformEarnings
                            ? `₹${selectedBooking.transferDetails.totalPlatformEarnings}`
                            : "N/A"
                        } 
                      />
                      <InfoRow label="Transfer Notes" value={selectedBooking.transferDetails?.transferNotes || "N/A"} />
                      <InfoRow label="Booking Source" value={bookingType} />
                    </div>
                  )}

                  {/* Toggle button */}
                  <button
                    onClick={() => setShowMorePaymentInfo(!showMorePaymentInfo)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors mt-2"
                  >
                    {showMorePaymentInfo ? (
                      <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
                        <span className="opacity-50 hover:opacity-100">Show Less</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
                        <span>Show More Payment Details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Popup */}
        {showTransferPopup && (
          <TransferPopup
            booking={selectedBooking}
            bankAccounts={bankAccounts}
            bankAccountLoading={bankAccountLoading}
            selectedBankAccount={selectedBankAccount}
            onSelectBankAccount={setSelectedBankAccount}
            onProceed={handleProceedWithTransfer}
            onClose={() => {
              setShowTransferPopup(false);
              setSelectedBankAccount(null);
            }}
            onTransferComplete={(transferDetails) => {
              console.log('Transfer completed:', transferDetails);
              // Refresh data
              fetchBookings(bookingType);
            }}
          />
        )}
      </div>
    );
  }

  // ---------- Main Page & Table ----------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 border border-gray-300 px-10 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition text-sm"
              >
                <FaBars className="text-gray-600" />
                {bookingType === "online" ? "Online Bookings" : "Offline Bookings"}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      bookingType === "online" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setBookingType("online");
                      setMenuOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Online Bookings
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      bookingType === "offline" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setBookingType("offline");
                      setMenuOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Offline Bookings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tenant Client ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tenant Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property Owner ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {bookingType === "online" ? "Room No" : "Room ID"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {bookingType === "online" ? "Room Type" : "Sharing"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Move In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Move Out
                  </th>
                  <th className="px-6py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBookings.map((booking) => {
                  const room = bookingType === "online"
                    ? booking.roomDetails?.[0] || {}
                    : booking.roomDetails || {};
                  const property = bookingType === "online" 
                    ? booking.property || {} 
                    : booking.propertyId || {};
                  const tenant = bookingType === "online"
                    ? booking.user || {}
                    : (typeof booking.tenant === "object" 
                        ? booking.tenant 
                        : { name: booking.tenant });
                  
                  const tenantClientId = tenant.clientId || "N/A";
                  const propertyOwnerId = booking.clientId || "N/A";

                  return (
                    <tr 
                      key={booking._id || booking.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenantClientId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenant.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenant.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {propertyOwnerId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.roomNumber || room.roomIdentifier || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {room.sharingType || room.roomType || booking.roomType || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(booking.checkInDate || booking.moveInDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(booking.checkOutDate || booking.moveOutDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            booking.status || booking.bookingStatus
                          )}`}
                        >
                          {(booking.status || booking.bookingStatus || "N/A")?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                          }}
                          className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 px-2">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredBookings.length)} of{" "}
              {filteredBookings.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded border ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 text-sm rounded border ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded border ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;