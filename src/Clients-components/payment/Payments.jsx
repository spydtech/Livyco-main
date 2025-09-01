import React, { useState } from "react";
import { FaChevronUp, FaInfoCircle, FaCopy } from "react-icons/fa";
import bgimage from "../assets/images/bgimage.png";
import rightimage from "../assets/images/rightimage.png";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();
  const user = {
    rent: 8000,
    advance: 3000,
    gst: 0,
    subscription: 19,
  };

  const totalAmount = user.rent + user.advance + user.gst + user.subscription;
  const [paymentDone, setPaymentDone] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const transactionId = "01112024125802";

  const handlePay = () => {
    setPaymentDone(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId);
    alert("Transaction ID copied!");
  };

  const handleShare = () => {
    alert("Receipt shared!");
  };

  // Common Breadcrumb Component
  const Breadcrumbs = () => (
    <div className="absolute top-6 left-6 text-sm text-gray-800 flex gap-2 z-10">
      <span
        onClick={() => navigate("/")}
        className="cursor-pointer hover:underline"
      >
        Home
      </span>
      <span>/</span>
      <span
        onClick={() => navigate("/wallet")}
        className="cursor-pointer hover:underline"
      >
        Payments
      </span>
    </div>
  );

  if (paymentDone) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <Breadcrumbs />

        <div
          className="w-[400px] h-[400px] bg-cover bg-center text-white rounded-2xl shadow-2xl border border-white flex flex-col items-center justify-center p-6 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(8, 39, 178, 0.7), rgba(8, 39, 178, 0.7)), url(${bgimage})`,
          }}
        >
          <div className="mb-6">
            <img
              src={rightimage}
              alt="Success"
              className="w-[60px] h-[60px] mx-auto mb-2"
            />
          </div>

          <h2 className="text-xl font-semibold mb-2">Payment Successful</h2>
          <p className="text-lg font-medium mb-4">Your payment is successful</p>

          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-sm tracking-wide">
              Transaction ID : {transactionId}
            </span>
            <FaCopy
              className="cursor-pointer text-white hover:text-yellow-400 transition"
              onClick={handleCopy}
            />
          </div>

          <button
            onClick={handleShare}
            className="bg-yellow-400 hover:bg-yellow-500 text-[#0033A1] font-semibold px-6 py-2 rounded-xl transition"
          >
            Share Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 relative"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <Breadcrumbs />

      <div className="border border-black py-20 px-[100px] rounded-2xl  bg-opacity-80 shadow-xl mt-20">
        <div className="bg-white w-full max-w-md h-[400px] rounded-2xl border border-yellow-400 p-6 shadow-md relative">
          {/* Header: Title + Amount + Dropdown */}
          <div className="flex justify-center items-center gap-8 mb-4">
            <h2 className="text-lg font-semibold text-gray-700 whitespace-nowrap">
              Amount to be paid
            </h2>
            <div className="flex items-center gap-2 relative">
              <span className="text-2xl font-bold text-gray-700">
                ₹{totalAmount.toFixed(2)}
              </span>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className={`cursor-pointer transition-transform duration-300 ${
                  showDropdown ? "rotate-180" : ""
                } bg-green-100 p-1 rounded-full text-green-600`}
              >
                <FaChevronUp className="text-xs" />
              </div>
            </div>
          </div>

          {/* Dropdown: Rent + Advance */}
          {showDropdown && (
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-center gap-24">
                <span>Advance Amount</span>
                <span className="font-medium text-gray-700">
                  ₹{user.advance}
                </span>
              </div>
              <div className="flex justify-center gap-32">
                <span>Rent</span>
                <span className="font-medium text-gray-700">₹{user.rent}</span>
              </div>
            </div>
          )}

          {/* GST & Subscription */}
          <div className="space-y-2 text-sm text-gray-600 mb-4 border-t pt-4">
            <div className="flex justify-between">
              <span>GST 18%</span>
              <span className="font-medium text-gray-700">₹{user.gst}</span>
            </div>
            <div className="flex justify-between">
              <span>Subscription</span>
              <span className="font-medium text-gray-700">
                ₹{user.subscription}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-2 text-gray-500 text-sm mb-6">
            <FaInfoCircle className="text-blue-500 mt-1" />
            <p>
              Sapiente asperiores ut inventore. Voluptatem molestiae atque
              minima corrupti adipisci fugiat a.
            </p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 mt-4"
          >
            Pay ₹{totalAmount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
