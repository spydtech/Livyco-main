// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Star, ArrowLeft, CreditCard, History, Calendar, MapPin, MessageCircle, AlertCircle, CheckCircle, XCircle } from "lucide-react";
// import Header from "../Header";
// import buildingImg from "../../assets/appartment/apartment.png";
// import { bookingAPI } from "../../Clients-components/PropertyController";

// // API service functions
// // const apiService = {
// //   getUserBookings: async () => {
// //     const token = localStorage.getItem("token");
// //    const response = await bookingAPI.getUserBookings(token);

// //     const data = await response.json();

// //     if (!data?.success) {
// //       throw new Error(data?.message || "Invalid response format for fetching user bookings");
// //     }

// //     return data;
// //   },
// // };

// export default function PayRent() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true); // Changed to true initially
//   const [paymentMessage, setPaymentMessage] = useState("");
//   const [reviews, setReviews] = useState({});
//   const [hoverRating, setHoverRating] = useState(0);
//    const [error, setError] = useState(null); // Added error state


//    const fetchUserBookings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setPaymentMessage("");

//       // Get token from localStorage
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       // Log before API call for debugging
//       console.log("Fetching bookings with token:", token ? "Token exists" : "No token");

//       // Call the API
//       const response = await bookingAPI.getUserBookings(token);
      
//       // Check if response is valid
//       if (!response) {
//         throw new Error("No response from server");
//       }

//       // Handle different response formats
//       let data;
//       if (typeof response === 'string') {
//         // If response is a string, parse it as JSON
//         try {
//           data = JSON.parse(response);
//         } catch (parseError) {
//           console.error("Failed to parse response:", parseError);
//           throw new Error("Invalid response format");
//         }
//       } else if (response.data) {
//         // If response has data property
//         data = response.data;
//       } else if (response.json) {
//         // If response is a Response object
//         data = await response.json();
//       } else {
//         // Use response directly
//         data = response;
//       }

//       console.log("API Response:", data);

//       // Check if data is valid
//       if (!data) {
//         throw new Error("No data received");
//       }

//       // Handle different response structures
//       if (data.success && Array.isArray(data.bookings)) {
//         const processedBookings = data.bookings.map((booking) => ({
//           ...booking,
//           allPayments: (booking.payments || []).sort(
//             (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || b.createdAt)
//           ),
//           paymentHistory: [],
//           clientPayments: [],
//         }));

//         setBookings(processedBookings);
//         console.log("Processed bookings:", processedBookings);
        
//         if (processedBookings.length === 0) {
//           setPaymentMessage("No active bookings found");
//         }
//       } else if (Array.isArray(data)) {
//         // If API returns array directly
//         const processedBookings = data.map((booking) => ({
//           ...booking,
//           allPayments: (booking.payments || []).sort(
//             (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || b.createdAt)
//           ),
//           paymentHistory: [],
//           clientPayments: [],
//         }));

//         setBookings(processedBookings);
//         console.log("Processed bookings (direct array):", processedBookings);
//       } else {
//         console.error("Unexpected data format:", data);
//         setPaymentMessage(data?.message || "No bookings found or invalid data format");
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError(err.message);
//       setPaymentMessage("Failed to load bookings. Please try again.");
      
//       // Log detailed error for debugging
//       if (err.response) {
//         console.error("Response error:", err.response);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserBookings();
//   }, []);

//   // Handle review changes per booking
//   const handleReviewChange = (bookingId, field, value) => {
//     setReviews(prev => ({
//       ...prev,
//       [bookingId]: {
//         ...prev[bookingId],
//         [field]: value
//       }
//     }));
//   };

//   const handleStarClick = (bookingId, index) => {
//     handleReviewChange(bookingId, 'rating', 
//       reviews[bookingId]?.rating === index ? 0 : index
//     );
//   };

//   const getSharingBadgeClass = (type) => {
//     switch (type?.toLowerCase()) {
//       case "double sharing":
//         return "bg-[#FFEAD1] text-[#FF9E02]";
//       case "single sharing":
//         return "bg-[#AFD1FF] text-[#0827B2]";
//       case "triple sharing":
//         return "bg-[#F8BDE9] text-[#E504AD]";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "paid":
//       case "completed":
//       case "success":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-2 border-yellow-400";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getRequestStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "paid":
//         return "bg-green-100 text-green-800 border border-green-300";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border border-yellow-300";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border border-red-300";
//       default:
//         return "bg-gray-100 text-gray-800 border border-gray-300";
//     }
//   };

//   // Get payment status based on recent payments
//   const getPaymentStatus = (booking) => {
//     if (booking.allPayments && booking.allPayments.length > 0) {
//       const recentPayment = booking.allPayments[0];
//       return recentPayment.status || "pending";
//     }
//     return "pending";
//   };

//   // Check if payment is pending
//   const isPaymentPending = (booking) => {
//     return getPaymentStatus(booking) === "pending";
//   };

//   // Check if payment is completed/success
//   const isPaymentCompleted = (booking) => {
//     const status = getPaymentStatus(booking);
//     return status === "completed" || status === "success" || status === "paid";
//   };

//   const getPaymentDescription = (booking) => {
//     if (booking.allPayments?.length > 0) {
//       return booking.allPayments[0].description || "Rent Payment";
//     }
//     return "Monthly Rent";
//   };

//   const getRentAmount = (booking) => {
//     return booking.pricing?.monthlyRent || booking.pricing?.totalAmount || 0;
//   };

//   const getBookingStatus = (booking) => {
//     return booking.bookingStatus || "pending";
//   };

