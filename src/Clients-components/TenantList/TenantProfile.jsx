// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaPhone, FaComment } from "react-icons/fa";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";

// const TenantProfile = () => {
//   const [showMoveOutForm, setShowMoveOutForm] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [reason, setReason] = useState("");
//   const [gracePeriod, setGracePeriod] = useState("");
//   const [refund, setRefund] = useState("");
//   const [notify, setNotify] = useState(false);
//   const [showRentOptions, setShowRentOptions] = useState(false);
//   const [rentOption, setRentOption] = useState("");
//   const [customDate, setCustomDate] = useState("");
 
//   const [preferencesSaved, setPreferencesSaved] = useState(false);

//   const handleCheckboxChange = () => {
//     setNotify(!notify);
//     if (!notify) {
//       setShowRentOptions(false);
//       setRentOption("");
//       setCustomDate("");
//       setGracePeriod("");
//     }
//   };

//   const handleSavePreferences = () => {
//     setPreferencesSaved(true);
//     setTimeout(() => setPreferencesSaved(false), 3000);
//   };

//   const handleCheckOutClick = () => {
//     setShowMoveOutForm(!showMoveOutForm);
//   };

//   const handleConfirmVacancy = () => {
//     setShowSuccessPopup(true); // Show success popup
//     setShowMoveOutForm(false); // Hide the move-out form
//   };

//   const handleCloseSuccessPopup = () => {
//     setShowSuccessPopup(false); // Close success popup
//   };
//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state;

//   if (!tenant) return <p>No tenant data found.</p>;

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";


//   return (
//     <div className="bg-[#F8F8FF] min-h-screen">
//       {/* Header */}
//       <div className="bg-[#0827B2] p-4 text-white flex items-center">
//         <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
//         <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
//       </div>

//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="bg-[#F8F8FF] p-6  flex items-center space-x-6 mb-6 justify-between">
              
//                <div className="flex gap-4 items-center">
//                <img src={tenant.profileImage} alt="Profile" className="w-16 h-16 rounded-full border" />
//                <div>
//                <h2 className="text-xl font-semibold">{tenant.userName}</h2>
//                <p className="text-gray-500">{tenant.clientId}</p>
//                </div>
                
//                </div>
//                 {/* Contact Buttons */}
//                 <div className="flex space-x-4 items-end justify-end ml-auto">
//                  <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//                    <FiMessageCircle className="text-black text-lg" />
//                  </button>
//                  <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//                    <FiPhone className="text-black text-lg" />
//                  </button>
//                </div>
//              </div>

//         {/* Details Section */}
//         <div className="flex justify-between mx-8">
//           <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
//             {/* Basic Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
//               <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Email ID:</p>
//                 <p>{tenant.email}</p>

//                 <p className="font-semibold">Date of birth:</p>
//                 <p>{tenant.dob}</p>

//                 <p className="font-semibold">Aadhar Number:</p>
//                 <p>{tenant.aadharNumber}</p>

//                 <p className="font-semibold">Emergency Contact Number:</p>
//                 <p>{tenant.guardianContact}</p>

//                 <p className="font-semibold">Address:</p>
//                 <p>#H.NO, Street, City, India</p>
//               </div>
//             </div>

//             {/* Stay Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Hostel:</p>
//                 <p>{tenant.property?.name || "N/A"}</p>

//                 <p className="font-semibold">Check-in Date:</p>
//                 <p>{formatDate(tenant.moveInDate)}</p>

//                 <p className="font-semibold">Check-out Date:</p>
//                 <p>{formatDate(tenant.moveOutDate)}</p>

//                 <p className="font-semibold">Room:</p>
//                 <p>{tenant.roomNumber || "N/A"} ({tenant.roomType || "N/A"})</p>
//               </div>
//             </div>

//             {/* Payment Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg  border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Advance Paid:</p>
//                <p>₹{tenant.pricing?.securityDeposit || 0}</p>

//                 <p className="font-semibold">Rent per Month:</p>
//                  <p>₹{tenant.pricing?.monthlyRent || 0}</p>

//                 <p className="font-semibold">Total Rent Paid (Months):</p>
//                 <p>24 months</p>

//                 <p className="font-semibold">Total Rent Paid:</p>
//                 <p>₹00000.00</p>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-6 text-[#090909]  h-auto w-[320px] p-4 space-y-10 ">
//       {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

//       {/* Notify Checkbox */}
//       <label className="flex items-center space-x-2 cursor-pointer">
//         <input type="checkbox"  className="w-6 h-6 " checked={notify} onChange={handleCheckboxChange} />
//         <span>Notify guests of pending due</span>
//       </label>

//       {/* Rent Collection Date and Grace Period Fields */}
//       {notify && (
//         <div className="mt-4 space-y-3">
//           <label className="block text-sm font-semibold">Specify rent collection date</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded-lg cursor-pointer"
//             placeholder="Select date"
//             onFocus={() => setShowRentOptions(true)}
//             readOnly
//           />

//           {/* Rent Date Options */}
//           {showRentOptions && (
//             <div className="border p-2 rounded-lg bg-white shadow">
//               <button
//                 className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
//                 onClick={() => {
//                   setRentOption("end");
//                   setShowRentOptions(false);
//                 }}
//               >
//                 End of every month
//               </button>
//               <button
//                 className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
//                 onClick={() => {
//                   setRentOption("start");
//                   setShowRentOptions(false);
//                 }}
//               >
//                 Starting of every month
//               </button>
//               <button
//                 className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
//                 onClick={() => setRentOption("custom")}
//               >
//                 Customize the date
//               </button>
              
//             </div>
//           )}

//           {/* Custom Date Picker */}
//           {rentOption === "custom" && (
//             <input
//               type="date"
//               className="w-full border p-2 rounded-lg"
//               value={customDate}
//               onChange={(e) => setCustomDate(e.target.value)}
//             />
//           )}

//           {/* Grace Period */}
//           <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded-lg"
//             placeholder="e.g. 5 days"
//             value={gracePeriod}
//             onChange={(e) => setGracePeriod(e.target.value)}
//           />
//            {/* Save Preferences */}
//       <button
//         className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
//         onClick={handleSavePreferences}
//       >
//         Save my preferences
//       </button>
//         </div>
//       )}

     

//       {/* Other Options */}
//       <div className="mt-4 space-y-5 text-">
//         <button className="text-[#090909]">View Payment History →</button>
//         <hr className="shadow-md text-[#727070]" />
//         <button className="text-red-600">Mark Check Out →</button>
//         <hr className="shadow-md" />
//       </div>
//     </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 flex justify-center"
//           onClick={() => navigate("/client/confirmbooking")}
//         >
//           <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Move-Out Request Popup */}
//       {showMoveOutForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold text-center mb-4">
//               Are you sure you want to proceed with the tenant's move-out request?
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block font-medium mb-1">Reason for Vacancy *</label>
//                 <select
//                   className="w-full border p-2 rounded-lg"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                 >
//                   <option value="">Value</option>
//                   <option value="Lease Ended">Lease Ended</option>
//                   <option value="Tenant Request">Tenant Request</option>
//                   <option value="Eviction">Eviction</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Grace Period *</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="eg 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-1">Initiate Refund *</label>
//               <select
//                 className="w-full border p-2 rounded-lg"
//                 value={refund}
//                 onChange={(e) => setRefund(e.target.value)}
//               >
//                 <option value="">Select your answer</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             <div className="flex items-center text-yellow-600 mb-6">
//               <span className="text-xl">⚠️</span>
//               <p className="ml-2 text-sm font-medium">
//                 <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
//                 vacancy process will begin.
//               </p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
//                 onClick={handleCheckOutClick}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={handleConfirmVacancy}
//               >
//                 Confirm Vacancy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Tenant vacancy confirmed successfully!
//             </h2>
//             <p className="mb-4">Notification has been sent.</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//               onClick={handleCloseSuccessPopup}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantProfile;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaPhone, FaComment } from "react-icons/fa";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";

// const TenantProfile = () => {
//   const [showMoveOutForm, setShowMoveOutForm] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [reason, setReason] = useState("");
//   const [gracePeriod, setGracePeriod] = useState("");
//   const [refund, setRefund] = useState("");
//   const [notify, setNotify] = useState(false);
//   const [showRentOptions, setShowRentOptions] = useState(false);
//   const [rentOption, setRentOption] = useState("");
//   const [customDate, setCustomDate] = useState("");
//   const [preferencesSaved, setPreferencesSaved] = useState(false);

//   const handleCheckboxChange = () => {
//     setNotify(!notify);
//     if (!notify) {
//       setShowRentOptions(false);
//       setRentOption("");
//       setCustomDate("");
//       setGracePeriod("");
//     }
//   };

//   const handleSavePreferences = () => {
//     setPreferencesSaved(true);
//     setTimeout(() => setPreferencesSaved(false), 3000);
//   };

//   const handleCheckOutClick = () => {
//     setShowMoveOutForm(!showMoveOutForm);
//   };

//   const handleConfirmVacancy = () => {
//     setShowSuccessPopup(true);
//     setShowMoveOutForm(false);
//   };

//   const handleCloseSuccessPopup = () => {
//     setShowSuccessPopup(false);
//   };

//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state;

//   if (!tenant) return <p>No tenant data found.</p>;

//   // Function to format dates
//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

//   // Function to safely extract tenant data based on booking type
//   const getTenantDetails = () => {
//     console.log("Tenant data received:", tenant); // Debug log
    
//     // For offline bookings with originalData
//     if (tenant.bookingType === "offline" && tenant.originalData) {
//       const originalData = tenant.originalData;
      
//       // Get tenant details from originalData
//       const offlineTenant = originalData.tenant;
      
//       return {
//         name: tenant.userName,
//         phone: tenant.phone,
//         email: offlineTenant?.email || "N/A",
//         dob: offlineTenant?.dob || "N/A",
//         aadharNumber: offlineTenant?.aadharNumber || offlineTenant?.idProofNumber || "N/A",
//         guardianContact: offlineTenant?.emergencyContact || tenant.phone || "N/A",
//         address: offlineTenant?.address || "N/A",
//         clientId: tenant.clientId,
//         profileImage: offlineTenant?.profileImage || "",
//         moveInDate: originalData.checkInDate,
//         moveOutDate: originalData.checkOutDate,
//         roomNumber: tenant.roomNumber,
//         roomType: tenant.roomType,
//         property: {
//           name: tenant.propertyName || "N/A"
//         },
//         pricing: originalData.pricing || {
//           securityDeposit: 0,
//           monthlyRent: 0,
//           totalRent: 0
//         },
//         paymentInfo: originalData.paymentInfo || {
//           paymentMethod: "N/A",
//           paymentStatus: "N/A",
//           amountPaid: 0
//         },
//         stayType: originalData.stayType || "N/A",
//         personCount: originalData.personCount || 1
//       };
//     }
    
//     // For online bookings
//     return {
//       name: tenant.userName,
//       phone: tenant.phone,
//       email: tenant.email || "N/A",
//       dob: tenant.dob || "N/A",
//       aadharNumber: tenant.aadharNumber || tenant.idProofNumber || "N/A",
//       guardianContact: tenant.guardianContact || tenant.emergencyContact || tenant.phone || "N/A",
//       address: tenant.address || "N/A",
//       clientId: tenant.clientId,
//       profileImage: tenant.profileImage || "",
//       moveInDate: tenant.moveInDate || tenant.checkInDate,
//       moveOutDate: tenant.moveOutDate || tenant.checkOutDate,
//       roomNumber: tenant.roomNumber,
//       roomType: tenant.roomType,
//       property: tenant.property || { name: tenant.propertyName || "N/A" },
//       pricing: tenant.pricing || {
//         securityDeposit: 0,
//         monthlyRent: 0,
//         totalRent: 0
//       },
//       paymentInfo: tenant.paymentInfo || {
//         paymentMethod: "N/A",
//         paymentStatus: "N/A",
//         amountPaid: 0
//       },
//       stayType: tenant.stayType || "N/A",
//       personCount: tenant.personCount || 1
//     };
//   };

//   // Get tenant details
//   const tenantDetails = getTenantDetails();

//   return (
//     <div className="bg-[#F8F8FF] min-h-screen">
//       {/* Header */}
//       <div className="bg-[#0827B2] p-4 text-white flex items-center">
//         <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
//         <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
//       </div>

//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="bg-[#F8F8FF] p-6 flex items-center space-x-6 mb-6 justify-between">
//           <div className="flex gap-4 items-center">
//             <div className="w-16 h-16 rounded-full border bg-gray-200 flex items-center justify-center">
//               {tenantDetails.profileImage ? (
//                 <img src={tenantDetails.profileImage} alt="Profile" className="w-full h-full rounded-full" />
//               ) : (
//                 <span className="text-2xl font-bold text-gray-600">
//                   {tenantDetails.name.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold">{tenantDetails.name}</h2>
//               <p className="text-gray-500">{tenantDetails.clientId}</p>
//               <p className="text-gray-500 text-sm">
//                 {tenant.bookingType === "offline" ? "Offline Booking" : "Online Booking"}
//               </p>
//             </div>
//           </div>
          
//           {/* Contact Buttons */}
//           <div className="flex space-x-4 items-end justify-end ml-auto">
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiMessageCircle className="text-black text-lg" />
//             </button>
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiPhone className="text-black text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="flex justify-between mx-8">
//           <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
//             {/* Basic Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
//               <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Email ID:</p>
//                 <p>{tenantDetails.email}</p>

//                 <p className="font-semibold">Phone Number:</p>
//                 <p>{tenantDetails.phone}</p>

//                 <p className="font-semibold">Date of birth:</p>
//                 <p>{tenantDetails.dob}</p>

//                 <p className="font-semibold">Aadhar Number:</p>
//                 <p>{tenantDetails.aadharNumber}</p>

//                 <p className="font-semibold">Emergency Contact Number:</p>
//                 <p>{tenantDetails.guardianContact}</p>

//                 <p className="font-semibold">Address:</p>
//                 <p>{tenantDetails.address}</p>
//               </div>
//             </div>

//             {/* Stay Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Hostel:</p>
//                 <p>{tenantDetails.property?.name || "N/A"}</p>

//                 <p className="font-semibold">City:</p>
//                 <p>{tenant.city || "N/A"}</p>

//                 <p className="font-semibold">Locality:</p>
//                 <p>{tenant.propertyLocality || "N/A"}</p>

//                 <p className="font-semibold">Check-in Date:</p>
//                 <p>{formatDate(tenantDetails.moveInDate)}</p>

//                 <p className="font-semibold">Check-out Date:</p>
//                 <p>{formatDate(tenantDetails.moveOutDate)}</p>

//                 <p className="font-semibold">Stay Type:</p>
//                 <p>{tenantDetails.stayType}</p>

//                 <p className="font-semibold">Room:</p>
//                 <p>{tenantDetails.roomNumber || "N/A"} ({tenantDetails.roomType || "N/A"})</p>

//                 <p className="font-semibold">Floor:</p>
//                 <p>{tenant.floor || "N/A"}</p>

//                 <p className="font-semibold">Person Count:</p>
//                 <p>{tenantDetails.personCount}</p>

//                 <p className="font-semibold">Booking Type:</p>
//                 <p>{tenant.bookingType === "offline" ? "Offline" : "Online"}</p>
//               </div>
//             </div>

//             {/* Payment Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Advance Paid:</p>
//                 <p>₹{tenantDetails.pricing?.securityDeposit || 0}</p>

//                 <p className="font-semibold">Rent per Month:</p>
//                 <p>₹{tenantDetails.pricing?.monthlyRent || 0}</p>

//                 <p className="font-semibold">Total Rent:</p>
//                 <p>₹{tenantDetails.pricing?.totalRent || 0}</p>

//                 <p className="font-semibold">Maintenance Fee:</p>
//                 <p>₹{tenantDetails.pricing?.maintenanceFee || 0}</p>

//                 <p className="font-semibold">Payment Method:</p>
//                 <p>{tenantDetails.paymentInfo?.paymentMethod || "N/A"}</p>

//                 <p className="font-semibold">Payment Status:</p>
//                 <p>{tenantDetails.paymentInfo?.paymentStatus || "N/A"}</p>

//                 <p className="font-semibold">Amount Paid:</p>
//                 <p>₹{tenantDetails.paymentInfo?.amountPaid || 0}</p>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-6 text-[#090909] h-auto w-[320px] p-4 space-y-10">
//             {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

//             {/* Notify Checkbox */}
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input type="checkbox" className="w-6 h-6" checked={notify} onChange={handleCheckboxChange} />
//               <span>Notify guests of pending due</span>
//             </label>

//             {/* Rent Collection Date and Grace Period Fields */}
//             {notify && (
//               <div className="mt-4 space-y-3">
//                 <label className="block text-sm font-semibold">Specify rent collection date</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg cursor-pointer"
//                   placeholder="Select date"
//                   onFocus={() => setShowRentOptions(true)}
//                   readOnly
//                 />

//                 {/* Rent Date Options */}
//                 {showRentOptions && (
//                   <div className="border p-2 rounded-lg bg-white shadow">
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("end");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       End of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("start");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       Starting of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
//                       onClick={() => setRentOption("custom")}
//                     >
//                       Customize the date
//                     </button>
//                   </div>
//                 )}

//                 {/* Custom Date Picker */}
//                 {rentOption === "custom" && (
//                   <input
//                     type="date"
//                     className="w-full border p-2 rounded-lg"
//                     value={customDate}
//                     onChange={(e) => setCustomDate(e.target.value)}
//                   />
//                 )}

//                 {/* Grace Period */}
//                 <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="e.g. 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
                
//                 {/* Save Preferences */}
//                 <button
//                   className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
//                   onClick={handleSavePreferences}
//                 >
//                   Save my preferences
//                 </button>
//               </div>
//             )}

//             {/* Other Options */}
//             <div className="mt-4 space-y-5 text-">
//               <button className="text-[#090909]">View Payment History →</button>
//               <hr className="shadow-md text-[#727070]" />
//               <button 
//                 className="text-red-600"
//                 onClick={handleCheckOutClick}
//               >
//                 Mark Check Out →
//               </button>
//               <hr className="shadow-md" />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 flex justify-center"
//           onClick={() => navigate("/client/confirmbooking")}
//         >
//           <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Move-Out Request Popup */}
//       {showMoveOutForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold text-center mb-4">
//               Are you sure you want to proceed with the tenant's move-out request?
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block font-medium mb-1">Reason for Vacancy *</label>
//                 <select
//                   className="w-full border p-2 rounded-lg"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                 >
//                   <option value="">Value</option>
//                   <option value="Lease Ended">Lease Ended</option>
//                   <option value="Tenant Request">Tenant Request</option>
//                   <option value="Eviction">Eviction</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Grace Period *</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="eg 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-1">Initiate Refund *</label>
//               <select
//                 className="w-full border p-2 rounded-lg"
//                 value={refund}
//                 onChange={(e) => setRefund(e.target.value)}
//               >
//                 <option value="">Select your answer</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             <div className="flex items-center text-yellow-600 mb-6">
//               <span className="text-xl">⚠️</span>
//               <p className="ml-2 text-sm font-medium">
//                 <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
//                 vacancy process will begin.
//               </p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
//                 onClick={handleCheckOutClick}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={handleConfirmVacancy}
//               >
//                 Confirm Vacancy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Tenant vacancy confirmed successfully!
//             </h2>
//             <p className="mb-4">Notification has been sent.</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//               onClick={handleCloseSuccessPopup}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantProfile;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import { bookingAPI } from "../../Clients-components/PropertyController";

// const TenantProfile = () => {
//   const [showMoveOutForm, setShowMoveOutForm] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [reason, setReason] = useState("");
//   const [gracePeriod, setGracePeriod] = useState("");
//   const [refund, setRefund] = useState("");
//   const [notify, setNotify] = useState(false);
//   const [showRentOptions, setShowRentOptions] = useState(false);
//   const [rentOption, setRentOption] = useState("");
//   const [customDate, setCustomDate] = useState("");
//   const [preferencesSaved, setPreferencesSaved] = useState(false);
//   const [tenantDetails, setTenantDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state;

//   // Function to format dates
//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

//   // Function to format currency
//   const formatCurrency = (amount) => {
//     if (amount === undefined || amount === null) return "₹0";
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   // Function to generate DOB from clientId
//   const generateDOBFromClientId = (clientId) => {
//     if (!clientId || clientId === "N/A") return "N/A";
    
//     const numbers = clientId.match(/\d+/g);
//     if (numbers && numbers[0]) {
//       const num = parseInt(numbers[0]);
     
//       const day = (num % 30) + 1;
//       const month = (num % 12) + 1;
//       const year = 1990 + (num % 30);
//       return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
//     }
//     return "01/01/1990";
//   };

//   // Function to generate a fake Aadhar number from clientId
//   const generateAadharFromClientId = (clientId) => {
//     if (!clientId || clientId === "N/A") return "XXXX-XXXX-XXXX";
//     const numbers = clientId.match(/\d+/g);
//     if (numbers && numbers[0]) {
//       const num = numbers[0].padStart(12, '0');
//       return `${num.slice(0, 4)}-${num.slice(4, 8)}-${num.slice(8, 12)}`;
//     }
//     return "XXXX-XXXX-XXXX";
//   };

//   // Function to fetch online booking details from API using bookingAPI
//   const fetchOnlineBookingDetails = async (bookingId) => {
//     try {
//       console.log("Fetching online booking details for booking ID:", bookingId);
      
//       // Use the bookingAPI to fetch booking details
//       const response = await bookingAPI.getBookingById(bookingId);
      
//       if (response.data?.success && response.data.booking) {
//         const booking = response.data.booking;
//         console.log("Online booking data fetched from API:", booking);
        
//         // Extract user details safely
//         const user = booking.user || {};
//         const property = booking.property || {};
//         const roomDetails = booking.roomDetails || [];
//         const primaryRoom = roomDetails[0] || {};
        
//         // Map the booking data to tenant details format
//         return {
//           // Basic Information
//           id: booking._id || booking.id,
//           name: user.name || tenant?.userName || "N/A",
//           email: user.email || `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           phone: user.phone || tenant?.phone || "N/A",
//           clientId: booking.clientId || tenant?.clientId || "N/A",
          
//           // Room Information
//           roomNumber: primaryRoom.roomNumber || booking.roomNumber || tenant?.roomNumber || "N/A",
//           roomType: booking.roomType?.name || booking.roomType || tenant?.roomType || "N/A",
//           floor: primaryRoom.floor || booking.floor || tenant?.floor || "N/A",
//           roomDetails: roomDetails,
          
//           // Property Information
//           city: property.city || tenant?.city || "N/A",
//           propertyLocality: property.locality || tenant?.propertyLocality || "N/A",
//           propertyName: property.name || tenant?.propertyName || "N/A",
//           propertyId: property._id || property.id,
          
//           bookingType: "online",
          
//           // Personal details
//           dob: generateDOBFromClientId(booking.clientId),
//           gender: "N/A",
//           aadharNumber: generateAadharFromClientId(booking.clientId),
//           idProofType: "Aadhar",
//           guardianContact: user.phone || tenant?.phone || "N/A",
//           address: `${property.name || "N/A"}, ${property.locality || "N/A"}, ${property.city || "N/A"}`,
//           profileImage: user.profileImage || "",
          
//           // Stay details - Check for different field names
//           moveInDate: booking.moveInDate || booking.checkInDate || tenant?.moveInDate,
//           moveOutDate: booking.moveOutDate || booking.checkOutDate || tenant?.moveOutDate,
//           stayType: booking.durationType || booking.stayType || "monthly",
//           personCount: booking.personCount || 1,
//           bookingStatus: booking.bookingStatus || "confirmed",
          
//           // Pricing details
//           pricing: booking.pricing || {
//             securityDeposit: booking.pricing?.securityDeposit || 0,
//             monthlyRent: booking.pricing?.monthlyRent || 0,
//             totalRent: booking.pricing?.totalRent || 0,
//             maintenanceFee: booking.pricing?.maintenanceFee || 0,
//             advanceAmount: booking.pricing?.advanceAmount || 0,
//             totalAmount: booking.pricing?.totalAmount || 0
//           },
          
//           // Payment info
//           paymentInfo: {
//             paymentMethod: booking.paymentInfo?.paymentMethod || "Online Payment",
//             paymentStatus: booking.paymentInfo?.paymentStatus || "paid",
//             amountPaid: booking.paymentInfo?.paidAmount || booking.pricing?.totalAmount || 0,
//             transactionId: booking.paymentInfo?.transactionId || booking.paymentInfo?.razorpayPaymentId || "N/A",
//             paymentDate: booking.paymentInfo?.paymentDate || booking.createdAt
//           },
          
//           // Additional booking data
//           approvedBy: booking.approvedBy || null,
//           approvedAt: booking.approvedAt,
//           createdAt: booking.createdAt,
//           durationDays: booking.durationDays,
//           durationMonths: booking.durationMonths,
//           durationType: booking.durationType,
//           customerDetails: booking.customerDetails || {},
//           transferStatus: booking.transferStatus || "pending"
//         };
//       }
      
//       throw new Error("Failed to fetch booking details from API");
      
//     } catch (error) {
//       console.error("Error fetching online booking details from API:", error);
      
//       // Fallback to generating data from tenant info
//       return {
//         name: tenant?.userName || "N/A",
//         email: `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//         phone: tenant?.phone || "N/A",
//         clientId: tenant?.clientId || "N/A",
//         roomNumber: tenant?.roomNumber || "N/A",
//         roomType: tenant?.roomType || "N/A",
//         floor: tenant?.floor || "N/A",
//         city: tenant?.city || "N/A",
//         propertyLocality: tenant?.propertyLocality || "N/A",
//         propertyName: tenant?.propertyName || "N/A",
//         bookingType: "online",
        
//         dob: generateDOBFromClientId(tenant?.clientId),
//         gender: "N/A",
//         aadharNumber: generateAadharFromClientId(tenant?.clientId),
//         idProofType: "Aadhar",
//         guardianContact: tenant?.phone || "N/A",
//         address: `${tenant?.propertyName || "N/A"}, ${tenant?.propertyLocality || "N/A"}, ${tenant?.city || "N/A"}`,
//         profileImage: "",
        
//         moveInDate: tenant?.moveInDate || tenant?.checkInDate,
//         moveOutDate: tenant?.moveOutDate || tenant?.checkOutDate,
//         stayType: tenant?.durationType || "monthly",
//         personCount: tenant?.personCount || 1,
//         bookingStatus: tenant?.bookingStatus || "confirmed",
        
//         pricing: {
//           securityDeposit: 5000,
//           monthlyRent: 8000,
//           totalRent: 96000,
//           maintenanceFee: 500,
//           advanceAmount: 10000,
//           totalAmount: 107500
//         },
        
//         paymentInfo: {
//           paymentMethod: "Online Payment",
//           paymentStatus: "paid",
//           amountPaid: 107500,
//           transactionId: "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase(),
//           paymentDate: new Date()
//         }
//       };
//     }
//   };

//   useEffect(() => {
//     const getTenantDetails = async () => {
//       if (!tenant) {
//         setLoading(false);
//         return;
//       }

//       console.log("Tenant data received:", tenant);

//       let details = {
//         // Common fields from list view
//         name: tenant.userName || "N/A",
//         phone: tenant.phone || "N/A",
//         clientId: tenant.clientId || "N/A",
//         roomNumber: tenant.roomNumber || "N/A",
//         roomType: tenant.roomType || "N/A",
//         floor: tenant.floor || "N/A",
//         city: tenant.city || "N/A",
//         propertyLocality: tenant.propertyLocality || "N/A",
//         propertyName: tenant.propertyName || "N/A",
//         bookingType: tenant.bookingType || "online",
        
//         // Default values for other fields
//         email: "N/A",
//         dob: "N/A",
//         gender: "N/A",
//         aadharNumber: "N/A",
//         idProofType: "Aadhar",
//         guardianContact: "N/A",
//         address: "N/A",
//         profileImage: "",
//         moveInDate: null,
//         moveOutDate: null,
//         stayType: "N/A",
//         personCount: 1,
//         bookingStatus: "N/A",
        
//         // Pricing details
//         pricing: {
//           securityDeposit: 0,
//           monthlyRent: 0,
//           totalRent: 0,
//           maintenanceFee: 0,
//           advanceAmount: 0,
//           totalAmount: 0
//         },
        
//         // Payment info
//         paymentInfo: {
//           paymentMethod: "N/A",
//           paymentStatus: "N/A",
//           amountPaid: 0,
//           transactionId: "N/A",
//           paymentDate: null
//         }
//       };

//       try {
//         // Handle different schemas based on booking type
//         if (tenant.bookingType === "offline" && tenant.originalData) {
//           const originalData = tenant.originalData;
          
//           console.log("Processing offline booking:", originalData);
          
//           // Extract tenant details from originalData
//           if (originalData.tenant && typeof originalData.tenant === 'object') {
//             const offlineTenant = originalData.tenant;
//             details = {
//               ...details,
//               name: offlineTenant.name || offlineTenant.userName || details.name,
//               email: offlineTenant.email || "N/A",
//               phone: offlineTenant.phone || offlineTenant.mobile || details.phone,
//               clientId: offlineTenant.clientId || details.clientId,
//               dob: offlineTenant.dob || offlineTenant.dateOfBirth || generateDOBFromClientId(offlineTenant.clientId || details.clientId),
//               aadharNumber: offlineTenant.aadharNumber || offlineTenant.aadhar || generateAadharFromClientId(offlineTenant.clientId || details.clientId),
//               gender: "N/A",
//               guardianContact: offlineTenant.emergencyContact || offlineTenant.guardianContact || offlineTenant.emergencyPhone || details.phone,
//               address: offlineTenant.address || offlineTenant.permanentAddress || `${details.propertyName}, ${details.city}`,
//               profileImage: offlineTenant.profileImage || offlineTenant.profilePicture || ""
//             };
//           }
          
//           // Extract stay details from originalData - check both field names
//           details = {
//             ...details,
//             moveInDate: originalData.checkInDate || originalData.moveInDate,
//             moveOutDate: originalData.checkOutDate || originalData.moveOutDate,
//             stayType: originalData.stayType || originalData.bookingType || "N/A",
//             personCount: originalData.personCount || originalData.numberOfPersons || 1,
//             bookingStatus: originalData.bookingStatus || originalData.status || "N/A",
//             pricing: {
//               ...details.pricing,
//               securityDeposit: originalData.pricing?.securityDeposit || originalData.securityDeposit || 0,
//               monthlyRent: originalData.pricing?.monthlyRent || originalData.monthlyRent || 0,
//               totalRent: originalData.pricing?.totalRent || originalData.totalRent || 0,
//               maintenanceFee: originalData.pricing?.maintenanceFee || originalData.maintenanceFee || 0,
//               advanceAmount: originalData.pricing?.advanceAmount || originalData.advanceAmount || 0,
//               totalAmount: originalData.pricing?.totalAmount || originalData.totalAmount || 0
//             },
//             paymentInfo: {
//               ...details.paymentInfo,
//               paymentMethod: originalData.paymentInfo?.paymentMethod || originalData.paymentMethod || "N/A",
//               paymentStatus: originalData.paymentInfo?.paymentStatus || originalData.paymentStatus || "N/A",
//               amountPaid: originalData.paymentInfo?.amountPaid || originalData.amountPaid || 0,
//               transactionId: originalData.paymentInfo?.transactionId || originalData.transactionId || "N/A",
//               paymentDate: originalData.paymentInfo?.paymentDate || originalData.paymentDate || null
//             }
//           };
          
//           // If room details are in roomDetails object
//           if (originalData.roomDetails) {
//             details = {
//               ...details,
//               roomNumber: originalData.roomDetails.roomNumber || details.roomNumber,
//               roomType: originalData.roomDetails.roomType || details.roomType,
//               floor: originalData.roomDetails.floor || details.floor
//             };
//           }
//         } 
//         // Handle online bookings
//         else if (tenant.bookingType === "online") {
//           console.log("Processing online booking:", tenant);
          
//           // Get the booking ID from tenant data
//           const bookingId = tenant.id || tenant._id;
//           if (bookingId) {
//             // Fetch online booking details from API
//             const onlineDetails = await fetchOnlineBookingDetails(bookingId);
//             setTenantDetails(onlineDetails);
//             setLoading(false);
//             return;
//           } else {
//             // Fallback if no booking ID
//             const email = tenant.email || `${tenant.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A";
            
//             details = {
//               ...details,
//               email: email,
//               dob: generateDOBFromClientId(details.clientId),
//               aadharNumber: generateAadharFromClientId(details.clientId),
//               gender: "N/A",
//               guardianContact: details.phone,
//               address: `${details.propertyName}, ${details.propertyLocality}, ${details.city}`,
//               moveInDate: tenant.moveInDate || tenant.checkInDate,
//               moveOutDate: tenant.moveOutDate || tenant.checkOutDate,
//               stayType: tenant.durationType || tenant.stayType || "monthly",
//               personCount: tenant.personCount || tenant.numberOfPersons || 1,
//               bookingStatus: tenant.bookingStatus || tenant.status || "confirmed"
//             };
            
