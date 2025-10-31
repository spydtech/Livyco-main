// import React from "react";
// import { ArrowLeft, Info } from 'lucide-react';
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Payrent() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     advanceAmount = 0,
//     rent = 0,
//   } = location.state || {};

//   const totalAmount = advanceAmount + rent;
//   const currency = "INR";
//   const receiptId = "qwsaq1";

//   const paymentHandler = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5000/order", {
//       method: "POST",
//       body: JSON.stringify({
//         amount: totalAmount * 100, // ₹ to paise
//         currency,
//         receipt: receiptId,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const order = await response.json();
//     console.log("Order created:", order);

//     const options = {
//       key: "rzp_test_XXXXXXXXXXXXXXXX", //Replace with your Razorpay Test Key
//       amount: order.amount,
//       currency,
//       name: "Your Company Name",
//       description: "Rent Payment",
//       image: "https://example.com/your_logo",
//       order_id: order.id,
//       handler: async function (response) {
//         const res = await fetch("http://localhost:5000/order/validate", {
//           method: "POST",
//           body: JSON.stringify(response),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const jsonRes = await res.json();
//         console.log("Payment validated:", jsonRes);
//         alert("Payment successful!");
//       },
//       prefill: {
//         name: "Web Dev",
//         email: "test@example.com",
//         contact: "9000000000",
//       },
//       notes: {
//         address: "Dummy address",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.on("payment.failed", function (response) {
//       console.error("Payment failed:", response.error);
//       alert("Payment Failed:\n" + response.error.description);
//     });
//     rzp1.open();
//   };

//   return (
//     <div className="px-16">
//       <div className="flex items-center p-1">
//         <button
//           className="flex text-xl items-center gap-2 px-4 py-2 rounded"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Pay Rent
//         </button>
//       </div>

//       <div className="w-full sm:w-1/3 flex justify-center items-center mx-auto py-8">
//         <div className="p-6 w-full bg-white rounded-md">
//           <div className="flex justify-between text-sm text-gray-700">
//             <h2 className="text-lg font-semibold mb-4">Total Amount to be Paid</h2>
//             <span className="text-lg font-semibold mb-4">
//               ₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//             </span>
//           </div>

//           <div className="mb-4">
//             <div className="flex justify-between text-sm text-gray-700">
//               <span>Advance Amount</span>
//               <span>₹ {advanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
//             </div>
//             <div className="flex justify-between text-sm text-gray-700 mt-1">
//               <span>Rent</span>
//               <span>₹ {rent.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
//             </div>
//             <div className="flex gap-2 text-sm text-gray-700 mt-4">
//               <Info className="w-5 h-5 text-[#0827B2]" />
//               <p>Important info</p>
//             </div>
//           </div>

//           <div className="flex justify-center items-center">
//             <button
//               className="w-1/2 bg-[#FEE123] hover:bg-[#E6C200] text-black font-semibold py-3 rounded-md"
//               onClick={paymentHandler}
//             >
//               Pay ₹{totalAmount.toLocaleString()}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { ArrowLeft, Info } from 'lucide-react';
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from '../Header';

// export default function Cart() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [processing, setProcessing] = useState(false);
//   const [bookingData, setBookingData] = useState(null);

//   // Use your actual Razorpay key here
//   const RAZORPAY_KEY_ID = "rzp_test_RAk2W9hoDqrojA"; // Replace with your actual key