//   // Get pending payment requests count
//   const getPendingRequestsCount = (booking) => {
//     return booking.paymentrequest?.filter(req => req.status === "pending").length || 0;
//   };

//   // Check if there are any pending payment requests
//   const hasPendingPaymentRequests = (booking) => {
//     return getPendingRequestsCount(booking) > 0;
//   };

//   // Get the latest pending payment request
//   const getLatestPendingRequest = (booking) => {
//     const pendingRequests = booking.paymentrequest?.filter(req => req.status === "pending") || [];
//     if (pendingRequests.length === 0) return null;
    
//     // Sort by date to get the latest one
//     return pendingRequests.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
//   };

//   // Get the overall payment request status for the button
//   const getPaymentRequestStatus = (booking) => {
//     if (!booking.paymentrequest || booking.paymentrequest.length === 0) {
//       return "no_requests";
//     }
    
//     // Check if there are any pending requests
//     const hasPending = hasPendingPaymentRequests(booking);
//     if (hasPending) {
//       return "pending";
//     }
    
//     // If no pending requests, check the status of all requests
//     const allRequests = booking.paymentrequest || [];
    
//     // If all requests are paid
//     const allPaid = allRequests.every(req => req.status === "paid");
//     if (allPaid) {
//       return "all_paid";
//     }
    
//     // If all requests are cancelled
//     const allCancelled = allRequests.every(req => req.status === "cancelled");
//     if (allCancelled) {
//       return "all_cancelled";
//     }
    
//     // Mixed status (some paid, some cancelled, etc.)
//     return "mixed_status";
//   };

//   // Check if any payment request is overdue
//   const hasOverduePaymentRequests = (booking) => {
//     const pendingRequests = booking.paymentrequest?.filter(req => req.status === "pending") || [];
//     return pendingRequests.some(req => req.dueDate && new Date(req.dueDate) < new Date());
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "Not set";
//     return new Date(dateString).toLocaleDateString();
//   };

//   const prepareBookingDataForValidation = (booking) => {
//     const formatDateForBackend = (dateString) => {
//       if (!dateString) return null;
//       try {
//         return new Date(dateString).toISOString();
//       } catch {
//         return null;
//       }
//     };

//     return {
//       _id: booking._id,
//       bookingId: booking._id,
//       propertyId: booking.property?._id,
//       property: booking.property?._id,
//       moveInDate: formatDateForBackend(booking.moveInDate),
//       moveOutDate: formatDateForBackend(booking.moveOutDate),
//       selectedDate: formatDateForBackend(booking.moveInDate),
//       endDate: formatDateForBackend(booking.moveOutDate),
//       roomType: booking.roomType,
//       selectedRooms: booking.selectedRooms || [],
//       amount: getRentAmount(booking),
//       description: getPaymentDescription(booking),
//       pricing: booking.pricing || {
//         monthlyRent: getRentAmount(booking),
//         totalAmount: getRentAmount(booking),
//       },
//       isRentPayment: true,
//     };
//   };

//   const handlePayRent = (booking) => {
//     const latestRequest = getLatestPendingRequest(booking);
//     const amount = latestRequest ? latestRequest.amount : getRentAmount(booking);
//     const description = latestRequest ? latestRequest.message : getPaymentDescription(booking);
    
//     const bookingData = prepareBookingDataForValidation(booking);
//     // console.log("nbnbbnbhhbnbcshshbnsbbsjhjsdhj-",booking)
//     // Get review data for this booking if it exists
//     const reviewData = reviews[booking._id] || {};
    
//     // Include review data in the navigation state
//     navigate("/user/pay-to-cart", {
//       state: {
//         amount,
//         description,
//         name: booking.property?.name,
//         clientId: booking.clientId,
//         date: booking.moveInDate,
//         sharing: booking.roomType,
//         bookingId: booking._id,
//         propertyId: booking.property?._id,
//         bookingData,
//         // Include payment request data if available
//         paymentRequest: latestRequest ? {
//           id: latestRequest._id,
//           amount: latestRequest.amount,
//           message: latestRequest.message,
//           type: latestRequest.type,
//           dueDate: latestRequest.dueDate
//         } : null,
//         // Include review data to be sent with payment
//         reviewData: {
//           rating: reviewData.rating || 0,
//           comment: reviewData.comment || "",
//           shouldSaveReview: !!(reviewData.rating && reviewData.comment)
//         }
//       },
//     });
//   };

//   const handleViewPaymentHistory = (booking) => {
//     navigate("/user/payment-history", {
//       state: {
//         bookingId: booking._id,
//         name: booking.property?.name,
//         date: booking.moveInDate,
//         sharing: booking.roomType,
//         payments: booking.allPayments,
//         paymentSummary: booking.paymentSummary,
//         paymentRequests: booking.paymentrequest || []
//       },
//     });
//   };

//   // Get button configuration based on PAYMENT REQUEST status only
//   const getPaymentButtonConfig = (booking) => {
//     const paymentRequestStatus = getPaymentRequestStatus(booking);
//     const hasPendingRequests = hasPendingPaymentRequests(booking);
//     const hasOverdue = hasOverduePaymentRequests(booking);
//     const isCancelled = getBookingStatus(booking) === "cancelled";

//     // If booking is cancelled, disable all buttons
//     if (isCancelled) {
//       return {
//         text: "Booking Cancelled",
//         icon: XCircle,
//         className: "bg-gray-500 text-white border-gray-500 cursor-not-allowed",
//         disabled: true
//       };
//     }