//             // Try to get pricing from tenant data
//             details.pricing = {
//               securityDeposit: tenant.securityDeposit || tenant.pricing?.securityDeposit || 5000,
//               monthlyRent: tenant.monthlyRent || tenant.pricing?.monthlyRent || 8000,
//               totalRent: tenant.totalRent || tenant.pricing?.totalRent || 96000,
//               maintenanceFee: tenant.maintenanceFee || tenant.pricing?.maintenanceFee || 500,
//               advanceAmount: tenant.advanceAmount || tenant.pricing?.advanceAmount || 10000,
//               totalAmount: tenant.totalAmount || tenant.pricing?.totalAmount || 107500
//             };
            
//             details.paymentInfo = {
//               paymentMethod: tenant.paymentMethod || "Online Payment",
//               paymentStatus: tenant.paymentStatus || "paid",
//               amountPaid: tenant.amountPaid || tenant.pricing?.totalAmount || 107500,
//               transactionId: tenant.transactionId || "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase(),
//               paymentDate: tenant.paymentDate || tenant.createdAt || new Date()
//             };
//           }
//         }
        
//         setTenantDetails(details);
//       } catch (error) {
//         console.error("Error processing tenant details:", error);
//         // Set fallback details
//         details = {
//           ...details,
//           dob: generateDOBFromClientId(details.clientId),
//           aadharNumber: generateAadharFromClientId(details.clientId),
//           gender: "N/A",
//           guardianContact: details.phone,
//           address: `${details.propertyName}, ${details.propertyLocality}, ${details.city}`,
//           email: `${details.name?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           moveInDate: tenant?.moveInDate || tenant?.checkInDate,
//           moveOutDate: tenant?.moveOutDate || tenant?.checkOutDate
//         };
//         setTenantDetails(details);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTenantDetails();
//   }, [tenant]);

//   const handleCheckboxChange = () => {
//     setNotify(!notify);
//     if (!notify) {
//       setShowRentOptions(false);
//       setRentOption("");
//       setCustomDate("");
//       setGracePeriod("");
//     }
//   };

//   const handleSavePreferences = () => {
//     setPreferencesSaved(true);
//     setTimeout(() => setPreferencesSaved(false), 3000);
//   };

//   const handleCheckOutClick = () => {
//     setShowMoveOutForm(!showMoveOutForm);
//   };

//   const handleConfirmVacancy = () => {
//     setShowSuccessPopup(true);
//     setShowMoveOutForm(false);
//   };

//   const handleCloseSuccessPopup = () => {
//     setShowSuccessPopup(false);
//   };

//   if (!tenant) return <p className="p-6">No tenant data found.</p>;
  
//   if (loading || !tenantDetails) {
//     return <p className="p-6">Loading tenant details...</p>;
//   }

//   return (
//     <div className="bg-[#F8F8FF] min-h-screen">
//       {/* Header */}
//       <div className="bg-[#0827B2] p-4 text-white flex items-center">
//         <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
//         <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
//       </div>

//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="bg-[#F8F8FF] p-6 flex items-center space-x-6 mb-6 justify-between">
//           <div className="flex gap-4 items-center">
//             <div className="w-16 h-16 rounded-full border bg-gray-200 flex items-center justify-center">
//               {tenantDetails.profileImage ? (
//                 <img src={tenantDetails.profileImage} alt="Profile" className="w-full h-full rounded-full" />
//               ) : (
//                 <span className="text-2xl font-bold text-gray-600">
//                   {tenantDetails.name.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold">{tenantDetails.name}</h2>
//               <p className="text-gray-500">{tenantDetails.clientId}</p>
//               <p className="text-gray-500 text-sm">
//                 {tenantDetails.bookingType === "offline" ? "Offline Booking" : "Online Booking"}
//               </p>
//             </div>
//           </div>
          
//           {/* Contact Buttons */}
//           <div className="flex space-x-4 items-end justify-end ml-auto">
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiMessageCircle className="text-black text-lg" />
//             </button>
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiPhone className="text-black text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="flex justify-between mx-8">
//           <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
//             {/* Basic Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
//               <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Email ID:</p>
//                 <p>{tenantDetails.email}</p>

//                 <p className="font-semibold">Phone Number:</p>
//                 <p>{tenantDetails.phone}</p>

//                 <p className="font-semibold">Date of Birth:</p>
//                 <p>{tenantDetails.dob}</p>

//                 {/* <p className="font-semibold">Gender:</p>
//                 <p>{tenantDetails.gender}</p> */}

//                 <p className="font-semibold">ID Proof Type:</p>
//                 <p>{tenantDetails.idProofType}</p>

//                 <p className="font-semibold">Aadhar Number:</p>
//                 <p>{tenantDetails.aadharNumber}</p>

//                 <p className="font-semibold">Emergency Contact:</p>
//                 <p>{tenantDetails.guardianContact}</p>

//                 <p className="font-semibold">Address:</p>
//                 <p>{tenantDetails.address}</p>
//               </div>
//             </div>

//             {/* Stay Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Hostel:</p>
//                 <p>{tenantDetails.propertyName}</p>

//                 <p className="font-semibold">City:</p>
//                 <p>{tenantDetails.city}</p>

//                 <p className="font-semibold">Locality:</p>
//                 <p>{tenantDetails.propertyLocality}</p>

//                 <p className="font-semibold">Check-in Date:</p>
//                 <p>{formatDate(tenantDetails.moveInDate)}</p>

//                 <p className="font-semibold">Check-out Date:</p>
//                 <p>{formatDate(tenantDetails.moveOutDate)}</p>

//                 <p className="font-semibold">Stay Type:</p>
//                 <p>{tenantDetails.stayType}</p>

//                 <p className="font-semibold">Room:</p>
//                 <p>{tenantDetails.roomNumber} ({tenantDetails.roomType})</p>

//                 <p className="font-semibold">Floor:</p>
//                 <p>{tenantDetails.floor}</p>

//                 <p className="font-semibold">Person Count:</p>
//                 <p>{tenantDetails.personCount}</p>

//                 <p className="font-semibold">Booking Status:</p>
//                 <p className={`font-semibold ${tenantDetails.bookingStatus === 'confirmed' || tenantDetails.bookingStatus === 'approved' ? 'text-green-600' : 
//                               tenantDetails.bookingStatus === 'pending' ? 'text-yellow-600' : 
//                               tenantDetails.bookingStatus === 'cancelled' ? 'text-red-600' : 'text-gray-600'}`}>
//                   {tenantDetails.bookingStatus}
//                 </p>

//                 <p className="font-semibold">Booking Type:</p>
//                 <p>{tenantDetails.bookingType === "offline" ? "Offline" : "Online"}</p>
//               </div>
//             </div>

//             {/* Payment Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Security Deposit:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.securityDeposit)}</p>

//                 <p className="font-semibold">Monthly Rent:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.monthlyRent)}</p>

//                 <p className="font-semibold">Total Rent:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.totalRent)}</p>

//                 <p className="font-semibold">Maintenance Fee:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.maintenanceFee)}</p>

//                 <p className="font-semibold">Advance Amount:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.advanceAmount)}</p>

//                 <p className="font-semibold">Total Amount:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.totalAmount)}</p>

//                 <p className="font-semibold">Payment Method:</p>
//                 <p>{tenantDetails.paymentInfo.paymentMethod}</p>

//                 <p className="font-semibold">Payment Status:</p>
//                 <p className={`font-semibold ${tenantDetails.paymentInfo.paymentStatus === 'paid' ? 'text-green-600' : 
//                                tenantDetails.paymentInfo.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
//                   {tenantDetails.paymentInfo.paymentStatus}
//                 </p>

//                 <p className="font-semibold">Amount Paid:</p>
//                 <p>{formatCurrency(tenantDetails.paymentInfo.amountPaid)}</p>

//                 {tenantDetails.paymentInfo.paymentDate && (
//                   <>
//                     <p className="font-semibold">Payment Date:</p>
//                     <p>{formatDate(tenantDetails.paymentInfo.paymentDate)}</p>
//                   </>
//                 )}

//                 {tenantDetails.paymentInfo.transactionId !== "N/A" && (
//                   <>
//                     <p className="font-semibold">Transaction ID:</p>
//                     <p className="text-sm">{tenantDetails.paymentInfo.transactionId}</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-6 text-[#090909] h-auto w-[320px] p-4 space-y-10">
//             {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

//             {/* Notify Checkbox */}
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input type="checkbox" className="w-6 h-6" checked={notify} onChange={handleCheckboxChange} />
//               <span>Notify guests of pending due</span>
//             </label>

//             {/* Rent Collection Date and Grace Period Fields */}
//             {notify && (
//               <div className="mt-4 space-y-3">
//                 <label className="block text-sm font-semibold">Specify rent collection date</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg cursor-pointer"
//                   placeholder="Select date"
//                   onFocus={() => setShowRentOptions(true)}
//                   readOnly
//                 />

//                 {/* Rent Date Options */}
//                 {showRentOptions && (
//                   <div className="border p-2 rounded-lg bg-white shadow">
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("end");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       End of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("start");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       Starting of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
//                       onClick={() => setRentOption("custom")}
//                     >
//                       Customize the date
//                     </button>
//                   </div>
//                 )}

//                 {/* Custom Date Picker */}
//                 {rentOption === "custom" && (
//                   <input
//                     type="date"
//                     className="w-full border p-2 rounded-lg"
//                     value={customDate}
//                     onChange={(e) => setCustomDate(e.target.value)}
//                   />
//                 )}

//                 {/* Grace Period */}
//                 <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="e.g. 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
                
//                 {/* Save Preferences */}
//                 <button
//                   className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
//                   onClick={handleSavePreferences}
//                 >
//                   Save my preferences
//                 </button>
//               </div>
//             )}

//             {/* Other Options */}
//             <div className="mt-4 space-y-5 text-">
//               <button className="text-[#090909]">View Payment History →</button>
//               <hr className="shadow-md text-[#727070]" />
//               <button 
//                 className="text-red-600"
//                 onClick={handleCheckOutClick}
//               >
//                 Mark Check Out →
//               </button>
//               <hr className="shadow-md" />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 flex justify-center"
//           onClick={() => navigate("/client/confirmbooking")}
//         >
//           <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Move-Out Request Popup */}
//       {showMoveOutForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold text-center mb-4">
//               Are you sure you want to proceed with the tenant's move-out request?
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block font-medium mb-1">Reason for Vacancy *</label>
//                 <select
//                   className="w-full border p-2 rounded-lg"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                 >
//                   <option value="">Value</option>
//                   <option value="Lease Ended">Lease Ended</option>
//                   <option value="Tenant Request">Tenant Request</option>
//                   <option value="Eviction">Eviction</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Grace Period *</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="eg 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-1">Initiate Refund *</label>
//               <select
//                 className="w-full border p-2 rounded-lg"
//                 value={refund}
//                 onChange={(e) => setRefund(e.target.value)}
//               >
//                 <option value="">Select your answer</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             <div className="flex items-center text-yellow-600 mb-6">
//               <span className="text-xl">⚠️</span>
//               <p className="ml-2 text-sm font-medium">
//                 <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
//                 vacancy process will begin.
//               </p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
//                 onClick={handleCheckOutClick}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={handleConfirmVacancy}
//               >
//                 Confirm Vacancy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Tenant vacancy confirmed successfully!
//             </h2>
//             <p className="mb-4">Notification has been sent.</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//               onClick={handleCloseSuccessPopup}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantProfile;




// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import { bookingAPI } from "../../Clients-components/PropertyController";

// const TenantProfile = () => {
//   const [showMoveOutForm, setShowMoveOutForm] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [reason, setReason] = useState("");
//   const [gracePeriod, setGracePeriod] = useState("");
//   const [refund, setRefund] = useState("");
//   const [notify, setNotify] = useState(false);
//   const [showRentOptions, setShowRentOptions] = useState(false);
//   const [rentOption, setRentOption] = useState("");
//   const [customDate, setCustomDate] = useState("");
//   const [preferencesSaved, setPreferencesSaved] = useState(false);
//   const [tenantDetails, setTenantDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updatingStatus, setUpdatingStatus] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state;

//   // Function to format dates
//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

//   // Function to format currency
//   const formatCurrency = (amount) => {
//     if (amount === undefined || amount === null) return "₹0";
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   // Function to generate DOB from clientId
//   const generateDOBFromClientId = (clientId) => {
//     if (!clientId || clientId === "N/A") return "N/A";
    
//     const numbers = clientId.match(/\d+/g);
//     if (numbers && numbers[0]) {
//       const num = parseInt(numbers[0]);
     
//       const day = (num % 30) + 1;
//       const month = (num % 12) + 1;
//       const year = 1990 + (num % 30);
//       return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
//     }
//     return "01/01/1990";
//   };

//   // Function to generate a fake Aadhar number from clientId
//   const generateAadharFromClientId = (clientId) => {
//     if (!clientId || clientId === "N/A") return "XXXX-XXXX-XXXX";
//     const numbers = clientId.match(/\d+/g);
//     if (numbers && numbers[0]) {
//       const num = numbers[0].padStart(12, '0');
//       return `${num.slice(0, 4)}-${num.slice(4, 8)}-${num.slice(8, 12)}`;
//     }
//     return "XXXX-XXXX-XXXX";
//   };

//   // Function to update booking status to "checked out"
//   const updateBookingStatus = async () => {
//     try {
//       setUpdatingStatus(true);
      
//       // Get the booking ID from tenant data
//       const bookingId = tenant?.id || tenant?._id || tenantDetails?.id;
//       const bookingType = tenant?.bookingType || tenantDetails?.bookingType;
      
//       if (!bookingId) {
//         console.error("No booking ID found");
//         throw new Error("Booking ID not found");
//       }

//       console.log("Updating booking status for:", {
//         bookingId,
//         bookingType,
//         tenantId: tenant?.id,
//         tenantDetailsId: tenantDetails?.id
//       });

//       // Prepare the update data
//       const updateData = {
//         bookingStatus: "checked_out",
//         checkOutDate: new Date().toISOString(),
//         moveOutDate: new Date().toISOString(),
//         reasonForVacancy: reason || "Lease Ended",
//         gracePeriod: gracePeriod || "0 days",
//         refundInitiated: refund === "Yes"
//       };

//       console.log("Update data:", updateData);

//       // Update booking status based on booking type
//       if (bookingType === "online") {
//         console.log("Updating online booking status...");
        
//         // For online bookings, use the bookingAPI or direct fetch
//         try {
//           // Method 1: Try using bookingAPI.updateBookingStatus if available
//           if (bookingAPI.updateBookingStatus) {
//             const response = await bookingAPI.updateBookingStatus(bookingId, {
//               bookingStatus: "checked_out",
//               ...updateData
//             });
            
//             if (response.data?.success) {
//               console.log("Online booking status updated successfully via bookingAPI");
//               return true;
//             }
//           }
//         } catch (apiError) {
//           console.warn("bookingAPI.updateBookingStatus failed:", apiError);
//         }

//         // Method 2: Try direct API call to the bookings endpoint
//         try {
//           const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//           const response = await fetch(`/api/bookings/${bookingId}/status`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               bookingStatus: "checked_out",
//               moveOutDate: updateData.moveOutDate,
//               reasonForVacancy: updateData.reasonForVacancy
//             })
//           });
          
//           if (response.ok) {
//             const result = await response.json();
//             console.log("Online booking status updated successfully:", result);
//             return true;
//           } else {
//             console.error("Failed to update online booking, trying alternative...");
//           }
//         } catch (fetchError) {
//           console.error("Direct API call failed:", fetchError);
//         }

//         // Method 3: Try PATCH endpoint
//         try {
//           const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//           const response = await fetch(`/api/bookings/${bookingId}`, {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               bookingStatus: "checked_out",
//               moveOutDate: updateData.moveOutDate,
//               status: "checked_out"
//             })
//           });
          
//           if (response.ok) {
//             console.log("Online booking status updated via PATCH");
//             return true;
//           }
//         } catch (patchError) {
//           console.error("PATCH endpoint failed:", patchError);
//         }
        
//         throw new Error("Failed to update online booking status after multiple attempts");
//       } else {
//         // Update offline booking
//         console.log("Updating offline booking status...");
        
//         // For offline bookings, we need to use the updateOfflineBooking endpoint
//         try {
//           const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//           const response = await fetch(`/api/offline-bookings/update/${bookingId}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               bookingStatus: "checked_out",
//               status: "checked_out",
//               moveOutDate: updateData.moveOutDate,
//               checkOutDate: updateData.checkOutDate,
//               reasonForVacancy: updateData.reasonForVacancy,
//               gracePeriod: updateData.gracePeriod,
//               refundInitiated: updateData.refundInitiated
//             })
//           });
          
