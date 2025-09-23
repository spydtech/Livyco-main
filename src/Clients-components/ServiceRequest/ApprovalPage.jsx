// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaCheck } from "react-icons/fa";
// import ClientNav from "../Client-Navbar/ClientNav";
// import img from "../../assets/client-main/approval-image.jpeg";

// const ApprovalPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     sharingType: "",
//     rent: "",
//     paymentMode: "perMonth",
//     roomDetails: "",
//     checkInDate: "",
//   });

//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted Data:", formData);
    
//     // Show success popup
//     setShowSuccess(true);

//     // Hide popup and navigate after 2 seconds
//     setTimeout(() => {
//       setShowSuccess(false);
//       navigate("/client/servicerequests");
//     }, 2000);
//   };

//   return (
//     <>
//     <ClientNav />
//     <h2 className="text-gray-600 bg-white text-sm mb-4 p-10 cursor-pointer" onClick={() => navigate(-1)}>Home / Service Requests</h2>
//     <div className="min-h-screen bg-white p-0 flex justify-center">
   
//       <div className="w-full max-w-xl p-0">
//       <form onSubmit={handleSubmit} className="space-y-4 ">
//         <div className="p-10 space-y-5">
//         <h2 className="text-xl font-semibold mb-2">Request ID: {id}</h2>
//         <p className="text-gray-600 mb-4">Service Request - Room/Bed Change</p>

       
//           {/* Sharing Type */}
//           <div>
//             <label className="block text-gray-700">Room & Bed Allocation</label>
//             <select
//               name="sharingType"
//               value={formData.sharingType}
//               onChange={handleChange}
//               className="w-[90%] mt-1 p-2 px-2  border-[#BCBCBC] border rounded-lg"
//             >
//               <option value="">Type of Sharing</option>
//               <option value="single">Single Sharing</option>
//               <option value="double">Double Sharing</option>
//               <option value="triple">Triple Sharing</option>
//             </select>
//           </div>

//           {/* Rent */}
//           <div>
           
//             <div className="flex items-center space-x-2">
//               <input
//                 type="number"
//                 name="rent"
//                 value={formData.rent}
//                 onChange={handleChange}
//                 placeholder="₹ 0000"
//                 className="w-1/2 p-2 border-[#BCBCBC] border rounded-lg"
//               />
//               <label className="flex items-center space-x-1">
//                 <input
//                   type="radio"
//                   name="paymentMode"
//                   value="perMonth"
//                   checked={formData.paymentMode === "perMonth"}
//                   onChange={handleChange}
//                 />
//                 <span>Per Month</span>
//               </label>
//               <label className="flex items-center space-x-1">
//                 <input
//                   type="radio"
//                   name="paymentMode"
//                   value="perDay"
//                   checked={formData.paymentMode === "perDay"}
//                   onChange={handleChange}
//                 />
//                 <span>Per Day</span>
//               </label>
//             </div>
//           </div>

//           {/* Room & Bed Details */}
//           <div>
           
//             <input
//               type="text"
//               name="roomDetails"
//               value={formData.roomDetails}
//               onChange={handleChange}
//               placeholder="Enter details"
//               className="w-[90%] mt-1 p-2 border-[#BCBCBC] border rounded"
//             />
//           </div>

//           {/* Check-in Date */}
//           <div>
           
//             <input
//               type="date"
//               name="checkInDate"
//               value={formData.checkInDate}
//               onChange={handleChange}
//               className="w-[90%] mt-1 p-2 border-[#BCBCBC] border rounded-lg"
//             />
//           </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2  bg-[#204CAF] text-white rounded-lg hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
      
//       </div>

//       {/* Success Popup */}
//       {showSuccess && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//           <img 
//           className="w-24 h-24"
//           src={img} />
//             <p className="text-lg font-semibold text-gray-800">
//               Submission Successful!
//             </p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//     </>
//   );
// };

// export default ApprovalPage;


import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ClientNav from "../Client-Navbar/ClientNav";
import img from "../../assets/client-main/approval-image.jpeg";
import { concernAPI } from "../PropertyController";

const ApprovalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const request = location.state || {};

  const [formData, setFormData] = useState({
    rent: "",
    paymentMode: "perMonth",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBedOccupiedError, setShowBedOccupiedError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.rent) {
      setError("Please enter the rent amount");
      return;
    }

    setLoading(true);
    setError(null);
    setShowBedOccupiedError(false);

    try {
      // Call the API to approve the concern
      await concernAPI.approveConcern(id, {
        adminNotes: `Approved with rent: ₹${formData.rent} ${formData.paymentMode}`
      });
      
      // Show success popup
      setShowSuccess(true);

      // Hide popup and navigate after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/client/servicerequests");
      }, 2000);
    } catch (err) {
      console.error("Error approving request:", err);
      
      // Check if it's a bed occupied error
      if (err.response?.data?.message?.includes('bed/room is not available')) {
        setShowBedOccupiedError(true);
        setError("The requested bed/room is already occupied. Please choose a different allocation.");
      } else {
        setError(err.response?.data?.message || "Failed to approve request");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/client/servicerequests");
  };

  const handleSelectDifferentBed = () => {
    // You can implement a modal or redirect to a page where the client can select a different bed
    // For now, just clear the error and let them try again
    setShowBedOccupiedError(false);
    setError(null);
  };

  return (
    <>
      <ClientNav />
      <h2 className="text-gray-600 bg-white text-sm mb-4 p-10 cursor-pointer" onClick={() => navigate(-1)}>
        Home / Service Requests
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-10">
          <p>{error}</p>
          {showBedOccupiedError && (
            <div className="mt-2">
              <button
                onClick={handleSelectDifferentBed}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
              >
                Select Different Bed
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel Approval
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="min-h-screen bg-white p-0 flex justify-center">
        <div className="w-full max-w-xl p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-10 space-y-5">
              <h2 className="text-xl font-semibold mb-2">Request ID: {id}</h2>
              <p className="text-gray-600 mb-4">Service Request - {request.type ? request.type.replace('-', ' ').toUpperCase() : "Unknown Type"}</p>

              {/* Display current details */}
              {request.currentRoom && request.currentBed && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Current Allocation:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium mr-2">Room:</span>
                      <span className="bg-white px-2 py-1 rounded">{request.currentRoom}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium mr-2">Bed:</span>
                      <span className="bg-white px-2 py-1 rounded">{request.currentBed}</span>
                    </div>
                    {request.currentSharingType && (
                      <div className="flex items-center">
                        <span className="text-gray-600 font-medium mr-2">Sharing Type:</span>
                        <span className="bg-white px-2 py-1 rounded">{request.currentSharingType} Sharing</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Display requested changes for bed/room change requests */}
              {(request.type === 'bed-change' || request.type === 'room-change') && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Requested Changes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {request.requestedRoom && (
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium mr-2">Room:</span>
                        <span className="bg-white px-2 py-1 rounded">{request.requestedRoom}</span>
                      </div>
                    )}
                    {request.requestedBed && (
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium mr-2">Bed:</span>
                        <span className="bg-white px-2 py-1 rounded">{request.requestedBed}</span>
                      </div>
                    )}
                    {request.requestedSharingType && (
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium mr-2">Sharing Type:</span>
                        <span className="bg-white px-2 py-1 rounded">{request.requestedSharingType} Sharing</span>
                      </div>
                    )}
                    {request.requestedFloor && (
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium mr-2">Floor:</span>
                        <span className="bg-white px-2 py-1 rounded">{request.requestedFloor}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Display description for other services */}
              {request.type === 'other-services' && request.comment && (
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Service Description:</h4>
                  <p className="text-yellow-700">{request.comment}</p>
                </div>
              )}

              {/* Rent Amount Input */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Set Rent Amount:</h4>
                
                {/* Rent Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rent Amount *</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      placeholder="Enter rent amount"
                      className="w-1/2 p-2 border-[#BCBCBC] border rounded-lg"
                      required
                    />
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="paymentMode"
                          value="perMonth"
                          checked={formData.paymentMode === "perMonth"}
                          onChange={handleChange}
                        />
                        <span>Per Month</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="paymentMode"
                          value="perDay"
                          checked={formData.paymentMode === "perDay"}
                          onChange={handleChange}
                        />
                        <span>Per Day</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-sm text-gray-600">
                    <strong>Final Allocation:</strong> {
                      request.type === 'bed-change' || request.type === 'room-change' 
                        ? `Room ${request.requestedRoom || request.currentRoom}, Bed ${request.requestedBed || request.currentBed}`
                        : `Room ${request.currentRoom}, Bed ${request.currentBed}`
                    }
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Rent:</strong> ₹{formData.rent || "0"} {formData.paymentMode}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="px-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#204CAF] text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Approve Request"}
              </button>
            </div>
          </form>
        </div>

        {/* Success Popup */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img className="w-24 h-24" src={img} alt="Success" />
              <p className="text-lg font-semibold text-gray-800">
                Request Approved Successfully!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Rent: ₹{formData.rent} {formData.paymentMode}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ApprovalPage;