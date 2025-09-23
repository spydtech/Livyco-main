// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";

// const TenantDetails = () => {
//  const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state || {};

//   // Helper function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN'); // Format for India
//   };

//   // Helper function to format currency
//   const formatCurrency = (amount) => {
//     if (amount === undefined || amount === null) return "₹0.00";
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };
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
//       <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//           <div className="flex items-center space-x-4 mb-4 md:mb-0">
//             <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
//               {tenant.user?.profileImage ? (
//                 <img 
//                   src={tenant.user.profileImage} 
//                   alt="Profile" 
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-xl font-medium">
//                   {tenant.user?.name?.charAt(0)?.toUpperCase() || 'T'}
//                 </span>
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {tenant.user?.name || "Tenant Name"}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 ID: {tenant.user?.clientId || "N/A"}
//               </p>
//             </div>
//           </div>
          
//           {/* Contact Buttons */}
//           <div className="flex space-x-3">
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-500 transition">
//               <FiMessageCircle className="text-gray-800 text-lg" />
//             </button>
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-500 transition">
//               <FiPhone className="text-gray-800 text-lg" />
//             </button>
//           </div>
//         </div>
        



//       <div className="ml-[30%]  bg-white ">

//       {/* Details Section */}
//       <div className="grid grid-cols-1 md:grid-cols-1 gap-6  items-start justify-center">
//         {/* Basic Details */}
//         <div className="bg-white p-6 rounded-lg  md:w-[600px]  border-2">
//           <h3 className="font-semibold text-gray-700 mb-4">Basic Details</h3>
//           <div className="space-y-2 text-gray-600">
//             <p><strong>Email ID:</strong> {tenant.user?.email || "N/A"}</p>
//             <p><strong>Date of Birth:</strong>  {formatDate(tenant.user?.dob)}</p>
//             <p><strong>Aadhar Number:</strong>{tenant.user?.aadharNumber || "N/A"} </p>
//             <p><strong>Emergency Contact:</strong> {tenant.user?.emergencyContact?.number || "N/A"} 
//                     {tenant.user?.emergencyContact?.name && ` (${tenant.user.emergencyContact.name})`}</p>
//             <p><strong>Address:</strong> {tenant.user?.address || "N/A"}</p>
//           </div>
//         </div>

//         {/* Stay Details */}
//         <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
//           <h3 className="font-semibold text-gray-700 mb-4">Stay Details</h3>
//           <div className="space-y-2 text-gray-600">
//             <p className="font-semibold">{tenant.property?.name || "N/A"}</p>
//             <p className="text-gray-500">{tenant.property?.address || "N/A"}</p>
//             <p><strong>Check-in Date:</strong> {formatDate(tenant.bookingDetails?.moveInDate)}</p>
//             <p><strong>Check-out Date:</strong> {formatDate(tenant.bookingDetails?.moveOutDate)}</p>
//             <p><strong>Details:</strong> {tenant.bookingDetails?.roomType || "N/A"}</p>
//             <p><strong>Room Number:</strong> {tenant.bookingDetails?.roomNumber || "N/A"}</p>
//             <p><strong>Booking Status:</strong> {tenant.bookingDetails?.status || "N/A"}</p>
//           </div>
//         </div>
//       </div>

//       {/* Payment Details */}
//       <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
//         <h3 className="font-semibold text-gray-700 mb-4">Payment Details</h3>
//         <div className="space-y-2 text-gray-600">
//           <p><strong>Advance Paid:</strong> {formatCurrency(tenant.pricing?.advance)}</p>
//           <p><strong>Rent per month:</strong> {formatCurrency(tenant.pricing?.monthlyRent)}</p>
//           <p><strong>Deposit:</strong> {formatCurrency(tenant.pricing?.securityDeposit)}</p>
//           <p><strong>Total Amount:</strong> {formatCurrency(tenant.pricing?.total)}</p>
//           <p><strong>Payment Status:</strong> 

//            <span 
//                     className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
//                       tenant.bookingDetails?.paymentStatus === 'confirmed' 
//                         ? 'bg-green-100 text-green-800' 
//                         : tenant.bookingDetails?.paymentStatus === 'pending'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}
//                   >
//                     {tenant.bookingDetails?.paymentStatus?.toUpperCase() || "N/A"}
//                   </span>
//                   </p>
//         </div>
        
//       </div>
//       </div>

//       {/* Confirm Booking Button */}
//       <div className="flex justify-center mt-8">
//         <button className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition">
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default TenantDetails;