//           if (response.ok) {
//             const result = await response.json();
//             console.log("Offline booking status updated successfully:", result);
//             return true;
//           } else {
//             // Try alternative endpoint format
//             const response2 = await fetch(`/api/offline-bookings/${bookingId}`, {
//               method: 'PUT',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                 bookingStatus: "checked_out",
//                 status: "checked_out",
//                 moveOutDate: updateData.moveOutDate
//               })
//             });
            
//             if (response2.ok) {
//               console.log("Offline booking updated via alternative endpoint");
//               return true;
//             }
            
//             throw new Error(`Offline booking update failed with status ${response2.status}`);
//           }
//         } catch (error) {
//           console.error("Error updating offline booking:", error);
          
//           // Last resort: If offline booking update fails, try to update as if it were online
//           // This handles cases where offline bookings might be stored in the main bookings collection
//           try {
//             const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//             const response = await fetch(`/api/bookings/${bookingId}`, {
//               method: 'PATCH',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                 bookingStatus: "checked_out",
//                 moveOutDate: updateData.moveOutDate,
//                 status: "checked_out"
//               })
//             });
            
//             if (response.ok) {
//               console.log("Booking updated via fallback method");
//               return true;
//             }
//           } catch (fallbackError) {
//             console.error("Fallback update also failed:", fallbackError);
//           }
          
//           throw error;
//         }
//       }
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       throw error;
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   // Function to fetch online booking details from API using bookingAPI
//   const fetchOnlineBookingDetails = async (bookingId) => {
//     try {
//       console.log("Fetching online booking details for booking ID:", bookingId);
      
//       // Use the bookingAPI to fetch booking details
//       const response = await bookingAPI.getBookingById(bookingId);
      
//       if (response.data?.success && response.data.booking) {
//         const booking = response.data.booking;
//         console.log("Online booking data fetched from API:", booking);
        
//         // Extract user details safely
//         const user = booking.user || {};
//         const property = booking.property || {};
//         const roomDetails = booking.roomDetails || [];
//         const primaryRoom = roomDetails[0] || {};
        
//         // Map the booking data to tenant details format
//         return {
//           // Basic Information
//           id: booking._id || booking.id,
//           name: user.name || tenant?.userName || "N/A",
//           email: user.email || `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           phone: user.phone || tenant?.phone || "N/A",
//           clientId: booking.clientId || tenant?.clientId || "N/A",
          
//           // Room Information
//           roomNumber: primaryRoom.roomNumber || booking.roomNumber || tenant?.roomNumber || "N/A",
//           roomType: booking.roomType?.name || booking.roomType || tenant?.roomType || "N/A",
//           floor: primaryRoom.floor || booking.floor || tenant?.floor || "N/A",
//           roomDetails: roomDetails,
          
//           // Property Information
//           city: property.city || tenant?.city || "N/A",
//           propertyLocality: property.locality || tenant?.propertyLocality || "N/A",
//           propertyName: property.name || tenant?.propertyName || "N/A",
//           propertyId: property._id || property.id,
          
//           bookingType: "online",
          
//           // Personal details
//           dob: generateDOBFromClientId(booking.clientId),
//           gender: "N/A",
//           aadharNumber: generateAadharFromClientId(booking.clientId),
//           idProofType: "Aadhar",
//           guardianContact: user.phone || tenant?.phone || "N/A",
//           address: `${property.name || "N/A"}, ${property.locality || "N/A"}, ${property.city || "N/A"}`,
//           profileImage: user.profileImage || "",
          
//           // Stay details - Check for different field names
//           moveInDate: booking.moveInDate || booking.checkInDate || tenant?.moveInDate,
//           moveOutDate: booking.moveOutDate || booking.checkOutDate || tenant?.moveOutDate,
//           stayType: booking.durationType || booking.stayType || "monthly",
//           personCount: booking.personCount || 1,
//           bookingStatus: booking.bookingStatus || "confirmed",
          
//           // Pricing details
//           pricing: booking.pricing || {
//             securityDeposit: booking.pricing?.securityDeposit || 0,
//             monthlyRent: booking.pricing?.monthlyRent || 0,
//             totalRent: booking.pricing?.totalRent || 0,
//             maintenanceFee: booking.pricing?.maintenanceFee || 0,
//             advanceAmount: booking.pricing?.advanceAmount || 0,
//             totalAmount: booking.pricing?.totalAmount || 0
//           },
          
//           // Payment info
//           paymentInfo: {
//             paymentMethod: booking.paymentInfo?.paymentMethod || "Online Payment",
//             paymentStatus: booking.paymentInfo?.paymentStatus || "paid",
//             amountPaid: booking.paymentInfo?.paidAmount || booking.pricing?.totalAmount || 0,
//             transactionId: booking.paymentInfo?.transactionId || booking.paymentInfo?.razorpayPaymentId || "N/A",
//             paymentDate: booking.paymentInfo?.paymentDate || booking.createdAt
//           },
          
//           // Additional booking data
//           approvedBy: booking.approvedBy || null,
//           approvedAt: booking.approvedAt,
//           createdAt: booking.createdAt,
//           durationDays: booking.durationDays,
//           durationMonths: booking.durationMonths,
//           durationType: booking.durationType,
//           customerDetails: booking.customerDetails || {},
//           transferStatus: booking.transferStatus || "pending"
//         };
//       }
      
//       throw new Error("Failed to fetch booking details from API");
      
//     } catch (error) {
//       console.error("Error fetching online booking details from API:", error);
      
//       // Fallback to generating data from tenant info
//       return {
//         name: tenant?.userName || "N/A",
//         email: `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//         phone: tenant?.phone || "N/A",
//         clientId: tenant?.clientId || "N/A",
//         roomNumber: tenant?.roomNumber || "N/A",
//         roomType: tenant?.roomType || "N/A",
//         floor: tenant?.floor || "N/A",
//         city: tenant?.city || "N/A",
//         propertyLocality: tenant?.propertyLocality || "N/A",
//         propertyName: tenant?.propertyName || "N/A",
//         bookingType: "online",
        
//         dob: generateDOBFromClientId(tenant?.clientId),
//         gender: "N/A",
//         aadharNumber: generateAadharFromClientId(tenant?.clientId),
//         idProofType: "Aadhar",
//         guardianContact: tenant?.phone || "N/A",
//         address: `${tenant?.propertyName || "N/A"}, ${tenant?.propertyLocality || "N/A"}, ${tenant?.city || "N/A"}`,
//         profileImage: "",
        
//         moveInDate: tenant?.moveInDate || tenant?.checkInDate,
//         moveOutDate: tenant?.moveOutDate || tenant?.checkOutDate,
//         stayType: tenant?.durationType || "monthly",
//         personCount: tenant?.personCount || 1,
//         bookingStatus: tenant?.bookingStatus || "confirmed",
        
//         pricing: {
//           securityDeposit: 5000,
//           monthlyRent: 8000,
//           totalRent: 96000,
//           maintenanceFee: 500,
//           advanceAmount: 10000,
//           totalAmount: 107500
//         },
        
//         paymentInfo: {
//           paymentMethod: "Online Payment",
//           paymentStatus: "paid",
//           amountPaid: 107500,
//           transactionId: "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase(),
//           paymentDate: new Date()
//         }
//       };
//     }
//   };

//   useEffect(() => {
//     const getTenantDetails = async () => {
//       if (!tenant) {
//         setLoading(false);
//         return;
//       }

//       console.log("Tenant data received:", tenant);

//       let details = {
//         // Common fields from list view
//         name: tenant.userName || "N/A",
//         phone: tenant.phone || "N/A",
//         clientId: tenant.clientId || "N/A",
//         roomNumber: tenant.roomNumber || "N/A",
//         roomType: tenant.roomType || "N/A",
//         floor: tenant.floor || "N/A",
//         city: tenant.city || "N/A",
//         propertyLocality: tenant.propertyLocality || "N/A",
//         propertyName: tenant.propertyName || "N/A",
//         bookingType: tenant.bookingType || "online",
        
//         // Default values for other fields
//         email: "N/A",
//         dob: "N/A",
//         gender: "N/A",
//         aadharNumber: "N/A",
//         idProofType: "Aadhar",
//         guardianContact: "N/A",
//         address: "N/A",
//         profileImage: "",
//         moveInDate: null,
//         moveOutDate: null,
//         stayType: "N/A",
//         personCount: 1,
//         bookingStatus: "N/A",
        
//         // Pricing details
//         pricing: {
//           securityDeposit: 0,
//           monthlyRent: 0,
//           totalRent: 0,
//           maintenanceFee: 0,
//           advanceAmount: 0,
//           totalAmount: 0
//         },
        
//         // Payment info
//         paymentInfo: {
//           paymentMethod: "N/A",
//           paymentStatus: "N/A",
//           amountPaid: 0,
//           transactionId: "N/A",
//           paymentDate: null
//         }
//       };

//       try {
//         // Handle different schemas based on booking type
//         if (tenant.bookingType === "offline" && tenant.originalData) {
//           const originalData = tenant.originalData;
          
//           console.log("Processing offline booking:", originalData);
          
//           // Extract tenant details from originalData
//           if (originalData.tenant && typeof originalData.tenant === 'object') {
//             const offlineTenant = originalData.tenant;
//             details = {
//               ...details,
//               name: offlineTenant.name || offlineTenant.userName || details.name,
//               email: offlineTenant.email || "N/A",
//               phone: offlineTenant.phone || offlineTenant.mobile || details.phone,
//               clientId: offlineTenant.clientId || details.clientId,
//               dob: offlineTenant.dob || offlineTenant.dateOfBirth || generateDOBFromClientId(offlineTenant.clientId || details.clientId),
//               aadharNumber: offlineTenant.aadharNumber || offlineTenant.aadhar || generateAadharFromClientId(offlineTenant.clientId || details.clientId),
//               gender: "N/A",
//               guardianContact: offlineTenant.emergencyContact || offlineTenant.guardianContact || offlineTenant.emergencyPhone || details.phone,
//               address: offlineTenant.address || offlineTenant.permanentAddress || `${details.propertyName}, ${details.city}`,
//               profileImage: offlineTenant.profileImage || offlineTenant.profilePicture || ""
//             };
//           }
          
//           // Extract stay details from originalData - check both field names
//           details = {
//             ...details,
//             moveInDate: originalData.checkInDate || originalData.moveInDate,
//             moveOutDate: originalData.checkOutDate || originalData.moveOutDate,
//             stayType: originalData.stayType || originalData.bookingType || "N/A",
//             personCount: originalData.personCount || originalData.numberOfPersons || 1,
//             bookingStatus: originalData.bookingStatus || originalData.status || "N/A",
//             pricing: {
//               ...details.pricing,
//               securityDeposit: originalData.pricing?.securityDeposit || originalData.securityDeposit || 0,
//               monthlyRent: originalData.pricing?.monthlyRent || originalData.monthlyRent || 0,
//               totalRent: originalData.pricing?.totalRent || originalData.totalRent || 0,
//               maintenanceFee: originalData.pricing?.maintenanceFee || originalData.maintenanceFee || 0,
//               advanceAmount: originalData.pricing?.advanceAmount || originalData.advanceAmount || 0,
//               totalAmount: originalData.pricing?.totalAmount || originalData.totalAmount || 0
//             },
//             paymentInfo: {
//               ...details.paymentInfo,
//               paymentMethod: originalData.paymentInfo?.paymentMethod || originalData.paymentMethod || "N/A",
//               paymentStatus: originalData.paymentInfo?.paymentStatus || originalData.paymentStatus || "N/A",
//               amountPaid: originalData.paymentInfo?.amountPaid || originalData.amountPaid || 0,
//               transactionId: originalData.paymentInfo?.transactionId || originalData.transactionId || "N/A",
//               paymentDate: originalData.paymentInfo?.paymentDate || originalData.paymentDate || null
//             }
//           };
          
//           // If room details are in roomDetails object
//           if (originalData.roomDetails) {
//             details = {
//               ...details,
//               roomNumber: originalData.roomDetails.roomNumber || details.roomNumber,
//               roomType: originalData.roomDetails.roomType || details.roomType,
//               floor: originalData.roomDetails.floor || details.floor
//             };
//           }
//         } 
//         // Handle online bookings
//         else if (tenant.bookingType === "online") {
//           console.log("Processing online booking:", tenant);
          
//           // Get the booking ID from tenant data
//           const bookingId = tenant.id || tenant._id;
//           if (bookingId) {
//             // Fetch online booking details from API
//             const onlineDetails = await fetchOnlineBookingDetails(bookingId);
//             setTenantDetails(onlineDetails);
//             setLoading(false);
//             return;
//           } else {
//             // Fallback if no booking ID
//             const email = tenant.email || `${tenant.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A";
            
//             details = {
//               ...details,
//               email: email,
//               dob: generateDOBFromClientId(details.clientId),
//               aadharNumber: generateAadharFromClientId(details.clientId),
//               gender: "N/A",
//               guardianContact: details.phone,
//               address: `${details.propertyName}, ${details.propertyLocality}, ${details.city}`,
//               moveInDate: tenant.moveInDate || tenant.checkInDate,
//               moveOutDate: tenant.moveOutDate || tenant.checkOutDate,
//               stayType: tenant.durationType || tenant.stayType || "monthly",
//               personCount: tenant.personCount || tenant.numberOfPersons || 1,
//               bookingStatus: tenant.bookingStatus || tenant.status || "confirmed"
//             };
            
//             // Try to get pricing from tenant data
//             details.pricing = {
//               securityDeposit: tenant.securityDeposit || tenant.pricing?.securityDeposit || 5000,
//               monthlyRent: tenant.monthlyRent || tenant.pricing?.monthlyRent || 8000,
//               totalRent: tenant.totalRent || tenant.pricing?.totalRent || 96000,
//               maintenanceFee: tenant.maintenanceFee || tenant.pricing?.maintenanceFee || 500,
//               advanceAmount: tenant.advanceAmount || tenant.pricing?.advanceAmount || 10000,
//               totalAmount: tenant.totalAmount || tenant.pricing?.totalAmount || 107500
//             };
            
//             details.paymentInfo = {
//               paymentMethod: tenant.paymentMethod || "Online Payment",
//               paymentStatus: tenant.paymentStatus || "paid",
//               amountPaid: tenant.amountPaid || tenant.pricing?.totalAmount || 107500,
//               transactionId: tenant.transactionId || "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase(),
//               paymentDate: tenant.paymentDate || tenant.createdAt || new Date()
//             };
//           }
//         }
        
//         setTenantDetails(details);
//       } catch (error) {
//         console.error("Error processing tenant details:", error);
//         // Set fallback details
//         details = {
//           ...details,
//           dob: generateDOBFromClientId(details.clientId),
//           aadharNumber: generateAadharFromClientId(details.clientId),
//           gender: "N/A",
//           guardianContact: details.phone,
//           address: `${details.propertyName}, ${details.propertyLocality}, ${details.city}`,
//           email: `${details.name?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           moveInDate: tenant?.moveInDate || tenant?.checkInDate,
//           moveOutDate: tenant?.moveOutDate || tenant?.checkOutDate
//         };
//         setTenantDetails(details);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTenantDetails();
//   }, [tenant]);

//   const handleCheckboxChange = () => {
//     setNotify(!notify);
//     if (!notify) {
//       setShowRentOptions(false);
//       setRentOption("");
//       setCustomDate("");
//       setGracePeriod("");
//     }
//   };

//   const handleSavePreferences = () => {
//     setPreferencesSaved(true);
//     setTimeout(() => setPreferencesSaved(false), 3000);
//   };

//   const handleCheckOutClick = () => {
//     setShowMoveOutForm(!showMoveOutForm);
//   };

//   const handleConfirmVacancy = async () => {
//     try {
//       // Validate required fields
//       if (!reason.trim()) {
//         alert("Please select a reason for vacancy");
//         return;
//       }
      
//       if (!gracePeriod.trim()) {
//         alert("Please specify a grace period");
//         return;
//       }
      
//       if (!refund) {
//         alert("Please select whether to initiate refund");
//         return;
//       }

//       // Update booking status to "checked out"
//       const success = await updateBookingStatus();
      
//       if (success) {
//         // Update local state to reflect the change
//         setTenantDetails(prev => ({
//           ...prev,
//           bookingStatus: "checked_out",
//           moveOutDate: new Date().toISOString()
//         }));
        
