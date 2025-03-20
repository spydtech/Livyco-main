import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const FilterModal = ({ onClose }) => {
  const [selectedRoomType, setSelectedRoomType] = useState("Single Sharing");
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 transition-transform duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter by</h2>
        <FiX className="text-gray-600 text-2xl cursor-pointer" onClick={onClose} />
      </div>

      {/* Building Filter */}
      <div className="mb-4">
        <h3 className="text-gray-600 font-medium">🏢 Building</h3>
        <div className="flex gap-2 mt-2">
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedBuilding === "Hostel 1" ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => setSelectedBuilding("Hostel 1")}
          >
            Hostel 1
          </button>
          <button
            className={`px-4 py-2 border rounded-full ${
              selectedBuilding === "Hostel 2" ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => setSelectedBuilding("Hostel 2")}
          >
            Hostel 2
          </button>
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-4">
        <h3 className="text-gray-600 font-medium">🛏️ Room Type</h3>
        {["Single Sharing", "Double Sharing", "3 Sharing", "4 Sharing", "5 Sharing", "5+ Sharing"].map(
          (type) => (
            <label key={type} className="flex items-center gap-2 mt-2">
              <input
                type="radio"
                name="roomType"
                value={type}
                checked={selectedRoomType === type}
                onChange={() => setSelectedRoomType(type)}
                className="cursor-pointer"
              />
              <span className={`${selectedRoomType === type ? "font-bold" : "text-gray-600"}`}>
                {type}
              </span>
            </label>
          )
        )}
      </div>

      {/* Floor Number */}
      <div className="mb-4">
        <h3 className="text-gray-600 font-medium">🏢 Floor Number</h3>
        <div className="flex gap-2 mt-2">
          {["1st Floor", "2nd Floor", "3rd Floor", "4th Floor"].map((floor) => (
            <button
              key={floor}
              className={`px-4 py-2 border rounded-full ${
                selectedFloor === floor ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setSelectedFloor(floor)}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md mt-6"
        onClick={onClose}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterModal;
