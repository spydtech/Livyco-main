// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FiExternalLink } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";

// const TanentConfirmbox = () => {
//   const location = useLocation();
//     const navigate = useNavigate();
//     const tenant = location.state || {}; // Ensure tenant data is passed
  
  
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(true);

 

//   if (!tenant) {
//     return <div className="text-center mt-10 text-lg text-red-500">Tenant data not available.</div>;
//   }

//   return (
//     <>
//     <ClientNav />
//     <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
//       {/* Header */}
//       <div className="w-full max-w-7xl">
//       <h2 className="text-gray-500 text-sm cursor-pointer" onClick={() => navigate(-1)}>
//           Home / Tenant Request
//         </h2>
//       </div>

//       {/* Card Container */}
//       <div className="bg-[#F8F8FF] shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
        
//         {/* Tenant Details */}
//         <div className="flex justify-between border p-2  pb-4">
//           <div>
//             <h2 className="text-xl font-semibold">{tenant.name}</h2>
//             <p className="text-gray-600">{tenant.email}</p>
//             <p className="text-gray-600">{tenant.phone || "98********"}</p>
//             <p className="text-gray-600">Booking Amount: ₹{tenant.bookingAmount || "2000"}/-</p>
//             <p className="text-gray-600">Joined on {tenant.joinedDate || "02-02-2021"}</p>
//             <p className="text-green-600">KYC has been verified</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-500">Check out On</p>
//             <p className="text-md font-semibold">{tenant.checkOutDate || "09 Jan 2025"}</p>
//           </div>
//         </div>

//         {/* Payment Details */}
//         <div className="border p-2 py-4 flex justify-between items-center">
//           <div className="">
//             <h3 className="font-semibold">Payment Detailed</h3>
//             <p className="text-gray-600 justify-between flex">Last Due paid on: {tenant.lastDuePaid || "dd/mm/yyyy"}</p>
//             <p className="text-gray-600 justify-between flex">Advance amount: ₹{tenant.advancePaid || "2,000"}</p>
//             <p className="text-gray-600 justify-between flex">Outstanding Due: ₹{tenant.outstandingDue || "0"}</p>
//           </div>
//           <div className="text-blue-500 cursor-pointer flex items-center -mt-12">
//             <span>View all Transactions</span>
//             <FiExternalLink className="ml-1" />
//           </div>
//         </div>

//         {/* Room Details */}
//         <div className="py-4 border p-2">
           
//           <h3 className="font-semibold">Room Detailed</h3>
//           <div className="flex justify-between items-center">
//           <div>
//           <p className="text-gray-600">Booking detail</p>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//               {tenant.roomNumber || "Room 101 - Bed B"}
//             </span>
//             <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//               {tenant.sharingType || "2 Sharing"}
//             </span>
//           </div>
//           </div>
//         </div>

//         {/* Approve Check-out Checkbox */}
//         <div className="flex items-center justify-center mt-4">
//           <input
//             type="checkbox"
//             id="approveCheckout"
//             className="mr-2"
//             checked={isChecked}
//             onChange={() => setIsChecked(!isChecked)}
//           />
//           <label htmlFor="approveCheckout" className="text-gray-700">
//             Approve Check-out
//           </label>
//         </div>

//         {/* Approve Button */}
//         <div className="flex justify-center mt-4">
//           <button
//             className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
//               isChecked ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
//             }`}
//             disabled={!isChecked}
//             onClick={() => alert("Refund Processed!")}
//           >
//             Approve and Process Refund
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default TanentConfirmbox;





// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FiExternalLink } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { vacateAPI } from "../PropertyController";

// const TanentConfirmbox = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [vacateRequest, setVacateRequest] = useState({});
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [deductions, setDeductions] = useState([]);
//   const [refundAmount, setRefundAmount] = useState(0);

//   useEffect(() => {
//     // First check if we have data from navigation state
//     if (location.state) {
//       setVacateRequest(location.state);
//       setRefundAmount(location.state.calculatedRefund || 0);
//       setLoading(false);
//     } else if (id) {
//       // If no state data, fetch from API
//       fetchVacateRequestDetails(id);
//     }
//   }, [id, location.state]);

//   const fetchVacateRequestDetails = async (requestId) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       // Since your API returns an array of requests, we need to find the specific one
//       const response = await vacateAPI.getVacateRequests();
      
//       if (response.data?.success && response.data.requests) {
//         const request = response.data.requests.find(req => req.id === requestId);
        
//         if (request) {
//           setVacateRequest(request);
//           // Calculate refund amount
//           const securityDeposit = request.booking?.pricing?.securityDeposit || 0;
//           const outstandingAmount = request.outstandingAmount || 0;
//           setRefundAmount(Math.max(0, securityDeposit - outstandingAmount));
//         } else {
//           setError("Request not found");
//         }
//       } else {
//         setError("Failed to load request details");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to load request details");
//       console.error("Error fetching request details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveCheckout = async () => {
//     if (!isChecked) return;

//     try {
//       setProcessing(true);
//       setError("");

//       const approvalData = {
//         action: "approve",
//         refundAmount: refundAmount,
//         notes: "Checkout approved and refund processed",
//         deductions: deductions
//       };

//       await vacateAPI.processVacateRequest(id, approvalData);
      
//       alert("Vacate request approved and refund processed successfully!");
//       navigate("/client/tenant-checkout-requests");
      
//     } catch (err) {
//       setError(err.message || "Failed to process approval");
//       alert("Error processing approval: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const addDeduction = () => {
//     const description = prompt("Enter deduction description:");
//     const amount = parseFloat(prompt("Enter deduction amount:"));
    
//     if (description && !isNaN(amount)) {
//       const newDeductions = [...deductions, { description, amount }];
//       setDeductions(newDeductions);
      
//       // Recalculate refund amount
//       const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//       const outstandingAmount = vacateRequest.outstandingAmount || 0;
//       const totalDeductions = newDeductions.reduce((sum, d) => sum + d.amount, 0);
//       const newRefundAmount = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//       setRefundAmount(newRefundAmount);
//     }
//   };

//   const removeDeduction = (index) => {
//     const newDeductions = deductions.filter((_, i) => i !== index);
//     setDeductions(newDeductions);
    
//     // Recalculate refund amount
//     const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//     const outstandingAmount = vacateRequest.outstandingAmount || 0;
//     const totalDeductions = newDeductions.reduce((sum, d) => sum + d.amount, 0);
//     const newRefundAmount = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//     setRefundAmount(newRefundAmount);
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading request details...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button 
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Go Back
//           </button>
//         </div>
//       </>
//     );
//   }

//   const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//   const outstandingAmount = vacateRequest.outstandingAmount || 0;
//   const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
//         {/* Header */}
//         <div className="w-full max-w-7xl">
//           <h2 
//             className="text-gray-500 text-sm cursor-pointer" 
//             onClick={() => navigate(-1)}
//           >
//             Home / Vacate Requests / Approve Checkout
//           </h2>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 w-full max-w-4xl">
//             {error}
//           </div>
//         )}

//         {/* Card Container */}
//         <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
          
//           {/* Tenant Details */}
//           <div className="flex justify-between border p-2 pb-4">
//             <div>
//               <h2 className="text-xl font-semibold">{vacateRequest.user?.name || 'N/A'}</h2>
//               <p className="text-gray-600">{vacateRequest.user?.email || 'N/A'}</p>
//               <p className="text-gray-600">{vacateRequest.user?.phone || 'N/A'}</p>
//               <p className="text-gray-600">Client ID: {vacateRequest.user?.clientId || 'N/A'}</p>
//               <p className="text-green-600">KYC has been verified</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Requested Check-out Date</p>
//               <p className="text-md font-semibold">
//                 {vacateRequest.requestedDate ? new Date(vacateRequest.requestedDate).toLocaleDateString() : 'N/A'}
//               </p>
//             </div>
//           </div>