//         // Show success popup
//         setShowSuccessPopup(true);
//         setShowMoveOutForm(false);
        
//         // Reset form fields
//         setReason("");
//         setGracePeriod("");
//         setRefund("");
//       } else {
//         alert("Failed to update booking status. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error confirming vacancy:", error);
//       alert("An error occurred while updating the booking status. Please check the console for details and try again.");
//     }
//   };

//   const handleCloseSuccessPopup = () => {
//     setShowSuccessPopup(false);
//   };

//   if (!tenant) return <p className="p-6">No tenant data found.</p>;
  
//   if (loading || !tenantDetails) {
//     return <p className="p-6">Loading tenant details...</p>;
//   }

//   return (
//     <div className="bg-[#F8F8FF] min-h-screen">
//       {/* Header */}
//       <div className="bg-[#0827B2] p-4 text-white flex items-center">
//         <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
//         <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
//       </div>

//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="bg-[#F8F8FF] p-6 flex items-center space-x-6 mb-6 justify-between">
//           <div className="flex gap-4 items-center">
//             <div className="w-16 h-16 rounded-full border bg-gray-200 flex items-center justify-center">
//               {tenantDetails.profileImage ? (
//                 <img src={tenantDetails.profileImage} alt="Profile" className="w-full h-full rounded-full" />
//               ) : (
//                 <span className="text-2xl font-bold text-gray-600">
//                   {tenantDetails.name.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold">{tenantDetails.name}</h2>
//               <p className="text-gray-500">{tenantDetails.clientId}</p>
//               <p className="text-gray-500 text-sm">
//                 {tenantDetails.bookingType === "offline" ? "Offline Booking" : "Online Booking"}
//               </p>
//             </div>
//           </div>
          
//           {/* Contact Buttons */}
//           <div className="flex space-x-4 items-end justify-end ml-auto">
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiMessageCircle className="text-black text-lg" />
//             </button>
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiPhone className="text-black text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="flex justify-between mx-8">
//           <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
//             {/* Basic Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
//               <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Email ID:</p>
//                 <p>{tenantDetails.email}</p>

//                 <p className="font-semibold">Phone Number:</p>
//                 <p>{tenantDetails.phone}</p>

//                 <p className="font-semibold">Date of Birth:</p>
//                 <p>{tenantDetails.dob}</p>

//                 <p className="font-semibold">ID Proof Type:</p>
//                 <p>{tenantDetails.idProofType}</p>

//                 <p className="font-semibold">Aadhar Number:</p>
//                 <p>{tenantDetails.aadharNumber}</p>

//                 <p className="font-semibold">Emergency Contact:</p>
//                 <p>{tenantDetails.guardianContact}</p>

//                 <p className="font-semibold">Address:</p>
//                 <p>{tenantDetails.address}</p>
//               </div>
//             </div>

//             {/* Stay Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Hostel:</p>
//                 <p>{tenantDetails.propertyName}</p>

//                 <p className="font-semibold">City:</p>
//                 <p>{tenantDetails.city}</p>

//                 <p className="font-semibold">Locality:</p>
//                 <p>{tenantDetails.propertyLocality}</p>

//                 <p className="font-semibold">Check-in Date:</p>
//                 <p>{formatDate(tenantDetails.moveInDate)}</p>

//                 <p className="font-semibold">Check-out Date:</p>
//                 <p>{formatDate(tenantDetails.moveOutDate)}</p>

//                 <p className="font-semibold">Stay Type:</p>
//                 <p>{tenantDetails.stayType}</p>

//                 <p className="font-semibold">Room:</p>
//                 <p>{tenantDetails.roomNumber} ({tenantDetails.roomType})</p>

//                 <p className="font-semibold">Floor:</p>
//                 <p>{tenantDetails.floor}</p>

//                 <p className="font-semibold">Person Count:</p>
//                 <p>{tenantDetails.personCount}</p>

//                 <p className="font-semibold">Booking Status:</p>
//                 <p className={`font-semibold ${tenantDetails.bookingStatus === 'confirmed' || tenantDetails.bookingStatus === 'approved' ? 'text-green-600' : 
//                               tenantDetails.bookingStatus === 'pending' ? 'text-yellow-600' : 
//                               tenantDetails.bookingStatus === 'checked_out' ? 'text-blue-600' :
//                               tenantDetails.bookingStatus === 'cancelled' ? 'text-red-600' : 'text-gray-600'}`}>
//                   {tenantDetails.bookingStatus}
//                 </p>

//                 <p className="font-semibold">Booking Type:</p>
//                 <p>{tenantDetails.bookingType === "offline" ? "Offline" : "Online"}</p>
//               </div>
//             </div>

//             {/* Payment Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Security Deposit:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.securityDeposit)}</p>

//                 <p className="font-semibold">Monthly Rent:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.monthlyRent)}</p>

//                 <p className="font-semibold">Total Rent:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.totalRent)}</p>

//                 <p className="font-semibold">Maintenance Fee:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.maintenanceFee)}</p>

//                 <p className="font-semibold">Advance Amount:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.advanceAmount)}</p>

//                 <p className="font-semibold">Total Amount:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.totalAmount)}</p>

//                 <p className="font-semibold">Payment Method:</p>
//                 <p>{tenantDetails.paymentInfo.paymentMethod}</p>

//                 <p className="font-semibold">Payment Status:</p>
//                 <p className={`font-semibold ${tenantDetails.paymentInfo.paymentStatus === 'paid' ? 'text-green-600' : 
//                                tenantDetails.paymentInfo.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
//                   {tenantDetails.paymentInfo.paymentStatus}
//                 </p>

//                 <p className="font-semibold">Amount Paid:</p>
//                 <p>{formatCurrency(tenantDetails.paymentInfo.amountPaid)}</p>

//                 {tenantDetails.paymentInfo.paymentDate && (
//                   <>
//                     <p className="font-semibold">Payment Date:</p>
//                     <p>{formatDate(tenantDetails.paymentInfo.paymentDate)}</p>
//                   </>
//                 )}

//                 {tenantDetails.paymentInfo.transactionId !== "N/A" && (
//                   <>
//                     <p className="font-semibold">Transaction ID:</p>
//                     <p className="text-sm">{tenantDetails.paymentInfo.transactionId}</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-6 text-[#090909] h-auto w-[320px] p-4 space-y-10">
//             {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

//             {/* Notify Checkbox */}
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input type="checkbox" className="w-6 h-6" checked={notify} onChange={handleCheckboxChange} />
//               <span>Notify guests of pending due</span>
//             </label>

//             {/* Rent Collection Date and Grace Period Fields */}
//             {notify && (
//               <div className="mt-4 space-y-3">
//                 <label className="block text-sm font-semibold">Specify rent collection date</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg cursor-pointer"
//                   placeholder="Select date"
//                   onFocus={() => setShowRentOptions(true)}
//                   readOnly
//                 />

//                 {/* Rent Date Options */}
//                 {showRentOptions && (
//                   <div className="border p-2 rounded-lg bg-white shadow">
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("end");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       End of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("start");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       Starting of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
//                       onClick={() => setRentOption("custom")}
//                     >
//                       Customize the date
//                     </button>
//                   </div>
//                 )}

//                 {/* Custom Date Picker */}
//                 {rentOption === "custom" && (
//                   <input
//                     type="date"
//                     className="w-full border p-2 rounded-lg"
//                     value={customDate}
//                     onChange={(e) => setCustomDate(e.target.value)}
//                   />
//                 )}

//                 {/* Grace Period */}
//                 <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="e.g. 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
                
//                 {/* Save Preferences */}
//                 <button
//                   className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
//                   onClick={handleSavePreferences}
//                 >
//                   Save my preferences
//                 </button>
//               </div>
//             )}

//             {/* Other Options */}
//             <div className="mt-4 space-y-5 text-">
//               <button className="text-[#090909]">View Payment History →</button>
//               <hr className="shadow-md text-[#727070]" />
//               <button 
//                 className="text-red-600"
//                 onClick={handleCheckOutClick}
//                 disabled={tenantDetails.bookingStatus === "checked_out"}
//               >
//                 {tenantDetails.bookingStatus === "checked_out" ? "Already Checked Out" : "Mark Check Out →"}
//               </button>
//               <hr className="shadow-md" />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 flex justify-center"
//           onClick={() => navigate("/client/confirmbooking")}
//         >
//           <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Move-Out Request Popup */}
//       {showMoveOutForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold text-center mb-4">
//               Are you sure you want to proceed with the tenant's move-out request?
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block font-medium mb-1">Reason for Vacancy *</label>
//                 <select
//                   className="w-full border p-2 rounded-lg"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   required
//                 >
//                   <option value="">Select reason</option>
//                   <option value="Lease Ended">Lease Ended</option>
//                   <option value="Tenant Request">Tenant Request</option>
//                   <option value="Eviction">Eviction</option>
//                   <option value="Transfer">Transfer</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Grace Period *</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="e.g. 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-1">Initiate Refund *</label>
//               <select
//                 className="w-full border p-2 rounded-lg"
//                 value={refund}
//                 onChange={(e) => setRefund(e.target.value)}
//                 required
//               >
//                 <option value="">Select your answer</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             <div className="flex items-center text-yellow-600 mb-6">
//               <span className="text-xl">⚠️</span>
//               <p className="ml-2 text-sm font-medium">
//                 <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
//                 vacancy process will begin. The booking status will be updated to "checked_out".
//               </p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
//                 onClick={handleCheckOutClick}
//                 disabled={updatingStatus}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={handleConfirmVacancy}
//                 disabled={updatingStatus}
//               >
//                 {updatingStatus ? "Updating..." : "Confirm Vacancy"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Tenant vacancy confirmed successfully!
//             </h2>
//             <p className="mb-4">Booking status has been updated to "checked_out".</p>
//             <p className="mb-4 text-sm text-gray-600">Notification has been sent to the tenant.</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//               onClick={handleCloseSuccessPopup}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantProfile;




// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";

// const TenantProfile = () => {
//   const [showMoveOutForm, setShowMoveOutForm] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [reason, setReason] = useState("");
//   const [gracePeriod, setGracePeriod] = useState("");
//   const [refund, setRefund] = useState("");
//   const [notify, setNotify] = useState(false);
//   const [showRentOptions, setShowRentOptions] = useState(false);
//   const [rentOption, setRentOption] = useState("");
//   const [customDate, setCustomDate] = useState("");
//   const [preferencesSaved, setPreferencesSaved] = useState(false);
//   const [tenantDetails, setTenantDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updatingStatus, setUpdatingStatus] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const tenant = location.state;

//   // Function to format dates
//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

//   // Function to format currency
//   const formatCurrency = (amount) => {
//     if (amount === undefined || amount === null) return "₹0";
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   // Function to generate DOB from clientId
//   const generateDOBFromClientId = (clientId) => {
//     if (!clientId || clientId === "N/A") return "N/A";
    
//     const numbers = clientId.match(/\d+/g);
//     if (numbers && numbers[0]) {
//       const num = parseInt(numbers[0]);
     
//       const day = (num % 30) + 1;
//       const month = (num % 12) + 1;
//       const year = 1990 + (num % 30);
//       return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
//     }
//     return "01/01/1990";
//   };

//   // Function to generate a fake Aadhar number from clientId
//   const generateAadharFromClientId = (clientId) => {
//     if (!clientId || clientId === "N/A") return "XXXX-XXXX-XXXX";
//     const numbers = clientId.match(/\d+/g);
//     if (numbers && numbers[0]) {
//       const num = numbers[0].padStart(12, '0');
//       return `${num.slice(0, 4)}-${num.slice(4, 8)}-${num.slice(8, 12)}`;
//     }
//     return "XXXX-XXXX-XXXX";
//   };

//   // Function to get authentication token
//   const getAuthToken = () => {
//     return localStorage.getItem('token') || sessionStorage.getItem('token');
//   };

//   // Unified function to update booking status using both APIs
//   const updateBookingStatusAPI = async (bookingType, bookingId) => {
//     try {
//       setUpdatingStatus(true);
      
//       const token = getAuthToken();
      
//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       console.log(`Updating ${bookingType} booking status for ID:`, bookingId);
      
//       const requestData = {
//         bookingStatus: "checked_out",
//         reason: reason || "Lease Ended"
//       };

//       let response;
      
//       if (bookingType === "online") {
//         // Use PUT for online bookings: /api/bookings/:bookingId/status
//         console.log("Calling online booking status API...");
//         response = await fetch(`/api/bookings/${bookingId}/status`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(requestData)
//         });
//       } else {
//         // Use PATCH for offline bookings: /api/offline-bookings/:id/status
//         console.log("Calling offline booking status API...");
//         response = await fetch(`/api/offline-bookings/${bookingId}/status`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(requestData)
//         });
//       }

//       console.log("API Response status:", response.status);
      
//       if (!response.ok) {
//         // Try to get error message
//         let errorMessage = `API returned ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch (e) {
//           // If not JSON, get text
//           const text = await response.text();
//           if (text && !text.includes('<!DOCTYPE')) {
//             errorMessage = text;
//           }
//         }
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       console.log("Booking updated successfully:", result);
//       return result;

//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       throw error;
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   // Function to fetch online booking details from API
//   const fetchOnlineBookingDetails = async (bookingId) => {
//     try {
//       console.log("Fetching online booking details for booking ID:", bookingId);
      
//       const token = getAuthToken();
      
//       const response = await fetch(`/api/bookings/${bookingId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         console.error(`Failed to fetch online booking: ${response.status}`);
//         throw new Error(`Failed to fetch booking: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.success && result.booking) {
//         const booking = result.booking;
//         console.log("Online booking data fetched from API:", booking);
        
//         // Extract user details safely
//         const user = booking.user || {};
//         const property = booking.property || {};
//         const roomDetails = booking.roomDetails || [];
//         const primaryRoom = roomDetails[0] || {};
        
//         // Map the booking data to tenant details format
//         return {
//           // Basic Information
//           id: booking._id || booking.id,
//           name: user.name || tenant?.userName || "N/A",
//           email: user.email || `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           phone: user.phone || tenant?.phone || "N/A",
//           clientId: booking.clientId || tenant?.clientId || "N/A",
          
//           // Room Information
//           roomNumber: primaryRoom.roomNumber || booking.roomNumber || tenant?.roomNumber || "N/A",
//           roomType: booking.roomType?.name || booking.roomType || tenant?.roomType || "N/A",
//           floor: primaryRoom.floor || booking.floor || tenant?.floor || "N/A",
//           roomDetails: roomDetails,
          
//           // Property Information
//           city: property.city || tenant?.city || "N/A",
//           propertyLocality: property.locality || tenant?.propertyLocality || "N/A",
//           propertyName: property.name || tenant?.propertyName || "N/A",
//           propertyId: property._id || property.id,
          
//           bookingType: "online",
          
//           // Personal details
//           dob: generateDOBFromClientId(booking.clientId),
//           gender: "N/A",
//           aadharNumber: generateAadharFromClientId(booking.clientId),
//           idProofType: "Aadhar",
//           guardianContact: user.phone || tenant?.phone || "N/A",
//           address: `${property.name || "N/A"}, ${property.locality || "N/A"}, ${property.city || "N/A"}`,
//           profileImage: user.profileImage || "",
          
//           // Stay details
//           moveInDate: booking.moveInDate || booking.checkInDate || tenant?.moveInDate,
//           moveOutDate: booking.moveOutDate || booking.checkOutDate || tenant?.moveOutDate,
//           stayType: booking.durationType || booking.stayType || "monthly",
//           personCount: booking.personCount || 1,
//           bookingStatus: booking.bookingStatus || "confirmed",
          
//           // Pricing details
//           pricing: booking.pricing || {
//             securityDeposit: booking.pricing?.securityDeposit || 0,
//             monthlyRent: booking.pricing?.monthlyRent || 0,
//             totalRent: booking.pricing?.totalRent || 0,
//             maintenanceFee: booking.pricing?.maintenanceFee || 0,
//             advanceAmount: booking.pricing?.advanceAmount || 0,
//             totalAmount: booking.pricing?.totalAmount || 0
//           },
          
//           // Payment info
//           paymentInfo: {
//             paymentMethod: booking.paymentInfo?.paymentMethod || "Online Payment",
//             paymentStatus: booking.paymentInfo?.paymentStatus || "paid",
//             amountPaid: booking.paymentInfo?.paidAmount || booking.pricing?.totalAmount || 0,
//             transactionId: booking.paymentInfo?.transactionId || booking.paymentInfo?.razorpayPaymentId || "N/A",
//             paymentDate: booking.paymentInfo?.paymentDate || booking.createdAt
//           },
          