import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";
import { bookingAPI } from "../PropertyController"; // Make sure it's imported
import bgImg from "../../assets/user/pgsearch/image (5).png";
const TenantDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tenant = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹0.00";
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Confirm Booking API
  const handleConfirmBooking = async () => {
  if (!tenant.id) {
    setErrorMessage("Booking ID is missing.");
    return;
  }

  try {
    setIsLoading(true);
    console.log("Sending PATCH request for:", tenant.id);
    await bookingAPI.approveBooking(tenant.id); // PATCH method
    setSuccessMessage("Booking approved successfully.");
    setErrorMessage("");
  } catch (error) {
    console.error("Approval failed:", error);
    setErrorMessage(error.message || "Failed to approve booking.");
    setSuccessMessage("");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      <ClientNav />
      <div className="p-6 min-h-screen flex flex-col bg-cover bg-no-repeat bg-center"
       style={{ backgroundImage: `url('${bgImg}')` }}
      >
        {/* Breadcrumb */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-gray-500 text-sm cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Home / Tenant Request
          </h2>
        </div>

        {/* Tenant Profile Section */}
        <div className=" p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden border border-gray-300">
              {tenant.user?.profileImage ? (
                <img
                  src={tenant.user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xl font-medium">
                  {tenant.user?.name?.charAt(0)?.toUpperCase() || "T"}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {tenant.user?.name || "Tenant Name"}
              </h2>
              <p className="text-gray-500 text-sm">
                ID: {tenant.user?.clientId || "N/A"}
              </p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex space-x-3">
            <button className="p-3 bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 transition">
              <FiMessageCircle className="text-gray-800 text-lg" />
            </button>
            <button className="p-3 bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 transition">
              <FiPhone className="text-gray-800 text-lg" />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="ml-[30%] ">
          <div className="grid gap-6 md:grid-cols-1 items-start justify-center">
            {/* Basic Details */}
            <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Basic Details</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email ID:</strong> {tenant.user?.email || "N/A"}</p>
                <p><strong>Date of Birth:</strong> {formatDate(tenant.user?.dob)}</p>
                <p><strong>Aadhar Number:</strong> {tenant.user?.aadharNumber || "N/A"}</p>
                <p><strong>Emergency Contact:</strong> {tenant.user?.emergencyContact?.number || "N/A"} {tenant.user?.emergencyContact?.name && `(${tenant.user.emergencyContact.name})`}</p>
                <p><strong>Address:</strong> {tenant.user?.address || "N/A"}</p>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Stay Details</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-semibold">{tenant.property?.name || "N/A"}</p>
                <p className="text-gray-500">
                    {`${tenant.property?.locality || ""}, ${tenant.property?.city || ""}`}
                  </p>

                <p><strong>Check-in Date:</strong> {formatDate(tenant.moveInDate)}</p>
                <p><strong>Check-out Date:</strong> {formatDate(tenant.moveOutDate)}</p>
                <p><strong>Details:</strong> {tenant.roomType || "N/A"}</p>
                <p><strong>Room Number:</strong> {tenant.roomNumber || "N/A"}</p>
                <p><strong>Booking Status:</strong> {tenant.bookingStatus || "N/A"}</p>

              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
            <h3 className="font-semibold text-gray-700 mb-4">Payment Details</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Advance Paid:</strong> {formatCurrency(tenant.pricing?.advance)}</p>
              <p><strong>Rent per month:</strong> {formatCurrency(tenant.pricing?.monthlyRent)}</p>
              <p><strong>Deposit:</strong> {formatCurrency(tenant.pricing?.securityDeposit)}</p>
              <p><strong>Total Amount:</strong> {formatCurrency(tenant.pricing?.total)}</p>
              <p>
                <strong>Payment Status:</strong>{" "}
               <span
                className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
                  tenant.paymentStatus === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : tenant.paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tenant.paymentStatus?.toUpperCase() || "N/A"}
              </span>

              </p>
            </div>

            {/* Success or Error Message */}
            {successMessage && (
              <div className="mt-4 text-green-600 font-medium">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mt-4 text-red-600 font-medium">{errorMessage}</div>
            )}
          </div>
        </div>

        {/* Confirm Booking Button */}
       <div className="flex justify-center mt-8">
          <button
            className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            onClick={handleConfirmBooking}
            disabled={isLoading}
          >
            {isLoading ? "Approving..." : "Confirm Booking"}
          </button>
        </div>

      </div>
    </>
  );
};

export default TenantDetails;
