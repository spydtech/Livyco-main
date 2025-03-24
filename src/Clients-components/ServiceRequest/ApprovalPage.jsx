import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import ClientNav from "../Client-Navbar/ClientNav";
import img from "../../assets/client-main/approval-image.jpeg";

const ApprovalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sharingType: "",
    rent: "",
    paymentMode: "perMonth",
    roomDetails: "",
    checkInDate: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    
    // Show success popup
    setShowSuccess(true);

    // Hide popup and navigate after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/client/servicerequests");
    }, 2000);
  };

  return (
    <>
    <ClientNav />
    <h2 className="text-gray-600 bg-white text-sm mb-4 p-10 cursor-pointer" onClick={() => navigate(-1)}>Home / Service Requests</h2>
    <div className="min-h-screen bg-white p-0 flex justify-center">
   
      <div className="w-full max-w-xl p-0">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="p-10 space-y-5">
        <h2 className="text-xl font-semibold mb-2">Request ID: {id}</h2>
        <p className="text-gray-600 mb-4">Service Request - Room/Bed Change</p>

       
          {/* Sharing Type */}
          <div>
            <label className="block text-gray-700">Room & Bed Allocation</label>
            <select
              name="sharingType"
              value={formData.sharingType}
              onChange={handleChange}
              className="w-[90%] mt-1 p-2 px-2  border-[#BCBCBC] border rounded-lg"
            >
              <option value="">Type of Sharing</option>
              <option value="single">Single Sharing</option>
              <option value="double">Double Sharing</option>
              <option value="triple">Triple Sharing</option>
            </select>
          </div>

          {/* Rent */}
          <div>
           
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="₹ 0000"
                className="w-1/2 p-2 border-[#BCBCBC] border rounded-lg"
              />
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="paymentMode"
                  value="perMonth"
                  checked={formData.paymentMode === "perMonth"}
                  onChange={handleChange}
                />
                <span>Per Month</span>
              </label>
              <label className="flex items-center space-x-1">
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

          {/* Room & Bed Details */}
          <div>
           
            <input
              type="text"
              name="roomDetails"
              value={formData.roomDetails}
              onChange={handleChange}
              placeholder="Enter details"
              className="w-[90%] mt-1 p-2 border-[#BCBCBC] border rounded"
            />
          </div>

          {/* Check-in Date */}
          <div>
           
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="w-[90%] mt-1 p-2 border-[#BCBCBC] border rounded-lg"
            />
          </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2  bg-[#204CAF] text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
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
          <img 
          className="w-24 h-24"
          src={img} />
            <p className="text-lg font-semibold text-gray-800">
              Submission Successful!
            </p>
          </div>
        </motion.div>
      )}
    </div>
    </>
  );
};

export default ApprovalPage;
