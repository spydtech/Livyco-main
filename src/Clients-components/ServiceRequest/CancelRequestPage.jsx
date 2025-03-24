import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClientNav from "../Client-Navbar/ClientNav";
import img from "../../assets/client-main/approval-image.jpeg"; // ✅ Fixed image path

const CancelRequestPage = () => {
  const location = useLocation();
  const request = location.state || {};  // ✅ Prevents errors if state is missing
  const navigate = useNavigate();
  const [cancelReason, setCancelReason] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation.");
      return;
    }

    console.log("Cancel Request Submitted:", {
      requestId: request?.id,
      reason: cancelReason,
    });

    // Show success popup
    setShowSuccess(true);

    // Close popup and navigate after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/client/servicerequests");
    }, 2000);
  };

  return (
    <>
      <ClientNav />
      <h2 className="text-gray-600 text-sm mb-4 p-10">Home / Service Requests</h2>
      <div className="bg-[#F8F9FA] min-h-screen flex flex-col items-center justify-center -mt-24">
        <div className="max-w-md w-full text-center  p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Request ID: <span className="text-gray-900">{request?.id}</span>
          </h3>
          <p className="text-gray-600 text-sm">Service Request - "{request?.requestType}"</p>

          <h4 className="text-lg font-semibold mt-4 mb-2">Reason for Cancel Request</h4>
          <textarea
            className="w-full p-3 border border-[#BCBCBC] rounded-lg bg-gray-100 text-gray-600 text-sm resize-none"
            rows="4"
            placeholder="Enter your reason for cancellation..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          ></textarea>

          <button
            className="w-full mt-6 py-2 bg-[#204CAF] text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
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
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Submission Successful!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CancelRequestPage;