//     // Handle based on PAYMENT REQUEST status only
//     switch (paymentRequestStatus) {
//       case "pending":
//         if (hasOverdue) {
//           return {
//             text: "Pay Overdue Request",
//             icon: AlertCircle,
//             className: "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700",
//             disabled: false
//           };
//         } else {
//           return {
//             text: "Pay Rent",
//             icon: CreditCard,
//             className: "bg-[#0827B2] text-white border-[#0827B2] hover:bg-[#061a8a] hover:border-[#061a8a]",
//             disabled: false
//           };
//         }
      
//       case "all_paid":
//         return {
//           text: "Completed",
//           icon: CheckCircle,
//           className: "bg-green-600 text-white border-green-600 cursor-not-allowed",
//           disabled: true
//         };
      
//       case "all_cancelled":
//         return {
//           text: "All Requests Cancelled",
//           icon: XCircle,
//           className: "bg-gray-500 text-white border-gray-500 cursor-not-allowed",
//           disabled: true
//         };
      
//       case "mixed_status":
//         return {
//           text: "Review Requests",
//           icon: AlertCircle,
//           className: "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:border-orange-600",
//           disabled: false
//         };
      
//       case "no_requests":
//       default:
//         // No payment requests, show regular rent payment based on payment status
//         const isCompleted = isPaymentCompleted(booking);
//         if (isCompleted) {
//           return {
//             text: "Payment Completed",
//             icon: CheckCircle,
//             className: "bg-green-600 text-white border-green-600 cursor-not-allowed",
//             disabled: true
//           };
//         } else {
//           return {
//             text: "Pay Rent",
//             icon: CreditCard,
//             className: "text-[#0827B2] border-[#0827B2] hover:bg-[#0827B2] hover:text-white",
//             disabled: false
//           };
//         }
//     }
//   };

//   // Get payment request summary text
//   const getPaymentRequestSummary = (booking) => {
//     const paymentRequestStatus = getPaymentRequestStatus(booking);
//     const pendingCount = getPendingRequestsCount(booking);
//     const totalRequests = booking.paymentrequest?.length || 0;
    
//     switch (paymentRequestStatus) {
//       case "pending":
//         return `${pendingCount} pending request${pendingCount !== 1 ? 's' : ''}`;
//       case "all_paid":
//         return `All ${totalRequests} request${totalRequests !== 1 ? 's' : ''} paid`;
//       case "all_cancelled":
//         return `All ${totalRequests} request${totalRequests !== 1 ? 's' : ''} cancelled`;
//       case "mixed_status":
//         const paidCount = booking.paymentrequest?.filter(req => req.status === "paid").length || 0;
//         const cancelledCount = booking.paymentrequest?.filter(req => req.status === "cancelled").length || 0;
//         return `${paidCount} paid, ${cancelledCount} cancelled, ${pendingCount} pending`;
//       case "no_requests":
//       default:
//         return "No payment requests";
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col items-center justify-center py-20 px-4">
//         <div className="flex items-center w-full max-w-xl mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
//           >
//             <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//             <span className="text-[#0827B2]">Booking History</span>
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0827B2] mb-4"></div>
//             <p className="text-center text-gray-500">Loading bookings...</p>
//           </div>
//         ) : bookings.length > 0 ? (
//           <div className="flex flex-col gap-8 items-center w-full">
//             {bookings.map((booking, idx) => {
//               const latestPendingRequest = getLatestPendingRequest(booking);
//               const hasPendingRequests = hasPendingPaymentRequests(booking);
//               const pendingRequestsCount = getPendingRequestsCount(booking);
//               const paymentRequestStatus = getPaymentRequestStatus(booking);
//               const hasOverdue = hasOverduePaymentRequests(booking);
//               const buttonConfig = getPaymentButtonConfig(booking);
//               const ButtonIcon = buttonConfig.icon;
//               const requestSummary = getPaymentRequestSummary(booking);
              
//               return (
//                 <div
//                   key={booking._id || idx}
//                   className="border-2 rounded-2xl shadow-lg overflow-hidden w-full max-w-xl bg-white p-5"
//                 >
//                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
//                     <img
//                       src={buildingImg}
//                       alt="Property"
//                       className="w-40 h-40 object-contain rounded-xl"
//                     />

//                     <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto text-right">
//                       <p className="text-lg font-bold text-[#0827B2]">
//                         {booking.property?.name || "Hostel / PG Name"}
//                       </p>

//                       <div className="flex items-center gap-1 justify-end text-sm text-gray-700">
//                         <MapPin className="w-4 h-4" />
//                         <span>
//                           {booking.property?.locality || "Unknown Locality"}, {booking.property?.city || "Unknown City"}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-1 justify-end text-sm text-gray-600">
//                         <Calendar className="w-4 h-4" />
//                         <span>
//                           Check-in:{" "}
//                           {booking.moveInDate
//                             ? new Date(booking.moveInDate).toLocaleDateString()
//                             : "N/A"}
//                         </span>
//                       </div>

//                       <div className="flex gap-2 items-center justify-end">
//                         <span
//                           className={`text-sm px-3 py-1 rounded-full font-medium ${getSharingBadgeClass(
//                             booking.roomType
//                           )}`}
//                         >
//                           {booking.roomType || "Unknown Type"}
//                         </span>