//           {/* Financial Summary */}
//           <div className="border p-4">
//             <h3 className="font-semibold mb-2">Financial Summary</h3>
//             <div className="grid grid-cols-2 gap-2">
//               <div className="text-gray-600">Security Deposit:</div>
//               <div className="text-right">₹{securityDeposit}</div>
              
//               <div className="text-gray-600">Outstanding Amount:</div>
//               <div className="text-right">₹{outstandingAmount}</div>
              
//               <div className="text-gray-600">Total Deductions:</div>
//               <div className="text-right">₹{totalDeductions}</div>
              
//               <div className="font-semibold">Final Refund Amount:</div>
//               <div className="text-right font-semibold">₹{refundAmount}</div>
//             </div>
//           </div>

//           {/* Deductions Section */}
//           <div className="border p-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-semibold">Deductions</h3>
//               <button 
//                 onClick={addDeduction}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//               >
//                 Add Deduction
//               </button>
//             </div>
            
//             {deductions.length === 0 ? (
//               <p className="text-gray-500 text-sm">No deductions added</p>
//             ) : (
//               <div className="space-y-2">
//                 {deductions.map((deduction, index) => (
//                   <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
//                     <div>
//                       <span className="font-medium">{deduction.description}</span>
//                       <span className="text-red-600 ml-2">-₹{deduction.amount}</span>
//                     </div>
//                     <button 
//                       onClick={() => removeDeduction(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Room Details */}
//           <div className="border p-4">
//             <h3 className="font-semibold mb-2">Room Details</h3>
//             {vacateRequest.booking?.roomDetails?.map((room, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <div>
//                   <p className="text-gray-600">Room {room.roomNumber} - {room.bed}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//                     {room.roomNumber} - {room.bed}
//                   </span>
//                   <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                     {room.sharingType} Sharing
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Approve Check-out Checkbox */}
//           <div className="flex items-center justify-center mt-4">
//             <input
//               type="checkbox"
//               id="approveCheckout"
//               className="mr-2"
//               checked={isChecked}
//               onChange={() => setIsChecked(!isChecked)}
//             />
//             <label htmlFor="approveCheckout" className="text-gray-700">
//               I confirm to approve checkout and process refund of ₹{refundAmount}
//             </label>
//           </div>

//           {/* Approve Button */}
//           <div className="flex justify-center mt-4">
//             <button
//               className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
//                 isChecked && !processing 
//                   ? "bg-blue-600 text-white hover:bg-blue-700" 
//                   : "bg-gray-400 text-gray-700 cursor-not-allowed"
//               }`}
//               disabled={!isChecked || processing}
//               onClick={handleApproveCheckout}
//             >
//               {processing ? "Processing..." : "Approve and Process Refund"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TanentConfirmbox;





import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiExternalLink, FiDollarSign } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";
import { vacateAPI } from "../PropertyController";

