import React, { useState } from "react";
import Header from "../Header"; // Import Header component
import { useNavigate } from "react-router-dom";

export default function VacateRoomFlow() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [vacateDate, setVacateDate] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleVacate = () => {
    if (confirmed) {
      setStep(2);
    } else {
      alert("Please click on the gray circle to confirm before vacating.");
    }
  };

  const handleAcknowledge = () => {
    setStep(3);
  };

  const handleGotIt = () => {
    setShowSteps(true);
    setStep(4);
  };

  return (
    <>
    <Header />
     <div className="text-sm text-gray-500 py-24 px-14">
                <span className="text-blue-600 cursor-pointer hover:underline">
                  My Stays
                </span>{" "}
                &gt; <span className="font-medium">Vacate Room</span>
              </div>
      <div className="p-6 max-w-4xl mx-auto min-h-screen ">
        
      <div className="flex flex-col md:flex-row gap-12">
        
        <div className="flex-1">
          {/* Step 1: Vacate Form */}
          {step === 1 && (
            <div className="space-y-4">
             
              {/* <h2 className="text-xl font-semibold">Vacate Room</h2> */}

              <label className="block">
                
                Vacating Date *
                
                <input
                  type="date"
                  value={vacateDate}
                  onChange={(e) => setVacateDate(e.target.value)}
                  className="border w-full p-2 mt-1 rounded"
                />
              </label>

              <label className="block">
                Reason for vacating
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="border w-full p-2 mt-1 rounded"
                />
              </label>

              <label className="block">
                Please drop your valuable feedback
                <div className="flex text-2xl mb-2 space-x-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={star <= rating ? "text-yellow-400" : "text-gray-400"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="border w-full p-2 mt-1 rounded"
                />
              </label>

              <div
                onClick={() => setConfirmed(true)}
                className={`flex items-center gap-2 cursor-pointer ${
                  confirmed ? "opacity-100" : "opacity-70"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    confirmed
                      ? "bg-blue-600 border-blue-600"
                      : "bg-gray-300 border-gray-400"
                  }`}
                >
                  {confirmed && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
                <span className="text-gray-600">
                  Please click here to confirm before vacating
                </span>
              </div>

              <button
                onClick={handleVacate}
                className={`px-6 py-2 rounded font-semibold mt-4 ${
                  confirmed
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Vacate Room
              </button>
            </div>
          )}

          {/* Step 2: Are You Sure? */}
          {step === 2 && (
            <div className="text-center space-y-6 bg-gray-50 p-8 rounded shadow mt-10">
              <h3 className="text-lg font-semibold">
                Are you sure you want to vacate?
              </h3>
              <div className="space-x-4">
                <button
                  onClick={handleAcknowledge}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Yes
                </button>
                <button className="bg-white border px-6 py-2 rounded text-blue-600">
                  No
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Got It Confirmation */}
          {step === 3 && (
            <div className="text-center space-y-6 bg-gray-100 p-8 rounded shadow mt-10">
              <p className="text-md">
                We've notified the PG owner about your vacating request. You'll
                be updated once they respond.
              </p>
              <div className="text-6xl">👍</div>
              <button
                onClick={handleGotIt}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Okay, Got it!
              </button>
            </div>
          )}

          {/* Step 4: Final Summary */}
          {step === 4 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Vacating Date</h2>
              <input
                type="text"
                value={vacateDate}
                disabled
                className="border p-2 w-full rounded"
              />

              <label className="block">
                Reason for vacating
                <textarea
                  value={reason}
                  disabled
                  className="border w-full p-2 mt-1 rounded"
                />
              </label>

              <label className="block">
                Feedback
                <div className="flex text-2xl mb-2 space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= rating ? "text-yellow-400" : "text-gray-400"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  value={feedback}
                  disabled
                  className="border w-full p-2 mt-1 rounded"
                />
              </label>

              <div className="border bg-blue-100 p-4 rounded">
                <p className="font-semibold">Refund Summary</p>
                <p>
                  Total expected refund: <strong>₹2000.00</strong>
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  ₹2000.00 will be credited to your wallet
                </p>
              </div>

              <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4">
                Go to Wallet
              </button>
            </div>
          )}
        </div>

        {/* Step Tracker (visible only after Got It) */}
        {showSteps && (
          <div className="w-full md:w-72 pt-4">
            <h3 className="text-sm font-semibold mb-4">Progress</h3>
            <div className="flex flex-col gap-6">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-green-600" />
                  <div className="w-px h-10 bg-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-600">
                    Cancel / Vacate Requested
                  </p>
                  <p className="text-xs text-gray-500">01/08/2025 10:00:00</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-300" />
                  <div className="w-px h-10 bg-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    Refund Initiated
                  </p>
                  <p className="text-xs text-gray-400">--/--/----</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    Refunded to Wallet
                  </p>
                  <p className="text-xs text-gray-400">--/--/----</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