//                         <span
//                           className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
//                             getBookingStatus(booking)
//                           )}`}
//                         >
//                           {getBookingStatus(booking)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-5 space-y-4 text-left">
//                     {/* UPDATED: Rent Payment Box - Now uses payment request data */}
//                     <div
//                       className={`p-4 rounded-lg border-2 ${
//                         hasPendingRequests
//                           ? hasOverdue
//                             ? "border-red-400 bg-red-50 shadow-md"
//                             : "border-yellow-400 bg-yellow-50 shadow-md"
//                           : paymentRequestStatus === "all_paid"
//                           ? "border-green-400 bg-green-50"
//                           : paymentRequestStatus === "all_cancelled"
//                           ? "border-gray-400 bg-gray-50"
//                           : isPaymentPending(booking)
//                           ? "border-yellow-400 bg-yellow-50"
//                           : isPaymentCompleted(booking)
//                           ? "border-green-400 bg-green-50"
//                           : "border-[#0827B2] bg-[#EEF3FF]"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             <p className="text-lg font-bold text-gray-900">
//                               {hasPendingRequests 
//                                 ? `Payment Request: ₹${latestPendingRequest.amount}`
//                                 : `Rent Payment: ₹${getRentAmount(booking)}`
//                               }
//                             </p>
//                             {hasPendingRequests && (
//                               <span className={`text-xs px-2 py-1 rounded-full font-bold ${
//                                 hasOverdue 
//                                   ? "bg-red-500 text-white animate-pulse"
//                                   : "bg-yellow-500 text-white"
//                               }`}>
//                                 {pendingRequestsCount} {hasOverdue ? 'Overdue' : 'Pending'}
//                               </span>
//                             )}
//                           </div>
                          
//                           <p className="text-sm text-gray-600 mb-2">
//                             {hasPendingRequests 
//                               ? latestPendingRequest.message 
//                               : getPaymentDescription(booking)
//                             }
//                           </p>

//                           {/* Payment Request Summary */}
//                           <div className="mb-2">
//                             <span className={`text-xs px-2 py-1 rounded-full ${getRequestStatusBadgeClass(paymentRequestStatus === "pending" ? "pending" : paymentRequestStatus)}`}>
//                               {requestSummary}
//                             </span>
//                           </div>

//                           {hasPendingRequests && latestPendingRequest.dueDate && (
//                             <div className="flex items-center gap-2 text-sm">
//                               <Calendar className={`w-4 h-4 ${
//                                 new Date(latestPendingRequest.dueDate) < new Date()
//                                   ? "text-red-600"
//                                   : "text-gray-500"
//                               }`} />
//                               <span className={`font-medium ${
//                                 new Date(latestPendingRequest.dueDate) < new Date()
//                                   ? "text-red-600"
//                                   : "text-gray-600"
//                               }`}>
//                                 Due: {formatDate(latestPendingRequest.dueDate)}
//                                 {new Date(latestPendingRequest.dueDate) < new Date() && (
//                                   <span className="ml-1 text-red-500 font-semibold">(Overdue)</span>
//                                 )}
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="text-right">
//                           <span
//                             className={`text-sm font-semibold px-3 py-2 rounded-full ${
//                               hasPendingRequests
//                                 ? hasOverdue
//                                   ? "bg-red-100 text-red-800 border border-red-400"
//                                   : "bg-yellow-100 text-yellow-800 border border-yellow-400"
//                                 : paymentRequestStatus === "all_paid"
//                                 ? "bg-green-100 text-green-800 border border-green-400"
//                                 : paymentRequestStatus === "all_cancelled"
//                                 ? "bg-gray-100 text-gray-800 border border-gray-400"
//                                 : getStatusBadgeClass(getPaymentStatus(booking))
//                             }`}
//                           >
//                             {hasPendingRequests 
//                               ? hasOverdue 
//                                 ? "OVERDUE REQUEST" 
//                                 : "PENDING REQUEST"
//                               : paymentRequestStatus === "all_paid"
//                               ? "Completed"
//                               : paymentRequestStatus === "all_cancelled"
//                               ? "ALL REQUESTS CANCELLED"
//                               : getPaymentStatus(booking).toUpperCase()
//                             }
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Recent Payments */}
//                     {booking.allPayments && booking.allPayments.length > 0 && (
//                       <div className="mt-3 border border-[#0827B2] rounded-lg bg-[#F8FAFF] p-3">
//                         <p className="font-semibold text-[#0827B2] mb-2 flex items-center gap-2">
//                           <CreditCard className="w-4 h-4" />
//                           Recent Payments:
//                         </p>

//                         <div className="max-h-40 overflow-y-auto space-y-2">
//                           {booking.allPayments.slice(0, 3).map((payment, i) => (
//                             <div
//                               key={i}
//                               className={`text-sm bg-white shadow-sm border rounded-lg p-2 ${
//                                 payment.status === "pending"
//                                   ? "border-yellow-300 bg-yellow-50"
//                                   : payment.status === "completed" || payment.status === "success"
//                                   ? "border-green-300 bg-green-50"
//                                   : "border-gray-100"
//                               }`}
//                             >
//                               <div className="flex justify-between items-center">
//                                 <span className="text-gray-800 font-medium">
//                                   ₹{payment.amount || 0}
//                                 </span>
//                                 <span
//                                   className={`text-xs px-2 py-1 rounded-full ${
//                                     payment.status === "completed" ||
//                                     payment.status === "success" ||
//                                     payment.status === "paid"
//                                       ? "bg-green-100 text-green-800"
//                                       : payment.status === "pending"
//                                       ? "bg-yellow-100 text-yellow-800 border border-yellow-400"
//                                       : "bg-red-100 text-red-800"
//                                   }`}
//                                 >
//                                   {payment.status || "unknown"}
//                                 </span>
//                               </div>

//                               <p className="text-xs text-gray-600 mt-1">
//                                 {payment.description || "Payment"}
//                               </p>
//                               <div className="text-xs text-gray-400 text-right mt-1">
//                                 {payment.date || payment.createdAt
//                                   ? new Date(payment.date || payment.createdAt).toLocaleDateString()
//                                   : "Unknown date"}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Review Section */}
//                     <div>
//                       <p className="text-lg mt-4">Drop a review</p>