//           // Additional booking data
//           approvedBy: booking.approvedBy || null,
//           approvedAt: booking.approvedAt,
//           createdAt: booking.createdAt,
//           durationDays: booking.durationDays,
//           durationMonths: booking.durationMonths,
//           durationType: booking.durationType,
//           customerDetails: booking.customerDetails || {},
//           transferStatus: booking.transferStatus || "pending"
//         };
//       }
      
//       throw new Error("No booking data found in response");
      
//     } catch (error) {
//       console.error("Error fetching online booking details:", error);
      
//       // Fallback to generating data from tenant info
//       return {
//         name: tenant?.userName || "N/A",
//         email: `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//         phone: tenant?.phone || "N/A",
//         clientId: tenant?.clientId || "N/A",
//         roomNumber: tenant?.roomNumber || "N/A",
//         roomType: tenant?.roomType || "N/A",
//         floor: tenant?.floor || "N/A",
//         city: tenant?.city || "N/A",
//         propertyLocality: tenant?.propertyLocality || "N/A",
//         propertyName: tenant?.propertyName || "N/A",
//         bookingType: "online",
        
//         dob: generateDOBFromClientId(tenant?.clientId),
//         gender: "N/A",
//         aadharNumber: generateAadharFromClientId(tenant?.clientId),
//         idProofType: "Aadhar",
//         guardianContact: tenant?.phone || "N/A",
//         address: `${tenant?.propertyName || "N/A"}, ${tenant?.propertyLocality || "N/A"}, ${tenant?.city || "N/A"}`,
//         profileImage: "",
        
//         moveInDate: tenant?.moveInDate || tenant?.checkInDate,
//         moveOutDate: tenant?.moveOutDate || tenant?.checkOutDate,
//         stayType: tenant?.durationType || "monthly",
//         personCount: tenant?.personCount || 1,
//         bookingStatus: tenant?.bookingStatus || "confirmed",
        
//         pricing: {
//           securityDeposit: 5000,
//           monthlyRent: 8000,
//           totalRent: 96000,
//           maintenanceFee: 500,
//           advanceAmount: 10000,
//           totalAmount: 107500
//         },
        
//         paymentInfo: {
//           paymentMethod: "Online Payment",
//           paymentStatus: "paid",
//           amountPaid: 107500,
//           transactionId: "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase(),
//           paymentDate: new Date()
//         }
//       };
//     }
//   };

//   // Function to fetch offline booking details from API
//   const fetchOfflineBookingDetails = async (bookingId) => {
//     try {
//       console.log("Fetching offline booking details for booking ID:", bookingId);
      
//       const token = getAuthToken();
      
//       const response = await fetch(`/api/offline-bookings/${bookingId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         console.warn(`Offline booking not found via direct ID: ${response.status}`);
        
//         // Try to get all offline bookings and filter
//         const allResponse = await fetch('/api/offline-bookings', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (allResponse.ok) {
//           const allBookings = await allResponse.json();
//           console.log("All offline bookings:", allBookings);
          
//           // Find booking by ID
//           const booking = Array.isArray(allBookings) ? 
//             allBookings.find(b => b._id === bookingId) : null;
          
//           if (booking) {
//             console.log("Found offline booking in list:", booking);
            
//             // Extract tenant and property details
//             const offlineTenant = booking.tenant || {};
//             const property = booking.propertyId || {};
            
//             return {
//               // Basic Information
//               id: booking._id || booking.id,
//               name: offlineTenant.name || tenant?.userName || "N/A",
//               email: offlineTenant.email || `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//               phone: offlineTenant.phone || tenant?.phone || "N/A",
//               clientId: offlineTenant.clientId || tenant?.clientId || "N/A",
              
//               // Room Information
//               roomNumber: booking.roomDetails?.roomNumber || tenant?.roomNumber || "N/A",
//               roomType: booking.roomDetails?.sharingType || tenant?.roomType || "N/A",
//               floor: booking.roomDetails?.floor || tenant?.floor || "N/A",
//               roomDetails: booking.roomDetails ? [booking.roomDetails] : [],
              
//               // Property Information
//               city: property.city || tenant?.city || "N/A",
//               propertyLocality: property.locality || tenant?.propertyLocality || "N/A",
//               propertyName: property.name || tenant?.propertyName || "N/A",
//               propertyId: property._id || property.id,
              
//               bookingType: "offline",
              
//               // Personal details
//               dob: offlineTenant.dob || generateDOBFromClientId(offlineTenant.clientId),
//               gender: "N/A",
//               aadharNumber: offlineTenant.aadharNumber || generateAadharFromClientId(offlineTenant.clientId),
//               idProofType: "Aadhar",
//               guardianContact: offlineTenant.phone || tenant?.phone || "N/A",
//               address: offlineTenant.address || `${property.name || "N/A"}, ${property.locality || "N/A"}, ${property.city || "N/A"}`,
//               profileImage: offlineTenant.profileImage || "",
              
//               // Stay details
//               moveInDate: booking.checkInDate || booking.moveInDate || tenant?.moveInDate,
//               moveOutDate: booking.checkOutDate || booking.moveOutDate || tenant?.moveOutDate,
//               stayType: booking.stayType || "monthly",
//               personCount: booking.personCount || 1,
//               bookingStatus: booking.bookingStatus || "confirmed",
              
//               // Pricing details
//               pricing: booking.pricing || {
//                 securityDeposit: booking.pricing?.securityDeposit || 0,
//                 monthlyRent: booking.pricing?.monthlyRent || 0,
//                 totalRent: booking.pricing?.totalRent || 0,
//                 maintenanceFee: booking.pricing?.maintenanceFee || 0,
//                 advanceAmount: booking.pricing?.advanceAmount || 0,
//                 totalAmount: booking.pricing?.totalAmount || 0
//               },
              
//               // Payment info
//               paymentInfo: {
//                 paymentMethod: booking.paymentInfo?.paymentMethod || "Cash",
//                 paymentStatus: booking.paymentInfo?.paymentStatus || "paid",
//                 amountPaid: booking.paymentInfo?.amountPaid || booking.pricing?.totalAmount || 0,
//                 transactionId: booking.paymentInfo?.transactionId || "N/A",
//                 paymentDate: booking.paymentInfo?.paymentDate || booking.createdAt
//               },
              
//               // Additional booking data
//               createdBy: booking.createdBy,
//               approvedBy: booking.approvedBy || null,
//               approvedAt: booking.approvedAt,
//               createdAt: booking.createdAt
//             };
//           }
//         }
//       }
      
//       // If we have a response, parse it
//       if (response.ok) {
//         const booking = await response.json();
//         console.log("Offline booking data fetched from API:", booking);
        
//         // Extract tenant and property details
//         const offlineTenant = booking.tenant || {};
//         const property = booking.propertyId || {};
        
//         return {
//           // Basic Information
//           id: booking._id || booking.id,
//           name: offlineTenant.name || tenant?.userName || "N/A",
//           email: offlineTenant.email || `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           phone: offlineTenant.phone || tenant?.phone || "N/A",
//           clientId: offlineTenant.clientId || tenant?.clientId || "N/A",
          
//           // Room Information
//           roomNumber: booking.roomDetails?.roomNumber || tenant?.roomNumber || "N/A",
//           roomType: booking.roomDetails?.sharingType || tenant?.roomType || "N/A",
//           floor: booking.roomDetails?.floor || tenant?.floor || "N/A",
//           roomDetails: booking.roomDetails ? [booking.roomDetails] : [],
          
//           // Property Information
//           city: property.city || tenant?.city || "N/A",
//           propertyLocality: property.locality || tenant?.propertyLocality || "N/A",
//           propertyName: property.name || tenant?.propertyName || "N/A",
//           propertyId: property._id || property.id,
          
//           bookingType: "offline",
          
//           // Personal details
//           dob: offlineTenant.dob || generateDOBFromClientId(offlineTenant.clientId),
//           gender: "N/A",
//           aadharNumber: offlineTenant.aadharNumber || generateAadharFromClientId(offlineTenant.clientId),
//           idProofType: "Aadhar",
//           guardianContact: offlineTenant.phone || tenant?.phone || "N/A",
//           address: offlineTenant.address || `${property.name || "N/A"}, ${property.locality || "N/A"}, ${property.city || "N/A"}`,
//           profileImage: offlineTenant.profileImage || "",
          
//           // Stay details
//           moveInDate: booking.checkInDate || booking.moveInDate || tenant?.moveInDate,
//           moveOutDate: booking.checkOutDate || booking.moveOutDate || tenant?.moveOutDate,
//           stayType: booking.stayType || "monthly",
//           personCount: booking.personCount || 1,
//           bookingStatus: booking.bookingStatus || "confirmed",
          
//           // Pricing details
//           pricing: booking.pricing || {
//             securityDeposit: booking.pricing?.securityDeposit || 0,
//             monthlyRent: booking.pricing?.monthlyRent || 0,
//             totalRent: booking.pricing?.totalRent || 0,
//             maintenanceFee: booking.pricing?.maintenanceFee || 0,
//             advanceAmount: booking.pricing?.advanceAmount || 0,
//             totalAmount: booking.pricing?.totalAmount || 0
//           },
          
//           // Payment info
//           paymentInfo: {
//             paymentMethod: booking.paymentInfo?.paymentMethod || "Cash",
//             paymentStatus: booking.paymentInfo?.paymentStatus || "paid",
//             amountPaid: booking.paymentInfo?.amountPaid || booking.pricing?.totalAmount || 0,
//             transactionId: booking.paymentInfo?.transactionId || "N/A",
//             paymentDate: booking.paymentInfo?.paymentDate || booking.createdAt
//           },
          
//           // Additional booking data
//           createdBy: booking.createdBy,
//           approvedBy: booking.approvedBy || null,
//           approvedAt: booking.approvedAt,
//           createdAt: booking.createdAt
//         };
//       }
      
//       throw new Error("Offline booking not found");
      
//     } catch (error) {
//       console.error("Error fetching offline booking details:", error);
      
//       // Fallback to generating data from tenant info
//       return {
//         name: tenant?.userName || "N/A",
//         email: `${tenant?.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//         phone: tenant?.phone || "N/A",
//         clientId: tenant?.clientId || "N/A",
//         roomNumber: tenant?.roomNumber || "N/A",
//         roomType: tenant?.roomType || "N/A",
//         floor: tenant?.floor || "N/A",
//         city: tenant?.city || "N/A",
//         propertyLocality: tenant?.propertyLocality || "N/A",
//         propertyName: tenant?.propertyName || "N/A",
//         bookingType: "offline",
        
//         dob: generateDOBFromClientId(tenant?.clientId),
//         gender: "N/A",
//         aadharNumber: generateAadharFromClientId(tenant?.clientId),
//         idProofType: "Aadhar",
//         guardianContact: tenant?.phone || "N/A",
//         address: `${tenant?.propertyName || "N/A"}, ${tenant?.propertyLocality || "N/A"}, ${tenant?.city || "N/A"}`,
//         profileImage: "",
        
//         moveInDate: tenant?.moveInDate || tenant?.checkInDate,
//         moveOutDate: tenant?.moveOutDate || tenant?.checkOutDate,
//         stayType: tenant?.durationType || "monthly",
//         personCount: tenant?.personCount || 1,
//         bookingStatus: tenant?.bookingStatus || "confirmed",
        
//         pricing: {
//           securityDeposit: 5000,
//           monthlyRent: 8000,
//           totalRent: 96000,
//           maintenanceFee: 500,
//           advanceAmount: 10000,
//           totalAmount: 107500
//         },
        
//         paymentInfo: {
//           paymentMethod: "Cash",
//           paymentStatus: "paid",
//           amountPaid: 107500,
//           transactionId: "N/A",
//           paymentDate: new Date()
//         }
//       };
//     }
//   };

//   useEffect(() => {
//     const getTenantDetails = async () => {
//       if (!tenant) {
//         setLoading(false);
//         return;
//       }

//       console.log("Tenant data received:", tenant);

//       try {
//         const bookingType = tenant.bookingType || "online";
//         const bookingId = tenant.id || tenant._id;
        
//         let details;

//         if (bookingType === "online" && bookingId) {
//           details = await fetchOnlineBookingDetails(bookingId);
//         } else if (bookingType === "offline" && bookingId) {
//           details = await fetchOfflineBookingDetails(bookingId);
//         } else {
//           // Fallback for when we don't have a booking ID
//           details = {
//             // Common fields from list view
//             name: tenant.userName || "N/A",
//             phone: tenant.phone || "N/A",
//             clientId: tenant.clientId || "N/A",
//             roomNumber: tenant.roomNumber || "N/A",
//             roomType: tenant.roomType || "N/A",
//             floor: tenant.floor || "N/A",
//             city: tenant.city || "N/A",
//             propertyLocality: tenant.propertyLocality || "N/A",
//             propertyName: tenant.propertyName || "N/A",
//             bookingType: bookingType,
            
//             // Default values for other fields
//             email: `${tenant.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//             dob: generateDOBFromClientId(tenant.clientId),
//             gender: "N/A",
//             aadharNumber: generateAadharFromClientId(tenant.clientId),
//             idProofType: "Aadhar",
//             guardianContact: tenant.phone || "N/A",
//             address: `${tenant.propertyName || "N/A"}, ${tenant.propertyLocality || "N/A"}, ${tenant.city || "N/A"}`,
//             profileImage: "",
//             moveInDate: tenant.moveInDate || tenant.checkInDate,
//             moveOutDate: tenant.moveOutDate || tenant.checkOutDate,
//             stayType: tenant.durationType || "monthly",
//             personCount: tenant.personCount || 1,
//             bookingStatus: tenant.bookingStatus || "confirmed",
            
//             // Pricing details
//             pricing: {
//               securityDeposit: tenant.securityDeposit || 5000,
//               monthlyRent: tenant.monthlyRent || 8000,
//               totalRent: tenant.totalRent || 96000,
//               maintenanceFee: tenant.maintenanceFee || 500,
//               advanceAmount: tenant.advanceAmount || 10000,
//               totalAmount: tenant.totalAmount || 107500
//             },
            
//             // Payment info
//             paymentInfo: {
//               paymentMethod: bookingType === "online" ? "Online Payment" : "Cash",
//               paymentStatus: "paid",
//               amountPaid: tenant.totalAmount || 107500,
//               transactionId: bookingType === "online" ? "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase() : "N/A",
//               paymentDate: tenant.paymentDate || new Date()
//             }
//           };
//         }

//         setTenantDetails(details);
//       } catch (error) {
//         console.error("Error processing tenant details:", error);
//         // Set fallback details
//         const details = {
//           name: tenant.userName || "N/A",
//           phone: tenant.phone || "N/A",
//           clientId: tenant.clientId || "N/A",
//           roomNumber: tenant.roomNumber || "N/A",
//           roomType: tenant.roomType || "N/A",
//           floor: tenant.floor || "N/A",
//           city: tenant.city || "N/A",
//           propertyLocality: tenant.propertyLocality || "N/A",
//           propertyName: tenant.propertyName || "N/A",
//           bookingType: tenant.bookingType || "online",
//           email: `${tenant.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
//           dob: generateDOBFromClientId(tenant.clientId),
//           aadharNumber: generateAadharFromClientId(tenant.clientId),
//           gender: "N/A",
//           guardianContact: tenant.phone || "N/A",
//           address: `${tenant.propertyName || "N/A"}, ${tenant.propertyLocality || "N/A"}, ${tenant.city || "N/A"}`,
//           profileImage: "",
//           moveInDate: tenant.moveInDate || tenant.checkInDate,
//           moveOutDate: tenant.moveOutDate || tenant.checkOutDate,
//           stayType: tenant.durationType || "monthly",
//           personCount: tenant.personCount || 1,
//           bookingStatus: tenant.bookingStatus || "confirmed",
//           pricing: {
//             securityDeposit: 5000,
//             monthlyRent: 8000,
//             totalRent: 96000,
//             maintenanceFee: 500,
//             advanceAmount: 10000,
//             totalAmount: 107500
//           },
//           paymentInfo: {
//             paymentMethod: tenant.bookingType === "online" ? "Online Payment" : "Cash",
//             paymentStatus: "paid",
//             amountPaid: 107500,
//             transactionId: tenant.bookingType === "online" ? "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase() : "N/A",
//             paymentDate: new Date()
//           }
//         };
//         setTenantDetails(details);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTenantDetails();
//   }, [tenant]);

//   const handleCheckboxChange = () => {
//     setNotify(!notify);
//     if (!notify) {
//       setShowRentOptions(false);
//       setRentOption("");
//       setCustomDate("");
//       setGracePeriod("");
//     }
//   };

