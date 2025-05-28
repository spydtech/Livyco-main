import { useState, useEffect } from "react";
import { roomAPI } from "../PropertyController";
import HostelRoomSelection from "./HostelRoomSelection";

const RoomSelection = ({ nextStep }) => {
  const [selectedRooms, setSelectedRooms] = useState(() => {
    const storedRooms = localStorage.getItem("selectedRooms");
    return storedRooms ? JSON.parse(storedRooms) : [];
  });
   const [proceed, setProceed] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await roomAPI.getRoomTypes();
        setRoomTypes(response.data.roomTypes);
      } catch (err) {
        setError("Failed to load room types");
        setRoomTypes([
          { type: "single", label: "Single Room", capacity: 1 },
          { type: "double", label: "Double Sharing", capacity: 2 },
          { type: "triple", label: "Triple Sharing", capacity: 3 },
          { type: "quad", label: "Four Sharing", capacity: 4 },
          { type: "quint", label: "Five Sharing", capacity: 5 },
          { type: "hex", label: "Six Sharing", capacity: 6 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomTypes();
  }, []);

  const saveRoomSelection = async () => {
    setIsSaving(true);
    try {
      const selectedRoomTypes = roomTypes
        .filter(room => selectedRooms.includes(room.type))
        .map(room => ({
          ...room,
          availableCount: room.availableCount || 0,
          price: room.price || 0,
          amenities: room.amenities || []
        }));

      await roomAPI.createRoomTypes(selectedRoomTypes);
    } catch (err) {
      console.error("Error saving room types:", err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };


  const toggleSelection = (type) => {
    setSelectedRooms(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleContinue = async () => {
    if (selectedRooms.length > 0) {
      try {
        await saveRoomSelection();
        setProceed(true);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to save selection");
      }
    } else {
      alert("Please select at least one room type");
    }
  };


  useEffect(() => {
    localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
  }, [selectedRooms]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="mx-auto p-6 rounded-lg max-w-4xl">
      {proceed ? (
        <HostelRoomSelection
          nextStep={nextStep}
          selectedRooms={selectedRooms}
          roomTypes={roomTypes}
        />
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6 text-center">
            Select room types
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roomTypes.map(room => (
              <div
                key={room.type}
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  selectedRooms.includes(room.type) 
                    ? "bg-yellow-100 border-yellow-400 shadow-md" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleSelection(room.type)}
              >
                <div className={`grid grid-cols-2 gap-1 w-16 h-16 ${
                  selectedRooms.includes(room.type) ? "bg-yellow-200" : "bg-gray-100"
                } rounded-md p-1`}>
                  {[...Array(room.capacity)].map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        selectedRooms.includes(room.type) ? "bg-yellow-500" : "bg-gray-300"
                      } w-full h-full rounded-sm`}
                    />
                  ))}
                </div>
                <p className="mt-3 font-medium">{room.label}</p>
                <p className="text-sm text-gray-500">
                  Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}
                </p>
                <div className="mt-2 w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                  {selectedRooms.includes(room.type) && (
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
                  )}
                </div>
              </div>
            ))}
          </div>

         <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinue}
              className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-8 rounded-lg transition-colors ${
                selectedRooms.length === 0 || isSaving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={selectedRooms.length === 0 || isSaving}
            >
              {isSaving ? 'Saving...' : 'Continue'}
            </button>
          </div>  
        </>
      )}
    </div>
  );
};

export default RoomSelection;