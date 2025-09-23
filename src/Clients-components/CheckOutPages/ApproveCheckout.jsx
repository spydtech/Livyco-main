// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";

// const ApproveCheckout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state || {}; // Ensure tenant data is passed

//   return (
//     <>
//     <ClientNav />
//     <div className="p-6 bg-white min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-gray-500 text-sm cursor-pointer" onClick={() => navigate(-1)}>
//           Home / Tenant Request
//         </h2>

       
//       </div>

//       {/* Tenant Profile Section */}
//       <div className="bg-white p-6  flex items-center space-x-6 mb-6 justify-between">
       
//         <div className="flex gap-4 items-center">
//         <img src={tenant.profileImage} alt="Profile" className="w-16 h-16 rounded-full border" />
//         <div>
//         <h2 className="text-xl font-semibold">{tenant.name}</h2>
//         <p className="text-gray-500">{tenant.tenantId}</p>
//         </div>
         
//         </div>
//          {/* Contact Buttons */}
//          <div className="flex space-x-4 items-end justify-end ml-auto">
//           <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//             <FiMessageCircle className="text-black text-lg" />
//           </button>
//           <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//             <FiPhone className="text-black text-lg" />
//           </button>
//         </div>
//       </div>


//       <div className="ml-[30%]  bg-white ">

//       {/* Details Section */}
//       <div className="grid grid-cols-1 md:grid-cols-1 gap-6  items-start justify-center">
//         {/* Basic Details */}
//         <div className="bg-white p-6 rounded-lg  md:w-[600px]  border-2">
//           <h3 className="font-semibold text-gray-700 mb-4">Basic Details</h3>
//           <div className="space-y-2 text-gray-600">
//             <p><strong>Email ID:</strong> {tenant.email}</p>
//             <p><strong>Date of Birth:</strong> {tenant.dob}</p>
//             <p><strong>Aadhar Number:</strong> {tenant.aadhar}</p>
//             <p><strong>Emergency Contact:</strong> {tenant.emergencyContact} ({tenant.emergencyName})</p>
//             <p><strong>Address:</strong> {tenant.address}</p>
//           </div>
//         </div>

//         {/* Stay Details */}
//         <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
//           <h3 className="font-semibold text-gray-700 mb-4">Stay Details</h3>
//           <div className="space-y-2 text-gray-600">
//             <p className="font-semibold">{tenant.hostelName}</p>
//             <p className="text-gray-500">{tenant.hostelAddress}</p>
//             <p><strong>Check-in Date:</strong> {tenant.checkInDate}</p>
//             <p><strong>Check-out Date:</strong> {tenant.checkOutDate}</p>
//             <p><strong>Details:</strong> {tenant.roomDetails}</p>
//           </div>
//         </div>
//       </div>

//       {/* Payment Details */}
//       <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
//         <h3 className="font-semibold text-gray-700 mb-4">Payment Details</h3>
//         <div className="space-y-2 text-gray-600">
//           <p><strong>Advance Paid:</strong> {tenant.advancePaid}</p>
//           <p><strong>Rent per month:</strong> {tenant.rentPerMonth}</p>
//         </div>
//       </div>
//       </div>

//       {/* Confirm Booking Button */}
//       <div className="flex justify-center mt-8">
//         <button className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
//         onClick={() => navigate("/client/confirm-booking", { state: tenant })} 
//         >
//          Approve and Process Refund
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ApproveCheckout;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";
import { vacateAPI } from "../PropertyController";

