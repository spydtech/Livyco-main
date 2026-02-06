// import React, { useState, useEffect } from "react";
// import { FaArrowRight, FaArrowLeft, FaChevronDown, FaTimes, FaCopy, FaPrint, FaBuilding, FaCalendar, FaUser, FaMapMarkerAlt, FaBed, FaMoneyBill, FaReceipt } from "react-icons/fa";
// import bgimage from "../../assets/user/pgsearch/image (5).png";
// import { useNavigate } from "react-router-dom";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { manualTransferAPI } from "../PropertyController";
// import { bookingAPI } from "../../Clients-components/PropertyController";

// export default function ClientWalletHistory() {
//   const [amount, setAmount] = useState("");
//   const [showHistory, setShowHistory] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [transactionHistory, setTransactionHistory] = useState([]);
//   const [balance, setBalance] = useState("₹0.00");
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showTransactionModal, setShowTransactionModal] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const navigate = useNavigate();

//   const recommendedAmounts = [1000, 500, 100];

//   // Function to get client ID from localStorage
//   const getClientId = () => {
//     try {
//       // First try to get from localStorage user object
//       const userData = localStorage.getItem("user");
//       if (userData) {
//         const user = JSON.parse(userData);
//         console.log("User data from localStorage:", user);
        
//         // Use the MongoDB _id from user object (this is the correct one)
//         if (user.id) {
//           console.log("Using MongoDB ID from user object:", user.id);
//           return user.id;
//         }
        
//         // Fallback to localStorage items
//         const clientId = localStorage.getItem("clientId") || 
//                         localStorage.getItem("userId") || 
//                         localStorage.getItem("_id");
        
//         if (clientId) {
//           console.log("Using ID from localStorage items:", clientId);
//           return clientId;
//         }
//       }
      
//       // Check sessionStorage as fallback
//       const sessionUserData = sessionStorage.getItem("user");
//       if (sessionUserData) {
//         const sessionUser = JSON.parse(sessionUserData);
//         if (sessionUser.id) {
//           console.log("Using ID from sessionStorage:", sessionUser.id);
//           return sessionUser.id;
//         }
//       }
      