//                       <div className="flex items-center mb-4 gap-2">
//                         {[1, 2, 3, 4, 5].map((index) => (
//                           <Star
//                             key={index}
//                             size={22}
//                             className={`cursor-pointer transition ${
//                               index <= (reviews[booking._id]?.rating || 0)
//                                 ? "fill-yellow-400 text-yellow-400"
//                                 : "text-gray-500"
//                             }`}
//                             onClick={() => handleStarClick(booking._id, index)}
//                             onMouseEnter={() => setHoverRating(index)}
//                             onMouseLeave={() => setHoverRating(0)}
//                           />
//                         ))}
//                       </div>

//                       <textarea
//                         value={reviews[booking._id]?.comment || ""}
//                         onChange={(e) => handleReviewChange(booking._id, 'comment', e.target.value)}
//                         rows={3}
//                         placeholder="Write your feedback..."
//                         className="w-full rounded-lg border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0827B2]"
//                       />
                      
//                       {(reviews[booking._id]?.rating || reviews[booking._id]?.comment) && (
//                         <div className="mt-2 text-sm text-green-600">
//                           ✓ Review will be saved with your payment
//                         </div>
//                       )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3 mt-4">
//                       <button
//                         onClick={() => handlePayRent(booking)}
//                         className={`flex-1 px-4 py-2 rounded-xl transition flex items-center justify-center gap-2 ${buttonConfig.className}`}
//                         disabled={buttonConfig.disabled}
//                       >
//                         <ButtonIcon className="w-4 h-4" />
//                         {buttonConfig.text}
//                       </button>

//                       <button
//                         onClick={() => handleViewPaymentHistory(booking)}
//                         className="flex-1 text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-xl hover:bg-[#0827B2] hover:text-white transition flex items-center justify-center gap-2"
//                       >
//                         <History className="w-4 h-4" />
//                         Payment History
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <p className="text-gray-600 text-lg mb-4">
//               {paymentMessage || "No Bookings Found"}
//             </p>
//             <button
//               onClick={() => navigate("/properties")}
//               className="bg-[#0827B2] text-white px-6 py-2 rounded-lg hover:bg-[#061a8a] transition"
//             >
//               Browse Properties
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, ArrowLeft, CreditCard, History, Calendar, MapPin, MessageCircle, AlertCircle, CheckCircle, XCircle, ChevronRight, Clock, DollarSign, ExternalLink } from "lucide-react";
import Header from "../Header";
import buildingImg from "../../assets/appartment/apartment.png";
import { bookingAPI } from "../../Clients-components/PropertyController";

export default function PayRent() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [reviews, setReviews] = useState({});
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState(null);
  const [expandedBookingId, setExpandedBookingId] = useState(null);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      setPaymentMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await bookingAPI.getUserBookings(token);
      
      if (!response) {
        throw new Error("No response from server");
      }

      let data;
      if (typeof response === 'string') {
        try {
          data = JSON.parse(response);
        } catch (parseError) {
          throw new Error("Invalid response format");
        }
      } else if (response.data) {
        data = response.data;
      } else if (response.json) {
        data = await response.json();
      } else {
        data = response;
      }

      if (!data) {
        throw new Error("No data received");
      }

      if (data.success && Array.isArray(data.bookings)) {
        const processedBookings = data.bookings.map((booking) => ({
          ...booking,
          allPayments: (booking.payments || []).sort(
            (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || b.createdAt)
          ),
          paymentHistory: [],
          clientPayments: [],
        }));

        setBookings(processedBookings);
        
        if (processedBookings.length === 0) {
          setPaymentMessage("No active bookings found");
        }
      } else if (Array.isArray(data)) {
        const processedBookings = data.map((booking) => ({
          ...booking,
          allPayments: (booking.payments || []).sort(
            (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || b.createdAt)
          ),
          paymentHistory: [],
          clientPayments: [],
        }));

        setBookings(processedBookings);
      } else {
        setPaymentMessage(data?.message || "No bookings found or invalid data format");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message);
      setPaymentMessage("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleReviewChange = (bookingId, field, value) => {
    setReviews(prev => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [field]: value
      }
    }));
  };

  const handleStarClick = (bookingId, index) => {
    handleReviewChange(bookingId, 'rating', 
      reviews[bookingId]?.rating === index ? 0 : index
    );
  };

  const getSharingBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case "double sharing":
        return "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200";
      case "single sharing":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200";
      case "triple sharing":
        return "bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 border border-pink-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
      case "success":
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-2 border-amber-300";
      case "cancelled":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getPaymentStatus = (booking) => {
    if (booking.allPayments && booking.allPayments.length > 0) {
      const recentPayment = booking.allPayments[0];
      return recentPayment.status || "pending";
    }
    return "pending";
  };

  const isPaymentPending = (booking) => {
    return getPaymentStatus(booking) === "pending";
  };

  const isPaymentCompleted = (booking) => {
    const status = getPaymentStatus(booking);
    return status === "completed" || status === "success" || status === "paid";
  };

  const getPaymentDescription = (booking) => {
    if (booking.allPayments?.length > 0) {
      return booking.allPayments[0].description || "Rent Payment";
    }
    return "Monthly Rent";
  };

  const getRentAmount = (booking) => {
    return booking.pricing?.monthlyRent || booking.pricing?.totalAmount || 0;
  };

  const getBookingStatus = (booking) => {
    return booking.bookingStatus || "pending";
  };

  const getPendingRequestsCount = (booking) => {
    return booking.paymentrequest?.filter(req => req.status === "pending").length || 0;
  };

  const hasPendingPaymentRequests = (booking) => {
    return getPendingRequestsCount(booking) > 0;
  };

  const getLatestPendingRequest = (booking) => {
    const pendingRequests = booking.paymentrequest?.filter(req => req.status === "pending") || [];
    if (pendingRequests.length === 0) return null;
    return pendingRequests.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  const getPaymentRequestStatus = (booking) => {
    if (!booking.paymentrequest || booking.paymentrequest.length === 0) {
      return "no_requests";
    }
    
    const hasPending = hasPendingPaymentRequests(booking);
    if (hasPending) {
      return "pending";
    }
    
    const allRequests = booking.paymentrequest || [];
    const allPaid = allRequests.every(req => req.status === "paid");
    if (allPaid) {
      return "all_paid";
    }
    
    const allCancelled = allRequests.every(req => req.status === "cancelled");
    if (allCancelled) {
      return "all_cancelled";
    }
    
    return "mixed_status";
  };

  const hasOverduePaymentRequests = (booking) => {
    const pendingRequests = booking.paymentrequest?.filter(req => req.status === "pending") || [];
    return pendingRequests.some(req => req.dueDate && new Date(req.dueDate) < new Date());
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const prepareBookingDataForValidation = (booking) => {
    const formatDateForBackend = (dateString) => {
      if (!dateString) return null;
      try {
        return new Date(dateString).toISOString();
      } catch {
        return null;
      }
    };

    return {
      _id: booking._id,
      bookingId: booking._id,
      propertyId: booking.property?._id,
      property: booking.property?._id,
      moveInDate: formatDateForBackend(booking.moveInDate),
      moveOutDate: formatDateForBackend(booking.moveOutDate),
      selectedDate: formatDateForBackend(booking.moveInDate),
      endDate: formatDateForBackend(booking.moveOutDate),
      roomType: booking.roomType,
      selectedRooms: booking.selectedRooms || [],
      amount: getRentAmount(booking),
      description: getPaymentDescription(booking),
      pricing: booking.pricing || {
        monthlyRent: getRentAmount(booking),
        totalAmount: getRentAmount(booking),
      },
      isRentPayment: true,
    };
  };

  const handlePayRent = (booking) => {
    const latestRequest = getLatestPendingRequest(booking);
    const amount = latestRequest ? latestRequest.amount : getRentAmount(booking);
    const description = latestRequest ? latestRequest.message : getPaymentDescription(booking);
    
    const bookingData = prepareBookingDataForValidation(booking);
    const reviewData = reviews[booking._id] || {};
    
    navigate("/user/pay-to-cart", {
      state: {
        amount,
        description,
        name: booking.property?.name,
        clientId: booking.clientId,
        date: booking.moveInDate,
        sharing: booking.roomType,
        bookingId: booking._id,
        propertyId: booking.property?._id,
        bookingData,
        paymentRequest: latestRequest ? {
          id: latestRequest._id,
          amount: latestRequest.amount,
          message: latestRequest.message,
          type: latestRequest.type,
          dueDate: latestRequest.dueDate
        } : null,
        reviewData: {
          rating: reviewData.rating || 0,
          comment: reviewData.comment || "",
          shouldSaveReview: !!(reviewData.rating && reviewData.comment)
        }
      },
    });
  };

  const handleViewPaymentHistory = (booking) => {
    navigate("/user/payment-history", {
      state: {
        bookingId: booking._id,
        name: booking.property?.name,
        date: booking.moveInDate,
        sharing: booking.roomType,
        payments: booking.allPayments,
        paymentSummary: booking.paymentSummary,
        paymentRequests: booking.paymentrequest || []
      },
    });
  };

  const getPaymentButtonConfig = (booking) => {
    const paymentRequestStatus = getPaymentRequestStatus(booking);
    const hasPendingRequests = hasPendingPaymentRequests(booking);
    const hasOverdue = hasOverduePaymentRequests(booking);
    const isCancelled = getBookingStatus(booking) === "cancelled";

    if (isCancelled) {
      return {
        text: "Booking Cancelled",
        icon: XCircle,
        className: "bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed hover:bg-gray-100",
        disabled: true
      };
    }

    switch (paymentRequestStatus) {
      case "pending":
        if (hasOverdue) {
          return {
            text: "Pay Overdue Request",
            icon: AlertCircle,
            className: "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-200",
            disabled: false
          };
        } else {
          return {
            text: "Pay Rent Now",
            icon: CreditCard,
            className: "bg-gradient-to-r from-[#0827B2] to-[#061a8a] text-white border-[#0827B2] hover:from-[#061a8a] hover:to-[#041366] shadow-lg hover:shadow-blue-200",
            disabled: false
          };
        }
      
      case "all_paid":
        return {
          text: "All Payments Complete",
          icon: CheckCircle,
          className: "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-300 cursor-not-allowed",
          disabled: true
        };
      
      case "all_cancelled":
        return {
          text: "All Requests Cancelled",
          icon: XCircle,
          className: "bg-gray-100 text-gray-600 border-gray-300 cursor-not-allowed",
          disabled: true
        };
      
      case "mixed_status":
        return {
          text: "Review Payment Status",
          icon: AlertCircle,
          className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 hover:from-amber-600 hover:to-amber-700",
          disabled: false
        };
      
      case "no_requests":
      default:
        const isCompleted = isPaymentCompleted(booking);
        if (isCompleted) {
          return {
            text: "Payment Completed",
            icon: CheckCircle,
            className: "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-300 cursor-not-allowed",
            disabled: true
          };
        } else {
          return {
            text: "Pay Monthly Rent",
            icon: CreditCard,
            className: "text-[#0827B2] border-2 border-[#0827B2] hover:bg-[#0827B2] hover:text-white shadow-md hover:shadow-lg",
            disabled: false
          };
        }
    }
  };

  const getPaymentRequestSummary = (booking) => {
    const paymentRequestStatus = getPaymentRequestStatus(booking);
    const pendingCount = getPendingRequestsCount(booking);
    const totalRequests = booking.paymentrequest?.length || 0;
    
    switch (paymentRequestStatus) {
      case "pending":
        return `${pendingCount} pending payment request${pendingCount !== 1 ? 's' : ''}`;
      case "all_paid":
        return `All ${totalRequests} payment${totalRequests !== 1 ? 's' : ''} completed`;
      case "all_cancelled":
        return `All ${totalRequests} request${totalRequests !== 1 ? 's' : ''} cancelled`;
      case "mixed_status":
        const paidCount = booking.paymentrequest?.filter(req => req.status === "paid").length || 0;
        const cancelledCount = booking.paymentrequest?.filter(req => req.status === "cancelled").length || 0;
        return `${paidCount} paid • ${cancelledCount} cancelled • ${pendingCount} pending`;
      case "no_requests":
      default:
        return "No payment requests";
    }
  };

  const toggleExpand = (bookingId) => {
    setExpandedBookingId(expandedBookingId === bookingId ? null : bookingId);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-3 text-[#0827B2] hover:text-[#061a8a] hover:bg-blue-50 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">Manage Rent Payments</h1>
              <p className="text-gray-600 mt-2">View and manage all your rental payments and payment requests</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0827B2] border-t-transparent"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-200 opacity-75"></div>
              </div>
              <p className="text-gray-500 font-medium">Loading your bookings...</p>
              <p className="text-sm text-gray-400">Fetching payment details</p>
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-6">
              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-[#0827B2]" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Pending Payments</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {bookings.filter(b => hasPendingPaymentRequests(b)).length}
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Completed</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {bookings.filter(b => isPaymentCompleted(b)).length}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-5">
                {bookings.map((booking, idx) => {
                  const latestPendingRequest = getLatestPendingRequest(booking);
                  const hasPendingRequests = hasPendingPaymentRequests(booking);
                  const pendingRequestsCount = getPendingRequestsCount(booking);
                  const paymentRequestStatus = getPaymentRequestStatus(booking);
                  const hasOverdue = hasOverduePaymentRequests(booking);
                  const buttonConfig = getPaymentButtonConfig(booking);
                  const ButtonIcon = buttonConfig.icon;
                  const requestSummary = getPaymentRequestSummary(booking);
                  const isExpanded = expandedBookingId === booking._id;
                  
                  return (
                    <div
                      key={booking._id || idx}
                      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      {/* Main Booking Card */}
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Property Image */}
                          <div className="lg:w-48 flex-shrink-0">
                            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                              <img
                                src={buildingImg}
                                alt="Property"
                                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getSharingBadgeClass(booking.roomType)}`}>
                                  {booking.roomType || "Unknown Type"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Property Details */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {booking.property?.name || "Hostel / PG Name"}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">
                                    {booking.property?.locality || "Unknown Locality"}, {booking.property?.city || "Unknown City"}
                                  </span>
                                </div>
                              </div>
                              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusBadgeClass(getBookingStatus(booking))}`}>
                                {getBookingStatus(booking)}
                              </span>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="text-sm text-gray-500">Move-in Date</p>
                                  <p className="font-medium text-gray-900">
                                    {booking.moveInDate ? new Date(booking.moveInDate).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    }) : "N/A"}
                                  </p>
                                </div>
                              </div>
                              
                              {booking.moveOutDate && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Calendar className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="text-sm text-gray-500">Move-out Date</p>
                                    <p className="font-medium text-gray-900">
                                      {new Date(booking.moveOutDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Payment Status Card */}
                            <div className={`mt-5 p-4 rounded-xl border-2 ${
                              hasPendingRequests
                                ? hasOverdue
                                  ? "border-red-300 bg-gradient-to-r from-red-50 to-white"
                                  : "border-amber-300 bg-gradient-to-r from-amber-50 to-white"
                                : paymentRequestStatus === "all_paid"
                                ? "border-green-300 bg-gradient-to-r from-green-50 to-white"
                                : paymentRequestStatus === "all_cancelled"
                                ? "border-gray-300 bg-gradient-to-r from-gray-50 to-white"
                                : "border-blue-300 bg-gradient-to-r from-blue-50 to-white"
                            }`}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-lg ${
                                      hasPendingRequests
                                        ? hasOverdue
                                          ? "bg-red-100"
                                          : "bg-amber-100"
                                        : paymentRequestStatus === "all_paid"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    }`}>
                                      <DollarSign className={`w-5 h-5 ${
                                        hasPendingRequests
                                          ? hasOverdue
                                            ? "text-red-600"
                                            : "text-amber-600"
                                          : paymentRequestStatus === "all_paid"
                                          ? "text-green-600"
                                          : "text-blue-600"
                                      }`} />
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-900">
                                        {hasPendingRequests 
                                          ? `Payment Request: ₹${latestPendingRequest.amount}`
                                          : `Rent Amount: ₹${getRentAmount(booking)}`
                                        }
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {hasPendingRequests 
                                          ? latestPendingRequest.message 
                                          : getPaymentDescription(booking)
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                      hasPendingRequests
                                        ? hasOverdue
                                          ? "bg-red-500 text-white"
                                          : "bg-amber-500 text-white"
                                        : paymentRequestStatus === "all_paid"
                                        ? "bg-green-500 text-white"
                                        : "bg-blue-500 text-white"
                                    }`}>
                                      {hasPendingRequests 
                                        ? hasOverdue 
                                          ? "OVERDUE REQUEST" 
                                          : "PENDING REQUEST"
                                        : paymentRequestStatus === "all_paid"
                                        ? "COMPLETED"
                                        : "REGULAR PAYMENT"
                                      }
                                    </span>
                                    
                                    {hasPendingRequests && pendingRequestsCount > 0 && (
                                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-amber-300 text-amber-700">
                                        {pendingRequestsCount} pending
                                      </span>
                                    )}
                                    
                                    {hasPendingRequests && latestPendingRequest.dueDate && (
                                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700">
                                        <Clock className="w-3 h-3" />
                                        Due: {formatDate(latestPendingRequest.dueDate)}
                                        {hasOverdue && (
                                          <span className="ml-1 text-red-500 font-bold">(Overdue)</span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <p className="text-sm text-gray-600 mt-3">
                                    {requestSummary}
                                  </p>
                                </div>
                                
                                <div className="flex flex-col sm:items-end gap-2">
                                  <button
                                    onClick={() => toggleExpand(booking._id)}
                                    className="text-sm text-[#0827B2] hover:text-[#061a8a] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                                  >
                                    {isExpanded ? "Show Less" : "Show Details"}
                                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Details Section */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                            {/* Review Section */}
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h4>
                              <div className="bg-gray-50 rounded-xl p-5">
                                <div className="flex items-center gap-4 mb-4">
                                  <div>
                                    <p className="text-sm text-gray-600 mb-2">Rate your stay</p>
                                    <div className="flex items-center gap-1">
                                      {[1, 2, 3, 4, 5].map((index) => (
                                        <button
                                          key={index}
                                          onClick={() => handleStarClick(booking._id, index)}
                                          onMouseEnter={() => setHoverRating(index)}
                                          onMouseLeave={() => setHoverRating(0)}
                                          className="p-1"
                                        >
                                          <Star
                                            size={28}
                                            className={`transition-all duration-200 ${
                                              index <= (hoverRating || reviews[booking._id]?.rating || 0)
                                                ? "fill-yellow-400 text-yellow-400 scale-110"
                                                : "text-gray-300 hover:text-yellow-300"
                                            }`}
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  {(reviews[booking._id]?.rating || reviews[booking._id]?.comment) && (
                                    <div className="ml-auto p-3 bg-green-50 rounded-lg border border-green-200">
                                      <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Review will be saved with payment
                                      </p>
                                    </div>
                                  )}
                                </div>
                                
                                <textarea
                                  value={reviews[booking._id]?.comment || ""}
                                  onChange={(e) => handleReviewChange(booking._id, 'comment', e.target.value)}
                                  rows={3}
                                  placeholder="Share your feedback about your stay. Your review helps others make better decisions..."
                                  className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                />
                              </div>
                            </div>

                            {/* Recent Payments */}
                            {booking.allPayments && booking.allPayments.length > 0 && (
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Payment History</h4>
                                <div className="space-y-3">
                                  {booking.allPayments.slice(0, 3).map((payment, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${
                                          payment.status === "completed" || payment.status === "success" || payment.status === "paid"
                                            ? "bg-green-100"
                                            : payment.status === "pending"
                                            ? "bg-amber-100"
                                            : "bg-gray-100"
                                        }`}>
                                          <CreditCard className={`w-5 h-5 ${
                                            payment.status === "completed" || payment.status === "success" || payment.status === "paid"
                                              ? "text-green-600"
                                              : payment.status === "pending"
                                              ? "text-amber-600"
                                              : "text-gray-600"
                                          }`} />
                                        </div>
                                        <div>
                                          <p className="font-medium text-gray-900">
                                            {payment.description || "Rent Payment"}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {payment.date || payment.createdAt
                                              ? new Date(payment.date || payment.createdAt).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric',
                                                  hour: '2-digit',
                                                  minute: '2-digit'
                                                })
                                              : "Unknown date"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">₹{payment.amount || 0}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                          payment.status === "completed" || payment.status === "success" || payment.status === "paid"
                                            ? "bg-green-100 text-green-800"
                                            : payment.status === "pending"
                                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                                            : "bg-gray-100 text-gray-800"
                                        }`}>
                                          {payment.status?.toUpperCase() || "UNKNOWN"}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                              <button
                                onClick={() => handlePayRent(booking)}
                                disabled={buttonConfig.disabled}
                                className={`flex-1 px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-medium ${
                                  buttonConfig.disabled 
                                    ? buttonConfig.className 
                                    : `${buttonConfig.className} transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0`
                                }`}
                              >
                                <ButtonIcon className="w-5 h-5" />
                                {buttonConfig.text}
                              </button>

                              <button
                                onClick={() => handleViewPaymentHistory(booking)}
                                className="flex-1 px-6 py-3.5 rounded-xl border-2 border-[#0827B2] text-[#0827B2] hover:bg-[#0827B2] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-medium transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                              >
                                <History className="w-5 h-5" />
                                View Full Payment History
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Active Bookings Found</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                {paymentMessage || "You don't have any active bookings at the moment. Explore our properties to find your perfect stay."}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/properties")}
                  className="bg-gradient-to-r from-[#0827B2] to-[#061a8a] text-white px-8 py-3.5 rounded-xl hover:from-[#061a8a] hover:to-[#041366] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Browse Properties
                </button>
                <button
                  onClick={fetchUserBookings}
                  className="border-2 border-[#0827B2] text-[#0827B2] px-8 py-3.5 rounded-xl hover:bg-[#0827B2] hover:text-white transition-all"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}