//   useEffect(() => {
//     console.log('Location state:', location.state);
//     if (location.state) {
//       setBookingData(location.state);
//     } else {
//       navigate("/user/search");
//     }
//   }, [location.state, navigate]);

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const paymentHandler = async (e) => {
//     e.preventDefault();
    
//     if (!bookingData) {
//       alert("No booking data available");
//       return;
//     }

//     setProcessing(true);

//     try {
//       // Load Razorpay script
//       const isRazorpayLoaded = await loadRazorpayScript();
//       if (!isRazorpayLoaded) {
//         throw new Error("Razorpay SDK failed to load");
//       }

//       // Create a unique receipt ID
//       const receiptId = `booking_${bookingData.booking?._id || Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//       // Create Razorpay order
//       const response = await fetch("http://localhost:5000/api/payments/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({
//           amount: bookingData.totalAmount * 100, // Convert to paise
//           currency: "INR",
//           receipt: receiptId
//         })
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
//       }

//       const orderData = await response.json();

//       if (!orderData.success || !orderData.order.id) {
//         throw new Error("Failed to create payment order");
//       }

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.order.amount,
//         currency: orderData.order.currency,
//         name: "PG Booking System",
//         description: `Booking Payment for ${bookingData.booking?.property || 'Property'}`,
//         image: "/logo.png",
//         order_id: orderData.order.id,
//         handler: async function (response) {
//           try {
//             // Validate payment on server
//             const validationResponse = await fetch("http://localhost:5000/api/payments/validate-payment", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 bookingId: bookingData.booking?._id,
//                 amount: bookingData.totalAmount * 100
//               })
//             });

//             if (!validationResponse.ok) {
//               const errorText = await validationResponse.text();
//               throw new Error(`Validation failed: ${validationResponse.status} - ${errorText}`);
//             }

//             const validationResult = await validationResponse.json();

//             if (validationResult.success) {
//               alert("Payment successful! Your booking is confirmed.");
              
//               // Navigate to Cancel page with all necessary data
//               navigate("/user/booking/conformation", { 
//                 state: { 
//                   booking: bookingData.booking,
//                   transactionId: response.razorpay_payment_id,
//                   paymentDetails: validationResult,
//                   advanceAmount: bookingData.advanceAmount,
//                   securityDeposit: bookingData.securityDeposit,
//                   totalAmount: bookingData.totalAmount
//                 } 
//               });
//             } else {
//               alert("Payment validation failed: " + validationResult.message);
//             }
//           } catch (error) {
//             console.error("Payment validation error:", error);
//             alert("An error occurred during payment validation: " + error.message);
//           }
//         },
//         prefill: {
//           name: bookingData.booking?.customerDetails?.primary?.name || "Customer",
//           email: bookingData.booking?.customerDetails?.primary?.email || "customer@example.com",
//           contact: bookingData.booking?.customerDetails?.primary?.mobile || "9999999999",
//         },
//         notes: {
//           bookingId: bookingData.booking?._id || "unknown",
//           property: bookingData.booking?.property || "Unknown Property"
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
      
//       rzp1.on("payment.failed", function (response) {
//         console.error("Payment failed:", response.error);
//         alert(`Payment Failed: ${response.error.description}`);
//         setProcessing(false);
        
//         // Update booking status to failed if we have a booking ID
//         if (bookingData.booking?._id) {
//           fetch(`http://localhost:5000/api/auth/bookings/${bookingData.booking._id}/payment`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${localStorage.getItem("token")}`
//             },
//             body: JSON.stringify({
//               paymentStatus: "failed",
//               transactionId: response.error.metadata?.payment_id
//             })
//           }).catch(err => console.error("Failed to update booking status:", err));
//         }
//       });
      
//       rzp1.open();
      
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       alert("An error occurred while initiating payment: " + error.message);
//       setProcessing(false);
//     }
//   };

//   if (!bookingData) {
//     return (
//       <>
//         <Header />
//         <div className="p-16">
//           <div className="flex items-center p-1">
//             <button
//               className="flex text-xl items-center gap-2 px-4 py-2 rounded"
//               onClick={() => navigate(-1)}
//             >
//               <ArrowLeft className="w-5 h-5" />
//               Back
//             </button>
//           </div>
//           <div className="text-center py-8">
//             <p>No booking information found. Please go back and try again.</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const { booking, advanceAmount = 0, securityDeposit = 0, totalAmount = 0 } = bookingData;

//   return (
//     <>
//       <Header />
//       <div className="p-16">
//         <div className="flex items-center p-1">
//           <button
//             className="flex text-xl items-center gap-2 px-4 py-2 rounded"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Pay Rent
//           </button>
//         </div>

//         <div className="w-full sm:w-1/3 flex justify-center items-center mx-auto py-8">
//           <div className="p-6 w-full bg-white rounded-md shadow-lg">
//             <div className="flex justify-between text-sm text-gray-700">
//               <h2 className="text-lg font-semibold mb-4">Total Amount to be Paid</h2>
//               <span className="text-lg font-semibold mb-4">
//                 ₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//               </span>
//             </div>

//             <div className="mb-4">
//               <div className="flex justify-between text-sm text-gray-700">
//                 <span>Advance Amount (First Month)</span>
//                 <span>₹ {advanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-700 mt-1">
//                 <span>Security Deposit</span>
//                 <span>₹ {securityDeposit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
//               </div>
//               <div className="flex gap-2 text-sm text-gray-700 mt-4">
//                 <Info className="w-5 h-5 text-[#0827B2]" />
//                 <p>Important info</p>
//               </div>
//             </div>

//             <div className="flex justify-center items-center">
//               <button
//                 className="w-1/2 bg-[#FEE123] hover:bg-[#E6C200] text-black font-semibold py-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 onClick={paymentHandler}
//                 disabled={processing}
//               >
//                 {processing ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




// // components/Cart.js
// import React, { useState, useEffect } from "react";
// import { ArrowLeft, Info } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from '../Header';
// import { API_BASE_URL } from '../../Clients-components/PropertyController';

// export default function Cart() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [processing, setProcessing] = useState(false);
//   const [bookingData, setBookingData] = useState(null);

//   // Hardcode the Razorpay key - remove process.env completely
//   const RAZORPAY_KEY_ID = "rzp_live_O2RbutXpyAfDAP";

//   useEffect(() => {
//     console.log('Location state:', location.state);
//     if (location.state) {
//       setBookingData(location.state);
//     } else {
//       navigate("/user/search");
//     }
//   }, [location.state, navigate]);

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const paymentHandler = async (e) => {
//     e.preventDefault();
    
//     if (!bookingData) {
//       alert("No booking data available");
//       return;
//     }

//     setProcessing(true);

//     try {
//       // Load Razorpay script
//       const isRazorpayLoaded = await loadRazorpayScript();
//       if (!isRazorpayLoaded) {
//         throw new Error("Razorpay SDK failed to load");
//       }

//       // First create a temporary booking
//       console.log('Creating temporary booking...');
//       const bookingResponse = await fetch(`${API_BASE_URL}/api/auth/bookings`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({
//           ...bookingData,
//           paymentInfo: {
//             paymentStatus: 'pending'
//           },
//           bookingStatus: 'pending_payment'
//         })
//       });

//       if (!bookingResponse.ok) {
//         const errorText = await bookingResponse.text();
//         throw new Error(`Failed to create booking: ${bookingResponse.status} - ${errorText}`);
//       }

//       const bookingResult = await bookingResponse.json();
//       console.log('Booking creation result:', bookingResult);

//       if (!bookingResult.success) {
//         throw new Error("Failed to create booking: " + bookingResult.message);
//       }

//       const temporaryBookingId = bookingResult.booking.id;
//       console.log('Temporary booking created with ID:', temporaryBookingId);

//       // Create a unique receipt ID
//       const receiptId = `booking_${temporaryBookingId}_${Date.now()}`;

//       // Create Razorpay order with the booking ID
//       console.log('Creating Razorpay order...');
//       const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({
//           amount: Math.round(bookingData.totalAmount * 100), // Convert to paise
//           currency: "INR",
//           receipt: receiptId,
//           bookingId: temporaryBookingId
//         })
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
//       }

//       const orderData = await response.json();
//       console.log('Order creation result:', orderData);

//       if (!orderData.success || !orderData.order.id) {
//         throw new Error("Failed to create payment order: " + (orderData.message || 'Unknown error'));
//       }

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.order.amount,
//         currency: orderData.order.currency,
//         name: "LivCo Properties",
//         description: `Booking Payment for ${bookingData.propertyName || 'Property'}`,
//         image: "/logo.png",
//         order_id: orderData.order.id,
//         handler: async function (response) {
//           try {
//             console.log('Payment successful, validating...', response);
            
//             // Validate payment on server
//             const validationResponse = await fetch(`${API_BASE_URL}/api/payments/validate-payment`, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 bookingId: temporaryBookingId,
//                 amount: Math.round(bookingData.totalAmount * 100),
//                 description: 'Booking payment'
//               })
//             });

//             if (!validationResponse.ok) {
//               const errorText = await validationResponse.text();
//               throw new Error(`Validation failed: ${validationResponse.status} - ${errorText}`);
//             }

//             const validationResult = await validationResponse.json();
//             console.log('Payment validation result:', validationResult);

//             if (validationResult.success) {
//               let successMessage = "Payment successful! Your booking is confirmed.";
              
//               if (validationResult.transferInitiated) {
//                 successMessage += " Funds transfer to property owner has been initiated.";
//               } else if (validationResult.transferInitiated === false) {
//                 successMessage += " Note: Automatic transfer to property owner failed and will be retried.";
//               }
              
//               alert(successMessage);
              
//               // Navigate to confirmation page
//               navigate("/user/booking/conformation", { 
//                 state: { 
//                   booking: validationResult.booking,
//                   transactionId: response.razorpay_payment_id,
//                   paymentDetails: validationResult,
//                   advanceAmount: bookingData.advanceAmount,
//                   securityDeposit: bookingData.securityDeposit,
//                   totalAmount: bookingData.totalAmount,
//                   transferStatus: validationResult.transferInitiated ? 'initiated' : 'failed',
//                   transferAmounts: validationResult.transferAmounts
//                 } 
//               });
//             } else {
//               alert("Payment validation failed: " + validationResult.message);
//             }
//           } catch (error) {
//             console.error("Payment validation error:", error);
//             alert("An error occurred during payment validation: " + error.message);
//           } finally {
//             setProcessing(false);
//           }
//         },
//         prefill: {
//           name: bookingData.customerDetails?.primary?.name || "Customer",
//           email: bookingData.customerDetails?.primary?.email || "customer@example.com",
//           contact: bookingData.customerDetails?.primary?.mobile || "9999999999",
//         },
//         notes: {
//           property: bookingData.propertyName || "Unknown Property",
//           bookingId: temporaryBookingId
//         },
//         theme: {
//           color: "#0033A1",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
      
//       rzp1.on("payment.failed", function (response) {
//         console.error("Payment failed:", response.error);
//         alert(`Payment Failed: ${response.error.description}`);
//         setProcessing(false);
//       });
      
//       rzp1.open();
      
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       alert("An error occurred while initiating payment: " + error.message);
//       setProcessing(false);
//     }
//   };

//   if (!bookingData) {
//     return (
//       <>
//         <Header />
//         <div className="p-16">
//           <div className="flex items-center p-1">
//             <button
//               className="flex text-xl items-center gap-2 px-4 py-2 rounded"
//               onClick={() => navigate(-1)}
//             >
//               <ArrowLeft className="w-5 h-5" />
//               Back
//             </button>
//           </div>
//           <div className="text-center py-8">
//             <p>No booking information found. Please go back and try again.</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const { advanceAmount = 0, securityDeposit = 0, totalAmount = 0 } = bookingData;

//   return (
//     <>
//       <Header />
//       <div className="p-16">
//         <div className="flex items-center p-1">
//           <button
//             className="flex text-xl items-center gap-2 px-4 py-2 rounded"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Pay Rent
//           </button>
//         </div>

//         <div className="w-full sm:w-1/3 flex justify-center items-center mx-auto py-8">
//           <div className="p-6 w-full bg-white rounded-md shadow-lg">
//             <div className="flex justify-between text-sm text-gray-700">
//               <h2 className="text-lg font-semibold mb-4">Total Amount to be Paid</h2>
//               <span className="text-lg font-semibold mb-4">
//                 ₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//               </span>
//             </div>

//             <div className="mb-4">
//               <div className="flex justify-between text-sm text-gray-700">
//                 <span>Advance Amount (First Month)</span>
//                 <span>₹ {advanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-700 mt-1">
//                 <span>Security Deposit</span>
//                 <span>₹ {securityDeposit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
//               </div>
              
//               {/* Transfer Information */}
//               <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                 <div className="flex gap-2 text-sm text-blue-700 mb-2">
//                   <Info className="w-4 h-4 mt-0.5" />
//                   <p className="font-semibold">Automatic Fund Transfer</p>
//                 </div>
//                 <p className="text-xs text-blue-600">
//                   After payment, funds will be automatically transferred to the property owner (minus 5% platform fee + 18% GST).
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-center items-center">
//               <button
//                 className="w-1/2 bg-[#FEE123] hover:bg-[#E6C200] text-black font-semibold py-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 onClick={paymentHandler}
//                 disabled={processing}
//               >
//                 {processing ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




import React, { useState, useEffect } from "react";
import { ArrowLeft, Info, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../Header';
import { API_BASE_URL } from '../../Clients-components/PropertyController';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [processing, setProcessing] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [existingBookingId, setExistingBookingId] = useState(null);

  const RAZORPAY_KEY_ID = "rzp_live_RWWvXeMcmTohhi";

  useEffect(() => {
    console.log('📍 Location state:', location.state);
    
    if (location.state) {
      const state = location.state;
      let propertyId = state.propertyId || 
                      state.booking?.propertyId || 
                      state.booking?.property?._id ||
                      state.pgData?.id;

      if (!propertyId) {
        console.error('❌ Property ID missing from location state');
        alert('Property information missing. Please go back and try again.');
        navigate("/user/search");
        return;
      }

      console.log('✅ Property ID found:', propertyId);

      const enhancedBookingData = {
        ...state,
        propertyId: propertyId,
        booking: {
          ...state.booking,
          propertyId: propertyId
        }
      };

      setBookingData(enhancedBookingData);
      
      // If there's an existing booking ID, store it
      if (state.booking?.id) {
        setExistingBookingId(state.booking.id);
        console.log('✅ Existing booking ID found:', state.booking.id);
      }
    } else {
      navigate("/user/search");
    }
  }, [location.state, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createBookingBeforePayment = async (bookingData) => {
    try {
      console.log('📝 Creating booking before payment...');
      
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create booking");
      }

      console.log('✅ Booking created successfully:', result.booking);
      return result.booking;

    } catch (error) {
      console.error('❌ Booking creation error:', error);
      throw error;
    }
  };

  const calculateTransferBreakdown = (totalAmount) => {
    const platformCommission = totalAmount * 0.05;
    const gstOnCommission = platformCommission * 0.18;
    const totalPlatformEarnings = platformCommission + gstOnCommission;
    const clientAmount = totalAmount - totalPlatformEarnings;

    return {
      platformCommission,
      gstOnCommission,
      totalPlatformEarnings,
      clientAmount
    };
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    
    if (!bookingData) {
      alert("No booking data available");
      return;
    }

    setProcessing(true);

    try {
      // Load Razorpay script
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Prepare complete booking data
      const completeBookingData = {
        propertyId: bookingData.propertyId,
        roomType: bookingData.booking?.roomType || bookingData.selectedRoomType || bookingData.roomType,
        selectedRooms: bookingData.selectedRooms || bookingData.booking?.selectedRooms || [],
        moveInDate: bookingData.selectedDate || bookingData.booking?.moveInDate || bookingData.moveInDate,
        endDate: bookingData.endDate || bookingData.booking?.endDate || bookingData.moveOutDate,
        durationType: bookingData.durationType || 'monthly',
        durationDays: bookingData.durationDays || 30,
        durationMonths: bookingData.durationMonths || 1,
        personCount: bookingData.personCount || 1,
        customerDetails: bookingData.customerDetails || {
          primary: {
            name: "Customer",
            email: "customer@example.com",
            mobile: "9999999999"
          }
        },
        pricing: {
          totalAmount: bookingData.totalAmount || bookingData.price || 0,
          advanceAmount: bookingData.advanceAmount || 0,
          securityDeposit: bookingData.securityDeposit || 0,
          maintenanceFee: bookingData.maintenanceFee || 0
        },
        bookingStatus: "pending_payment"
      };

      console.log('✅ Final booking data for payment:', completeBookingData);

      let bookingId = existingBookingId;

      // Create booking if it doesn't exist
      if (!bookingId) {
        const newBooking = await createBookingBeforePayment(completeBookingData);
        bookingId = newBooking.id;
        console.log('✅ New booking created with ID:', bookingId);
      } else {
        console.log('✅ Using existing booking ID:', bookingId);
      }

      // Validate amount
      const amount = bookingData.totalAmount || bookingData.price || 0;
      if (!amount || amount <= 0) {
        throw new Error("Invalid amount for payment");
      }

      // Convert to paise for Razorpay
      const amountInPaise = Math.round(parseFloat(amount) * 100);

      // Create Razorpay order
      console.log('💰 Creating order for amount:', amount, '(in paise:', amountInPaise, ')');
      
      const orderResponse = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `booking_${Date.now()}`,
          bookingData: {
            ...completeBookingData,
            bookingId: bookingId // Include booking ID in payment data
          }
        })
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || !orderResult.success) {
        console.error('❌ Order creation failed:', orderResult);
        throw new Error(orderResult.message || "Failed to create payment order");
      }

      console.log('✅ Order created:', orderResult.order.id);

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: "LivCo Properties",
        description: `Booking Payment for ${bookingData.propertyName || 'Property'}`,
        image: window.location.origin + "/logo.png", // Use absolute URL
        order_id: orderResult.order.id,
        handler: async function (response) {
          try {
            console.log('✅ Payment successful, validating...', response);
            
            const validationResponse = await fetch(`${API_BASE_URL}/api/payments/validate-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  ...completeBookingData,
                  bookingId: bookingId // Send the booking ID for updating
                }
              })
            });

            const validationResult = await validationResponse.json();
            console.log('✅ Payment validation result:', validationResult);

            if (validationResult.success) {
              let successMessage = "Payment successful! Your booking is confirmed.";
              
              if (validationResult.transferInitiated) {
                successMessage += " Funds transfer to property owner has been initiated.";
              } else {
                successMessage += " Note: Automatic transfer to property owner failed and will be retried.";
              }
              
              // Navigate to confirmation page
              navigate("/user/booking/conformation", { 
                state: { 
                  booking: validationResult.booking,
                  transactionId: response.razorpay_payment_id,
                  paymentDetails: validationResult,
                  totalAmount: amount,
                  transferInitiated: validationResult.transferInitiated,
                  transferDetails: validationResult.transferDetails
                } 
              });
              
            } else {
              alert("Payment validation failed: " + validationResult.message);
            }
          } catch (error) {
            console.error("❌ Payment validation error:", error);
            alert("Payment validation error: " + error.message);
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: completeBookingData.customerDetails?.primary?.name || "Customer",
          email: completeBookingData.customerDetails?.primary?.email || "customer@example.com",
          contact: completeBookingData.customerDetails?.primary?.mobile || "9999999999",
        },
        notes: {
          bookingId: bookingId,
          propertyId: completeBookingData.propertyId
        },
        theme: {
          color: "#0033A1",
        },
      };

      const rzp1 = new window.Razorpay(options);
      
      rzp1.on("payment.failed", function (response) {
        console.error("❌ Payment failed:", response.error);
        alert(`Payment Failed: ${response.error.description}`);
        setProcessing(false);
      });

      rzp1.on("modal.close", function () {
        console.log("Modal closed by user");
        setProcessing(false);
      });
      
      rzp1.open();
      
    } catch (error) {
      console.error("❌ Payment initiation error:", error);
      alert("Payment Error: " + error.message);
      setProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <>
        <Header />
        <div className="p-16">
          <div className="flex items-center p-1">
            <button
              className="flex text-xl items-center gap-2 px-4 py-2 rounded"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          <div className="text-center py-8">
            <p>Loading booking information...</p>
          </div>
        </div>
      </>
    );
  }

  const amount = bookingData.totalAmount || bookingData.price || 0;
  const advanceAmount = bookingData.advanceAmount || 0;
  const securityDeposit = bookingData.securityDeposit || 0;
  const transferBreakdown = calculateTransferBreakdown(amount);

  return (
    <>
      <Header />
      <div className="p-16">
        <div className="flex items-center p-1">
          <button
            className="flex text-xl items-center gap-2 px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            Pay Rent
          </button>
        </div>

        <div className="w-full sm:w-1/3 flex justify-center items-center mx-auto py-8">
          <div className="p-6 w-full bg-white rounded-md shadow-lg">
            <div className="flex justify-between text-sm text-gray-700">
              <h2 className="text-lg font-semibold mb-4">Total Amount to be Paid</h2>
              <span className="text-lg font-semibold mb-4">
                ₹ {amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="mb-4">
              {advanceAmount > 0 && (
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Advance Amount</span>
                  <span>₹ {advanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {securityDeposit > 0 && (
                <div className="flex justify-between text-sm text-gray-700 mt-1">
                  <span>Security Deposit</span>
                  <span>₹ {securityDeposit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              
              {/* Transfer Information */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-2 text-sm text-blue-700 mb-2">
                  <Info className="w-4 h-4 mt-0.5" />
                  <p className="font-semibold">Automatic Fund Transfer</p>
                </div>
                <p className="text-xs text-blue-600 mb-2">
                  After payment, funds will be automatically transferred to the property owner:
                </p>
                
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Payment:</span>
                    <span>₹ {amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (5%):</span>
                    <span>- ₹ {transferBreakdown.platformCommission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST on Platform Fee (18%):</span>
                    <span>- ₹ {transferBreakdown.gstOnCommission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Amount to Property Owner:</span>
                    <span>₹ {transferBreakdown.clientAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                className="w-1/2 bg-[#FEE123] hover:bg-[#E6C200] text-black font-semibold py-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={paymentHandler}
                disabled={processing}
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${amount.toLocaleString()}`
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}