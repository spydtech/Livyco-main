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


import React, { useState, useEffect } from "react";
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../Header';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [processing, setProcessing] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Use your actual Razorpay key here
  const RAZORPAY_KEY_ID = "rzp_test_RAk2W9hoDqrojA"; // Replace with your actual key

  useEffect(() => {
    console.log('Location state:', location.state);
    if (location.state) {
      setBookingData(location.state);
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
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
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

      // Create a unique receipt ID
      const receiptId = `booking_${bookingData.booking?._id || Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create Razorpay order
      const response = await fetch("http://localhost:5000/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          amount: bookingData.totalAmount * 100, // Convert to paise
          currency: "INR",
          receipt: receiptId
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
      }

      const orderData = await response.json();

      if (!orderData.success || !orderData.order.id) {
        throw new Error("Failed to create payment order");
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "PG Booking System",
        description: `Booking Payment for ${bookingData.booking?.property || 'Property'}`,
        image: "/logo.png",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Validate payment on server
            const validationResponse = await fetch("http://localhost:5000/api/payments/validate-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingData.booking?._id,
                amount: bookingData.totalAmount * 100
              })
            });

            if (!validationResponse.ok) {
              const errorText = await validationResponse.text();
              throw new Error(`Validation failed: ${validationResponse.status} - ${errorText}`);
            }

            const validationResult = await validationResponse.json();

            if (validationResult.success) {
              alert("Payment successful! Your booking is confirmed.");
              
              // Navigate to Cancel page with all necessary data
              navigate("/user/booking/conformation", { 
                state: { 
                  booking: bookingData.booking,
                  transactionId: response.razorpay_payment_id,
                  paymentDetails: validationResult,
                  advanceAmount: bookingData.advanceAmount,
                  securityDeposit: bookingData.securityDeposit,
                  totalAmount: bookingData.totalAmount
                } 
              });
            } else {
              alert("Payment validation failed: " + validationResult.message);
            }
          } catch (error) {
            console.error("Payment validation error:", error);
            alert("An error occurred during payment validation: " + error.message);
          }
        },
        prefill: {
          name: bookingData.booking?.customerDetails?.primary?.name || "Customer",
          email: bookingData.booking?.customerDetails?.primary?.email || "customer@example.com",
          contact: bookingData.booking?.customerDetails?.primary?.mobile || "9999999999",
        },
        notes: {
          bookingId: bookingData.booking?._id || "unknown",
          property: bookingData.booking?.property || "Unknown Property"
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      
      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment Failed: ${response.error.description}`);
        setProcessing(false);
        
        // Update booking status to failed if we have a booking ID
        if (bookingData.booking?._id) {
          fetch(`http://localhost:5000/api/auth/bookings/${bookingData.booking._id}/payment`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              paymentStatus: "failed",
              transactionId: response.error.metadata?.payment_id
            })
          }).catch(err => console.error("Failed to update booking status:", err));
        }
      });
      
      rzp1.open();
      
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("An error occurred while initiating payment: " + error.message);
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
            <p>No booking information found. Please go back and try again.</p>
          </div>
        </div>
      </>
    );
  }

  const { booking, advanceAmount = 0, securityDeposit = 0, totalAmount = 0 } = bookingData;

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
                ₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Advance Amount (First Month)</span>
                <span>₹ {advanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 mt-1">
                <span>Security Deposit</span>
                <span>₹ {securityDeposit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex gap-2 text-sm text-gray-700 mt-4">
                <Info className="w-5 h-5 text-[#0827B2]" />
                <p>Important info</p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                className="w-1/2 bg-[#FEE123] hover:bg-[#E6C200] text-black font-semibold py-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={paymentHandler}
                disabled={processing}
              >
                {processing ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}