const TanentConfirmbox = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [vacateRequest, setVacateRequest] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [deductions, setDeductions] = useState([]);
  const [refundAmount, setRefundAmount] = useState(0);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (location.state) {
      setVacateRequest(location.state);
      calculateRefundAmount(location.state);
      setLoading(false);
    } else if (id) {
      fetchVacateRequestDetails(id);
    }
  }, [id, location.state]);

  const calculateRefundAmount = (request) => {
    const securityDeposit = request.booking?.pricing?.securityDeposit || 0;
    const outstandingAmount = request.outstandingAmount || 0;
    const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
    const calculatedRefund = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
    setRefundAmount(calculatedRefund);
    return calculatedRefund;
  };

  const fetchVacateRequestDetails = async (requestId) => {
    try {
      setLoading(true);
      setError("");
      
      const response = await vacateAPI.getVacateRequestById(requestId);
      
      if (response.data?.success) {
        setVacateRequest(response.data.request);
        calculateRefundAmount(response.data.request);
      } else {
        setError("Failed to load request details");
      }
    } catch (err) {
      setError(err.message || "Failed to load request details");
      console.error("Error fetching request details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveCheckout = async () => {
    if (!isChecked) return;

    try {
      setProcessing(true);
      setError("");

      const approvalData = {
        notes: "Checkout approved",
        deductions: deductions
      };

      const response = await vacateAPI.approveVacateRequest(id, approvalData);
      
      if (response.data.success) {
        alert("Vacate request approved successfully!");
        // Refresh the request details
        await fetchVacateRequestDetails(id);
      }
      
    } catch (err) {
      if (err.response?.data?.requiresPayment) {
        // Redirect to payment page for due amount clearance
        navigate(`/client/payment-due/${id}`, { 
          state: { 
            amount: err.response.data.outstandingAmount,
            vacateRequest: vacateRequest
          } 
        });
      } else {
        setError(err.response?.data?.message || "Failed to process approval");
        alert("Error processing approval: " + (err.response?.data?.message || err.message));
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleInitiateRefund = async () => {
    try {
      setProcessing(true);
      const response = await vacateAPI.initiateRefund(id);
      
      if (response.data.success) {
        alert("Refund initiated successfully!");
        // Refresh the request details
        await fetchVacateRequestDetails(id);
        setShowRefundModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initiate refund");
      alert("Error initiating refund: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(false);
    }
  };

  const handleCompleteRefund = async () => {
    if (!transactionId) {
      alert("Please enter transaction ID");
      return;
    }

    try {
      setProcessing(true);
      const response = await vacateAPI.completeRefund(id, { transactionId });
      
      if (response.data.success) {
        alert("Refund completed successfully!");
        setShowRefundModal(false);
        setTransactionId("");
        // Refresh the request details
        await fetchVacateRequestDetails(id);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete refund");
      alert("Error completing refund: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(false);
    }
  };

  const addDeduction = () => {
    const description = prompt("Enter deduction description:");
    const amount = parseFloat(prompt("Enter deduction amount:"));
    
    if (description && !isNaN(amount)) {
      const newDeductions = [...deductions, { description, amount }];
      setDeductions(newDeductions);
      calculateRefundAmount(vacateRequest);
    }
  };

  const removeDeduction = (index) => {
    const newDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(newDeductions);
    calculateRefundAmount(vacateRequest);
  };

  if (loading) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading request details...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
  const outstandingAmount = vacateRequest.outstandingAmount || 0;
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const isApproved = vacateRequest.status === 'approved';
  const refundInitiated = vacateRequest.refundStatus === 'initiated';
  const refundCompleted = vacateRequest.refundStatus === 'completed';

  return (
    <>
      <ClientNav />
      <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-7xl">
          <h2 
            className="text-gray-500 text-sm cursor-pointer" 
            onClick={() => navigate(-1)}
          >
            Home / Vacate Requests / Approve Checkout
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 w-full max-w-4xl">
            {error}
          </div>
        )}

        {/* Status Banner */}
        {isApproved && (
          <div className={`w-full max-w-4xl mt-4 p-4 rounded-md ${
            refundCompleted ? 'bg-green-100 border border-green-400 text-green-700' :
            refundInitiated ? 'bg-blue-100 border border-blue-400 text-blue-700' :
            'bg-yellow-100 border border-yellow-400 text-yellow-700'
          }`}>
            <div className="flex items-center">
              <FiDollarSign className="mr-2" />
              <span className="font-semibold">
                {refundCompleted ? 'Refund Completed' : 
                 refundInitiated ? 'Refund Initiated - Awaiting Completion' : 
                 'Vacate Request Approved - Ready for Refund'}
              </span>
            </div>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
          
          {/* Tenant Details */}
          <div className="flex justify-between border p-2 pb-4">
            <div>
              <h2 className="text-xl font-semibold">{vacateRequest.user?.name || 'N/A'}</h2>
              <p className="text-gray-600">{vacateRequest.user?.email || 'N/A'}</p>
              <p className="text-gray-600">{vacateRequest.user?.phone || 'N/A'}</p>
              <p className="text-gray-600">Client ID: {vacateRequest.user?.clientId || 'N/A'}</p>
              <p className="text-green-600">KYC has been verified</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Requested Check-out Date</p>
              <p className="text-md font-semibold">
                {vacateRequest.requestedDate ? new Date(vacateRequest.requestedDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="border p-4">
            <h3 className="font-semibold mb-2">Financial Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600">Security Deposit:</div>
              <div className="text-right">₹{securityDeposit}</div>
              
              <div className="text-gray-600">Outstanding Amount:</div>
              <div className={`text-right ${outstandingAmount > 0 ? 'text-red-600' : ''}`}>
                ₹{outstandingAmount}
                {outstandingAmount > 0 && <span className="text-xs text-red-500 ml-1">(Due)</span>}
              </div>
              
              <div className="text-gray-600">Total Deductions:</div>
              <div className="text-right text-red-600">₹{totalDeductions}</div>
              
              <div className="font-semibold">Final Refund Amount:</div>
              <div className="text-right font-semibold text-green-600">₹{refundAmount}</div>
            </div>

            {outstandingAmount > 0 && !isApproved && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-800 text-sm">
                  <strong>Action Required:</strong> Tenant has an outstanding amount of ₹{outstandingAmount}. 
                  This amount must be cleared before approving the vacate request.
                </p>
                <button 
                  onClick={() => navigate(`/client/payment/${id}`, { 
                    state: { 
                      amount: outstandingAmount,
                      vacateRequest: vacateRequest
                    } 
                  })}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  Process Due Payment
                </button>
              </div>
            )}
          </div>

          {/* Deductions Section */}
          <div className="border p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Deductions</h3>
              {!isApproved && (
                <button 
                  onClick={addDeduction}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Add Deduction
                </button>
              )}
            </div>
            
            {deductions.length === 0 ? (
              <p className="text-gray-500 text-sm">No deductions added</p>
            ) : (
              <div className="space-y-2">
                {deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <div>
                      <span className="font-medium">{deduction.description}</span>
                      <span className="text-red-600 ml-2">-₹{deduction.amount}</span>
                    </div>
                    {!isApproved && (
                      <button 
                        onClick={() => removeDeduction(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Room Details */}
          <div className="border p-4">
            <h3 className="font-semibold mb-2">Room Details</h3>
            {vacateRequest.booking?.roomDetails?.map((room, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Room {room.roomNumber} - {room.bed}</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                    {room.roomNumber} - {room.bed}
                  </span>
                  <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                    {room.sharingType} Sharing
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {!isApproved ? (
            <>
              {/* Approve Check-out Checkbox */}
              <div className="flex items-center justify-center mt-4">
                <input
                  type="checkbox"
                  id="approveCheckout"
                  className="mr-2"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  disabled={outstandingAmount > 0}
                />
                <label htmlFor="approveCheckout" className="text-gray-700">
                  {outstandingAmount > 0 
                    ? "Clear due amount first to approve checkout" 
                    : `I confirm to approve checkout and process refund of ₹${refundAmount}`}
                </label>
              </div>

              {/* Approve Button */}
              <div className="flex justify-center mt-4">
                <button
                  className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
                    isChecked && !processing && outstandingAmount === 0
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!isChecked || processing || outstandingAmount > 0}
                  onClick={handleApproveCheckout}
                >
                  {processing ? "Processing..." : "Approve Checkout"}
                </button>
              </div>
            </>
          ) : (
            /* Refund Actions for Approved Requests */
            <div className="flex justify-center gap-4 mt-4">
              {!refundInitiated && !refundCompleted && (
                <button
                  className={`py-3 px-6 text-lg font-semibold rounded-md shadow-md transition ${
                    !processing
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={processing}
                  onClick={handleInitiateRefund}
                >
                  {processing ? "Processing..." : "Initiate Refund"}
                </button>
              )}
              
              {refundInitiated && !refundCompleted && (
                <button
                  className={`py-3 px-6 text-lg font-semibold rounded-md shadow-md transition ${
                    !processing
                      ? "bg-purple-600 text-white hover:bg-purple-700" 
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={processing}
                  onClick={() => setShowRefundModal(true)}
                >
                  Complete Refund
                </button>
              )}
              
              {refundCompleted && (
                <div className="text-center py-3 px-6 bg-green-100 text-green-700 rounded-md">
                  Refund Completed Successfully
                </div>
              )}
            </div>
          )}
        </div>

        {/* Refund Completion Modal */}
        {showRefundModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Complete Refund Process</h3>
              <p className="mb-4">Please enter the transaction details for the refund of ₹{refundAmount}:</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Transaction ID</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={() => {
                    setShowRefundModal(false);
                    setTransactionId("");
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                  onClick={handleCompleteRefund}
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Complete Refund"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TanentConfirmbox;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FiExternalLink, FiPlus, FiMinus, FiDollarSign } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { vacateAPI } from "../PropertyController";

// const TanentConfirmbox = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [vacateRequest, setVacateRequest] = useState({});
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [deductions, setDeductions] = useState([]);
//   const [refundAmount, setRefundAmount] = useState(0);
//   const [showTransactionHistory, setShowTransactionHistory] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentData, setPaymentData] = useState({
//     amount: "",
//     method: "cash",
//     transactionId: "",
//     notes: ""
//   });

//   useEffect(() => {
//     // First check if we have data from navigation state
//     if (location.state) {
//       setVacateRequest(location.state);
//       const securityDeposit = location.state.booking?.pricing?.securityDeposit || 0;
//       const outstandingAmount = location.state.outstandingAmount || 0;
//       setRefundAmount(Math.max(0, securityDeposit - outstandingAmount));
//       setLoading(false);
//     } else if (id) {
//       // If no state data, fetch from API
//       fetchVacateRequestDetails(id);
//     }
//   }, [id, location.state]);

//   const fetchVacateRequestDetails = async (requestId) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       // Fetch specific vacate request details
//       const response = await vacateAPI.getVacateRequestDetails(requestId);
      
//       if (response.data?.success && response.data.request) {
//         const request = response.data.request;
//         setVacateRequest(request);
        
//         // Calculate refund amount
//         const securityDeposit = request.booking?.pricing?.securityDeposit || 0;
//         const outstandingAmount = request.outstandingAmount || 0;
//         setRefundAmount(Math.max(0, securityDeposit - outstandingAmount));
//       } else {
//         setError("Request not found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to load request details");
//       console.error("Error fetching request details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveCheckout = async () => {
//     if (!isChecked) return;

//     try {
//       setProcessing(true);
//       setError("");

//       const approvalData = {
//         action: "approve",
//         refundAmount: refundAmount,
//         notes: "Checkout approved and refund processed",
//         deductions: deductions
//       };

//       await vacateAPI.processVacateRequest(id, approvalData);
      
//       alert("Vacate request approved and refund processed successfully!");
//       navigate("/client/tenant-checkout-requests");
      
//     } catch (err) {
//       setError(err.message || "Failed to process approval");
//       alert("Error processing approval: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleAddPayment = async () => {
//     if (!paymentData.amount || isNaN(paymentData.amount)) {
//       alert("Please enter a valid payment amount");
//       return;
//     }

//     try {
//       setProcessing(true);
      
//       // Here you would call your API to add a manual payment
//       // For now, we'll simulate the payment addition
//       const paymentAmount = parseFloat(paymentData.amount);
      
//       // Update outstanding amount and refund calculation
//       const newOutstandingAmount = Math.max(0, (vacateRequest.outstandingAmount || 0) - paymentAmount);
//       const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//       const newRefundAmount = Math.max(0, securityDeposit - newOutstandingAmount);
      
//       // Update local state
//       setVacateRequest(prev => ({
//         ...prev,
//         outstandingAmount: newOutstandingAmount
//       }));
//       setRefundAmount(newRefundAmount);
      
//       // Close modal and reset form
//       setShowPaymentModal(false);
//       setPaymentData({
//         amount: "",
//         method: "cash",
//         transactionId: "",
//         notes: ""
//       });
      
//       alert(`Payment of ₹${paymentAmount} added successfully!`);
      
//     } catch (err) {
//       setError(err.message || "Failed to add payment");
//       alert("Error adding payment: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const addDeduction = () => {
//     const description = prompt("Enter deduction description:");
//     const amount = parseFloat(prompt("Enter deduction amount:"));
    
//     if (description && !isNaN(amount)) {
//       const newDeductions = [...deductions, { description, amount }];
//       setDeductions(newDeductions);
      
//       // Recalculate refund amount
//       const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//       const outstandingAmount = vacateRequest.outstandingAmount || 0;
//       const totalDeductions = newDeductions.reduce((sum, d) => sum + d.amount, 0);
//       const newRefundAmount = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//       setRefundAmount(newRefundAmount);
//     }
//   };

//   const removeDeduction = (index) => {
//     const newDeductions = deductions.filter((_, i) => i !== index);
//     setDeductions(newDeductions);
    
//     // Recalculate refund amount
//     const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//     const outstandingAmount = vacateRequest.outstandingAmount || 0;
//     const totalDeductions = newDeductions.reduce((sum, d) => sum + d.amount, 0);
//     const newRefundAmount = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//     setRefundAmount(newRefundAmount);
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading request details...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button 
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Go Back
//           </button>
//         </div>
//       </>
//     );
//   }

//   const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//   const outstandingAmount = vacateRequest.outstandingAmount || 0;
//   const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
//   const monthlyRent = vacateRequest.booking?.pricing?.monthlyRent || 0;

//   // Mock transaction history data - in real app, this would come from API
//   const transactionHistory = [
//     { id: 1, date: "2024-01-15", description: "Security Deposit", amount: securityDeposit, type: "credit" },
//     { id: 2, date: "2024-02-01", description: "Monthly Rent", amount: monthlyRent, type: "debit" },
//     { id: 3, date: "2024-03-01", description: "Monthly Rent", amount: monthlyRent, type: "debit" },
//     // Add more transactions as needed
//   ];

//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
//         {/* Header */}
//         <div className="w-full max-w-7xl">
//           <h2 
//             className="text-gray-500 text-sm cursor-pointer" 
//             onClick={() => navigate(-1)}
//           >
//             Home / Vacate Requests / Approve Checkout
//           </h2>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 w-full max-w-4xl">
//             {error}
//           </div>
//         )}

//         {/* Card Container */}
//         <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
          
//           {/* Tenant Details */}
//           <div className="flex justify-between border p-4 rounded-lg">
//             <div>
//               <h2 className="text-xl font-semibold">{vacateRequest.user?.name || 'N/A'}</h2>
//               <p className="text-gray-600">{vacateRequest.user?.email || 'N/A'}</p>
//               <p className="text-gray-600">Phone: {vacateRequest.user?.phone || 'N/A'}</p>
//               <p className="text-gray-600">Client ID: {vacateRequest.user?.clientId || 'N/A'}</p>
//               <p className="text-green-600">KYC has been verified</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Requested Check-out Date</p>
//               <p className="text-md font-semibold">
//                 {vacateRequest.requestedDate ? new Date(vacateRequest.requestedDate).toLocaleDateString() : 'N/A'}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Move-in Date</p>
//               <p className="text-md">
//                 {vacateRequest.booking?.moveInDate ? new Date(vacateRequest.booking.moveInDate).toLocaleDateString() : 'N/A'}
//               </p>
//             </div>
//           </div>

//           {/* Financial Summary */}
//           <div className="border p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold">Financial Summary</h3>
//               <button 
//                 onClick={() => setShowPaymentModal(true)}
//                 className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center"
//               >
//                 <FiDollarSign className="mr-1" /> Add Payment
//               </button>
//             </div>
            
//             <div className="grid grid-cols-2 gap-3">
//               <div className="text-gray-600">Monthly Rent:</div>
//               <div className="text-right">₹{monthlyRent}</div>
              
//               <div className="text-gray-600">Security Deposit:</div>
//               <div className="text-right">₹{securityDeposit}</div>
              
//               <div className="text-gray-600">Outstanding Amount:</div>
//               <div className="text-right">₹{outstandingAmount}</div>
              
//               <div className="text-gray-600">Total Deductions:</div>
//               <div className="text-right">₹{totalDeductions}</div>
              
//               <div className="font-semibold border-t pt-2">Final Refund Amount:</div>
//               <div className="text-right font-semibold border-t pt-2">₹{refundAmount}</div>
//             </div>

//             <div className="mt-3">
//               <button 
//                 onClick={() => setShowTransactionHistory(!showTransactionHistory)}
//                 className="text-blue-500 cursor-pointer flex items-center text-sm"
//               >
//                 <span>View Transaction History</span>
//                 <FiExternalLink className="ml-1" />
//               </button>
//             </div>

//             {/* Transaction History */}
//             {showTransactionHistory && (
//               <div className="mt-4 p-3 bg-gray-50 rounded">
//                 <h4 className="font-semibold mb-2">Transaction History</h4>
//                 {transactionHistory.map(transaction => (
//                   <div key={transaction.id} className="flex justify-between text-sm py-1 border-b">
//                     <div>
//                       <span>{new Date(transaction.date).toLocaleDateString()}</span>
//                       <span className="ml-2">{transaction.description}</span>
//                     </div>
//                     <div className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
//                       {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Deductions Section */}
//           <div className="border p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-semibold">Deductions</h3>
//               <button 
//                 onClick={addDeduction}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center"
//               >
//                 <FiPlus className="mr-1" /> Add Deduction
//               </button>
//             </div>
            
//             {deductions.length === 0 ? (
//               <p className="text-gray-500 text-sm">No deductions added</p>
//             ) : (
//               <div className="space-y-2">
//                 {deductions.map((deduction, index) => (
//                   <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
//                     <div>
//                       <span className="font-medium">{deduction.description}</span>
//                       <span className="text-red-600 ml-2">-₹{deduction.amount}</span>
//                     </div>
//                     <button 
//                       onClick={() => removeDeduction(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FiMinus />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Room Details */}
//           <div className="border p-4 rounded-lg">
//             <h3 className="font-semibold mb-3">Room Details</h3>
//             {vacateRequest.booking?.roomDetails?.map((room, index) => (
//               <div key={index} className="flex justify-between items-center mb-2">
//                 <div>
//                   <p className="text-gray-600">Room {room.roomNumber} - {room.bed}</p>
//                   <p className="text-sm text-gray-500">Floor {room.floor}, {room.sharingType} Sharing</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//                     {room.roomNumber}
//                   </span>
//                   <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                     {room.sharingType}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Approve Check-out Checkbox */}
//           <div className="flex items-center justify-center mt-4 p-3 bg-gray-50 rounded">
//             <input
//               type="checkbox"
//               id="approveCheckout"
//               className="mr-3 h-5 w-5"
//               checked={isChecked}
//               onChange={() => setIsChecked(!isChecked)}
//             />
//             <label htmlFor="approveCheckout" className="text-gray-700 text-lg">
//               I confirm to approve checkout and process refund of ₹{refundAmount}
//             </label>
//           </div>

//           {/* Approve Button */}
//           <div className="flex justify-center mt-4">
//             <button
//               className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
//                 isChecked && !processing 
//                   ? "bg-blue-600 text-white hover:bg-blue-700" 
//                   : "bg-gray-400 text-gray-700 cursor-not-allowed"
//               }`}
//               disabled={!isChecked || processing}
//               onClick={handleApproveCheckout}
//             >
//               {processing ? "Processing..." : "Approve and Process Refund"}
//             </button>
//           </div>
//         </div>

//         {/* Payment Modal */}
//         {showPaymentModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h3 className="font-semibold text-lg mb-4">Add Manual Payment</h3>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Amount</label>
//                   <input
//                     type="number"
//                     value={paymentData.amount}
//                     onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter amount"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//                   <select
//                     value={paymentData.method}
//                     onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="cash">Cash</option>
//                     <option value="bank_transfer">Bank Transfer</option>
//                     <option value="upi">UPI</option>
//                     <option value="card">Card</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Transaction ID (Optional)</label>
//                   <input
//                     type="text"
//                     value={paymentData.transactionId}
//                     onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter transaction ID"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
//                   <textarea
//                     value={paymentData.notes}
//                     onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     rows="2"
//                     placeholder="Add notes"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={() => setShowPaymentModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddPayment}
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                   disabled={processing}
//                 >
//                   {processing ? "Processing..." : "Add Payment"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TanentConfirmbox;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FiExternalLink, FiPlus, FiMinus, FiDollarSign } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { vacateAPI } from "../PropertyController";

// const TanentConfirmbox = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [vacateRequest, setVacateRequest] = useState({});
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [deductions, setDeductions] = useState([]);
//   const [refundAmount, setRefundAmount] = useState(0);
//   const [showTransactionHistory, setShowTransactionHistory] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentData, setPaymentData] = useState({
//     amount: "",
//     method: "cash",
//     transactionId: "",
//     notes: ""
//   });

//   useEffect(() => {
//     // First check if we have data from navigation state
//     if (location.state) {
//       setVacateRequest(location.state);
//       const securityDeposit = location.state.booking?.pricing?.securityDeposit || 0;
//       const outstandingAmount = location.state.outstandingAmount || 0;
//       setRefundAmount(Math.max(0, securityDeposit - outstandingAmount));
//       setLoading(false);
//     } else if (id) {
//       // If no state data, fetch from API
//       fetchVacateRequestDetails(id);
//     }
//   }, [id, location.state]);

//   // Load Razorpay script dynamically
//   useEffect(() => {
//     const loadRazorpay = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpay();
//   }, []);

//   const fetchVacateRequestDetails = async (requestId) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       // Fetch specific vacate request details
//       const response = await vacateAPI.getVacateRequestDetails(requestId);
      
//       if (response.data?.success && response.data.request) {
//         const request = response.data.request;
//         setVacateRequest(request);
        
//         // Calculate refund amount
//         const securityDeposit = request.booking?.pricing?.securityDeposit || 0;
//         const outstandingAmount = request.outstandingAmount || 0;
//         setRefundAmount(Math.max(0, securityDeposit - outstandingAmount));
//       } else {
//         setError("Request not found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to load request details");
//       console.error("Error fetching request details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveCheckout = async () => {
//     if (!isChecked) return;

//     try {
//       setProcessing(true);
//       setError("");

//       const approvalData = {
//         action: "approve",
//         refundAmount: refundAmount,
//         notes: "Checkout approved and refund processed",
//         deductions: deductions
//       };

//       await vacateAPI.processVacateRequest(id, approvalData);
      
//       alert("Vacate request approved and refund processed successfully!");
//       navigate("/client/tenant-checkout-requests");
      
//     } catch (err) {
//       setError(err.message || "Failed to process approval");
//       alert("Error processing approval: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const generateTransactionId = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 10000);
//     return `TR${timestamp}${random}`;
//   };

//   const handleAddPayment = async () => {
//     if (!paymentData.amount || isNaN(paymentData.amount)) {
//       alert("Please enter a valid payment amount");
//       return;
//     }

//     try {
//       setProcessing(true);
      
//       const paymentAmount = parseFloat(paymentData.amount);
      
//       if (paymentData.method === 'online') {
//         // Initiate Razorpay payment for online method
//         await initiateRazorpayPayment(paymentAmount);
//       } else {
//         // For cash payments, generate transaction ID and process
//         const transactionId = generateTransactionId();
        
//         // Update outstanding amount and refund calculation
//         const newOutstandingAmount = Math.max(0, (vacateRequest.outstandingAmount || 0) - paymentAmount);
//         const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//         const newRefundAmount = Math.max(0, securityDeposit - newOutstandingAmount);
        
//         // Update local state
//         setVacateRequest(prev => ({
//           ...prev,
//           outstandingAmount: newOutstandingAmount
//         }));
//         setRefundAmount(newRefundAmount);
        
//         // Close modal and reset form
//         setShowPaymentModal(false);
//         setPaymentData({
//           amount: "",
//           method: "cash",
//           transactionId: "",
//           notes: ""
//         });
        
//         alert(`Cash payment of ₹${paymentAmount} added successfully!\nTransaction ID: ${transactionId}`);
//       }
      
//     } catch (err) {
//       setError(err.message || "Failed to add payment");
//       alert("Error adding payment: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const initiateRazorpayPayment = async (amount) => {
//     try {
//       // First, create a payment order on your server
//       const orderResponse = await vacateAPI.createPaymentOrder({
//         amount: amount * 100, // Convert to paise
//         currency: 'INR',
//         receipt: `receipt_${id}_${Date.now()}`
//       });

//       if (!orderResponse.data?.success) {
//         throw new Error('Failed to create payment order');
//       }

//       const orderData = orderResponse.data.order;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Your Company Name",
//         description: "Payment for outstanding amount",
//         order_id: orderData.id,
//         handler: async function (response) {
//           // Verify payment on your server
//           const verificationResponse = await vacateAPI.verifyPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//           });

//           if (verificationResponse.data?.success) {
//             // Payment successful - update outstanding amount
//             const newOutstandingAmount = Math.max(0, (vacateRequest.outstandingAmount || 0) - amount);
//             const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//             const newRefundAmount = Math.max(0, securityDeposit - newOutstandingAmount);
            
//             setVacateRequest(prev => ({
//               ...prev,
//               outstandingAmount: newOutstandingAmount
//             }));
//             setRefundAmount(newRefundAmount);
            
//             setShowPaymentModal(false);
//             setPaymentData({
//               amount: "",
//               method: "cash",
//               transactionId: "",
//               notes: ""
//             });
            
//             alert(`Online payment of ₹${amount} processed successfully!\nPayment ID: ${response.razorpay_payment_id}`);
//           } else {
//             alert("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: vacateRequest.user?.name || '',
//           email: vacateRequest.user?.email || '',
//           contact: vacateRequest.user?.phone || ''
//         },
//         notes: {
//           address: "Payment for vacate request",
//           vacate_request_id: id
//         },
//         theme: {
//           color: "#3399cc"
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
      
//     } catch (error) {
//       console.error("Razorpay payment error:", error);
//       alert("Failed to initiate payment: " + error.message);
//     }
//   };

//   const addDeduction = () => {
//     const description = prompt("Enter deduction description:");
//     const amount = parseFloat(prompt("Enter deduction amount:"));
    
//     if (description && !isNaN(amount)) {
//       const newDeductions = [...deductions, { description, amount }];
//       setDeductions(newDeductions);
      
//       // Recalculate refund amount
//       const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//       const outstandingAmount = vacateRequest.outstandingAmount || 0;
//       const totalDeductions = newDeductions.reduce((sum, d) => sum + d.amount, 0);
//       const newRefundAmount = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//       setRefundAmount(newRefundAmount);
//     }
//   };

//   const removeDeduction = (index) => {
//     const newDeductions = deductions.filter((_, i) => i !== index);
//     setDeductions(newDeductions);
    
//     // Recalculate refund amount
//     const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//     const outstandingAmount = vacateRequest.outstandingAmount || 0;
//     const totalDeductions = newDeductions.reduce((sum, d) => sum + d.amount, 0);
//     const newRefundAmount = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//     setRefundAmount(newRefundAmount);
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading request details...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button 
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Go Back
//           </button>
//         </div>
//       </>
//     );
//   }

//   const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//   const outstandingAmount = vacateRequest.outstandingAmount || 0;
//   const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
//   const monthlyRent = vacateRequest.booking?.pricing?.monthlyRent || 0;

//   // Mock transaction history data
//   const transactionHistory = [
//     { id: 1, date: "2024-01-15", description: "Security Deposit", amount: securityDeposit, type: "credit" },
//     { id: 2, date: "2024-02-01", description: "Monthly Rent", amount: monthlyRent, type: "debit" },
//     { id: 3, date: "2024-03-01", description: "Monthly Rent", amount: monthlyRent, type: "debit" },
//   ];

//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
//         {/* Header */}
//         <div className="w-full max-w-7xl">
//           <h2 
//             className="text-gray-500 text-sm cursor-pointer" 
//             onClick={() => navigate(-1)}
//           >
//             Home / Vacate Requests / Approve Checkout
//           </h2>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 w-full max-w-4xl">
//             {error}
//           </div>
//         )}

//         {/* Card Container */}
//         <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
          
//           {/* Tenant Details */}
//           <div className="flex justify-between border p-4 rounded-lg">
//             <div>
//               <h2 className="text-xl font-semibold">{vacateRequest.user?.name || 'N/A'}</h2>
//               <p className="text-gray-600">{vacateRequest.user?.email || 'N/A'}</p>
//               <p className="text-gray-600">Phone: {vacateRequest.user?.phone || 'N/A'}</p>
//               <p className="text-gray-600">Client ID: {vacateRequest.user?.clientId || 'N/A'}</p>
//               <p className="text-green-600">KYC has been verified</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Requested Check-out Date</p>
//               <p className="text-md font-semibold">
//                 {vacateRequest.requestedDate ? new Date(vacateRequest.requestedDate).toLocaleDateString() : 'N/A'}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Move-in Date</p>
//               <p className="text-md">
//                 {vacateRequest.booking?.moveInDate ? new Date(vacateRequest.booking.moveInDate).toLocaleDateString() : 'N/A'}
//               </p>
//             </div>
//           </div>

//           {/* Financial Summary */}
//           <div className="border p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold">Financial Summary</h3>
//               <button 
//                 onClick={() => setShowPaymentModal(true)}
//                 className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center"
//               >
//                 <FiDollarSign className="mr-1" /> Add Payment
//               </button>
//             </div>
            
//             <div className="grid grid-cols-2 gap-3">
//               <div className="text-gray-600">Monthly Rent:</div>
//               <div className="text-right">₹{monthlyRent}</div>
              
//               <div className="text-gray-600">Security Deposit:</div>
//               <div className="text-right">₹{securityDeposit}</div>
              
//               <div className="text-gray-600">Outstanding Amount:</div>
//               <div className="text-right">₹{outstandingAmount}</div>
              
//               <div className="text-gray-600">Total Deductions:</div>
//               <div className="text-right">₹{totalDeductions}</div>
              
//               <div className="font-semibold border-t pt-2">Final Refund Amount:</div>
//               <div className="text-right font-semibold border-t pt-2">₹{refundAmount}</div>
//             </div>

//             <div className="mt-3">
//               <button 
//                 onClick={() => setShowTransactionHistory(!showTransactionHistory)}
//                 className="text-blue-500 cursor-pointer flex items-center text-sm"
//               >
//                 <span>View Transaction History</span>
//                 <FiExternalLink className="ml-1" />
//               </button>
//             </div>

//             {/* Transaction History */}
//             {showTransactionHistory && (
//               <div className="mt-4 p-3 bg-gray-50 rounded">
//                 <h4 className="font-semibold mb-2">Transaction History</h4>
//                 {transactionHistory.map(transaction => (
//                   <div key={transaction.id} className="flex justify-between text-sm py-1 border-b">
//                     <div>
//                       <span>{new Date(transaction.date).toLocaleDateString()}</span>
//                       <span className="ml-2">{transaction.description}</span>
//                     </div>
//                     <div className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
//                       {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Deductions Section */}
//           <div className="border p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-semibold">Deductions</h3>
//               <button 
//                 onClick={addDeduction}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center"
//               >
//                 <FiPlus className="mr-1" /> Add Deduction
//               </button>
//             </div>
            
//             {deductions.length === 0 ? (
//               <p className="text-gray-500 text-sm">No deductions added</p>
//             ) : (
//               <div className="space-y-2">
//                 {deductions.map((deduction, index) => (
//                   <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
//                     <div>
//                       <span className="font-medium">{deduction.description}</span>
//                       <span className="text-red-600 ml-2">-₹{deduction.amount}</span>
//                     </div>
//                     <button 
//                       onClick={() => removeDeduction(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FiMinus />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Room Details */}
//           <div className="border p-4 rounded-lg">
//             <h3 className="font-semibold mb-3">Room Details</h3>
//             {vacateRequest.booking?.roomDetails?.map((room, index) => (
//               <div key={index} className="flex justify-between items-center mb-2">
//                 <div>
//                   <p className="text-gray-600">Room {room.roomNumber} - {room.bed}</p>
//                   <p className="text-sm text-gray-500">Floor {room.floor}, {room.sharingType} Sharing</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//                     {room.roomNumber}
//                   </span>
//                   <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                     {room.sharingType}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Approve Check-out Checkbox */}
//           <div className="flex items-center justify-center mt-4 p-3 bg-gray-50 rounded">
//             <input
//               type="checkbox"
//               id="approveCheckout"
//               className="mr-3 h-5 w-5"
//               checked={isChecked}
//               onChange={() => setIsChecked(!isChecked)}
//             />
//             <label htmlFor="approveCheckout" className="text-gray-700 text-lg">
//               I confirm to approve checkout and process refund of ₹{refundAmount}
//             </label>
//           </div>

//           {/* Approve Button */}
//           <div className="flex justify-center mt-4">
//             <button
//               className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
//                 isChecked && !processing 
//                   ? "bg-blue-600 text-white hover:bg-blue-700" 
//                   : "bg-gray-400 text-gray-700 cursor-not-allowed"
//               }`}
//               disabled={!isChecked || processing}
//               onClick={handleApproveCheckout}
//             >
//               {processing ? "Processing..." : "Approve and Process Refund"}
//             </button>
//           </div>
//         </div>

//         {/* Payment Modal */}
//         {showPaymentModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h3 className="font-semibold text-lg mb-4">Add Payment</h3>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Amount</label>
//                   <input
//                     type="number"
//                     value={paymentData.amount}
//                     onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter amount"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//                   <select
//                     value={paymentData.method}
//                     onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="cash">Cash</option>
//                     <option value="online">Online Payment</option>
//                   </select>
//                 </div>
                
//                 {paymentData.method === 'cash' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
//                     <textarea
//                       value={paymentData.notes}
//                       onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       rows="2"
//                       placeholder="Add notes about cash payment"
//                     />
//                   </div>
//                 )}
                
//                 {paymentData.method === 'online' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Transaction ID (Optional)</label>
//                     <input
//                       type="text"
//                       value={paymentData.transactionId}
//                       onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       placeholder="Enter transaction ID if available"
//                     />
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={() => setShowPaymentModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddPayment}
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                   disabled={processing}
//                 >
//                   {processing ? "Processing..." : paymentData.method === 'online' ? "Pay Now" : "Add Payment"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TanentConfirmbox;






// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FiExternalLink, FiPlus, FiMinus, FiDollarSign, FiCheck } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { vacateAPI } from "../PropertyController";

// const TanentConfirmbox = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [vacateRequest, setVacateRequest] = useState({});
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [deductions, setDeductions] = useState([]);
//   const [refundAmount, setRefundAmount] = useState(0);
//   const [showTransactionHistory, setShowTransactionHistory] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showRefundModal, setShowRefundModal] = useState(false);
//   const [paymentData, setPaymentData] = useState({
//     amount: "",
//     method: "cash",
//     transactionId: "",
//     notes: ""
//   });
//   const [refundData, setRefundData] = useState({
//     transactionId: "",
//     notes: ""
//   });

//   useEffect(() => {
//     if (location.state) {
//       setVacateRequest(location.state);
//       calculateRefundAmount(location.state);
//       setLoading(false);
//     } else if (id) {
//       fetchVacateRequestDetails(id);
//     }
//   }, [id, location.state]);

//   useEffect(() => {
//     const loadRazorpay = () => {
//       return new Promise((resolve) => {
//         if (window.Razorpay) return resolve(true);
        
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpay();
//   }, []);

//   const calculateRefundAmount = (request) => {
//     const securityDeposit = request.booking?.pricing?.securityDeposit || 0;
//     const outstandingAmount = request.outstandingAmount || 0;
//     const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
//     const calculatedRefund = Math.max(0, securityDeposit - outstandingAmount - totalDeductions);
//     setRefundAmount(calculatedRefund);
//     return calculatedRefund;
//   };

//   const fetchVacateRequestDetails = async (requestId) => {
//     try {
//       setLoading(true);
//       setError("");
      
//       const response = await vacateAPI.getVacateRequestDetails(requestId);
      
//       if (response.data?.success && response.data.request) {
//         const request = response.data.request;
//         setVacateRequest(request);
        
//         // Set deductions if any
//         if (request.deductions && request.deductions.length > 0) {
//           setDeductions(request.deductions);
//         }
        
//         calculateRefundAmount(request);
//       } else {
//         setError("Request not found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to load request details");
//       console.error("Error fetching request details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveCheckout = async () => {
//     if (!isChecked) return;

//     try {
//       setProcessing(true);
//       setError("");

//       const approvalData = {
//         action: "approve",
//         refundAmount: refundAmount,
//         notes: "Checkout approved",
//         deductions: deductions
//       };

//       const response = await vacateAPI.processVacateRequest(id, approvalData);
      
//       if (response.data.success) {
//         // Update local state with approved request
//         setVacateRequest(prev => ({
//           ...prev,
//           status: 'approved',
//           refundStatus: 'pending',
//           refundAmount: refundAmount
//         }));
        
//         alert("Vacate request approved successfully!");
        
//         // If refund amount is positive, show refund modal
//         if (refundAmount > 0) {
//           setShowRefundModal(true);
//         } else {
//           navigate("/client/tenant-checkout-requests");
//         }
//       }
      
//     } catch (err) {
//       setError(err.message || "Failed to process approval");
//       alert("Error processing approval: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleProcessRefund = async () => {
//     try {
//       setProcessing(true);
//       setError("");

//       const refundResponse = await vacateAPI.completeRefund(id, refundData);
      
//       if (refundResponse.data.success) {
//         alert("Refund processed successfully!");
//         setShowRefundModal(false);
//         navigate("/client/refunds");
//       }
      
//     } catch (err) {
//       setError(err.message || "Failed to process refund");
//       alert("Error processing refund: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const generateTransactionId = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 10000);
//     return `TR${timestamp}${random}`;
//   };

//   const handleAddPayment = async () => {
//     if (!paymentData.amount || isNaN(paymentData.amount)) {
//       alert("Please enter a valid payment amount");
//       return;
//     }

//     try {
//       setProcessing(true);
      
//       const paymentAmount = parseFloat(paymentData.amount);
      
//       if (paymentData.method === 'online') {
//         await initiateRazorpayPayment(paymentAmount);
//       } else {
//         // For cash payments
//         const transactionId = generateTransactionId();
        
//         // Update local state
//         setVacateRequest(prev => ({
//           ...prev,
//           outstandingAmount: Math.max(0, (prev.outstandingAmount || 0) - paymentAmount)
//         }));
        
//         // Recalculate refund
//         const newRefundAmount = calculateRefundAmount({
//           ...vacateRequest,
//           outstandingAmount: Math.max(0, (vacateRequest.outstandingAmount || 0) - paymentAmount)
//         });
        
//         // Close modal and reset form
//         setShowPaymentModal(false);
//         setPaymentData({
//           amount: "",
//           method: "cash",
//           transactionId: "",
//           notes: ""
//         });
        
//         alert(`Cash payment of ₹${paymentAmount} added successfully!\nTransaction ID: ${transactionId}`);
//       }
      
//     } catch (err) {
//       setError(err.message || "Failed to add payment");
//       alert("Error adding payment: " + err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const initiateRazorpayPayment = async (amount) => {
//     try {
//       const orderResponse = await vacateAPI.createPaymentOrder({
//         amount: amount * 100,
//         currency: 'INR',
//         receipt: `receipt_${id}_${Date.now()}`
//       });

//       if (!orderResponse.data?.success) {
//         throw new Error('Failed to create payment order');
//       }

//       const orderData = orderResponse.data.order;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "PG Management",
//         description: "Payment for outstanding amount",
//         order_id: orderData.id,
//         handler: async function (response) {
//           const verificationResponse = await vacateAPI.verifyPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             bookingId: vacateRequest.bookingId,
//             amount: amount * 100
//           });

//           if (verificationResponse.data?.success) {
//             // Update local state
//             setVacateRequest(prev => ({
//               ...prev,
//               outstandingAmount: Math.max(0, (prev.outstandingAmount || 0) - amount)
//             }));
            
//             // Recalculate refund
//             calculateRefundAmount({
//               ...vacateRequest,
//               outstandingAmount: Math.max(0, (vacateRequest.outstandingAmount || 0) - amount)
//             });
            
//             setShowPaymentModal(false);
//             setPaymentData({
//               amount: "",
//               method: "cash",
//               transactionId: "",
//               notes: ""
//             });
            
//             alert(`Online payment of ₹${amount} processed successfully!\nPayment ID: ${response.razorpay_payment_id}`);
//           } else {
//             alert("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: vacateRequest.user?.name || '',
//           email: vacateRequest.user?.email || '',
//           contact: vacateRequest.user?.phone || ''
//         },
//         notes: {
//           address: "Payment for vacate request",
//           vacate_request_id: id
//         },
//         theme: {
//           color: "#3399cc"
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
      
//     } catch (error) {
//       console.error("Razorpay payment error:", error);
//       alert("Failed to initiate payment: " + error.message);
//     }
//   };

//   const addDeduction = () => {
//     const description = prompt("Enter deduction description:");
//     const amount = parseFloat(prompt("Enter deduction amount:"));
    
//     if (description && !isNaN(amount)) {
//       const newDeductions = [...deductions, { description, amount }];
//       setDeductions(newDeductions);
      
//       // Recalculate refund amount
//       calculateRefundAmount({
//         ...vacateRequest,
//         deductions: newDeductions
//       });
//     }
//   };

//   const removeDeduction = (index) => {
//     const newDeductions = deductions.filter((_, i) => i !== index);
//     setDeductions(newDeductions);
    
//     // Recalculate refund amount
//     calculateRefundAmount({
//       ...vacateRequest,
//       deductions: newDeductions
//     });
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading request details...</div>
//         </div>
//       </>
//     );
//   }

//   if (error && !vacateRequest._id) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button 
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Go Back
//           </button>
//         </div>
//       </>
//     );
//   }

//   const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
//   const outstandingAmount = vacateRequest.outstandingAmount || 0;
//   const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
//   const monthlyRent = vacateRequest.booking?.pricing?.monthlyRent || 0;

//   // Check if request is already approved
//   const isAlreadyApproved = vacateRequest.status === 'approved';
//   const isRefundPending = vacateRequest.refundStatus === 'pending' && refundAmount > 0;
//   const isRefundCompleted = vacateRequest.refundStatus === 'completed';

//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
//         {/* Header */}
//         <div className="w-full max-w-7xl">
//           <h2 
//             className="text-gray-500 text-sm cursor-pointer" 
//             onClick={() => navigate(-1)}
//           >
//             Home / Vacate Requests / Approve Checkout
//           </h2>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 w-full max-w-4xl">
//             {error}
//           </div>
//         )}

//         {/* Status Banner */}
//         {isAlreadyApproved && (
//           <div className={`w-full max-w-4xl mt-4 p-4 rounded-lg ${
//             isRefundCompleted ? 'bg-green-100 border border-green-400 text-green-700' : 
//             isRefundPending ? 'bg-blue-100 border border-blue-400 text-blue-700' : 
//             'bg-yellow-100 border border-yellow-400 text-yellow-700'
//           }`}>
//             <div className="flex items-center">
//               <FiCheck className="mr-2" />
//               <span className="font-semibold">
//                 {isRefundCompleted ? 'Refund Completed' : 
//                  isRefundPending ? 'Approved - Refund Pending' : 
//                  'Request Approved'}
//               </span>
//             </div>
//             {isRefundPending && (
//               <p className="mt-2">
//                 This request has been approved. Please process the refund of ₹{refundAmount} to complete the checkout.
//               </p>
//             )}
//           </div>
//         )}

//         {/* Card Container */}
//         <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
          
//           {/* Tenant Details */}
//           <div className="flex justify-between border p-4 rounded-lg">
//             <div>
//               <h2 className="text-xl font-semibold">{vacateRequest.user?.name || 'N/A'}</h2>
//               <p className="text-gray-600">{vacateRequest.user?.email || 'N/A'}</p>
//               <p className="text-gray-600">Phone: {vacateRequest.user?.phone || 'N/A'}</p>
//               <p className="text-gray-600">Client ID: {vacateRequest.user?.clientId || 'N/A'}</p>
//               <p className="text-green-600">KYC has been verified</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Requested Check-out Date</p>
//               <p className="text-md font-semibold">
//                 {vacateRequest.requestedDate ? new Date(vacateRequest.requestedDate).toLocaleDateString() : 'N/A'}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Move-in Date</p>
//               <p className="text-md">
//                 {vacateRequest.booking?.moveInDate ? new Date(vacateRequest.booking.moveInDate).toLocaleDateString() : 'N/A'}
//               </p>
//             </div>
//           </div>

//           {/* Financial Summary */}
//           <div className="border p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold">Financial Summary</h3>
//               {outstandingAmount > 0 && !isAlreadyApproved && (
//                 <button 
//                   onClick={() => setShowPaymentModal(true)}
//                   className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center"
//                 >
//                   <FiDollarSign className="mr-1" /> Add Payment
//                 </button>
//               )}
//             </div>
            
//             <div className="grid grid-cols-2 gap-3">
//               <div className="text-gray-600">Monthly Rent:</div>
//               <div className="text-right">₹{monthlyRent}</div>
              
//               <div className="text-gray-600">Security Deposit:</div>
//               <div className="text-right">₹{securityDeposit}</div>
              
//               <div className="text-gray-600">Outstanding Amount:</div>
//               <div className="text-right">₹{outstandingAmount}</div>
              
//               <div className="text-gray-600">Total Deductions:</div>
//               <div className="text-right">₹{totalDeductions}</div>
              
//               <div className="font-semibold border-t pt-2">Final Refund Amount:</div>
//               <div className="text-right font-semibold border-t pt-2">₹{refundAmount}</div>
//             </div>

//             {outstandingAmount > 0 && (
//               <div className="mt-3 text-sm text-red-600">
//                 Tenant has an outstanding amount of ₹{outstandingAmount}. Please collect payment before approval.
//               </div>
//             )}

//             <div className="mt-3">
//               <button 
//                 onClick={() => setShowTransactionHistory(!showTransactionHistory)}
//                 className="text-blue-500 cursor-pointer flex items-center text-sm"
//               >
//                 <span>View Transaction History</span>
//                 <FiExternalLink className="ml-1" />
//               </button>
//             </div>
//           </div>

//           {/* Deductions Section */}
//           {!isAlreadyApproved && (
//             <div className="border p-4 rounded-lg">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold">Deductions</h3>
//                 <button 
//                   onClick={addDeduction}
//                   className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center"
//                 >
//                   <FiPlus className="mr-1" /> Add Deduction
//                 </button>
//               </div>
              
//               {deductions.length === 0 ? (
//                 <p className="text-gray-500 text-sm">No deductions added</p>
//               ) : (
//                 <div className="space-y-2">
//                   {deductions.map((deduction, index) => (
//                     <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
//                       <div>
//                         <span className="font-medium">{deduction.description}</span>
//                         <span className="text-red-600 ml-2">-₹{deduction.amount}</span>
//                       </div>
//                       <button 
//                         onClick={() => removeDeduction(index)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <FiMinus />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Room Details */}
//           <div className="border p-4 rounded-lg">
//             <h3 className="font-semibold mb-3">Room Details</h3>
//             {vacateRequest.booking?.roomDetails?.map((room, index) => (
//               <div key={index} className="flex justify-between items-center mb-2">
//                 <div>
//                   <p className="text-gray-600">Room {room.roomNumber} - {room.bed}</p>
//                   <p className="text-sm text-gray-500">Floor {room.floor}, {room.sharingType} Sharing</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//                     {room.roomNumber}
//                   </span>
//                   <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                     {room.sharingType}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Approve Check-out Checkbox */}
//           {!isAlreadyApproved && outstandingAmount <= 0 && (
//             <div className="flex items-center justify-center mt-4 p-3 bg-gray-50 rounded">
//               <input
//                 type="checkbox"
//                 id="approveCheckout"
//                 className="mr-3 h-5 w-5"
//                 checked={isChecked}
//                 onChange={() => setIsChecked(!isChecked)}
//               />
//               <label htmlFor="approveCheckout" className="text-gray-700 text-lg">
//                 I confirm to approve checkout{refundAmount > 0 && ` and process refund of ₹${refundAmount}`}
//               </label>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex justify-center mt-4 gap-4">
//             {!isAlreadyApproved && outstandingAmount <= 0 && (
//               <button
//                 className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
//                   isChecked && !processing 
//                     ? "bg-blue-600 text-white hover:bg-blue-700" 
//                     : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                 }`}
//                 disabled={!isChecked || processing}
//                 onClick={handleApproveCheckout}
//               >
//                 {processing ? "Processing..." : "Approve Checkout"}
//               </button>
//             )}
            
//             {isRefundPending && (
//               <button
//                 className="w-64 py-3 text-lg font-semibold bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
//                 onClick={() => setShowRefundModal(true)}
//                 disabled={processing}
//               >
//                 {processing ? "Processing..." : "Process Refund"}
//               </button>
//             )}
            
//             {isRefundCompleted && (
//               <button
//                 className="w-64 py-3 text-lg font-semibold bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition"
//                 onClick={() => navigate("/client/refunds")}
//               >
//                 View Refund Details
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Payment Modal */}
//         {showPaymentModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h3 className="font-semibold text-lg mb-4">Add Payment</h3>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Amount</label>
//                   <input
//                     type="number"
//                     value={paymentData.amount}
//                     onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter amount"
//                     max={outstandingAmount}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Outstanding: ₹{outstandingAmount}</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//                   <select
//                     value={paymentData.method}
//                     onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="cash">Cash</option>
//                     <option value="online">Online Payment</option>
//                   </select>
//                 </div>
                
//                 {paymentData.method === 'cash' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
//                     <textarea
//                       value={paymentData.notes}
//                       onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       rows="2"
//                       placeholder="Add notes about cash payment"
//                     />
//                   </div>
//                 )}
                
//                 {paymentData.method === 'online' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Transaction ID (Optional)</label>
//                     <input
//                       type="text"
//                       value={paymentData.transactionId}
//                       onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       placeholder="Enter transaction ID if available"
//                     />
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={() => setShowPaymentModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddPayment}
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                   disabled={processing}
//                 >
//                   {processing ? "Processing..." : paymentData.method === 'online' ? "Pay Now" : "Add Payment"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Refund Modal */}
//         {showRefundModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h3 className="font-semibold text-lg mb-4">Process Refund</h3>
              
//               <div className="mb-4 p-3 bg-blue-50 rounded">
//                 <p className="font-medium">Refund Amount: ₹{refundAmount}</p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   This amount will be refunded to the tenant's original payment method.
//                 </p>
//               </div>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Transaction ID *</label>
//                   <input
//                     type="text"
//                     value={refundData.transactionId}
//                     onChange={(e) => setRefundData({...refundData, transactionId: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter refund transaction ID"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
//                   <textarea
//                     value={refundData.notes}
//                     onChange={(e) => setRefundData({...refundData, notes: e.target.value})}
//                     className="w-full p-2 border rounded"
//                     rows="3"
//                     placeholder="Add notes about the refund"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={() => setShowRefundModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleProcessRefund}
//                   className="px-4 py-2 bg-green-600 text-white rounded"
//                   disabled={processing || !refundData.transactionId}
//                 >
//                   {processing ? "Processing..." : "Complete Refund"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TanentConfirmbox;