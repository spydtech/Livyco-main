import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import bgimage from "../assets/images/bgimage.png";
import { useNavigate } from "react-router-dom";

export default function WalletHistory() {
  const [amount, setAmount] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  const recommendedAmounts = [1000, 500, 100];

  const handleRecommendedClick = (value) => {
    setAmount(value);
  };

  const transactionHistory = [
    {
      id: 1,
      sender: "Sender's Name",
      amount: "₹1000.00",
      date: "01/08/2025",
    },
    {
      id: 2,
      sender: "Another Sender",
      amount: "₹500.00",
      date: "29/07/2025",
    },
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 py-10"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-24 left-8 text-sm text-gray-700 flex gap-1">
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

      <div className="bg-[#F8F8FF] w-full max-w-xl rounded-2xl border border-black p-8 shadow-lg">
        {/* Header */}
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Low Balance
        </h2>

        {/* Current Balance */}
        <div className="text-3xl font-bold text-gray-800 mb-6">₹26.00</div>

        {/* Input */}
        <label className="block text-gray-600 text-sm mb-2">
          Add Money to Wallet
        </label>
        <div className="flex mb-4">
          <input
            type="number"
            placeholder="₹ Enter Amount"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="bg-blue-700 text-white px-6 py-2 rounded-r-lg hover:bg-blue-800">
            Proceed
          </button>
        </div>

        {/* Recommended */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">
            Recommended
          </label>
          <div className="flex gap-2">
            {recommendedAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleRecommendedClick(amt)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-100"
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Wallet Transaction History */}
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center text-gray-600 text-sm mb-4 w-full text-left"
          >
            Wallet Transaction History
            <FaChevronDown
              className={`ml-2 transition-transform duration-300 ${
                showHistory ? "rotate-180" : ""
              }`}
            />
          </button>

          {showHistory && (
            <div className="space-y-4">
              {transactionHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-3 w-1/3">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                      SN
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Paid to</span>
                      <span className="text-sm text-gray-800 font-semibold">
                        {item.sender}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Section with Circle */}
                  <div className="flex justify-center items-center w-1/6">
                    <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <FaArrowRight className="text-green-600 text-lg transform -rotate-45" />
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end w-1/3">
                    <span className="text-gray-800 font-bold">
                      {item.amount}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
