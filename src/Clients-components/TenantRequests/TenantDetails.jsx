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



// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { bookingAPI } from "../PropertyController"; // Make sure it's imported
// import bgImg from "../../assets/user/pgsearch/image (5).png";
// const TenantDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state || {};

//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-IN");
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (amount === undefined || amount === null) return "₹0.00";
//     return `₹${amount.toLocaleString("en-IN")}`;
//   };

//   // Confirm Booking API
//   const handleConfirmBooking = async () => {
//   if (!tenant.id) {
//     setErrorMessage("Booking ID is missing.");
//     return;
//   }

//   try {
//     setIsLoading(true);
//     console.log("Sending PATCH request for:", tenant.id);
//     await bookingAPI.approveBooking(tenant.id); // PATCH method
//     setSuccessMessage("Booking approved successfully.");
//     setErrorMessage("");
//   } catch (error) {
//     console.error("Approval failed:", error);
//     setErrorMessage(error.message || "Failed to approve booking.");
//     setSuccessMessage("");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 min-h-screen flex flex-col bg-cover bg-no-repeat bg-center"
//        style={{ backgroundImage: `url('${bgImg}')` }}
//       >
//         {/* Breadcrumb */}
//         <div className="flex justify-between items-center mb-6">
//           <h2
//             className="text-gray-500 text-sm cursor-pointer"
//             onClick={() => navigate(-1)}
//           >
//             Home / Tenant Request
//           </h2>
//         </div>

//         {/* Tenant Profile Section */}
//         <div className=" p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//           <div className="flex items-center space-x-4 mb-4 md:mb-0">
//             <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden border border-gray-300">
//               {tenant.user?.profileImage ? (
//                 <img
//                   src={tenant.user.profileImage}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-xl font-medium">
//                   {tenant.user?.name?.charAt(0)?.toUpperCase() || "T"}
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
//             <button className="p-3 bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 transition">
//               <FiMessageCircle className="text-gray-800 text-lg" />
//             </button>
//             <button className="p-3 bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 transition">
//               <FiPhone className="text-gray-800 text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="ml-[30%] ">
//           <div className="grid gap-6 md:grid-cols-1 items-start justify-center">
//             {/* Basic Details */}
//             <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
//               <h3 className="font-semibold text-gray-700 mb-4">Basic Details</h3>
//               <div className="space-y-2 text-gray-600">
//                 <p><strong>Email ID:</strong> {tenant.user?.email || "N/A"}</p>
//                 <p><strong>Date of Birth:</strong> {formatDate(tenant.user?.dob)}</p>
//                 <p><strong>Aadhar Number:</strong> {tenant.user?.aadharNumber || "N/A"}</p>
//                 <p><strong>Emergency Contact:</strong> {tenant.user?.emergencyContact?.number || "N/A"} {tenant.user?.emergencyContact?.name && `(${tenant.user.emergencyContact.name})`}</p>
//                 <p><strong>Address:</strong> {tenant.user?.address || "N/A"}</p>
//               </div>
//             </div>

//             {/* Stay Details */}
//             <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
//               <h3 className="font-semibold text-gray-700 mb-4">Stay Details</h3>
//               <div className="space-y-2 text-gray-600">
//                 <p className="font-semibold">{tenant.property?.name || "N/A"}</p>
//                 <p className="text-gray-500">
//                     {`${tenant.property?.locality || ""}, ${tenant.property?.city || ""}`}
//                   </p>

//                 <p><strong>Check-in Date:</strong> {formatDate(tenant.moveInDate)}</p>
//                 <p><strong>Check-out Date:</strong> {formatDate(tenant.moveOutDate)}</p>
//                 <p><strong>Details:</strong> {tenant.roomType || "N/A"}</p>
//                 <p><strong>Room Number:</strong> {tenant.roomNumber || "N/A"}</p>
//                 <p><strong>Booking Status:</strong> {tenant.bookingStatus || "N/A"}</p>

//               </div>
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
//             <h3 className="font-semibold text-gray-700 mb-4">Payment Details</h3>
//             <div className="space-y-2 text-gray-600">
//               <p><strong>Advance Paid:</strong> {formatCurrency(tenant.pricing?.advance)}</p>
//               <p><strong>Rent per month:</strong> {formatCurrency(tenant.pricing?.monthlyRent)}</p>
//               <p><strong>Deposit:</strong> {formatCurrency(tenant.pricing?.securityDeposit)}</p>
//               <p><strong>Total Amount:</strong> {formatCurrency(tenant.pricing?.total)}</p>
//               <p>
//                 <strong>Payment Status:</strong>{" "}
//                <span
//                 className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
//                   tenant.paymentStatus === "confirmed"
//                     ? "bg-green-100 text-green-800"
//                     : tenant.paymentStatus === "pending"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {tenant.paymentStatus?.toUpperCase() || "N/A"}
//               </span>

//               </p>
//             </div>

//             {/* Success or Error Message */}
//             {successMessage && (
//               <div className="mt-4 text-green-600 font-medium">{successMessage}</div>
//             )}
//             {errorMessage && (
//               <div className="mt-4 text-red-600 font-medium">{errorMessage}</div>
//             )}
//           </div>
//         </div>

//         {/* Confirm Booking Button */}
//        <div className="flex justify-center mt-8">
//           <button
//             className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50"
//             onClick={handleConfirmBooking}
//             disabled={isLoading}
//           >
//             {isLoading ? "Approving..." : "Confirm Booking"}
//           </button>
//         </div>

//       </div>
//     </>
//   );
// };

// export default TenantDetails;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";
import { bookingAPI } from "../PropertyController";
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
      await bookingAPI.approveBooking(tenant.id);
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

  // Extract data with fallbacks
  const userData = tenant.user || {};
  const propertyData = tenant.property || {};
  const roomDetails = tenant.roomDetails?.[0] || {};
  const pricingData = tenant.pricing || {};
  const paymentInfo = tenant.paymentInfo || {};
  const customerDetails = tenant.customerDetails || {};
  const transferDetails = tenant.transferDetails || {};
  const bankAccount = transferDetails.bankAccount || {};

  // Extract primary customer details
  const primaryCustomer = customerDetails.primary || {};
  const secondaryCustomers = customerDetails.secondary || [];

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
        <div className="p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xl font-medium">
                  {userData.name?.charAt(0)?.toUpperCase() || "T"}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {userData.name || "Tenant Name"}
              </h2>
              <p className="text-gray-500 text-sm">
                ID: {userData.clientId || "N/A"}
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
        <div className="ml-[30%]">
          <div className="grid gap-6 md:grid-cols-1 items-start justify-center">
            
            {/* Basic Details */}
            <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Basic Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">User Name:</span>
                  <span className="text-gray-800">{userData.name || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Email ID:</span>
                  <span className="text-gray-800">{userData.email || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-800">{userData.phone || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Date of Birth:</span>
                  <span className="text-gray-800">{formatDate(userData.dob)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Aadhar Number:</span>
                  <span className="text-gray-800">{userData.aadharNumber || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Emergency Contact:</span>
                  <span className="text-gray-800">
                    {userData.emergencyContact?.number || "N/A"} 
                    {userData.emergencyContact?.name && ` (${userData.emergencyContact.name})`}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-800 text-right max-w-xs">{userData.address || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Customer Details</h3>
              
              {/* Primary Customer */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-600 mb-3">Primary Customer</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Name:</span>
                    <span className="text-gray-800">{primaryCustomer.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Age:</span>
                    <span className="text-gray-800">{primaryCustomer.age || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Gender:</span>
                    <span className="text-gray-800">{primaryCustomer.gender || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Mobile:</span>
                    <span className="text-gray-800">{primaryCustomer.mobile || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="text-gray-800">{primaryCustomer.email || "N/A"}</span>
                  </div>
                  {/* <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Address:</span>
                    <span className="text-gray-800 text-right max-w-xs">{primaryCustomer.address || "N/A"}</span>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Occupation:</span>
                    <span className="text-gray-800">{primaryCustomer.purpose || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">ID Proof:</span>
                    <span className="text-gray-800">{primaryCustomer.idProofType || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">ID Number:</span>
                    <span className="text-gray-800">{primaryCustomer.idProofNumber || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Customers */}
              {secondaryCustomers.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-600 mb-3">Secondary Customers</h4>
                  {secondaryCustomers.map((customer, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Name:</span>
                          <span className="text-gray-800">{customer.name || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Age:</span>
                          <span className="text-gray-800">{customer.age || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Gender:</span>
                          <span className="text-gray-800">{customer.gender || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Mobile:</span>
                          <span className="text-gray-800">{customer.mobile || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Email:</span>
                          <span className="text-gray-800">{customer.email || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Occupation:</span>
                          <span className="text-gray-800">{customer.occupation || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">ID Proof:</span>
                          <span className="text-gray-800">{customer.idProof || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">ID Number:</span>
                          <span className="text-gray-800">{customer.idNumber || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stay Details */}
            <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Stay Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Property Name:</span>
                  <span className="text-gray-800 font-medium">{propertyData.name || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Location:</span>
                  <span className="text-gray-800 text-right">
                    {`${propertyData.locality || ""}, ${propertyData.city || ""}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Check-in Date:</span>
                  <span className="text-gray-800">{formatDate(tenant.moveInDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Check-out Date:</span>
                  <span className="text-gray-800">{formatDate(tenant.moveOutDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Duration Type:</span>
                  <span className="text-gray-800">{tenant.durationType || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Room Type:</span>
                  <span className="text-gray-800">{tenant.roomType || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Room Number:</span>
                  <span className="text-gray-800">{roomDetails.roomNumber || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Floor:</span>
                  <span className="text-gray-800">{roomDetails.floor || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Bed:</span>
                  <span className="text-gray-800">{roomDetails.bed || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Booking Status:</span>
                  <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                    tenant.bookingStatus === "approved" 
                      ? "bg-green-100 text-green-800"
                      : tenant.bookingStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {tenant.bookingStatus?.toUpperCase() || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
            <h3 className="font-semibold text-gray-700 mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Monthly Rent:</span>
                <span className="text-gray-800">{formatCurrency(pricingData.monthlyRent)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Rent:</span>
                <span className="text-gray-800">{formatCurrency(pricingData.totalRent)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Advance Amount:</span>
                <span className="text-gray-800">{formatCurrency(pricingData.advanceAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Security Deposit:</span>
                <span className="text-gray-800">{formatCurrency(pricingData.securityDeposit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Maintenance Fee:</span>
                <span className="text-gray-800">{formatCurrency(pricingData.maintenanceFee)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Amount:</span>
                <span className="text-gray-800 font-semibold">{formatCurrency(pricingData.totalAmount)}</span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Outstanding Amount:</span>
                  <span className={`font-semibold ${
                    tenant.outstandingAmount > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {formatCurrency(tenant.outstandingAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 font-medium">Paid Amount:</span>
                  <span className="text-green-600 font-semibold">{formatCurrency(paymentInfo.paidAmount)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-gray-600 font-medium">Payment Status:</span>
                <span
                  className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
                    paymentInfo.paymentStatus === "paid" || paymentInfo.paymentStatus === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : paymentInfo.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {paymentInfo.paymentStatus?.toUpperCase() || "PENDING"}
                </span>
              </div>
              
              {paymentInfo.razorpayPaymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Razorpay Payment ID:</span>
                  <span className="text-gray-800 text-sm">{paymentInfo.razorpayPaymentId}</span>
                </div>
              )}
              {paymentInfo.razorpayOrderId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Razorpay Order ID:</span>
                  <span className="text-gray-800 text-sm">{paymentInfo.razorpayOrderId}</span>
                </div>
              )}
              {paymentInfo.transactionId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Transaction ID:</span>
                  <span className="text-gray-800 text-sm">{paymentInfo.transactionId}</span>
                </div>
              )}
              {paymentInfo.paymentDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Payment Date:</span>
                  <span className="text-gray-800">{formatDate(paymentInfo.paymentDate)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Payment Method:</span>
                <span className="text-gray-800">{paymentInfo.paymentMethod || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          {transferDetails && Object.keys(transferDetails).length > 0 && (
            <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
              <h3 className="font-semibold text-gray-700 mb-4">Transfer Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Transfer Status:</span>
                  <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                    tenant.transferStatus === "completed" 
                      ? "bg-green-100 text-green-800"
                      : tenant.transferStatus === "processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {tenant.transferStatus?.toUpperCase() || "N/A"}
                  </span>
                </div>
                
                {bankAccount && Object.keys(bankAccount).length > 0 && (
                  <>
                    <div className="border-t pt-3 mt-2">
                      <h4 className="font-medium text-gray-600 mb-3">Bank Account Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Bank Name:</span>
                          <span className="text-gray-800">{bankAccount.bankName || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Account Number:</span>
                          <span className="text-gray-800">{bankAccount.accountNumber || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">IFSC Code:</span>
                          <span className="text-gray-800">{bankAccount.ifscCode || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Account Holder:</span>
                          <span className="text-gray-800">{bankAccount.accountHolder || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {transferDetails.transferAmount && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Transfer Amount:</span>
                    <span className="text-gray-800 font-semibold">{formatCurrency(transferDetails.transferAmount)}</span>
                  </div>
                )}
                
                {transferDetails.transferDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Transfer Date:</span>
                    <span className="text-gray-800">{formatDate(transferDetails.transferDate)}</span>
                  </div>
                )}
                
                {transferDetails.transferId && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Transfer ID:</span>
                    <span className="text-gray-800 text-sm">{transferDetails.transferId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success or Error Message */}
          <div className="mt-6 md:w-[600px]">
            {successMessage && (
              <div className="p-4 bg-green-100 text-green-700 rounded-md border border-green-200">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Confirm Booking Button - Only show if not already approved */}
        {tenant.bookingStatus !== "approved" && (
          <div className="flex justify-center mt-8">
            <button
              className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50"
              onClick={handleConfirmBooking}
              disabled={isLoading}
            >
              {isLoading ? "Approving..." : "Confirm Booking"}
            </button>
          </div>
        )}

        {/* Show message if already approved */}
        {tenant.bookingStatus === "approved" && (
          <div className="flex justify-center mt-8">
            <div className="w-64 py-3 bg-blue-900 text-white text-lg font-semibold rounded-md shadow-md text-center">
              Booking Already Approved
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TenantDetails;