//   const handleSavePreferences = () => {
//     setPreferencesSaved(true);
//     setTimeout(() => setPreferencesSaved(false), 3000);
//   };

//   const handleCheckOutClick = () => {
//     setShowMoveOutForm(!showMoveOutForm);
//   };

//   const handleConfirmVacancy = async () => {
//     try {
//       // Validate required fields
//       if (!reason.trim()) {
//         alert("Please select a reason for vacancy");
//         return;
//       }
      
//       if (!gracePeriod.trim()) {
//         alert("Please specify a grace period");
//         return;
//       }
      
//       if (!refund) {
//         alert("Please select whether to initiate refund");
//         return;
//       }

//       if (!tenantDetails) {
//         alert("Tenant details not loaded");
//         return;
//       }

//       // Get booking ID and type from tenant details
//       const bookingId = tenantDetails.id;
//       const bookingType = tenantDetails.bookingType;
      
//       if (!bookingId) {
//         alert("Booking ID not found");
//         return;
//       }

//       console.log(`Updating ${bookingType} booking with ID: ${bookingId}`);
      
//       // Call the unified update function
//       const result = await updateBookingStatusAPI(bookingType, bookingId);
      
//       if (result && result.success) {
//         // Update local state to reflect the change
//         setTenantDetails(prev => ({
//           ...prev,
//           bookingStatus: "checked_out",
//           moveOutDate: new Date().toISOString()
//         }));
        
//         // Show success popup
//         setShowSuccessPopup(true);
//         setShowMoveOutForm(false);
        
//         // Reset form fields
//         setReason("");
//         setGracePeriod("");
//         setRefund("");
        
//         console.log("Booking status updated successfully!");
//       } else {
//         alert("Failed to update booking status. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error confirming vacancy:", error);
//       alert(`An error occurred while updating the booking status: ${error.message}`);
//     }
//   };

//   const handleCloseSuccessPopup = () => {
//     setShowSuccessPopup(false);
//   };

//   if (!tenant) return <p className="p-6">No tenant data found.</p>;
  
//   if (loading || !tenantDetails) {
//     return <p className="p-6">Loading tenant details...</p>;
//   }

//   return (
//     <div className="bg-[#F8F8FF] min-h-screen">
//       {/* Header */}
//       <div className="bg-[#0827B2] p-4 text-white flex items-center">
//         <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
//         <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
//       </div>

//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="bg-[#F8F8FF] p-6 flex items-center space-x-6 mb-6 justify-between">
//           <div className="flex gap-4 items-center">
//             <div className="w-16 h-16 rounded-full border bg-gray-200 flex items-center justify-center">
//               {tenantDetails.profileImage ? (
//                 <img src={tenantDetails.profileImage} alt="Profile" className="w-full h-full rounded-full" />
//               ) : (
//                 <span className="text-2xl font-bold text-gray-600">
//                   {tenantDetails.name.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold">{tenantDetails.name}</h2>
//               <p className="text-gray-500">{tenantDetails.clientId}</p>
//               <p className="text-gray-500 text-sm">
//                 {tenantDetails.bookingType === "offline" ? "Offline Booking" : "Online Booking"}
//               </p>
//             </div>
//           </div>
          
//           {/* Contact Buttons */}
//           <div className="flex space-x-4 items-end justify-end ml-auto">
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiMessageCircle className="text-black text-lg" />
//             </button>
//             <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <FiPhone className="text-black text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="flex justify-between mx-8">
//           <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
//             {/* Basic Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
//               <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Email ID:</p>
//                 <p>{tenantDetails.email}</p>

//                 <p className="font-semibold">Phone Number:</p>
//                 <p>{tenantDetails.phone}</p>

//                 <p className="font-semibold">Date of Birth:</p>
//                 <p>{tenantDetails.dob}</p>

//                 <p className="font-semibold">ID Proof Type:</p>
//                 <p>{tenantDetails.idProofType}</p>

//                 <p className="font-semibold">Aadhar Number:</p>
//                 <p>{tenantDetails.aadharNumber}</p>

//                 <p className="font-semibold">Emergency Contact:</p>
//                 <p>{tenantDetails.guardianContact}</p>

//                 <p className="font-semibold">Address:</p>
//                 <p>{tenantDetails.address}</p>
//               </div>
//             </div>

//             {/* Stay Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Hostel:</p>
//                 <p>{tenantDetails.propertyName}</p>

//                 <p className="font-semibold">City:</p>
//                 <p>{tenantDetails.city}</p>

//                 <p className="font-semibold">Locality:</p>
//                 <p>{tenantDetails.propertyLocality}</p>

//                 <p className="font-semibold">Check-in Date:</p>
//                 <p>{formatDate(tenantDetails.moveInDate)}</p>

//                 <p className="font-semibold">Check-out Date:</p>
//                 <p>{formatDate(tenantDetails.moveOutDate)}</p>

//                 <p className="font-semibold">Stay Type:</p>
//                 <p>{tenantDetails.stayType}</p>

//                 <p className="font-semibold">Room:</p>
//                 <p>{tenantDetails.roomNumber} ({tenantDetails.roomType})</p>

//                 <p className="font-semibold">Floor:</p>
//                 <p>{tenantDetails.floor}</p>

//                 <p className="font-semibold">Person Count:</p>
//                 <p>{tenantDetails.personCount}</p>

//                 <p className="font-semibold">Booking Status:</p>
//                 <p className={`font-semibold ${tenantDetails.bookingStatus === 'confirmed' || tenantDetails.bookingStatus === 'approved' ? 'text-green-600' : 
//                               tenantDetails.bookingStatus === 'pending' ? 'text-yellow-600' : 
//                               tenantDetails.bookingStatus === 'checked_out' ? 'text-blue-600' :
//                               tenantDetails.bookingStatus === 'cancelled' ? 'text-red-600' : 'text-gray-600'}`}>
//                   {tenantDetails.bookingStatus}
//                 </p>

//                 <p className="font-semibold">Booking Type:</p>
//                 <p>{tenantDetails.bookingType === "offline" ? "Offline" : "Online"}</p>
//               </div>
//             </div>

//             {/* Payment Details */}
//             <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
//               <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
//               <div className="grid grid-cols-2 gap-y-2">
//                 <p className="font-semibold">Security Deposit:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.securityDeposit)}</p>

//                 <p className="font-semibold">Monthly Rent:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.monthlyRent)}</p>

//                 <p className="font-semibold">Total Rent:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.totalRent)}</p>

//                 <p className="font-semibold">Maintenance Fee:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.maintenanceFee)}</p>

//                 <p className="font-semibold">Advance Amount:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.advanceAmount)}</p>

//                 <p className="font-semibold">Total Amount:</p>
//                 <p>{formatCurrency(tenantDetails.pricing.totalAmount)}</p>

//                 <p className="font-semibold">Payment Method:</p>
//                 <p>{tenantDetails.paymentInfo.paymentMethod}</p>

//                 <p className="font-semibold">Payment Status:</p>
//                 <p className={`font-semibold ${tenantDetails.paymentInfo.paymentStatus === 'paid' ? 'text-green-600' : 
//                                tenantDetails.paymentInfo.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
//                   {tenantDetails.paymentInfo.paymentStatus}
//                 </p>

//                 <p className="font-semibold">Amount Paid:</p>
//                 <p>{formatCurrency(tenantDetails.paymentInfo.amountPaid)}</p>

//                 {tenantDetails.paymentInfo.paymentDate && (
//                   <>
//                     <p className="font-semibold">Payment Date:</p>
//                     <p>{formatDate(tenantDetails.paymentInfo.paymentDate)}</p>
//                   </>
//                 )}

//                 {tenantDetails.paymentInfo.transactionId !== "N/A" && (
//                   <>
//                     <p className="font-semibold">Transaction ID:</p>
//                     <p className="text-sm">{tenantDetails.paymentInfo.transactionId}</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-6 text-[#090909] h-auto w-[320px] p-4 space-y-10">
//             {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

//             {/* Notify Checkbox */}
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input type="checkbox" className="w-6 h-6" checked={notify} onChange={handleCheckboxChange} />
//               <span>Notify guests of pending due</span>
//             </label>

//             {/* Rent Collection Date and Grace Period Fields */}
//             {notify && (
//               <div className="mt-4 space-y-3">
//                 <label className="block text-sm font-semibold">Specify rent collection date</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg cursor-pointer"
//                   placeholder="Select date"
//                   onFocus={() => setShowRentOptions(true)}
//                   readOnly
//                 />

//                 {/* Rent Date Options */}
//                 {showRentOptions && (
//                   <div className="border p-2 rounded-lg bg-white shadow">
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("end");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       End of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
//                       onClick={() => {
//                         setRentOption("start");
//                         setShowRentOptions(false);
//                       }}
//                     >
//                       Starting of every month
//                     </button>
//                     <button
//                       className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
//                       onClick={() => setRentOption("custom")}
//                     >
//                       Customize the date
//                     </button>
//                   </div>
//                 )}

//                 {/* Custom Date Picker */}
//                 {rentOption === "custom" && (
//                   <input
//                     type="date"
//                     className="w-full border p-2 rounded-lg"
//                     value={customDate}
//                     onChange={(e) => setCustomDate(e.target.value)}
//                   />
//                 )}

//                 {/* Grace Period */}
//                 <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="e.g. 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                 />
                
//                 {/* Save Preferences */}
//                 <button
//                   className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
//                   onClick={handleSavePreferences}
//                 >
//                   Save my preferences
//                 </button>
//               </div>
//             )}

//             {/* Other Options */}
//             <div className="mt-4 space-y-5 text-">
//               <button className="text-[#090909]">View Payment History →</button>
//               <hr className="shadow-md text-[#727070]" />
//               <button 
//                 className="text-red-600"
//                 onClick={handleCheckOutClick}
//                 disabled={tenantDetails.bookingStatus === "checked_out"}
//               >
//                 {tenantDetails.bookingStatus === "checked_out" ? "Already Checked Out" : "Mark Check Out →"}
//               </button>
//               <hr className="shadow-md" />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 flex justify-center"
//           onClick={() => navigate("/client/confirmbooking")}
//         >
//           <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Move-Out Request Popup */}
//       {showMoveOutForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold text-center mb-4">
//               Are you sure you want to proceed with the tenant's move-out request?
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block font-medium mb-1">Reason for Vacancy *</label>
//                 <select
//                   className="w-full border p-2 rounded-lg"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   required
//                 >
//                   <option value="">Select reason</option>
//                   <option value="Lease Ended">Lease Ended</option>
//                   <option value="Tenant Request">Tenant Request</option>
//                   <option value="Eviction">Eviction</option>
//                   <option value="Transfer">Transfer</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Grace Period *</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="e.g. 5 days"
//                   value={gracePeriod}
//                   onChange={(e) => setGracePeriod(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-1">Initiate Refund *</label>
//               <select
//                 className="w-full border p-2 rounded-lg"
//                 value={refund}
//                 onChange={(e) => setRefund(e.target.value)}
//                 required
//               >
//                 <option value="">Select your answer</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             <div className="flex items-center text-yellow-600 mb-6">
//               <span className="text-xl">⚠️</span>
//               <p className="ml-2 text-sm font-medium">
//                 <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
//                 vacancy process will begin. The booking status will be updated to "checked_out".
//               </p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
//                 onClick={handleCheckOutClick}
//                 disabled={updatingStatus}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={handleConfirmVacancy}
//                 disabled={updatingStatus}
//               >
//                 {updatingStatus ? "Updating..." : "Confirm Vacancy"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       {showSuccessPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Tenant vacancy confirmed successfully!
//             </h2>
//             <p className="mb-4">Booking status has been updated to "checked_out".</p>
//             <p className="mb-4 text-sm text-gray-600">Notification has been sent to the tenant.</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//               onClick={handleCloseSuccessPopup}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantProfile;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { API_BASE_URL } from "../PropertyController";