const ApproveCheckout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [vacateRequest, setVacateRequest] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // First check if we have data from navigation state
    if (location.state) {
      setVacateRequest(location.state);
      setLoading(false);
    } else if (id) {
      // If no state data, fetch from API
      fetchVacateRequestDetails(id);
    }
  }, [id, location.state]);

  const fetchVacateRequestDetails = async (requestId) => {
    try {
      setLoading(true);
      setError("");
      
      // Since your API returns an array of requests, we need to find the specific one
      const response = await vacateAPI.getVacateRequests();
      
      if (response.data?.success && response.data.requests) {
        const request = response.data.requests.find(req => req.id === requestId);
        
        if (request) {
          setVacateRequest(request);
        } else {
          setError("Request not found");
        }
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

  const handleRejectRequest = async () => {
    const reason = prompt("Please provide reason for rejection:");
    if (!reason) return;

    try {
      setProcessing(true);
      await vacateAPI.processVacateRequest(id, {
        action: "reject",
        notes: reason
      });
      alert("Vacate request rejected successfully!");
      navigate("/client/tenant-checkout-requests");
    } catch (err) {
      setError(err.message || "Failed to reject request");
      alert("Error rejecting request: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-white min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading request details...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-white min-h-screen">
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

  // Calculate refund amount based on your API response structure
  const securityDeposit = vacateRequest.booking?.pricing?.securityDeposit || 0;
  const outstandingAmount = vacateRequest.outstandingAmount || 0;
  const calculatedRefund = Math.max(0, securityDeposit - outstandingAmount);

  return (
    <>
      <ClientNav />
      <div className="p-6 bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-gray-500 text-sm cursor-pointer" 
            onClick={() => navigate(-1)}
          >
            Home / Vacate Requests
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Request Details Section */}
        <div className="bg-white p-6 flex items-center space-x-6 mb-6 justify-between">
          <div className="flex gap-4 items-center">
            <img 
              src={vacateRequest.user?.profileImage || "https://randomuser.me/api/portraits/men/1.jpg"} 
              alt="Profile" 
              className="w-16 h-16 rounded-full border" 
            />
            <div>
              <h2 className="text-xl font-semibold">{vacateRequest.user?.name || 'N/A'}</h2>
              <p className="text-gray-500">Phone: {vacateRequest.user?.phone || 'N/A'}</p>
              <p className="text-gray-500">Client ID: {vacateRequest.user?.clientId || 'N/A'}</p>
            </div>
          </div>
          
          {/* Contact Buttons */}
          <div className="flex space-x-4 items-end justify-end ml-auto">
            <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
              <FiMessageCircle className="text-black text-lg" />
            </button>
            <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
              <FiPhone className="text-black text-lg" />
            </button>
          </div>
        </div>

        <div className="ml-[30%] bg-white">
          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-start justify-center">
            {/* Basic Details */}
            <div className="bg-white p-6 rounded-lg md:w-[600px] border-2">
              <h3 className="font-semibold text-gray-700 mb-4">Vacate Request Details</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Requested Date:</strong> {vacateRequest.requestedDate ? new Date(vacateRequest.requestedDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>moveIn Date:</strong> {vacateRequest.moveInDate ? new Date(vacateRequest.moveInDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Status:</strong> {vacateRequest.status || 'N/A'}</p>
                <p><strong>Reason:</strong> {vacateRequest.reason || 'No reason provided'}</p>
                <p><strong>Client ID:</strong> {vacateRequest.clientId || 'N/A'}</p>
                <p><strong>Request ID:</strong> {vacateRequest.id || 'N/A'}</p>
                <p><strong>Created At:</strong> {vacateRequest.createdAt ? new Date(vacateRequest.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Property & Room Details</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-semibold">{vacateRequest.property?.name || 'N/A'}</p>
                <p className="text-gray-500">{vacateRequest.property?.locality || 'N/A'}, {vacateRequest.property?.city || 'N/A'}</p>
                
                {vacateRequest.booking?.roomDetails?.map((room, index) => (
                  <div key={index} className="mt-3 p-2 bg-gray-50 rounded">
                    <p><strong>Room:</strong> {room.roomNumber} - {room.bed}</p>
                    <p><strong>Floor:</strong> {room.floor}</p>
                    <p><strong>Sharing Type:</strong> {room.sharingType}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
            <h3 className="font-semibold text-gray-700 mb-4">Financial Details</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Monthly Rent:</strong> ₹{vacateRequest.booking?.pricing?.monthlyRent || '0'}</p>
              <p><strong>Security Deposit:</strong> ₹{vacateRequest.booking?.pricing?.securityDeposit || '0'}</p>
              <p><strong>Outstanding Amount:</strong> ₹{vacateRequest.outstandingAmount || '0'}</p>
              <p><strong>Calculated Refund:</strong> ₹{calculatedRefund}</p>
              <p className="text-sm text-gray-500">
                (Security deposit ₹{securityDeposit} - Outstanding amount ₹{outstandingAmount})
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button 
            className="w-48 py-3 bg-red-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-red-700 transition disabled:opacity-50"
            disabled={processing}
            onClick={handleRejectRequest}
          >
            {processing ? "Processing..." : "Reject Request"}
          </button>
          
          <button 
            className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={processing}
            onClick={() => navigate(`/client/confirm-booking/${id}`, { state: { ...vacateRequest, calculatedRefund } })}
          >
            {processing ? "Processing..." : "Approve and Process Refund"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ApproveCheckout;