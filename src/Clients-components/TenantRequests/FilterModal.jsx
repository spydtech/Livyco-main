import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const FilterModal = ({ onClose, onApply, propertyData }) => {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [buildings, setBuildings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [floors, setFloors] = useState([]);

 useEffect(() => {
  if (!Array.isArray(propertyData) || propertyData.length === 0) return;

  // Get unique building names
  const uniqueBuildings = [...new Set(
    propertyData.map((item) => item.basicInfo?.name).filter(Boolean)
  )];

  // Get all room types across all properties
  const allRoomTypes = propertyData.flatMap((item) =>
    item.rooms?.types?.map((room) => room.type) || []
  );
  const uniqueRoomTypes = [...new Set(allRoomTypes)];

  // Get all floors across all properties
  const allFloors = propertyData.flatMap((item) =>
    item.rooms?.floors?.floors?.map((f) => f.floor) || []
  );
  const uniqueFloors = [...new Set(allFloors)].sort((a, b) => a - b);

  setBuildings(uniqueBuildings);
  setRoomTypes(uniqueRoomTypes);
  setFloors(uniqueFloors);
}, [propertyData]);

  const handleApply = () => {
    onApply({ selectedBuilding, selectedRoomType, selectedFloor });
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter by</h2>
        <FiX className="text-gray-600 text-2xl cursor-pointer" onClick={onClose} />
      </div>

      {buildings.length > 0 && (
        <div className="mb-4">
          <h3 className="text-gray-600 font-medium">🏢 Building</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {buildings.map((b) => (
              <button
                key={b}
                className={`px-4 py-2 border rounded-full ${
                  selectedBuilding === b ? "bg-black text-white" : "bg-white text-black"
                }`}
                onClick={() => setSelectedBuilding(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {roomTypes.length > 0 && (
        <div className="mb-4">
          <h3 className="text-gray-600 font-medium">🛏️ Room Type</h3>
          {roomTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 mt-2">
              <input
                type="radio"
                name="roomType"
                value={type}
                checked={selectedRoomType === type}
                onChange={() => setSelectedRoomType(type)}
                className="cursor-pointer"
              />
              <span className={selectedRoomType === type ? "font-bold" : "text-gray-600"}>
                {type}
              </span>
            </label>
          ))}
        </div>
      )}

      {floors.length > 0 && (
        <div className="mb-4">
          <h3 className="text-gray-600 font-medium">🏢 Floor Number</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {floors.map((floor) => (
              <button
                key={floor}
                className={`px-4 py-2 border rounded-full ${
                  selectedFloor === floor ? "bg-black text-white" : "bg-white text-black"
                }`}
                onClick={() => setSelectedFloor(floor)}
              >
                {`${floor} Floor`}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md mt-6"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterModal;
