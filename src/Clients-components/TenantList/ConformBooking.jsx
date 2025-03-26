import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClientNav from "../Client-Navbar/ClientNav";

const ConformBooking = () => {
  const [reason, setReason] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [refund, setRefund] = useState("");
  const [showPopup, setShowPopup] = useState(false); // For popup state
  const navigate = useNavigate();

  const handleConfirmVacancy = () => {
    // Simulate an API call
    console.log({ reason, gracePeriod, refund });

    // Show confirmation popup
    setShowPopup(true);

    // Auto close popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
      navigate("/client/tenantlist"); // Redirect to homepage or another page
    }, 3000);
  };

  return (
    <>
    <ClientNav />
      {/* Move-Out Form */}
      {!showPopup && (
        <div className="flex  min-h-screen bg-[#F8F9FA] justify-center">
          <div className=" p-10  max-w-5xl w-full">
            <h2 className="text-xl font-semibold text-center mb-4 text-[#000000]">
              Are you sure you want to proceed with the tenant's move-out request?
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-1 text-[#333333]">Reason for Vacancy *</label>
                <select
                  className="w-full border border-[#BCBCBC] p-2 rounded-lg"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Value</option>
                  <option value="Lease Ended">Lease Ended</option>
                  <option value="Tenant Request">Tenant Request</option>
                  <option value="Eviction">Eviction</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1 text-[#333333]">Grace Period *</label>
                <input
                  type="text"
                  className="w-1/2 border border-[#BCBCBC] p-2 rounded-lg"
                  placeholder="eg 5 days"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6 ">
              <label className="block font-medium mb-1 text-[#333333]">Initiate Refund *</label>
              <select
                className="w-1/4 border border-[#BCBCBC] p-2 rounded-lg"
                value={refund}
                onChange={(e) => setRefund(e.target.value)}
              >
                <option value="">Select your answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
           <div className="py-48">
            <div className="flex  text-[#333333] mb-6 items-center justify-center ">
              <span className="text-xl">⚠️</span>
              <p className="ml-2 text-sm font-medium">
                <strong className="text-black"> Note:</strong> Once confirmed, the tenant will be notified, and the
                vacancy process will begin.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="px-12 py-2 border border-[#0827B2] text-[#0827B2] rounded-lg"
                onClick={() => navigate(-1)} // Go back to the previous page
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-[#0827B2] text-white rounded-lg"
                onClick={handleConfirmVacancy}
              >
                Confirm Vacancy
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-lg font-semibold">Tenant vacancy confirmed successfully!</h2>
            <p className="text-gray-600 mt-2">Notification has been sent.</p>
            <button
              className="mt-4 px-6 py-2 bg-[#0827B2] text-white rounded-lg"
              onClick={() => {
                setShowPopup(false);
                navigate("/client/tenantlist");
              }}
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ConformBooking;