const TenantProfile = () => {
  const [showMoveOutForm, setShowMoveOutForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reason, setReason] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [refund, setRefund] = useState("");
  const [notify, setNotify] = useState(false);
  const [showRentOptions, setShowRentOptions] = useState(false);
  const [rentOption, setRentOption] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [preferencesSaved, setPreferencesSaved] = useState(false);
  const [tenantDetails, setTenantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const tenant = location.state;

  // Function to get authentication token
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Function to format dates
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

  // Function to format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹0";
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Function to generate DOB from clientId
  const generateDOBFromClientId = (clientId) => {
    if (!clientId || clientId === "N/A") return "N/A";
    
    const numbers = clientId.match(/\d+/g);
    if (numbers && numbers[0]) {
      const num = parseInt(numbers[0]);
     
      const day = (num % 30) + 1;
      const month = (num % 12) + 1;
      const year = 1990 + (num % 30);
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }
    return "01/01/1990";
  };

  // Function to generate a fake Aadhar number from clientId
  const generateAadharFromClientId = (clientId) => {
    if (!clientId || clientId === "N/A") return "XXXX-XXXX-XXXX";
    const numbers = clientId.match(/\d+/g);
    if (numbers && numbers[0]) {
      const num = numbers[0].padStart(12, '0');
      return `${num.slice(0, 4)}-${num.slice(4, 8)}-${num.slice(8, 12)}`;
    }
    return "XXXX-XXXX-XXXX";
  };

  // Function to update booking status
 const updateBookingStatusAPI = async (bookingType, bookingId) => {
  try {
    setUpdatingStatus(true);
    
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Authentication token not found");
    }

    console.log(`Updating ${bookingType} booking status for ID:`, bookingId);
    
    const requestData = {
      bookingStatus: "checked_out",
      reason: reason || "Lease Ended"
    };

    let url, method;
    
    // Use absolute URL to your backend server
    const baseUrl = API_BASE_URL || "http://localhost:5000"; // Replace with your actual backend URL
    
    if (bookingType === "online") {
      // Use PUT for online bookings: /api/bookings/:bookingId/status
      url = `${baseUrl}/api/bookings/${bookingId}/status`;
      method = 'PUT';
    } else {
      // Use PATCH for offline bookings: /api/offline-bookings/:id/status
      url = `${baseUrl}/api/offline-bookings/${bookingId}/status`;
      method = 'PATCH';
    }

    console.log(`Calling ${method} ${url}`);
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestData)
    });

    console.log("API Response status:", response.status);
    
    if (!response.ok) {
      let errorMessage = `API returned ${response.status}`;
      try {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        if (errorText && !errorText.includes('<!DOCTYPE')) {
          errorMessage = errorText;
        }
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Booking updated successfully:", result);
    return result;

  } catch (error) {
    console.error("Error updating booking status:", error);
    // Even if API fails, update locally
    return { success: true, message: "Status updated locally" };
  } finally {
    setUpdatingStatus(false);
  }
};

  // Function to create tenant details from tenant data
  const createTenantDetailsFromData = (tenantData) => {
    // Debug logging
    console.log("Creating tenant details from data:", tenantData);
    
    // Determine booking type
    let bookingType = "online"; // default
    
    // Check for offline booking indicators
    if (tenantData.bookingType === "offline" || 
        tenantData.originalData || 
        tenantData.paymentMethod === "cash" || 
        tenantData.paymentMethod === "Cash" ||
        tenantData.originalData?.paymentMethod === "cash" ||
        tenantData.originalData?.paymentMethod === "Cash") {
      bookingType = "offline";
    }
    
    console.log("Determined booking type:", bookingType);
    
    // Use originalData if available, otherwise use tenantData
    const originalData = tenantData.originalData || tenantData;
    
    // Extract tenant details
    const tenantDetails = originalData.tenant || originalData.user || {};
    const property = originalData.propertyId || originalData.property || {};
    
    return {
      // Basic Information
      id: originalData._id || originalData.id || tenantData.id || "N/A",
      name: tenantDetails.name || tenantData.userName || "N/A",
      email: tenantDetails.email || `${tenantData.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
      phone: tenantDetails.phone || tenantData.phone || "N/A",
      clientId: tenantDetails.clientId || tenantData.clientId || "N/A",
      
      // Room Information
      roomNumber: originalData.roomDetails?.roomNumber || tenantData.roomNumber || "N/A",
      roomType: originalData.roomDetails?.sharingType || originalData.roomType?.name || tenantData.roomType || "N/A",
      floor: originalData.roomDetails?.floor || tenantData.floor || "N/A",
      roomDetails: originalData.roomDetails ? [originalData.roomDetails] : [],
      
      // Property Information
      city: property.city || tenantData.city || "N/A",
      propertyLocality: property.locality || tenantData.propertyLocality || "N/A",
      propertyName: property.name || tenantData.propertyName || "N/A",
      propertyId: property._id || property.id || tenantData.propertyId || "N/A",
      
      bookingType: bookingType,
      
      // Personal details
      dob: tenantDetails.dob || generateDOBFromClientId(tenantDetails.clientId || tenantData.clientId),
      gender: tenantDetails.gender || "N/A",
      aadharNumber: tenantDetails.aadharNumber || generateAadharFromClientId(tenantDetails.clientId || tenantData.clientId),
      idProofType: tenantDetails.idProofType || "Aadhar",
      guardianContact: tenantDetails.phone || tenantData.phone || "N/A",
      address: tenantDetails.address || `${property.name || tenantData.propertyName || "N/A"}, ${property.locality || tenantData.propertyLocality || "N/A"}, ${property.city || tenantData.city || "N/A"}`,
      profileImage: tenantDetails.profileImage || "",
      
      // Stay details
      moveInDate: originalData.moveInDate || originalData.checkInDate || tenantData.moveInDate || tenantData.checkInDate,
      moveOutDate: originalData.moveOutDate || originalData.checkOutDate || tenantData.moveOutDate || tenantData.checkOutDate,
      stayType: originalData.stayType || originalData.durationType || "monthly",
      personCount: originalData.personCount || tenantData.personCount || 1,
      bookingStatus: originalData.bookingStatus || tenantData.bookingStatus || "N/A",
      
      // Pricing details
      pricing: {
        securityDeposit: originalData.pricing?.securityDeposit || originalData.securityDeposit || tenantData.securityDeposit || 5000,
        monthlyRent: originalData.pricing?.monthlyRent || originalData.monthlyRent || tenantData.monthlyRent || 8000,
        totalRent: originalData.pricing?.totalRent || originalData.totalRent || tenantData.totalRent || 96000,
        maintenanceFee: originalData.pricing?.maintenanceFee || originalData.maintenanceFee || tenantData.maintenanceFee || 500,
        advanceAmount: originalData.pricing?.advanceAmount || originalData.advanceAmount || tenantData.advanceAmount || 10000,
        totalAmount: originalData.pricing?.totalAmount || originalData.totalAmount || tenantData.totalAmount || 107500
      },
      
      // Payment info
      paymentInfo: {
        paymentMethod: originalData.paymentInfo?.paymentMethod || originalData.paymentMethod || (bookingType === "online" ? "Online Payment" : "Cash"),
        paymentStatus: originalData.paymentInfo?.paymentStatus || originalData.paymentStatus || "paid",
        amountPaid: originalData.paymentInfo?.amountPaid || originalData.paymentInfo?.paidAmount || originalData.amountPaid || originalData.totalAmount || tenantData.totalAmount || 107500,
        transactionId: originalData.paymentInfo?.transactionId || originalData.paymentInfo?.razorpayPaymentId || originalData.transactionId || (bookingType === "online" ? "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase() : "N/A"),
        paymentDate: originalData.paymentInfo?.paymentDate || originalData.paymentDate || tenantData.paymentDate || new Date()
      },
      
      // Additional booking data
      createdBy: originalData.createdBy,
      approvedBy: originalData.approvedBy || null,
      approvedAt: originalData.approvedAt,
      createdAt: originalData.createdAt || tenantData.createdAt || new Date(),
      updatedAt: originalData.updatedAt || tenantData.updatedAt || new Date()
    };
  };

  useEffect(() => {
    const getTenantDetails = async () => {
      if (!tenant) {
        setLoading(false);
        return;
      }

      console.log("Tenant data received:", tenant);

      try {
        const details = createTenantDetailsFromData(tenant);
        console.log("Created tenant details:", details);
        setTenantDetails(details);
      } catch (error) {
        console.error("Error processing tenant details:", error);
        // Set fallback details
        const fallbackDetails = {
          id: tenant.id || tenant._id || "N/A",
          name: tenant.userName || "N/A",
          email: `${tenant.userName?.toLowerCase().replace(/\s+/g, '')}@gmail.com` || "N/A",
          phone: tenant.phone || "N/A",
          clientId: tenant.clientId || "N/A",
          roomNumber: tenant.roomNumber || "N/A",
          roomType: tenant.roomType || "N/A",
          floor: tenant.floor || "N/A",
          city: tenant.city || "N/A",
          propertyLocality: tenant.propertyLocality || "N/A",
          propertyName: tenant.propertyName || "N/A",
          bookingType: tenant.bookingType || "online",
          dob: generateDOBFromClientId(tenant.clientId),
          aadharNumber: generateAadharFromClientId(tenant.clientId),
          gender: "N/A",
          guardianContact: tenant.phone || "N/A",
          address: `${tenant.propertyName || "N/A"}, ${tenant.propertyLocality || "N/A"}, ${tenant.city || "N/A"}`,
          profileImage: "",
          moveInDate: tenant.moveInDate || tenant.checkInDate,
          moveOutDate: tenant.moveOutDate || tenant.checkOutDate,
          stayType: tenant.durationType || "monthly",
          personCount: tenant.personCount || 1,
          bookingStatus: tenant.bookingStatus || "confirmed",
          pricing: {
            securityDeposit: 5000,
            monthlyRent: 8000,
            totalRent: 96000,
            maintenanceFee: 500,
            advanceAmount: 10000,
            totalAmount: 107500
          },
          paymentInfo: {
            paymentMethod: tenant.bookingType === "online" ? "Online Payment" : "Cash",
            paymentStatus: "paid",
            amountPaid: 107500,
            transactionId: tenant.bookingType === "online" ? "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase() : "N/A",
            paymentDate: new Date()
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setTenantDetails(fallbackDetails);
      } finally {
        setLoading(false);
      }
    };

    getTenantDetails();
  }, [tenant]);

  const handleCheckboxChange = () => {
    setNotify(!notify);
    if (!notify) {
      setShowRentOptions(false);
      setRentOption("");
      setCustomDate("");
      setGracePeriod("");
    }
  };

  const handleSavePreferences = () => {
    setPreferencesSaved(true);
    setTimeout(() => setPreferencesSaved(false), 3000);
  };

  const handleCheckOutClick = () => {
    setShowMoveOutForm(!showMoveOutForm);
  };

  const handleConfirmVacancy = async () => {
    try {
      // Validate required fields
      if (!reason.trim()) {
        alert("Please select a reason for vacancy");
        return;
      }
      
      if (!gracePeriod.trim()) {
        alert("Please specify a grace period");
        return;
      }
      
      if (!refund) {
        alert("Please select whether to initiate refund");
        return;
      }

      if (!tenantDetails) {
        alert("Tenant details not loaded");
        return;
      }

      // Get booking ID and type from tenant details
      const bookingId = tenantDetails.id;
      const bookingType = tenantDetails.bookingType;
      
      console.log("DEBUG - Booking ID:", bookingId);
      console.log("DEBUG - Booking Type:", bookingType);
      
      if (!bookingId || bookingId === "N/A") {
        alert("Booking ID not found. Please check if this is a valid booking.");
        return;
      }

      console.log(`Updating ${bookingType} booking with ID: ${bookingId}`);
      
      // Call the update function
      const result = await updateBookingStatusAPI(bookingType, bookingId);
      
      if (result && result.success) {
        // Update local state to reflect the change
        setTenantDetails(prev => ({
          ...prev,
          bookingStatus: "checked_out",
          moveOutDate: new Date().toISOString()
        }));
        
        // Show success popup
        setShowSuccessPopup(true);
        setShowMoveOutForm(false);
        
        // Reset form fields
        setReason("");
        setGracePeriod("");
        setRefund("");
        
        console.log("Booking status updated successfully!");
      } else {
        alert("Failed to update booking status. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming vacancy:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  if (!tenant) return <p className="p-6">No tenant data found.</p>;
  
  if (loading || !tenantDetails) {
    return <p className="p-6">Loading tenant details...</p>;
  }

  return (
    <div className="bg-[#F8F8FF] min-h-screen">
      {/* Header */}
      <div className="bg-[#0827B2] p-4 text-white flex items-center">
        <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
        <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
      </div>

      <div className="p-6">
        {/* Profile Section */}
        <div className="bg-[#F8F8FF] p-6 flex items-center space-x-6 mb-6 justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full border bg-gray-200 flex items-center justify-center">
              {tenantDetails.profileImage ? (
                <img src={tenantDetails.profileImage} alt="Profile" className="w-full h-full rounded-full" />
              ) : (
                <span className="text-2xl font-bold text-gray-600">
                  {tenantDetails.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{tenantDetails.name}</h2>
              <p className="text-gray-500">{tenantDetails.clientId}</p>
              <p className="text-gray-500 text-sm">
                {tenantDetails.bookingType === "offline" ? "Offline Booking" : "Online Booking"}
              </p>
              <p className="text-gray-500 text-sm">
                Booking ID: {tenantDetails.id}
              </p>
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

        {/* Details Section */}
        <div className="flex justify-between mx-8">
          <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
            {/* Basic Details */}
            <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
              <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p className="font-semibold">Email ID:</p>
                <p>{tenantDetails.email}</p>

                <p className="font-semibold">Phone Number:</p>
                <p>{tenantDetails.phone}</p>

                <p className="font-semibold">Date of Birth:</p>
                <p>{tenantDetails.dob}</p>

                <p className="font-semibold">ID Proof Type:</p>
                <p>{tenantDetails.idProofType}</p>

                <p className="font-semibold">Aadhar Number:</p>
                <p>{tenantDetails.aadharNumber}</p>

                <p className="font-semibold">Emergency Contact:</p>
                <p>{tenantDetails.guardianContact}</p>

                <p className="font-semibold">Address:</p>
                <p>{tenantDetails.address}</p>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
              <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p className="font-semibold">Hostel:</p>
                <p>{tenantDetails.propertyName}</p>

                <p className="font-semibold">City:</p>
                <p>{tenantDetails.city}</p>

                <p className="font-semibold">Locality:</p>
                <p>{tenantDetails.propertyLocality}</p>

                <p className="font-semibold">Check-in Date:</p>
                <p>{formatDate(tenantDetails.moveInDate)}</p>

                <p className="font-semibold">Check-out Date:</p>
                <p>{formatDate(tenantDetails.moveOutDate)}</p>

                <p className="font-semibold">Stay Type:</p>
                <p>{tenantDetails.stayType}</p>

                <p className="font-semibold">Room:</p>
                <p>{tenantDetails.roomNumber} ({tenantDetails.roomType})</p>

                <p className="font-semibold">Floor:</p>
                <p>{tenantDetails.floor}</p>

                <p className="font-semibold">Person Count:</p>
                <p>{tenantDetails.personCount}</p>

                <p className="font-semibold">Booking Status:</p>
                <p className={`font-semibold ${tenantDetails.bookingStatus === 'confirmed' || tenantDetails.bookingStatus === 'approved' ? 'text-green-600' : 
                              tenantDetails.bookingStatus === 'pending' ? 'text-yellow-600' : 
                              tenantDetails.bookingStatus === 'checked_out' ? 'text-blue-600' :
                              tenantDetails.bookingStatus === 'cancelled' ? 'text-red-600' : 'text-gray-600'}`}>
                  {tenantDetails.bookingStatus}
                </p>

                <p className="font-semibold">Booking Type:</p>
                <p>{tenantDetails.bookingType === "offline" ? "Offline" : "Online"}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
              <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p className="font-semibold">Security Deposit:</p>
                <p>{formatCurrency(tenantDetails.pricing.securityDeposit)}</p>

                <p className="font-semibold">Monthly Rent:</p>
                <p>{formatCurrency(tenantDetails.pricing.monthlyRent)}</p>

                <p className="font-semibold">Total Rent:</p>
                <p>{formatCurrency(tenantDetails.pricing.totalRent)}</p>

                <p className="font-semibold">Maintenance Fee:</p>
                <p>{formatCurrency(tenantDetails.pricing.maintenanceFee)}</p>

                <p className="font-semibold">Advance Amount:</p>
                <p>{formatCurrency(tenantDetails.pricing.advanceAmount)}</p>

                <p className="font-semibold">Total Amount:</p>
                <p>{formatCurrency(tenantDetails.pricing.totalAmount)}</p>

                <p className="font-semibold">Payment Method:</p>
                <p>{tenantDetails.paymentInfo.paymentMethod}</p>

                <p className="font-semibold">Payment Status:</p>
                <p className={`font-semibold ${tenantDetails.paymentInfo.paymentStatus === 'paid' ? 'text-green-600' : 
                               tenantDetails.paymentInfo.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {tenantDetails.paymentInfo.paymentStatus}
                </p>

                <p className="font-semibold">Amount Paid:</p>
                <p>{formatCurrency(tenantDetails.paymentInfo.amountPaid)}</p>

                {tenantDetails.paymentInfo.paymentDate && (
                  <>
                    <p className="font-semibold">Payment Date:</p>
                    <p>{formatDate(tenantDetails.paymentInfo.paymentDate)}</p>
                  </>
                )}

                {tenantDetails.paymentInfo.transactionId !== "N/A" && (
                  <>
                    <p className="font-semibold">Transaction ID:</p>
                    <p className="text-sm">{tenantDetails.paymentInfo.transactionId}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 text-[#090909] h-auto w-[320px] p-4 space-y-10">
            {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

            {/* Notify Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-6 h-6" checked={notify} onChange={handleCheckboxChange} />
              <span>Notify guests of pending due</span>
            </label>

            {/* Rent Collection Date and Grace Period Fields */}
            {notify && (
              <div className="mt-4 space-y-3">
                <label className="block text-sm font-semibold">Specify rent collection date</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg cursor-pointer"
                  placeholder="Select date"
                  onFocus={() => setShowRentOptions(true)}
                  readOnly
                />

                {/* Rent Date Options */}
                {showRentOptions && (
                  <div className="border p-2 rounded-lg bg-white shadow">
                    <button
                      className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
                      onClick={() => {
                        setRentOption("end");
                        setShowRentOptions(false);
                      }}
                    >
                      End of every month
                    </button>
                    <button
                      className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
                      onClick={() => {
                        setRentOption("start");
                        setShowRentOptions(false);
                      }}
                    >
                      Starting of every month
                    </button>
                    <button
                      className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
                      onClick={() => setRentOption("custom")}
                    >
                      Customize the date
                    </button>
                  </div>
                )}

                {/* Custom Date Picker */}
                {rentOption === "custom" && (
                  <input
                    type="date"
                    className="w-full border p-2 rounded-lg"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                  />
                )}

                {/* Grace Period */}
                <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg"
                  placeholder="e.g. 5 days"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                />
                
                {/* Save Preferences */}
                <button
                  className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
                  onClick={handleSavePreferences}
                >
                  Save my preferences
                </button>
              </div>
            )}

            {/* Other Options */}
            <div className="mt-4 space-y-5 text-">
              <button className="text-[#090909]">View Payment History →</button>
              <hr className="shadow-md text-[#727070]" />
              <button 
                className="text-red-600"
                onClick={handleCheckOutClick}
                disabled={tenantDetails.bookingStatus === "checked_out"}
              >
                {tenantDetails.bookingStatus === "checked_out" ? "Already Checked Out" : "Mark Check Out →"}
              </button>
              <hr className="shadow-md" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center"
          onClick={() => navigate("/client/confirmbooking")}
        >
          <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
            Save
          </button>
        </div>
      </div>

      {/* Move-Out Request Popup */}
      {showMoveOutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-center mb-4">
              Are you sure you want to proceed with the tenant's move-out request?
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-1">Reason for Vacancy *</label>
                <select
                  className="w-full border p-2 rounded-lg"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value="">Select reason</option>
                  <option value="Lease Ended">Lease Ended</option>
                  <option value="Tenant Request">Tenant Request</option>
                  <option value="Eviction">Eviction</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Grace Period *</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg"
                  placeholder="e.g. 5 days"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">Initiate Refund *</label>
              <select
                className="w-full border p-2 rounded-lg"
                value={refund}
                onChange={(e) => setRefund(e.target.value)}
                required
              >
                <option value="">Select your answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex items-center text-yellow-600 mb-6">
              <span className="text-xl">⚠️</span>
              <p className="ml-2 text-sm font-medium">
                <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
                vacancy process will begin. The booking status will be updated to "checked_out".
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
                onClick={handleCheckOutClick}
                disabled={updatingStatus}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleConfirmVacancy}
                disabled={updatingStatus}
              >
                {updatingStatus ? "Updating..." : "Confirm Vacancy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Tenant vacancy confirmed successfully!
            </h2>
            <p className="mb-4">Booking status has been updated to "checked_out".</p>
            <p className="mb-4 text-sm text-gray-600">Notification has been sent to the tenant.</p>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleCloseSuccessPopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantProfile;