// import React, { useState } from "react";
// import { FaChevronUp, FaInfoCircle, FaCopy } from "react-icons/fa";
// import bgimage from "../../assets/user/pgsearch/image (5).png";
// import rightimage from "../../assets/livco logo.png";
// import { useNavigate } from "react-router-dom";

// export default function Payments() {
//   const navigate = useNavigate();
//   const user = {
//     rent: 8000,
//     advance: 3000,
//     gst: 0,
//     subscription: 19,
//   };

//   const totalAmount = user.rent + user.advance + user.gst + user.subscription;
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const transactionId = "01112024125802";

//   const handlePay = () => {
//     setPaymentDone(true);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(transactionId);
//     alert("Transaction ID copied!");
//   };

//   const handleShare = () => {
//     alert("Receipt shared!");
//   };

//   // Common Breadcrumb Component
//   const Breadcrumbs = () => (
//     <div className="absolute top-6 left-6 text-sm text-gray-800 flex gap-2 z-10">
//       <span
//         onClick={() => navigate("/")}
//         className="cursor-pointer hover:underline"
//       >
//         Home
//       </span>
//       <span>/</span>
//       <span
//         onClick={() => navigate("/wallet")}
//         className="cursor-pointer hover:underline"
//       >
//         Payments
//       </span>
//     </div>
//   );

//   if (paymentDone) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${bgimage})` }}
//       >
//         <Breadcrumbs />

//         <div
//           className="w-[400px] h-[400px] bg-cover bg-center text-white rounded-2xl shadow-2xl border border-white flex flex-col items-center justify-center p-6 text-center"
//           style={{
//             backgroundImage: `linear-gradient(rgba(8, 39, 178, 0.7), rgba(8, 39, 178, 0.7)), url(${bgimage})`,
//           }}
//         >
//           <div className="mb-6">
//             <img
//               src={rightimage}
//               alt="Success"
//               className="w-[60px] h-[60px] mx-auto mb-2"
//             />
//           </div>

//           <h2 className="text-xl font-semibold mb-2">Payment Successful</h2>
//           <p className="text-lg font-medium mb-4">Your payment is successful</p>

//           <div className="flex justify-center items-center gap-2 mb-6">
//             <span className="text-sm tracking-wide">
//               Transaction ID : {transactionId}
//             </span>
//             <FaCopy
//               className="cursor-pointer text-white hover:text-yellow-400 transition"
//               onClick={handleCopy}
//             />
//           </div>

//           <button
//             onClick={handleShare}
//             className="bg-yellow-400 hover:bg-yellow-500 text-[#0033A1] font-semibold px-6 py-2 rounded-xl transition"
//           >
//             Share Receipt
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 relative"
//       style={{ backgroundImage: `url(${bgimage})` }}
//     >
//       <Breadcrumbs />

//       <div className="border border-black py-20 px-[100px] rounded-2xl  bg-opacity-80 shadow-xl mt-20">
//         <div className="bg-white w-full max-w-md h-[400px] rounded-2xl border border-yellow-400 p-6 shadow-md relative">
//           {/* Header: Title + Amount + Dropdown */}
//           <div className="flex justify-center items-center gap-8 mb-4">
//             <h2 className="text-lg font-semibold text-gray-700 whitespace-nowrap">
//               Amount to be paid
//             </h2>
//             <div className="flex items-center gap-2 relative">
//               <span className="text-2xl font-bold text-gray-700">
//                 ₹{totalAmount.toFixed(2)}
//               </span>
//               <div
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className={`cursor-pointer transition-transform duration-300 ${
//                   showDropdown ? "rotate-180" : ""
//                 } bg-green-100 p-1 rounded-full text-green-600`}
//               >
//                 <FaChevronUp className="text-xs" />
//               </div>
//             </div>
//           </div>

//           {/* Dropdown: Rent + Advance */}
//           {showDropdown && (
//             <div className="space-y-2 text-sm text-gray-600 mb-4">
//               <div className="flex justify-center gap-24">
//                 <span>Advance Amount</span>
//                 <span className="font-medium text-gray-700">
//                   ₹{user.advance}
//                 </span>
//               </div>
//               <div className="flex justify-center gap-32">
//                 <span>Rent</span>
//                 <span className="font-medium text-gray-700">₹{user.rent}</span>
//               </div>
//             </div>
//           )}

//           {/* GST & Subscription */}
//           <div className="space-y-2 text-sm text-gray-600 mb-4 border-t pt-4">
//             <div className="flex justify-between">
//               <span>GST 18%</span>
//               <span className="font-medium text-gray-700">₹{user.gst}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Subscription</span>
//               <span className="font-medium text-gray-700">
//                 ₹{user.subscription}
//               </span>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="flex items-start gap-2 text-gray-500 text-sm mb-6">
//             <FaInfoCircle className="text-blue-500 mt-1" />
//             <p>
//               Sapiente asperiores ut inventore. Voluptatem molestiae atque
//               minima corrupti adipisci fugiat a.
//             </p>
//           </div>

//           {/* Pay Button */}
//           <button
//             onClick={handlePay}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 mt-4"
//           >
//             Pay ₹{totalAmount.toFixed(2)}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";
import { vacateAPI, paymentAPI } from "../PropertyController";

const Clientpayments = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayLoading, setRazorpayLoading] = useState(false);

  const { amount, vacateRequest } = location.state || {};

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
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

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    try {
      setRazorpayLoading(true);
      
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // Create order
      const orderResponse = await paymentAPI.createOrder({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${id}_${Date.now()}`,
        description: 'Outstanding amount payment',
        bookingId: vacateRequest.bookingId
      });

      if (!orderResponse.data.success) {
        throw new Error('Failed to create order');
      }

      const { order } = orderResponse.data;

      // Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "LivCo Properties",
        description: "Payment for outstanding amount",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          const verificationResponse = await paymentAPI.validatePayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: vacateRequest.bookingId,
            amount: order.amount,
            description: 'Outstanding amount payment'
          });

          if (verificationResponse.data.success) {
            // Update payment in backend
            await processPayment('online', response.razorpay_payment_id);
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: vacateRequest.user?.name || '',
          email: vacateRequest.user?.email || '',
          contact: vacateRequest.user?.phone || ''
        },
        theme: {
          color: "#0033A1"
        },
        modal: {
          ondismiss: function() {
            setRazorpayLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      console.error('Razorpay error:', err);
      alert('Error initiating payment: ' + (err.response?.data?.message || err.message));
      setRazorpayLoading(false);
    }
  };

  // Process payment (both online and offline)
  const processPayment = async (method, txnId) => {
    try {
      setProcessing(true);
      
      const response = await vacateAPI.processDuePayment(id, {
        paymentMethod: method,
        transactionId: txnId,
        amount: amount,
        description: `${method} payment for outstanding amount`
      });

      if (response.data.success) {
        alert("Payment processed successfully!");
        navigate(`/client/confirm-booking/${id}`, { state: vacateRequest });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process payment");
      alert("Error processing payment: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(false);
      setRazorpayLoading(false);
    }
  };

  const handleOfflinePayment = async () => {
    if (!transactionId) {
      alert("Please enter transaction ID");
      return;
    }

    await processPayment(paymentMethod, transactionId);
  };

  if (!amount || !vacateRequest) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
          <div className="text-red-600">Invalid request. Please go back and try again.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNav />
      <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="text-gray-500 text-sm">
            <span className="cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
            <span className="mx-2">/</span>
            <span className="cursor-pointer hover:underline" onClick={() => navigate(`/client/vacate-request/${id}`)}>Tenant Request</span>
            <span className="mx-2">/</span>
            <span>Process Due Payment</span>
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Process Due Payment</h2>
          
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">
              <strong>Tenant:</strong> {vacateRequest.user?.name || 'N/A'}<br/>
              <strong>Amount Due:</strong> ₹{amount}
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="online"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="online" className="cursor-pointer">Online Payment (Razorpay)</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cash" className="cursor-pointer">Cash</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bank_transfer"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="bank_transfer" className="cursor-pointer">Bank Transfer</label>
              </div>
            </div>
          </div>

          {/* Transaction ID for offline payments */}
          {(paymentMethod === 'cash' || paymentMethod === 'bank_transfer') && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {paymentMethod === 'cash' ? 'Receipt Number' : 'Transaction ID'}
              </label>
              <input 
                type="text"
                className="w-full p-3 border rounded-lg"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder={paymentMethod === 'cash' ? 'Enter receipt number' : 'Enter transaction ID'}
              />
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <button 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => navigate(-1)}
              disabled={processing || razorpayLoading}
            >
              Cancel
            </button>
            
            {paymentMethod === 'online' ? (
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                onClick={handleRazorpayPayment}
                disabled={processing || razorpayLoading}
              >
                {razorpayLoading ? "Loading..." : processing ? "Processing..." : "Pay with Razorpay"}
              </button>
            ) : (
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleOfflinePayment}
                disabled={processing || !transactionId}
              >
                {processing ? "Processing..." : "Submit Payment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientpayments;