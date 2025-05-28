import { useState, useEffect } from "react";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { roomAPI } from "../PropertyController";

export default function HostelRoomSelection({ selectedRooms, nextStep, roomTypes }) {
  const [floors, setFloors] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [floorData, setFloorData] = useState(() => {
    return JSON.parse(localStorage.getItem("hostelRoomData")) || {};
  });
  const [roomNumbers, setRoomNumbers] = useState({});
  const [showRoomRent, setShowRoomRent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem("hostelRoomData", JSON.stringify(floorData));
  }, [floorData]);

  const handleRoomNumberChange = (roomType, value) => {
    setRoomNumbers((prev) => ({ ...prev, [roomType]: value }));
  };

  const rooms = [
    { id: "single", label: "Single Room", blocks: 1 },
    { id: "double", label: "Double Sharing", blocks: 2 },
    { id: "triple", label: "Triple Sharing", blocks: 3 },
    { id: "quad", label: "Four Sharing", blocks: 4 },
    { id: "quint", label: "Five Sharing", blocks: 5 },
    { id: "hex", label: "Six Sharing", blocks: 6 },
  ];

  const saveFloorData = () => {
    if (Object.keys(roomNumbers).length > 0) {
      setFloorData(prev => ({
        ...prev,
        [currentFloor]: roomNumbers
      }));
    }
  };

  const handleSaveFloor = () => {
    saveFloorData();
    setRoomNumbers({});
    if (currentFloor < floors) {
      setCurrentFloor((prev) => prev + 1);
    }
  };


const filteredRooms = rooms.filter(room => selectedRooms.includes(room.id));


  const handleFinalSave = async () => {
    setIsSaving(true);
    saveFloorData(); // Save current floor before final submission
    
    try {
      if (!selectedRooms || selectedRooms.length === 0) {
        throw new Error("Please select at least one room type");
      }

      // Transform data for API
      // Filter out any non-string values and ensure they match the enum
    const validSelectedRooms = selectedRooms.filter(room => 
      ['single', 'double', 'triple', 'quad', 'quint', 'hex'].includes(room)
    );
      const floorsData = Object.entries(floorData).map(([floorNum, rooms]) => ({
        floor: parseInt(floorNum),
        rooms: {
          'Single Room': rooms['Single Room'] || '',
          'Double Sharing': rooms['Double Sharing'] || '',
          'Triple Sharing': rooms['Triple Sharing'] || '',
          'Four Sharing': rooms['Four Sharing'] || '',
          'Five Sharing': rooms['Five Sharing'] || '',
          'Six Sharing': rooms['Six Sharing'] || ''
        }
      }));

      console.log("Sending floor data:", {
        selectedRooms: validSelectedRooms,
        floors: floorsData
      });

      const response = await roomAPI.saveFloorData({
        selectedRooms: validSelectedRooms,
        floors: floorsData
      });

      if (response.data.success) {
        localStorage.removeItem("hostelRoomData"); // Clear saved data
        setShowRoomRent(true);
      } else {
        throw new Error(response.data.message || "Failed to save floor data");
      }
    } catch (error) {
      console.error("Floor data save error:", {
        error: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (showRoomRent) {
    return (
      <RoomRent
        nextStep={nextStep}
        selectedRooms={filteredRooms.map(room => room.label)}
        roomTypes={roomTypes}
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
          className={`border py-2 px-6 rounded-md ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleFinalSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
}

function RoomRent({ selectedRooms, nextStep, roomTypes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roomData, setRoomData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("roomRentData")) || {};
    const initializedData = {};
    
    selectedRooms.forEach(roomLabel => {
      const roomType = roomTypes.find(r => r.label === roomLabel);
      initializedData[roomLabel] = {
        price: roomType?.price || 0,
        deposit: 0,
        availableCount: roomType?.availableCount || 0,
        amenities: {},
        ...savedData[roomLabel]
      };
    });
    
    return initializedData;
  });


  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem("roomRentData", JSON.stringify(roomData));
  }, [roomData]);

  const currentRoom = selectedRooms[currentIndex];
  const currentData = roomData[currentRoom] || {};

  const handleChange = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [currentRoom]: {
        ...prev[currentRoom],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (amenity) => {
    setRoomData(prev => ({
      ...prev,
      [currentRoom]: {
        ...prev[currentRoom],
        amenities: {
          ...prev[currentRoom]?.amenities,
          [amenity]: !prev[currentRoom]?.amenities?.[amenity]
        }
      }
    }));
  };

  const nextRoom = () => {
    setCurrentIndex(prev => (prev + 1) % selectedRooms.length);
  };

  const prevRoom = () => {
    setCurrentIndex(prev => prev === 0 ? selectedRooms.length - 1 : prev - 1);
  };

   const handleSave = async () => {
  setIsSaving(true);
  try {
    const rentData = Object.entries(roomData).map(([roomLabel, data]) => {
      const roomType = roomTypes.find(r => r.label === roomLabel);
      return {
        roomType: roomType?.type,
        price: data.price,
        deposit: data.deposit,
        availableCount: data.availableCount,
        amenities: Object.keys(data.amenities || {})
          .filter(key => data.amenities[key])
      };
    });

    console.log("Prepared rentData:", rentData); // Debug log

    const response = await roomAPI.saveRoomRentData(rentData); // Send array directly
      
    if (response.data.success) {
      localStorage.setItem("roomRentData", JSON.stringify(roomData));
      alert("Rent details saved successfully!");
      nextStep();
    } else {
      alert("Failed to save rent details: " + (response.data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Detailed error saving rent:", {
      error: error.message,
      response: error.response?.data,
      config: error.config
    });
    alert(`Failed to save rent details: ${error.response?.data?.message || error.message}`);
  } finally {
    setIsSaving(false);
  }
};
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        Configure Rent & Amenities
      </h2>

      <div className="flex items-center justify-between mb-4">
        <button onClick={prevRoom} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold">{currentRoom}</h3>
        <button onClick={nextRoom} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rent (₹)*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentData.price || 0}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deposit (₹)*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentData.deposit || 0}
            onChange={(e) => handleChange("deposit", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Available Rooms*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentData.availableCount || 0}
            onChange={(e) => handleChange("availableCount", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {["A.C", "Wi-Fi", "Laundry", "Iron", "TV", "Geyser"].map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-yellow-500"
                  checked={currentData.amenities?.[amenity] || false}
                  onChange={() => handleCheckboxChange(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

     <button
        className={`w-full mt-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save and Continue'}
      </button>
    </div>
  );
}