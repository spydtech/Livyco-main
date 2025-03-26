import { useState, useEffect } from "react";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

export default function HostelRoomSelection({ selectedRooms, nextStep }) {
  const [floors, setFloors] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [floorData, setFloorData] = useState(() => {
    return JSON.parse(localStorage.getItem("hostelRoomData")) || {};
  });
  const [roomNumbers, setRoomNumbers] = useState({});
  const [showRoomRent, setShowRoomRent] = useState(false);

  useEffect(() => {
    localStorage.setItem("hostelRoomData", JSON.stringify(floorData));
  }, [floorData]);

  const handleRoomNumberChange = (roomType, value) => {
    setRoomNumbers((prev) => ({ ...prev, [roomType]: value }));
  };
  const rooms = [
    { id: 1, label: "Single Room", blocks: 1 },
    { id: 2, label: "Double Sharing", blocks: 2 },
    { id: 3, label: "Triple Sharing", blocks: 3 },
    { id: 4, label: "Four Sharing", blocks: 4 },
    { id: 5, label: "Five Sharing", blocks: 5 },
    { id: 6, label: "Six Sharing", blocks: 6 },
  ];

  const saveFloorData = () => {
    setFloorData((prev) => ({
      ...prev,
      [currentFloor]: roomNumbers,
    }));
  };

  const handleSaveFloor = () => {
    saveFloorData();
    setRoomNumbers({}); // Clears input for next floor
    if (currentFloor < floors) {
      setCurrentFloor((prev) => prev + 1);
    }
  };

  const handleFinalSave = () => {
    saveFloorData();
    setShowRoomRent(true);
  };

  const filteredRooms = rooms.filter((room) => selectedRooms.includes(room.id));

  if (showRoomRent) {
    return (
      <RoomRent
        nextStep={nextStep}
        selectedRooms={filteredRooms.map((room) => room.label)}
      />
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Select types of room available
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm">No. of floors in the Hostel</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFloors(Math.max(0, floors - 1))}
            className="border p-2 rounded-md"
          >
            <Minus size={16} />
          </button>
          <span className="text-lg font-bold w-8 text-center">{floors}</span>
          <button
            onClick={() => setFloors(floors + 1)}
            className="border p-2 rounded-md"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm">Floor Number:</label>
        <input
          type="text"
          className="border p-2 rounded-md ml-2 w-16 text-center"
          value={currentFloor}
          readOnly
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {rooms
          .filter((room) => selectedRooms.includes(room.id))
          .map((room) => (
            <div key={room.id} className="border w-72 p-6 rounded-md relative">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(room.blocks)].map((_, index) => (
                  <div key={index} className="bg-yellow-400 w-8 h-16"></div>
                ))}
              </div>
              <h3 className="text-center font-semibold mb-2">{room.label}</h3>
              <label className="text-xs block mb-1">
                Please mention room numbers*
              </label>
              <input
                type="text"
                className="border p-2 rounded-md w-full"
                placeholder="Eg 101A"
                value={roomNumbers[room.label] || ""}
                onChange={(e) =>
                  handleRoomNumberChange(room.label, e.target.value)
                }
              />
            </div>
          ))}
      </div>

      <div className="flex justify-between mt-6">
        {currentFloor < floors && (
          <button
            className="bg-yellow-400 text-black py-2 px-6 rounded-md"
            onClick={handleSaveFloor}
          >
            Add Next Floor 😊
          </button>
        )}
        <button
          className="border py-2 px-6 rounded-md"
          onClick={handleFinalSave}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

function RoomRent({ selectedRooms, nextStep }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roomData, setRoomData] = useState(() => {
    return JSON.parse(localStorage.getItem("roomRentData")) || {};
  });

  useEffect(() => {
    localStorage.setItem("roomRentData", JSON.stringify(roomData));
  }, [roomData]);

  const currentRoom = selectedRooms[currentIndex];

  const handleChange = (field, value) => {
    setRoomData((prev) => ({
      ...prev,
      [currentRoom]: { ...prev[currentRoom], [field]: value },
    }));
  };

  const handleCheckboxChange = (amenity) => {
    setRoomData((prev) => ({
      ...prev,
      [currentRoom]: {
        ...prev[currentRoom],
        amenities: {
          ...prev[currentRoom]?.amenities,
          [amenity]: !prev[currentRoom]?.amenities?.[amenity] || false,
        },
      },
    }));
  };

  const nextRoom = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedRooms.length);
  };

  const prevRoom = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedRooms.length - 1 : prev - 1
    );
  };

  const handleSave = () => {
    localStorage.setItem("roomRentData", JSON.stringify(roomData));
    alert("Rent details saved!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full  mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        Configure Rent & Amenities
      </h2>

      <div className="flex items-center justify-between">
        <button
          onClick={prevRoom}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ChevronLeft size={24} />
        </button>

        <h3 className="text-xl font-bold">{currentRoom}</h3>

        <button
          onClick={nextRoom}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <label className="block text-sm font-medium">
            Rent for Single Bed*
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            placeholder="₹"
            value={roomData[currentRoom]?.rent || ""}
            onChange={(e) => handleChange("rent", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Deposit*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            placeholder="₹"
            value={roomData[currentRoom]?.deposit || ""}
            onChange={(e) => handleChange("deposit", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Amenities</label>
          <div className="flex space-x-4">
            {["A.C", "Iron", "Wi-Fi", "Laundry"].map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={roomData[currentRoom]?.amenities?.[amenity] || false}
                  onChange={() => handleCheckboxChange(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        className="w-full mt-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500"
        // onClick={handleSave}
        onClick={() => {
          handleSave();
          nextStep();
        }}
      >
        Save and Continue
      </button>
    </div>
  );
}