//       console.error("No client ID found in storage");
//       return null;
      
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (showHistory) {
//       fetchPaymentHistory();
//     }
//   }, [showHistory]);

//   const handleRecommendedClick = (value) => {
//     setAmount(value);
//   };

//   const fetchPaymentHistory = async () => {
//     setLoading(true);
//     setError("");
    
//     try {
//       // Get client ID using the function
//       const clientId = getClientId();
      
//       if (!clientId) {
//         setError("Please login to view your transaction history");
//         setLoading(false);
//         return;
//       }
      
//       console.log("🔍 Fetching payment history for client ID:", clientId);
//       console.log("📊 Full localStorage for debugging:", localStorage);
      
//       // Extract additional user info for debugging
//       const userData = localStorage.getItem("user");
//       if (userData) {
//         const user = JSON.parse(userData);
//         console.log("👤 User details:", {
//           id: user.id,
//           clientId: user.clientId,
//           name: user.name,
//           phone: user.phone
//         });
//       }
      
//       // Call your actual API - pass the MongoDB ObjectId
//       const response = await manualTransferAPI.getPaymentsByClient(clientId);
      
//       console.log("✅ API Response:", response.data);
      
//       if (response.data.success) {
//         // Transform API data to match your UI structure
//         const transformedData = response.data.data.map((payment, index) => {
//           // Determine if it's received or sent based on payment type
//           const isReceived = payment.type === 'credit' || 
//                             payment.paymentType === 'deposit' || 
//                             payment.transferType === 'incoming';
          
//           return {
//             id: payment._id || payment.id || index + 1,
//             bookingId: payment.bookingId, // Make sure this field exists in your API response
//             type: isReceived ? "received" : "sent",
//             from: payment.from || "Platform Payment",
//             to: payment.to || payment.recipientName || "",
//             amount: `₹${payment.amount || payment.netAmount || 0}`,
//             date: formatDate(payment.createdAt || payment.date),
//             originalAmount: payment.originalAmount || payment.amount,
//             transactionReference: payment.transactionId || payment.referenceId || "N/A",
//             utrNumber: payment.utr || payment.transactionReference || "",
//             status: payment.status || "completed",
//             createdAt: payment.createdAt || payment.date,
//             // Add detailed information for display
//             details: {
//               platformCommission: payment.platformCommission || 0,
//               gstOnCommission: payment.gstOnCommission || 0,
//               netAmount: payment.netAmount || payment.amount,
//               bankName: payment.bankDetails?.bankName || payment.bankName || "N/A",
//               accountHolder: payment.bankDetails?.accountHolderName || payment.accountHolderName || "N/A",
//               accountNumber: payment.bankDetails?.accountNumber || payment.accountNumber || "N/A",
//               ifscCode: payment.bankDetails?.ifscCode || payment.ifsc || "N/A",
//               paymentMode: payment.paymentMode || "Bank Transfer"
//             }
//           };
//         });
        
//         console.log(`📈 Transformed ${transformedData.length} transactions`);
//         setTransactionHistory(transformedData);
        
//         // Calculate total balance from transactions
//         if (transformedData.length > 0) {
//           let totalBalance = 0;
//           transformedData.forEach(transaction => {
//             if (transaction.type === "received") {
//               const amountNum = parseFloat(transaction.amount.replace('₹', '').replace(',', ''));
//               totalBalance += amountNum;
//             } else if (transaction.type === "sent") {
//               const amountNum = parseFloat(transaction.amount.replace('₹', '').replace(',', ''));
//               totalBalance -= amountNum;
//             }
//           });
//           setBalance(`₹${Math.max(totalBalance, 0).toFixed(2)}`);
//         }
        
//       } else {
//         setError(response.data.message || "Failed to fetch payment history");
//         // Fallback to manual transfers API if payments API doesn't work
//         fetchManualTransfers(clientId);
//       }
      
//     } catch (error) {
//       console.error("❌ Error fetching payment history:", error);
      
//       // Get client ID for manual transfers fallback
//       const clientId = getClientId();
      
//       if (clientId) {
//         fetchManualTransfers(clientId);
//       } else {
//         setError(error.response?.data?.message || error.message || "Failed to load transaction history");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback function to fetch manual transfers
//   const fetchManualTransfers = async (clientId) => {
//     try {
//       console.log("🔄 Trying manual transfers API for client:", clientId);
      
//       const response = await manualTransferAPI.getManualTransfersByClient(clientId, {
//         page: 1,
//         limit: 50,
//         status: "completed"
//       });
      
//       console.log("📋 Manual Transfers API Response:", response.data);
      
//       if (response.data.success && response.data.data?.transfers) {
//         const transformedData = response.data.data.transfers.map((transfer, index) => ({
//           id: transfer._id || index + 1,
//           bookingId: transfer.bookingId, // Extract bookingId from manual transfers
//           type: "received", // Manual transfers are always received by client
//           from: "Platform Payment",
//           to: "",
//           amount: `₹${transfer.transferAmount || transfer.originalAmount || 0}`,
//           date: formatDate(transfer.createdAt),
//           originalAmount: transfer.originalAmount,
//           transactionReference: transfer.transactionReference || "N/A",
//           utrNumber: transfer.utrNumber || "",
//           status: transfer.status || "completed",
//           createdAt: transfer.createdAt,
//           details: {
//             platformCommission: transfer.platformCommission || 0,
//             gstOnCommission: transfer.gstOnCommission || 0,
//             netAmount: transfer.transferAmount || transfer.originalAmount,
//             bankName: transfer.bankDetails?.bankName || "N/A",
//             accountHolder: transfer.bankDetails?.accountHolderName || transfer.clientName || "N/A",
//             accountNumber: transfer.bankDetails?.accountNumber || "N/A",
//             ifscCode: transfer.bankDetails?.ifscCode || "N/A",
//             paymentMode: transfer.paymentMode || "Bank Transfer"
//           }
//         }));
        
//         setTransactionHistory(transformedData);
        
//         // Calculate total balance from manual transfers
//         if (transformedData.length > 0) {
//           const totalBalance = transformedData.reduce((sum, transaction) => {
//             const amountNum = parseFloat(transaction.amount.replace('₹', '').replace(',', ''));
//             return sum + amountNum;
//           }, 0);
//           setBalance(`₹${totalBalance.toFixed(2)}`);
//         }
//       } else {
//         setError("No transaction data available");
//       }
//     } catch (manualError) {
//       console.error("❌ Manual transfers API also failed:", manualError);
//       setError("Unable to load transaction history. Please try again later.");
//     }
//   };

//   const formatDate = (dateString) => {
//     try {
//       if (!dateString) return "N/A";
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric'
//       });
//     } catch (error) {
//       return "N/A";
//     }
//   };

//   const formatDateTime = (dateString) => {
//     try {
//       if (!dateString) return "N/A";
//       const date = new Date(dateString);
//       return date.toLocaleString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit'
//       });
//     } catch (error) {
//       return "N/A";
//     }
//   };

//   const formatCurrency = (amount) => {
//     if (!amount && amount !== 0) return "₹0.00";
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   const fetchBookingDetails = async (bookingId) => {
//     if (!bookingId) return;
    
//     setBookingLoading(true);
//     try {
//       console.log("📋 Fetching booking details for:", bookingId);
//       const response = await bookingAPI.getBookingById(bookingId);
      
//       if (response.data?.success) {
//         console.log("✅ Booking details fetched:", response.data.booking);
//         setBookingDetails(response.data.booking);
//       } else {
//         console.warn("⚠️ No booking details found for ID:", bookingId);
//         setBookingDetails(null);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching booking details:", error);
//       setBookingDetails(null);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const handleTransactionClick = async (transaction) => {
//     setSelectedTransaction(transaction);
//     setShowTransactionModal(true);
    
//     // Fetch booking details if transaction has a bookingId
//     if (transaction.bookingId) {
//       await fetchBookingDetails(transaction.bookingId);
//     } else {
//       setBookingDetails(null);
//     }
//   };

//   const closeTransactionModal = () => {
//     setShowTransactionModal(false);
//     setSelectedTransaction(null);
//     setBookingDetails(null);
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert("Copied to clipboard!");
//     }).catch(err => {
//       console.error('Failed to copy:', err);
//     });
//   };

//   const printTransaction = () => {
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Transaction Receipt</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             .receipt-header { text-align: center; margin-bottom: 30px; }
//             .receipt-header h2 { color: #1a56db; margin: 0; }
//             .receipt-details { width: 100%; border-collapse: collapse; }
//             .receipt-details td { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
//             .receipt-details td:first-child { font-weight: bold; color: #4b5563; width: 40%; }
//             .amount { font-size: 24px; font-weight: bold; margin: 20px 0; }
//             .received { color: #1a56db; }
//             .sent { color: #dc2626; }
//             .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
//             .completed { background: #dbeafe; color: #1a56db; }
//             .booking-section { margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 8px; }
//             .booking-title { font-weight: bold; margin-bottom: 10px; color: #374151; }
//             .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
//             @media print {
//               body { padding: 0; }
//               button { display: none; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="receipt-header">
//             <h2>Transaction Receipt</h2>
//             <p>${formatDateTime(selectedTransaction?.createdAt)}</p>
//           </div>
          
//           <div class="amount ${selectedTransaction?.type}">
//             ${selectedTransaction?.type === 'received' ? '+' : '-'} ${selectedTransaction?.amount}
//           </div>
          
//           <table class="receipt-details">
//             <tr>
//               <td>Transaction ID:</td>
//               <td>${selectedTransaction?.transactionReference}</td>
//             </tr>
//             <tr>
//               <td>UTR Number:</td>
//               <td>${selectedTransaction?.utrNumber || 'N/A'}</td>
//             </tr>
//             <tr>
//               <td>Status:</td>
//               <td>
//                 <span class="status ${selectedTransaction?.status}">
//                   ${selectedTransaction?.status}
//                 </span>
//               </td>
//             </tr>
//             <tr>
//               <td>Type:</td>
//               <td>${selectedTransaction?.type === 'received' ? 'Credit' : 'Debit'}</td>
//             </tr>
//             <tr>
//               <td>${selectedTransaction?.type === 'received' ? 'Received from:' : 'Sent to:'}</td>
//               <td>${selectedTransaction?.type === 'received' ? selectedTransaction?.from : selectedTransaction?.to}</td>
//             </tr>
//             <tr>
//               <td>Bank Name:</td>
//               <td>${selectedTransaction?.details?.bankName}</td>
//             </tr>
//             <tr>
//               <td>Account Holder:</td>
//               <td>${selectedTransaction?.details?.accountHolder}</td>
//             </tr>
//             <tr>
//               <td>Original Amount:</td>
//               <td>₹${selectedTransaction?.originalAmount || 'N/A'}</td>
//             </tr>
//             <tr>
//               <td>Platform Commission:</td>
//               <td>₹${selectedTransaction?.details?.platformCommission || '0.00'}</td>
//             </tr>
//             <tr>
//               <td>GST on Commission:</td>
//               <td>₹${selectedTransaction?.details?.gstOnCommission || '0.00'}</td>
//             </tr>
//             <tr>
//               <td>Net Amount:</td>
//               <td>${selectedTransaction?.amount}</td>
//             </tr>
//           </table>
          
//           ${bookingDetails ? `
//           <div class="booking-section">
//             <div class="booking-title">Booking Information</div>
//             <table class="receipt-details">
//               <tr>
//                 <td>Property:</td>
//                 <td>${bookingDetails?.property?.name || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Location:</td>
//                 <td>${bookingDetails?.property?.locality || ''} ${bookingDetails?.property?.city || ''}</td>
//               </tr>
//               <tr>
//                 <td>Room Type:</td>
//                 <td>${bookingDetails?.roomType || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Move-in Date:</td>
//                 <td>${formatDate(bookingDetails?.moveInDate)}</td>
//               </tr>
//               <tr>
//                 <td>Move-out Date:</td>
//                 <td>${formatDate(bookingDetails?.moveOutDate)}</td>
//               </tr>
//               <tr>
//                 <td>Booking Status:</td>
//                 <td>${bookingDetails?.bookingStatus || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Payment Status:</td>
//                 <td>${bookingDetails?.paymentStatus || 'N/A'}</td>
//               </tr>
//             </table>
//           </div>
//           ` : ''}
          
//           <div class="footer">
//             <p>Thank you for your transaction!</p>
//             <p>Generated on ${new Date().toLocaleDateString('en-IN')}</p>
//           </div>
          
//           <script>
//             window.onload = function() {
//               window.print();
//               setTimeout(() => window.close(), 1000);
//             }
//           </script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   // Debug function to show what's in localStorage
//   const debugStorage = () => {
//     console.log('🔍 DEBUG - localStorage contents:');
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       const value = localStorage.getItem(key);
//       console.log(`${key}:`, value);
//     }
    
//     // Show parsed user data
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         console.log('👤 Parsed user object:', user);
//         console.log('📌 MongoDB ID to use:', user.id);
//         console.log('🏷️ Client ID (not to use):', user.clientId);
//       } catch (e) {
//         console.error('Error parsing user data:', e);
//       }
//     }
//   };

//   // Call debug on component mount
//   useEffect(() => {
//     debugStorage();
//   }, []);

//   const handleProceed = () => {
//     if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
//       alert(`Proceeding to add ₹${amount} to wallet`);
//       // Add your payment gateway integration here
//     } else {
//       alert("Please enter a valid amount");
//     }
//   };

//   return (
//     <>
//       <ClientNav />
//       <div
//         className="flex justify-center items-center min-h-screen px-4 "
//         style={{
//           backgroundImage: `url(${bgimage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="fixed absolute top-32 left-8 text-lg text-gray-700 flex gap-1">
//           <span
//             onClick={() => navigate("/client/home")}
//             className="cursor-pointer hover:underline"
//           >
//             Home
//           </span>
//           <span>/</span>
//           <span className="cursor-pointer hover:underline">
//             Payments
//           </span>
//         </div>
        

//         <div className="bg-[#F8F8FF] w-full max-w-7xl h-[70vh] rounded-2xl border border-black p-8 shadow-lg -mt-[10%] overflow-auto ">
//           {/* Header */}
//           <h2 className="text-xl font-semibold text-blue-700 mb-2">
//             Current Balance
//           </h2>

//           {/* Current Balance */}
//           <div className="text-3xl font-bold text-gray-800 mb-6">{balance}</div>

//           {/* Input */}
//           <label className="block text-gray-600 text-sm mb-2">
//             Add Money to Wallet
//           </label>
//           <div className="flex mb-4">
//             <input
//               type="number"
//               placeholder="₹ Enter Amount"
//               className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               min="1"
//             />
//             <button 
//               onClick={handleProceed}
//               className="bg-blue-700 text-white px-6 py-2 rounded-r-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={!amount || isNaN(amount) || parseFloat(amount) <= 0}
//             >
//               Proceed
//             </button>
//           </div>

//           {/* Recommended */}
//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm mb-2">
//               Recommended
//             </label>
//             <div className="flex gap-2">
//               {recommendedAmounts.map((amt) => (
//                 <button
//                   key={amt}
//                   onClick={() => handleRecommendedClick(amt)}
//                   className={`border rounded-lg px-4 py-2 text-sm hover:bg-gray-100 ${
//                     amount === amt.toString() 
//                       ? 'border-blue-500 bg-blue-50 text-blue-700' 
//                       : 'border-gray-300'
//                   }`}
//                 >
//                   ₹{amt}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600 text-sm">{error}</p>
//               <button 
//                 onClick={fetchPaymentHistory}
//                 className="mt-2 text-red-700 underline text-xs"
//               >
//                 Try Again
//               </button>
//               <button 
//                 onClick={debugStorage}
//                 className="mt-2 ml-4 text-blue-700 underline text-xs"
//               >
//                 Debug Storage
//               </button>
//             </div>
//           )}

//           {/* Wallet Transaction History */}
//           <div>
//             <button
//               onClick={() => setShowHistory(!showHistory)}
//               className="flex items-center text-gray-600 text-sm mb-4 w-full text-left hover:text-blue-700"
//             >
//               Wallet Transaction History
//               <FaChevronDown
//                 className={`ml-2 transition-transform duration-300 ${
//                   showHistory ? "rotate-180" : ""
//                 }`}
//               />
//               {loading && (
//                 <span className="ml-2 text-xs text-blue-600">Loading...</span>
//               )}
//             </button>

//             {showHistory && (
//               <div className="space-y-4">
//                 {loading ? (
//                   <div className="text-center py-8">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
//                     <p className="mt-2 text-gray-600">Loading transactions...</p>
//                   </div>
//                 ) : transactionHistory.length > 0 ? (
//                   <>
//                     <div className="text-sm text-gray-500 mb-2">
//                       Showing {transactionHistory.length} transaction(s)
//                     </div>
//                     {transactionHistory.map((item) => (
//                       <div
//                         key={item.id}
//                         onClick={() => handleTransactionClick(item)}
//                         className={`flex items-center justify-between border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 ${
//                           item.type === "received" 
//                             ? "border-blue-200 bg-blue-50 hover:bg-blue-100" 
//                             : "border-red-200 bg-red-50 hover:bg-red-100"
//                         }`}
//                         title="Click to view details"
//                       >
//                         {/* Left Section */}
//                         <div className="flex items-center gap-3 w-1/3">
//                           <div className={`rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm ${
//                             item.type === "received" 
//                               ? "bg-blue-600 text-white" 
//                               : "bg-red-600 text-white"
//                           }`}>
//                             {item.type === "received" ? "IN" : "OUT"}
//                           </div>
//                           <div className="flex flex-col">
//                             <span className="text-xs text-gray-500">
//                               {item.type === "received" ? "Received from" : "Sent to"}
//                             </span>
//                             <span className="text-sm text-gray-800 font-semibold">
//                               {item.type === "received" ? item.from : item.to}
//                             </span>
//                             {/* {item.transactionReference && item.transactionReference !== "N/A" && (
//                               <span className="text-xs text-gray-500 mt-1">
//                                 Ref: {item.transactionReference}
//                               </span>
//                             )}
//                             {item.bookingId && (
//                               <span className="text-xs text-blue-600 mt-1 flex items-center gap-1">
//                                 <FaBuilding size={10} /> Booking Linked
//                               </span>
//                             )} */}
//                           </div>
//                         </div>

//                         {/* Arrow Section with Circle */}
//                         <div className="flex justify-center items-center w-1/6">
//                           <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
//                             item.type === "received" 
//                               ? "bg-blue-100" 
//                               : "bg-red-100"
//                           }`}>
//                             {item.type === "received" ? (
//                               <FaArrowRight className="text-blue-600 text-lg transform -rotate-45" />
//                             ) : (
//                               <FaArrowLeft className="text-red-600 text-lg transform rotate-45" />
//                             )}
//                           </div>
//                         </div>

//                         {/* Right Section */}
//                         <div className="flex flex-col items-end w-1/3">
//                           <span className={`font-bold ${
//                             item.type === "received" 
//                               ? "text-blue-700" 
//                               : "text-red-700"
//                           }`}>
//                             {item.type === "received" ? "+" : "-"} {item.amount}
//                           </span>
//                           <span className="text-xs text-gray-500">{item.date}</span>
//                           <span className={`text-xs mt-1 px-2 py-1 rounded-full ${
//                             item.status === 'completed' 
//                               ? 'bg-blue-100 text-blue-800' 
//                               : item.status === 'pending' 
//                                 ? 'bg-yellow-100 text-yellow-800' 
//                                 : 'bg-red-100 text-red-800'
//                           }`}>
//                             {item.status}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
//                     <p className="text-gray-500">No transaction history found</p>
//                     <button 
//                       onClick={fetchPaymentHistory}
//                       className="mt-2 text-blue-600 underline text-sm"
//                     >
//                       Refresh
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Transaction Details Modal */}
//       {showTransactionModal && selectedTransaction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Transaction Details
//               </h2>
//               <button
//                 onClick={closeTransactionModal}
//                 className="text-gray-500 hover:text-gray-700 text-xl"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               {/* Amount Display */}
//               <div className={`text-center mb-6 ${
//                 selectedTransaction.type === 'received' 
//                   ? 'text-blue-700' 
//                   : 'text-red-600'
//               }`}>
//                 <div className="text-3xl font-bold mb-2">
//                   {selectedTransaction.type === 'received' ? '+' : '-'} {selectedTransaction.amount}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   {selectedTransaction.type === 'received' ? 'Amount Received' : 'Amount Sent'}
//                 </div>
//               </div>

//               {/* Transaction Details Grid */}
//               <div className="space-y-4">
//                 {/* Reference ID */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Transaction ID:</span>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium text-gray-800">
//                       {selectedTransaction.transactionReference}
//                     </span>
//                     <button 
//                       onClick={() => copyToClipboard(selectedTransaction.transactionReference)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Copy to clipboard"
//                     >
//                       <FaCopy size={14} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* UTR Number */}
//                 {selectedTransaction.utrNumber && selectedTransaction.utrNumber !== "N/A" && (
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">UTR Number:</span>
//                     <div className="flex items-center gap-2">
//                       <span className="font-medium text-gray-800">
//                         {selectedTransaction.utrNumber}
//                       </span>
//                       <button 
//                         onClick={() => copyToClipboard(selectedTransaction.utrNumber)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title="Copy to clipboard"
//                       >
//                         <FaCopy size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Status */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Status:</span>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     selectedTransaction.status === 'completed' 
//                       ? 'bg-blue-100 text-blue-800' 
//                       : selectedTransaction.status === 'pending' 
//                         ? 'bg-yellow-100 text-yellow-800' 
//                         : 'bg-red-100 text-red-800'
//                   }`}>
//                     {selectedTransaction.status.toUpperCase()}
//                   </span>
//                 </div>

//                 {/* Type */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Transaction Type:</span>
//                   <span className={`font-medium ${
//                     selectedTransaction.type === 'received' 
//                       ? 'text-blue-700' 
//                       : 'text-red-600'
//                   }`}>
//                     {selectedTransaction.type === 'received' ? 'Credit' : 'Debit'}
//                   </span>
//                 </div>

//                 {/* From/To */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">
//                     {selectedTransaction.type === 'received' ? 'Received from:' : 'Sent to:'}
//                   </span>
//                   <span className="font-medium text-gray-800">
//                     {selectedTransaction.type === 'received' 
//                       ? selectedTransaction.from 
//                       : selectedTransaction.to}
//                   </span>
//                 </div>

//                 {/* Date & Time */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Date & Time:</span>
//                   <span className="font-medium text-gray-800">
//                     {formatDateTime(selectedTransaction.createdAt)}
//                   </span>
//                 </div>

//                 {/* Bank Details */}
//                 <div className="pt-4 border-t">
//                   <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <FaReceipt /> Bank Details
//                   </h3>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Bank Name:</span>
//                       <span className="font-medium text-gray-800">
//                         {selectedTransaction.details?.bankName}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Account Holder:</span>
//                       <span className="font-medium text-gray-800">
//                         {selectedTransaction.details?.accountHolder}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Account Number:</span>
//                       <span className="font-medium text-gray-800">
//                         {selectedTransaction.details?.accountNumber}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">IFSC Code:</span>
//                       <span className="font-medium text-gray-800">
//                         {selectedTransaction.details?.ifscCode}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Payment Mode:</span>
//                       <span className="font-medium text-gray-800">
//                         {selectedTransaction.details?.paymentMode}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Amount Breakdown */}
//                 <div className="pt-4 border-t">
//                   <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <FaMoneyBill /> Amount Breakdown
//                   </h3>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Original Amount:</span>
//                       <span className="font-medium text-gray-800">
//                         {formatCurrency(selectedTransaction.originalAmount)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Platform Commission:</span>
//                       <span className="font-medium text-gray-800">
//                         {formatCurrency(selectedTransaction.details?.platformCommission)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">GST on Commission:</span>
//                       <span className="font-medium text-gray-800">
//                         {formatCurrency(selectedTransaction.details?.gstOnCommission)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between pt-2 border-t">
//                       <span className="font-semibold text-gray-700">Net Amount:</span>
//                       <span className={`font-bold ${
//                         selectedTransaction.type === 'received' 
//                           ? 'text-blue-700' 
//                           : 'text-red-600'
//                       }`}>
//                         {selectedTransaction.amount}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Booking Details Section */}
//                 <div className="pt-4 border-t">
//                   <div className="flex justify-between items-center mb-3">
//                     <h3 className="font-semibold text-gray-700 flex items-center gap-2">
//                       <FaBuilding /> Booking Information
//                     </h3>
//                     {bookingLoading && (
//                       <span className="text-sm text-blue-600">Loading...</span>
//                     )}
//                   </div>
                  
//                   {bookingDetails ? (
//                     <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
//                       {/* Property Info */}
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <FaBuilding className="text-blue-600 mt-1" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-semibold text-gray-800">
//                             {bookingDetails.property?.name || 'N/A'}
//                           </div>
//                           <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
//                             <FaMapMarkerAlt size={12} />
//                             {bookingDetails.property?.locality || ''} 
//                             {bookingDetails.property?.city ? `, ${bookingDetails.property.city}` : ''}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Room Details */}
//                       <div className="flex items-center gap-3">
//                         <FaBed className="text-blue-600" />
//                         <div>
//                           <div className="text-sm text-gray-600">Room Type</div>
//                           <div className="font-medium text-gray-800">
//                             {bookingDetails.roomType || 'N/A'}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Dates */}
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="flex items-center gap-2">
//                           <FaCalendar className="text-blue-600" />
//                           <div>
//                             <div className="text-sm text-gray-600">Move-in</div>
//                             <div className="font-medium text-gray-800">
//                               {formatDate(bookingDetails.moveInDate)}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FaCalendar className="text-red-600" />
//                           <div>
//                             <div className="text-sm text-gray-600">Move-out</div>
//                             <div className="font-medium text-gray-800">
//                               {formatDate(bookingDetails.moveOutDate)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Status Badges */}
//                       <div className="flex gap-3">
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           bookingDetails.bookingStatus === 'confirmed' 
//                             ? 'bg-blue-100 text-blue-800' 
//                             : bookingDetails.bookingStatus === 'pending' 
//                               ? 'bg-yellow-100 text-yellow-800' 
//                               : 'bg-red-100 text-red-800'
//                         }`}>
//                           {bookingDetails.bookingStatus || 'N/A'}
//                         </span>
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           bookingDetails.paymentStatus === 'paid' 
//                             ? 'bg-blue-100 text-blue-800' 
//                             : bookingDetails.paymentStatus === 'pending' 
//                               ? 'bg-yellow-100 text-yellow-800' 
//                               : 'bg-red-100 text-red-800'
//                         }`}>
//                           Payment: {bookingDetails.paymentStatus || 'N/A'}
//                         </span>
                        
//                       </div>

//                       {/* User Info */}
//                       {bookingDetails.user && (
//                         <div className="flex items-center gap-3 pt-3 border-t">
//                           <FaUser className="text-blue-600" />
//                           <div>
//                             <div className="text-sm text-gray-600">Booked By</div>
//                             <div className="font-medium text-gray-800">
//                               {bookingDetails.user.name || 'N/A'}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {bookingDetails.user.phone || ''} • {bookingDetails.user.email || ''}
//                             </div>
//                           </div>
//                         </div>
//                       )}

                      
//                     </div>
//                   ) : selectedTransaction.bookingId ? (
//                     <div className="text-center py-4 text-gray-500">
//                       {bookingLoading ? (
//                         <div className="flex items-center justify-center gap-2">
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
//                           Loading booking details...
//                         </div>
//                       ) : (
//                         <div>
//                           <p>No booking details found</p>
//                           <p className="text-sm text-gray-400">Booking ID: {selectedTransaction.bookingId}</p>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="text-center py-4 text-gray-500">
//                       No booking associated with this transaction
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end gap-3 p-6 border-t">
//               <button
//                 onClick={() => copyToClipboard(JSON.stringify({
//                   transaction: selectedTransaction,
//                   booking: bookingDetails
//                 }, null, 2))}
//                 className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
//               >
//                 <FaCopy /> Copy All Details
//               </button>
//               {/* <button
//                 onClick={printTransaction}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
//               >
//                 <FaPrint /> Print Receipt
//               </button> */}
//               <button
//                 onClick={closeTransactionModal}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }







import React, { useState, useEffect } from "react";
import { 
  FaArrowRight, FaArrowLeft, FaChevronDown, FaTimes, FaCopy, 
  FaBuilding, FaCalendar, FaUser, FaMapMarkerAlt, FaBed, 
  FaMoneyBill, FaReceipt, FaRupeeSign, FaExclamationTriangle,
  FaHistory, FaWallet, FaPlusCircle, FaDownload, FaFilter,
  FaCheckCircle, FaClock, FaTimesCircle, FaInfoCircle
} from "react-icons/fa";
import bgimage from "../../assets/user/pgsearch/image (5).png";
import { useNavigate } from "react-router-dom";
import ClientNav from "../Client-Navbar/ClientNav";
import { manualTransferAPI } from "../PropertyController";
import { bookingAPI } from "../../Clients-components/PropertyController";

export default function ClientWalletHistory() {
  const [amount, setAmount] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [balance, setBalance] = useState("₹0.00");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [stats, setStats] = useState({
    totalReceived: 0,
    totalSent: 0,
    netBalance: 0,
    totalTransactions: 0
  });
  
  const navigate = useNavigate();

  const recommendedAmounts = [1000, 500, 100, 2000, 5000];

  // Function to get client ID from localStorage
  const getClientId = () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.id) return user.id;
        
        const clientId = localStorage.getItem("clientId") || 
                        localStorage.getItem("userId") || 
                        localStorage.getItem("_id");
        return clientId;
      }
      
      return null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (showHistory) {
      fetchPaymentHistory();
    }
  }, [showHistory]);

  const handleRecommendedClick = (value) => {
    setAmount(value.toString());
  };

  const fetchPaymentHistory = async () => {
    setLoading(true);
    setError("");
    
    try {
      const clientId = getClientId();
      
      if (!clientId) {
        setError("Please login to view your transaction history");
        setLoading(false);
        return;
      }
      
      console.log("🔍 Fetching payment history for client ID:", clientId);
      
      try {
        // Try manual transfers API
        const response = await manualTransferAPI.getManualTransfersByClient(clientId, {
          page: 1,
          limit: 50,
          status: "completed"
        });
        
        console.log("✅ Manual Transfers API Response:", response.data);
        
        if (response.data.success && response.data.data?.transfers) {
          processManualTransfers(response.data.data.transfers);
        } else {
          setError(response.data.message || "No transaction data available");
        }
        
      } catch (apiError) {
        console.error("❌ Manual transfers API error:", apiError);
        setError("Unable to load transaction history. Please try again later.");
      }
      
    } catch (error) {
      console.error("❌ Error fetching payment history:", error);
      setError(error.response?.data?.message || error.message || "Failed to load transaction history");
    } finally {
      setLoading(false);
    }
  };

  const processManualTransfers = (transfers) => {
    const transformedData = transfers.map((transfer, index) => ({
      id: transfer._id || index + 1,
      bookingId: transfer.bookingId,
      type: "received",
      from: "Platform Payment",
      to: transfer.bankDetails?.accountHolderName || transfer.clientName || "",
      amount: `₹${(transfer.transferAmount || transfer.originalAmount || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      rawAmount: transfer.transferAmount || transfer.originalAmount || 0,
      date: formatDate(transfer.createdAt),
      originalAmount: transfer.originalAmount,
      transactionReference: transfer.transactionReference || "N/A",
      utrNumber: transfer.utrNumber || "",
      status: transfer.status || "completed",
      createdAt: transfer.createdAt,
      details: {
        platformCommission: transfer.platformCommission || 0,
        gstOnCommission: transfer.gstOnCommission || 0,
        netAmount: transfer.transferAmount || transfer.originalAmount,
        bankName: transfer.bankDetails?.bankName || "N/A",
        accountHolder: transfer.bankDetails?.accountHolderName || transfer.clientName || "N/A",
        accountNumber: transfer.bankDetails?.accountNumber || "N/A",
        ifscCode: transfer.bankDetails?.ifscCode || "N/A",
        paymentMode: transfer.paymentMode || "Bank Transfer"
      }
    }));
    
    setTransactionHistory(transformedData);
    
    // Calculate statistics
    const totalReceived = transformedData.reduce((sum, t) => sum + t.rawAmount, 0);
    const totalSent = 0; // Manual transfers are only received
    const netBalance = totalReceived - totalSent;
    
    setBalance(`₹${netBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    
    setStats({
      totalReceived,
      totalSent,
      netBalance,
      totalTransactions: transformedData.length
    });
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return "N/A";
    }
  };

  const formatDateTime = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "N/A";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "₹0.00";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="mr-1" /> },
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock className="mr-1" /> },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: <FaTimesCircle className="mr-1" /> }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: null };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const fetchBookingDetails = async (bookingId) => {
    if (!bookingId) return;
    
    setBookingLoading(true);
    try {
      const response = await bookingAPI.getBookingById(bookingId);
      
      if (response.data?.success) {
        setBookingDetails(response.data.booking);
      } else {
        setBookingDetails(null);
      }
    } catch (error) {
      console.error("❌ Error fetching booking details:", error);
      setBookingDetails(null);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleTransactionClick = async (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
    
    if (transaction.bookingId) {
      await fetchBookingDetails(transaction.bookingId);
    } else {
      setBookingDetails(null);
    }
  };

  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setSelectedTransaction(null);
    setBookingDetails(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here instead of alert
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleProceed = () => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      alert(`Proceeding to add ₹${amount} to wallet`);
      // Add your payment gateway integration here
    } else {
      alert("Please enter a valid amount");
    }
  };

  const exportToCSV = () => {
    if (transactionHistory.length === 0) {
      alert("No transactions to export");
      return;
    }
    
    const headers = ['Date', 'Transaction ID', 'Type', 'Amount', 'Status', 'UTR Number'];
    const csvData = transactionHistory.map(t => [
      formatDate(t.createdAt),
      t.transactionReference,
      t.type === 'received' ? 'Credit' : 'Debit',
      t.amount,
      t.status,
      t.utrNumber || 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallet-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <ClientNav />
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6"
      >
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate("/client/home")}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </button>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Wallet & Transactions
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Wallet</h1>
            <p className="text-gray-600 mt-2">Manage your balance and view transaction history</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{balance}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaWallet className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Received</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    ₹{stats.totalReceived.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaArrowRight className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">{stats.totalTransactions}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaHistory className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-lg font-medium text-gray-800 mt-2">{formatDate(new Date())}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FaInfoCircle className="text-indigo-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Add Money Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Add Money to Wallet</h2>
                <p className="text-gray-600 text-sm mt-1">Quickly add funds to your wallet</p>
              </div>
              <FaPlusCircle className="text-blue-500 text-2xl" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Amounts</p>
                <div className="flex flex-wrap gap-2">
                  {recommendedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleRecommendedClick(amt)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        amount === amt.toString()
                          ? 'bg-blue-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={!amount || isNaN(amount) || parseFloat(amount) <= 0}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  amount && !isNaN(amount) && parseFloat(amount) > 0
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Proceed to Add Money
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">{error}</p>
                  <button
                    onClick={fetchPaymentHistory}
                    className="mt-2 text-red-700 hover:text-red-900 text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaHistory className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
                    <p className="text-gray-600 text-sm">View all your wallet transactions</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {transactionHistory.length > 0 && (
                    <button
                      onClick={exportToCSV}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaDownload className="mr-2" />
                      Export CSV
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {showHistory ? 'Hide History' : 'Show History'}
                    <FaChevronDown className={`ml-2 transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {showHistory && (
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading transactions...</p>
                  </div>
                ) : transactionHistory.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 mb-4">
                      Showing {transactionHistory.length} transaction(s)
                    </div>
                    {transactionHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleTransactionClick(item)}
                        className="group cursor-pointer"
                      >
                        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group-hover:bg-blue-50">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${item.type === 'received' ? 'bg-green-100' : 'bg-red-100'}`}>
                              {item.type === 'received' ? (
                                <FaArrowRight className="text-green-600" />
                              ) : (
                                <FaArrowLeft className="text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.type === 'received' ? 'Received from Platform' : 'Sent Payment'}
                              </p>
                              <div className="flex items-center space-x-3 mt-1">
                                <p className="text-sm text-gray-500">{item.date}</p>
                                <span className="text-gray-300">•</span>
                                <p className="text-sm text-gray-500">
                                  Ref: {item.transactionReference.substring(0, 8)}...
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-semibold ${item.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.type === 'received' ? '+' : '-'} {item.amount}
                            </p>
                            <div className="mt-2">
                              {getStatusBadge(item.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FaReceipt className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                    <p className="text-gray-500 mb-6">Your transaction history will appear here</p>
                    <button
                      onClick={fetchPaymentHistory}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDateTime(selectedTransaction.createdAt)}
                  </p>
                </div>
                <button
                  onClick={closeTransactionModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Amount Display */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center p-4 rounded-full ${selectedTransaction.type === 'received' ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className={`text-3xl font-bold ${selectedTransaction.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedTransaction.type === 'received' ? '+' : '-'} {selectedTransaction.amount}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{selectedTransaction.type === 'received' ? 'Amount Received' : 'Amount Sent'}</p>
              </div>

              {/* Details Grid */}
              <div className="space-y-6">
                {/* Transaction Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Transaction Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Transaction ID</span>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{selectedTransaction.transactionReference}</span>
                        <button
                          onClick={() => copyToClipboard(selectedTransaction.transactionReference)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <FaCopy size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {selectedTransaction.utrNumber && selectedTransaction.utrNumber !== "N/A" && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">UTR Number</span>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{selectedTransaction.utrNumber}</span>
                          <button
                            onClick={() => copyToClipboard(selectedTransaction.utrNumber)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FaCopy size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Status</span>
                      {getStatusBadge(selectedTransaction.status)}
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Type</span>
                      <span className={`font-medium ${selectedTransaction.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedTransaction.type === 'received' ? 'Credit' : 'Debit'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">{selectedTransaction.type === 'received' ? 'Received from' : 'Sent to'}</span>
                      <span className="font-medium text-gray-900">
                        {selectedTransaction.type === 'received' ? selectedTransaction.from : selectedTransaction.to}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                    <FaReceipt className="mr-2" /> Bank Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.details?.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Holder</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.details?.accountHolder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Mode</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.details?.paymentMode}</span>
                    </div>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                    <FaMoneyBill className="mr-2" /> Amount Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Original Amount</span>
                      <span className="font-medium text-gray-900">{formatCurrency(selectedTransaction.originalAmount)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Platform Commission</span>
                      <span className="font-medium text-gray-900">{formatCurrency(selectedTransaction.details?.platformCommission)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">GST on Commission</span>
                      <span className="font-medium text-gray-900">{formatCurrency(selectedTransaction.details?.gstOnCommission)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-t border-gray-200 font-bold">
                      <span className="text-gray-900">Net Amount</span>
                      <span className={selectedTransaction.type === 'received' ? 'text-green-600' : 'text-red-600'}>
                        {selectedTransaction.amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                {selectedTransaction.bookingId && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                      <FaBuilding className="mr-2" /> Associated Booking
                    </h3>
                    {bookingLoading ? (
                      <div className="text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600 text-sm">Loading booking details...</p>
                      </div>
                    ) : bookingDetails ? (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">Property</p>
                            <p className="font-medium text-gray-900 mt-1">{bookingDetails.property?.name || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">Room Type</p>
                            <p className="font-medium text-gray-900 mt-1">{bookingDetails.roomType || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">Move-in Date</p>
                            <p className="font-medium text-gray-900 mt-1">{formatDate(bookingDetails.moveInDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">Booking Status</p>
                            <div className="mt-1">
                              {getStatusBadge(bookingDetails.bookingStatus || 'N/A')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        Booking details not available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => copyToClipboard(JSON.stringify({
                    transaction: selectedTransaction,
                    booking: bookingDetails
                  }, null, 2))}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Copy Details
                </button>
                <button
                  onClick={closeTransactionModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}