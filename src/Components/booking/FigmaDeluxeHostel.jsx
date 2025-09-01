// import React, { useState, useEffect } from "react";
// import bgImage from "../../assets/user/pgsearch/image (5).png";
// import Headers from "../Header";
// import { useNavigate, useLocation } from "react-router-dom";

// const VisualBox = ({ boxes }) => {
//   const boxSize = "w-[50px] h-[60px] bg-yellow-400 rounded-sm";

//   switch (boxes) {
//     case 1:
//       return <div className="flex justify-center items-center h-[100px]"><div className={boxSize} /></div>;
//     case 2:
//       return (
//         <div className="flex justify-center items-center gap-[6px] h-[100px]">
//           <div className={boxSize} />
//           <div className={boxSize} />
//         </div>
//       );
//     case 3:
//       return (
//         <div className="flex flex-col items-center gap-[6px] h-[120px] justify-center">
//           <div className="flex gap-[6px]">
//             <div className={boxSize} />
//             <div className={boxSize} />
//           </div>
//           <div className={boxSize} />
//         </div>
//       );
//     case 4:
//       return (
//         <div className="grid grid-cols-2 gap-[6px] w-[120px] h-[120px] justify-center items-center">
//           {[...Array(4)].map((_, i) => <div key={i} className={boxSize} />)}
//         </div>
//       );
//     case 5:
//       const wideBoxSize = "w-[110px] h-[60px] bg-yellow-400 rounded-sm";
//       return (
//         <div className="flex flex-col items-center gap-[6px] h-[200px] justify-center">
//           <div className="flex justify-center"><div className={wideBoxSize} /></div>
//           <div className="flex gap-[6px] justify-center">
//             <div className={boxSize} />
//             <div className={boxSize} />
//           </div>
//           <div className="flex gap-[6px] justify-center">
//             <div className={boxSize} />
//             <div className={boxSize} />
//           </div>
//         </div>
//       );
//     case 6:
//       return (
//         <div className="grid grid-cols-3 gap-[6px] w-[160px] h-[130px] justify-center items-center">
//           {[...Array(6)].map((_, i) => <div key={i} className={boxSize} />)}
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// const RoomBlock = ({ sharing, floor, roomNumber, selectedRooms, toggleRoom, globalSelectedRooms, beds, selectedRoomType, setSelectedRoomType }) => (
//   <div className="mb-2">
//     <div className="text-[13px] font-semibold mb-1">{roomNumber}</div>
//     <div className="flex flex-wrap gap-2">
//       {beds.map((bed, index) => {
//         const fullBedId = `${sharing}-${floor}-${roomNumber}-${bed}`;
//         const isSelected = selectedRooms.includes(`${roomNumber}-${bed}`);
//         const isDisabled = !isSelected && globalSelectedRooms.includes(fullBedId);
        
//         return (
//           <button
//             key={index}
//             onClick={() => {
//               toggleRoom(sharing, floor, roomNumber, bed);
//               setSelectedRoomType(sharing);
//             }}
//             disabled={isDisabled}
//             className={`text-[12px] px-3 py-2 rounded border transition-colors duration-200 ${
//               isSelected
//                 ? "bg-green-600 text-white border-green-600"
//                 : "bg-white text-gray-800 border-gray-300"
//             } ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
//           >
//             {bed}
//           </button>
//         );
//       })}
//     </div>
//   </div>
// );

// const FloorRow = ({ sharing, floorLabel, roomsConfig, selectedRoomsMap, toggleRoom, globalSelectedRooms, selectedRoomType, setSelectedRoomType }) => (
//   <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//     <div className="text-[16px] font-semibold mb-3 text-blue-800">{floorLabel}</div>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {Object.entries(roomsConfig).map(([roomNumber, beds]) => (
//         <RoomBlock
//           key={roomNumber}
//           sharing={sharing}
//           floor={floorLabel}
//           roomNumber={roomNumber}
//           beds={beds}
//           selectedRooms={selectedRoomsMap[`${sharing}-${floorLabel}-${roomNumber}`] || []}
//           toggleRoom={toggleRoom}
//           globalSelectedRooms={globalSelectedRooms}
//           selectedRoomType={selectedRoomType}
//           setSelectedRoomType={setSelectedRoomType}
//         />
//       ))}
//     </div>
//   </div>
// );

// const FigmaDeluxeHostel = () => {
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [selectedDate, setSelectedDate] = useState("");
//   const [personCount, setPersonCount] = useState("");
//   const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
//   const [globalSelectedRooms, setGlobalSelectedRooms] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Generate sharing types based on actual room data
//   const generateSharingTypes = (roomTypes) => {
//     if (!roomTypes || roomTypes.length === 0) {
//       return [
//         { type: "Single Room", boxes: 1, label: "Single Room" },
//         { type: "Two Sharing", boxes: 2, label: "Two Sharing" },
//         { type: "Triple Sharing", boxes: 3, label: "Triple Sharing" },
//         { type: "Four Sharing", boxes: 4, label: "Four Sharing" },
//       ];
//     }

//     return roomTypes.map(roomType => {
//       let boxes;
//       switch (roomType.type) {
//         case "single": boxes = 1; break;
//         case "double": boxes = 2; break;
//         case "triple": boxes = 3; break;
//         case "four": boxes = 4; break;
//         default: boxes = parseInt(roomType.type) || 2;
//       }
      
//       return {
//         type: roomType.type,
//         boxes: boxes,
//         label: roomType.label || `${boxes} Sharing`,
//         price: roomType.price,
//         capacity: roomType.capacity,
//         deposit: roomType.deposit
//       };
//     });
//   };

//   const [sharingTypes, setSharingTypes] = useState([]);
//   const [filteredTypes, setFilteredTypes] = useState([]);

//   useEffect(() => {
//     if (location.state) {
//       setBookingData(location.state);
//       const types = generateSharingTypes(location.state.roomTypes);
//       setSharingTypes(types);
//       setFilteredTypes(types);
//       setLoading(false);
//     } else {
//       setError("No booking data available");
//       setLoading(false);
//     }
//   }, [location.state]);

//   const toggleRoom = (sharing, floor, roomNumber, bed) => {
//     const key = `${sharing}-${floor}-${roomNumber}`;
//     const bedId = `${roomNumber}-${bed}`;
    
//     setSelectedRoomsMap((prev) => {
//       const current = prev[key] || [];
//       let updated;
      
//       if (current.includes(bedId)) {
//         updated = current.filter((b) => b !== bedId);
//       } else {
//         // Check capacity limits
//         const roomType = sharingTypes.find(st => st.type === sharing);
//         if (roomType && current.length >= roomType.capacity) {
//           alert(`Maximum ${roomType.capacity} beds allowed for ${sharing} sharing`);
//           return prev;
//         }
//         updated = [...current, bedId];
//       }
      
//       const newMap = { ...prev, [key]: updated };
//       const allSelectedBedIds = Object.entries(newMap).flatMap(
//         ([key, beds]) => beds.map((bed) => `${key}-${bed}`)
//       );
//       setGlobalSelectedRooms(allSelectedBedIds);
//       return newMap;
//     });
//   };

//   const handleAddProofs = () => {
//     if (!bookingData || globalSelectedRooms.length === 0) {
//       alert("Please select at least one bed before proceeding");
//       return;
//     }

//     if (!selectedRoomType) {
//       alert("Please select a room type");
//       return;
//     }

//     const updatedBookingData = {
//       ...bookingData,
//       selectedRooms: globalSelectedRooms,
//       selectedRoomType,
//       selectedDate,
//       personCount: parseInt(personCount) || 1
//     };

//     navigate("/user/add-proof", { state: updatedBookingData });
//   };

//   const handleSearch = () => {
//     const count = parseInt(personCount);
//     if (!isNaN(count) && count > 0) {
//       const filtered = sharingTypes.filter((room) => room.capacity >= count);
//       setFilteredTypes(filtered);
//     } else {
//       setFilteredTypes(sharingTypes);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-xl">Loading booking information...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-xl text-red-600">{error}</div>
//         <button 
//           onClick={() => navigate(-1)}
//           className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!bookingData) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-xl">No booking data available</div>
//       </div>
//     );
//   }

//   const { propertyName, roomTypes, rooms, owner } = bookingData;

//   return (
//     <>
//       <Headers />
//       <div className="min-h-screen w-full py-24 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
//         <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 pb-16 bg-white bg-opacity-95">
//           <div className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-1 text-center md:text-left">
//             {propertyName}
//           </div>

//           <div className="flex flex-wrap gap-4 sm:gap-6 my-4 justify-center md:justify-start">
//             {roomTypes && roomTypes[0]?.amenities?.map((amenity, i) => (
//               <div key={i} className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-full">
//                 <span className="text-xs sm:text-sm">{amenity}</span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap gap-3 items-center justify-center w-full max-w-[720px] mx-auto mb-6">
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="border px-3 py-2 rounded text-sm w-[140px]"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Number of Persons"
//               value={personCount}
//               onChange={(e) => setPersonCount(e.target.value)}
//               className="border px-3 py-2 rounded text-sm w-[140px]"
//               min={1}
//               required
//             />
//             <button
//               className="bg-[#0120c8] text-white text-sm px-4 py-2 rounded"
//               onClick={handleSearch}
//             >
//               Search Rooms
//             </button>
//           </div>

//           <div className="space-y-8">
//             {filteredTypes.map((roomType, index) => {
//               const roomConfig = rooms?.floorConfig?.floors?.[0]?.rooms || {};
              
//               return (
//                 <div key={index} className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-lg shadow">
//                   <div className="w-full lg:w-1/4 flex flex-col items-center justify-center border rounded-lg p-4">
//                     <VisualBox boxes={roomType.boxes} />
//                     <p className="text-sm font-medium mt-2 text-center">{roomType.label}</p>
//                     <p className="text-lg text-green-600 font-semibold mt-1">₹{roomType.price}</p>
//                     <p className="text-xs text-gray-500">Deposit: ₹{roomType.deposit}</p>
//                     <p className="text-xs text-gray-500">Capacity: {roomType.capacity} persons</p>
//                   </div>
                  
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold mb-4">Available Rooms - Floor 1</h3>
//                     <FloorRow
//                       sharing={roomType.type}
//                       floorLabel="Floor 1"
//                       roomsConfig={roomConfig}
//                       selectedRoomsMap={selectedRoomsMap}
//                       toggleRoom={toggleRoom}
//                       globalSelectedRooms={globalSelectedRooms}
//                       selectedRoomType={selectedRoomType}
//                       setSelectedRoomType={setSelectedRoomType}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="text-center mt-8">
//             <div className="mb-4">
//               <strong>Selected Room Type: </strong>
//               {selectedRoomType || 'None selected'}
//             </div>
//             {/* //cost */}
//             <div className="mb-4">
//               <strong>Total Cost: </strong>
//               {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.price * globalSelectedRooms.length || 0}` : '₹0'}
//             </div>
//             <div className="mb-4">
//               <strong>Selected Beds: </strong>
//               {globalSelectedRooms.length > 0 
//                 ? globalSelectedRooms.join(', ') 
//                 : 'No beds selected'}
//             </div>
            
//             <button
//               className="bg-[#0B2DC9] text-white text-base font-normal px-10 sm:px-16 md:px-28 py-3 sm:py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
//               onClick={handleAddProofs}
//               disabled={globalSelectedRooms.length === 0 || !selectedRoomType}
//             >
//               {globalSelectedRooms.length === 0 ? 'Select Beds First' : !selectedRoomType ? 'Select Room Type' : 'Proceed to Payment'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FigmaDeluxeHostel;



import React, { useState, useEffect } from "react";
import bgImage from "../../assets/user/pgsearch/image (5).png";
import Headers from "../Header";
import { useNavigate, useLocation } from "react-router-dom";

const VisualBox = ({ boxes }) => {
  const boxSize = "w-[50px] h-[60px] bg-yellow-400 rounded-sm";

  switch (boxes) {
    case 1:
      return <div className="flex justify-center items-center h-[100px]"><div className={boxSize} /></div>;
    case 2:
      return (
        <div className="flex justify-center items-center gap-[6px] h-[100px]">
          <div className={boxSize} />
          <div className={boxSize} />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center gap-[6px] h-[120px] justify-center">
          <div className="flex gap-[6px]">
            <div className={boxSize} />
            <div className={boxSize} />
          </div>
          <div className={boxSize} />
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 gap-[6px] w-[120px] h-[120px] justify-center items-center">
          {[...Array(4)].map((_, i) => <div key={i} className={boxSize} />)}
        </div>
      );
    case 5:
      const wideBoxSize = "w-[110px] h-[60px] bg-yellow-400 rounded-sm";
      return (
        <div className="flex flex-col items-center gap-[6px] h-[200px] justify-center">
          <div className="flex justify-center"><div className={wideBoxSize} /></div>
          <div className="flex gap-[6px] justify-center">
            <div className={boxSize} />
            <div className={boxSize} />
          </div>
          <div className="flex gap-[6px] justify-center">
            <div className={boxSize} />
            <div className={boxSize} />
          </div>
        </div>
      );
    case 6:
      return (
        <div className="grid grid-cols-3 gap-[6px] w-[160px] h-[130px] justify-center items-center">
          {[...Array(6)].map((_, i) => <div key={i} className={boxSize} />)}
        </div>
      );
    default:
      return null;
  }
};

const RoomBlock = ({ sharing, floor, roomNumber, selectedRooms, toggleRoom, globalSelectedRooms, beds, selectedRoomType, setSelectedRoomType, unavailableRooms }) => {
  // Generate proper room identifiers for availability checking
  const getBedIdentifier = (bed) => {
    // Remove spaces from bed names to match room configuration
    const formattedBed = typeof bed === 'string' ? bed.replace(/\s+/g, '') : bed;
    return `${sharing}-${roomNumber}-${formattedBed}`;
  };

  return (
    <div className="mb-2">
      <div className="text-[13px] font-semibold mb-1">{roomNumber}</div>
      <div className="flex flex-wrap gap-2">
        {beds.map((bed, index) => {
          const bedLabel = typeof bed === 'string' && bed.includes('Bed') ? bed : `Bed${index + 1}`;
          const bedIdentifier = getBedIdentifier(bedLabel);
          const isSelected = selectedRooms.includes(bedLabel);
          const isUnavailable = unavailableRooms.includes(bedIdentifier);
          
          return (
            <button
              key={index}
              onClick={() => {
                if (!isUnavailable) {
                  toggleRoom(sharing, floor, roomNumber, bedLabel);
                  setSelectedRoomType(sharing);
                }
              }}
              disabled={isUnavailable}
              className={`text-[12px] px-3 py-2 rounded border transition-colors duration-200 ${
                isSelected
                  ? "bg-green-600 text-white border-green-600"
                  : isUnavailable
                  ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
              title={isUnavailable ? "This bed is not available for the selected date" : ""}
            >
              {bedLabel}
              {isUnavailable && " ❌"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FloorRow = ({ sharing, floorLabel, roomsConfig, selectedRoomsMap, toggleRoom, globalSelectedRooms, selectedRoomType, setSelectedRoomType, unavailableRooms }) => (
  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="text-[16px] font-semibold mb-3 text-blue-800">{floorLabel}</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(roomsConfig).map(([roomNumber, beds]) => (
        <RoomBlock
          key={roomNumber}
          sharing={sharing}
          floor={floorLabel}
          roomNumber={roomNumber}
          beds={beds}
          selectedRooms={selectedRoomsMap[`${sharing}-${roomNumber}`] || []}
          toggleRoom={toggleRoom}
          globalSelectedRooms={globalSelectedRooms}
          selectedRoomType={selectedRoomType}
          setSelectedRoomType={setSelectedRoomType}
          unavailableRooms={unavailableRooms}
        />
      ))}
    </div>
  </div>
);

const FigmaDeluxeHostel = () => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unavailableRooms, setUnavailableRooms] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [personCount, setPersonCount] = useState("");
  const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
  const [globalSelectedRooms, setGlobalSelectedRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Generate sharing types based on actual room data
  const generateSharingTypes = (roomTypes) => {
    if (!roomTypes || roomTypes.length === 0) {
      return [
        { type: "Single Room", boxes: 1, label: "Single Room" },
        { type: "Two Sharing", boxes: 2, label: "Two Sharing" },
        { type: "Triple Sharing", boxes: 3, label: "Triple Sharing" },
        { type: "Four Sharing", boxes: 4, label: "Four Sharing" },
      ];
    }

    return roomTypes.map(roomType => {
      let boxes;
      switch (roomType.type) {
        case "single": boxes = 1; break;
        case "double": boxes = 2; break;
        case "triple": boxes = 3; break;
        case "four": boxes = 4; break;
        default: boxes = parseInt(roomType.type) || 2;
      }
      
      return {
        type: roomType.type,
        boxes: boxes,
        label: roomType.label || `${boxes} Sharing`,
        price: roomType.price,
        capacity: roomType.capacity,
        deposit: roomType.deposit
      };
    });
  };

  const [sharingTypes, setSharingTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);

  useEffect(() => {
    if (location.state) {
      setBookingData(location.state);
      const types = generateSharingTypes(location.state.roomTypes);
      setSharingTypes(types);
      setFilteredTypes(types);
      setLoading(false);
      
      // Check for unavailable rooms if we have a selected date
      if (location.state.selectedDate) {
        setSelectedDate(location.state.selectedDate);
        checkRoomAvailability(location.state.selectedDate, location.state.propertyId || location.state._id);
      }
    } else {
      setError("No booking data available");
      setLoading(false);
    }
  }, [location.state]);

  // Function to check room availability
  const checkRoomAvailability = async (date, propertyId) => {
    if (!date || !propertyId) return;
    
    try {
      setAvailabilityChecked(false);
      const response = await fetch('http://localhost:5000/api/auth/bookings/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          propertyId: propertyId
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Availability result:", result);
      
      if (result.success) {
        setUnavailableRooms(result.unavailableRooms || []);
        setAvailabilityChecked(true);
        
        // Clear any selected rooms that are now unavailable
        setSelectedRoomsMap(prev => {
          const newMap = {...prev};
          Object.keys(newMap).forEach(key => {
            const [sharing, roomNumber] = key.split('-');
            newMap[key] = newMap[key].filter(bed => {
              const formattedBed = bed.replace(/\s+/g, '');
              const bedIdentifier = `${sharing}-${roomNumber}-${formattedBed}`;
              return !result.unavailableRooms.includes(bedIdentifier);
            });
          });
          return newMap;
        });
        
        // Update global selected rooms
        const allSelectedBedIds = Object.entries(selectedRoomsMap).flatMap(
          ([key, beds]) => beds.map((bed) => {
            const [sharing, roomNumber] = key.split('-');
            const formattedBed = bed.replace(/\s+/g, '');
            return `${sharing}-${roomNumber}-${formattedBed}`;
          })
        );
        setGlobalSelectedRooms(allSelectedBedIds);
      }
    } catch (error) {
      console.error("Error checking room availability:", error);
      setUnavailableRooms([]);
      setAvailabilityChecked(true);
    }
  };

  const toggleRoom = (sharing, floor, roomNumber, bed) => {
    // Remove spaces from bed names to match room configuration
    const formattedBed = bed.replace(/\s+/g, '');
    const key = `${sharing}-${roomNumber}`;
    const bedId = bed; // Keep original for display
    const fullBedId = `${sharing}-${roomNumber}-${formattedBed}`;
    
    // Check if this room is unavailable
    if (unavailableRooms.includes(fullBedId)) {
      alert("This bed is not available for the selected date. Please choose another bed.");
      return;
    }
    
    setSelectedRoomsMap((prev) => {
      const current = prev[key] || [];
      let updated;
      
      if (current.includes(bedId)) {
        updated = current.filter((b) => b !== bedId);
      } else {
        // Check capacity limits
        const roomType = sharingTypes.find(st => st.type === sharing);
        if (roomType && current.length >= roomType.capacity) {
          alert(`Maximum ${roomType.capacity} beds allowed for ${sharing} sharing`);
          return prev;
        }
        updated = [...current, bedId];
      }
      
      const newMap = { ...prev, [key]: updated };
      const allSelectedBedIds = Object.entries(newMap).flatMap(
        ([key, beds]) => beds.map((bed) => {
          const [sharing, roomNumber] = key.split('-');
          const formattedBed = bed.replace(/\s+/g, '');
          return `${sharing}-${roomNumber}-${formattedBed}`;
        })
      );
      setGlobalSelectedRooms(allSelectedBedIds);
      return newMap;
    });
  };

  const handleAddProofs = () => {
    if (!bookingData || globalSelectedRooms.length === 0) {
      alert("Please select at least one bed before proceeding");
      return;
    }

    if (!selectedRoomType) {
      alert("Please select a room type");
      return;
    }

    // Check if any selected rooms are unavailable
    const unavailableSelected = globalSelectedRooms.some(room => 
      unavailableRooms.includes(room)
    );
    
    if (unavailableSelected) {
      alert("Some of your selected rooms are no longer available. Please refresh the page and select different rooms.");
      return;
    }

    // Calculate advance amount (first month's rent)
    const roomType = sharingTypes.find(st => st.type === selectedRoomType);
    const advanceAmount = roomType ? roomType.price : 0;
    const depositAmount = roomType ? roomType.deposit * globalSelectedRooms.length : 0;
    const totalAmount = advanceAmount + depositAmount;

    const updatedBookingData = {
      ...bookingData,
      selectedRooms: globalSelectedRooms,
      selectedRoomType,
      selectedDate,
      personCount: parseInt(personCount) || 1,
      propertyId: bookingData._id || bookingData.propertyId,
      advanceAmount,
      depositAmount,
      totalAmount
    };

    navigate("/user/add-proof", { state: updatedBookingData });
  };

  const handleSearch = () => {
    const count = parseInt(personCount);
    if (!isNaN(count) && count > 0) {
      const filtered = sharingTypes.filter((room) => room.capacity >= count);
      setFilteredTypes(filtered);
      
      // Check availability when date is selected
      if (selectedDate && bookingData) {
        checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
      }
    } else {
      setFilteredTypes(sharingTypes);
    }
  };

  // Update availability when date changes
  useEffect(() => {
    if (selectedDate && bookingData) {
      checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
    }
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading booking information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
        <button 
          onClick={() => navigate(-1)}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">No booking data available</div>
      </div>
    );
  }

  const { propertyName, roomTypes, rooms, owner } = bookingData;

  return (
    <>
      <Headers />
      <div className="min-h-screen w-full py-24 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 pb-16 bg-white bg-opacity-95">
          <div className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-1 text-center md:text-left">
            {propertyName}
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 my-4 justify-center md:justify-start">
            {roomTypes && roomTypes[0]?.amenities?.map((amenity, i) => (
              <div key={i} className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-full">
                <span className="text-xs sm:text-sm">{amenity}</span>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap gap-3 items-center justify-center w-full max-w-[720px] mx-auto mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-3 py-2 rounded text-sm w-[140px]"
              required
            />
            <input
              type="number"
              placeholder="Number of Persons"
              value={personCount}
              onChange={(e) => setPersonCount(e.target.value)}
              className="border px-3 py-2 rounded text-sm w-[140px]"
              min={1}
              required
            />
            <button
              className="bg-[#0120c8] text-white text-sm px-4 py-2 rounded"
              onClick={handleSearch}
            >
              Search Rooms
            </button>
            <button
              onClick={() => checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId)}
              className="bg-gray-200 text-gray-800 text-sm px-3 py-2 rounded ml-2"
              title="Refresh availability"
            >
              🔄 Refresh
            </button>
          </div>

          {!availabilityChecked && selectedDate && (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
              <p>Checking room availability for {selectedDate}...</p>
            </div>
          )}

          {availabilityChecked && unavailableRooms.length > 0 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p className="font-bold">Note</p>
              <p>Some rooms are not available for your selected date. Unavailable rooms are marked with ❌.</p>
            </div>
          )}

          {availabilityChecked && unavailableRooms.length === 0 && selectedDate && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p className="font-bold">Good news!</p>
              <p>All rooms are available for {selectedDate}.</p>
            </div>
          )}

          <div className="space-y-8">
            {filteredTypes.map((roomType, index) => {
              const roomConfig = rooms?.floorConfig?.floors?.[0]?.rooms || {};
              
              return (
                <div key={index} className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-lg shadow">
                  <div className="w-full lg:w-1/4 flex flex-col items-center justify-center border rounded-lg p-4">
                    <VisualBox boxes={roomType.boxes} />
                    <p className="text-sm font-medium mt-2 text-center">{roomType.label}</p>
                    <p className="text-lg text-green-600 font-semibold mt-1">₹{roomType.price}</p>
                    <p className="text-xs text-gray-500">Deposit: ₹{roomType.deposit}</p>
                    <p className="text-xs text-gray-500">Capacity: {roomType.capacity} persons</p>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-4">Available Rooms - Floor 1</h3>
                    <FloorRow
                      sharing={roomType.type}
                      floorLabel="Floor 1"
                      roomsConfig={roomConfig}
                      selectedRoomsMap={selectedRoomsMap}
                      toggleRoom={toggleRoom}
                      globalSelectedRooms={globalSelectedRooms}
                      selectedRoomType={selectedRoomType}
                      setSelectedRoomType={setSelectedRoomType}
                      unavailableRooms={unavailableRooms}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <div className="mb-4">
              <strong>Selected Room Type: </strong>
              {selectedRoomType || 'None selected'}
            </div>
            <div className="mb-4">
              <strong>Advance Amount (First Month): </strong>
              {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.price || 0}` : '₹0'}
            </div>
            <div className="mb-4">
              <strong>Security Deposit: </strong>
              {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length || 0}` : '₹0'}
            </div>
            <div className="mb-4">
              <strong>Total Amount: </strong>
              {selectedRoomType ? `₹${(sharingTypes.find(st => st.type === selectedRoomType)?.price + (sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length)) || 0}` : '₹0'}
            </div>
            <div className="mb-4">
              <strong>Selected Beds: </strong>
              {globalSelectedRooms.length > 0 
                ? globalSelectedRooms.join(', ') 
                : 'No beds selected'}
            </div>
            
            <button
              className="bg-[#0B2DC9] text-white text-base font-normal px-10 sm:px-16 md:px-28 py-3 sm:py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleAddProofs}
              disabled={globalSelectedRooms.length === 0 || !selectedRoomType || !availabilityChecked}
            >
              {!availabilityChecked ? 'Checking Availability...' : 
               globalSelectedRooms.length === 0 ? 'Select Beds First' : 
               !selectedRoomType ? 'Select Room Type' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FigmaDeluxeHostel;

// import React, { useState, useEffect } from "react";
// import bgImage from "../../assets/user/pgsearch/image (5).png";
// import wifiIcon from "../../assets/user/pgsearch/images/image5.png";
// import foodIcon from "../../assets/user/pgsearch/images/image10.png";
// import laundryIcon from "../../assets/user/pgsearch/images/image12.png";
// import parkingIcon from "../../assets/user/pgsearch/images/image6.png";
// import hotWaterIcon from "../../assets/user/pgsearch/images/image8.png";
// import Headers from "../Header";
// import { useNavigate, useLocation } from "react-router-dom";

// const VisualBox = ({ boxes }) => {
//   const boxSize = "w-[50px] h-[60px] bg-yellow-400 rounded-sm";

//   switch (boxes) {
//     case 1:
//       return <div className="flex justify-center items-center h-[100px]"><div className={boxSize} /></div>;
//     case 2:
//       return (
//         <div className="flex justify-center items-center gap-[6px] h-[100px]">
//           <div className={boxSize} />
//           <div className={boxSize} />
//         </div>
//       );
//     case 3:
//       return (
//         <div className="flex flex-col items-center gap-[6px] h-[120px] justify-center">
//           <div className="flex gap-[6px]">
//             <div className={boxSize} />
//             <div className={boxSize} />
//           </div>
//           <div className={boxSize} />
//         </div>
//       );
//     case 4:
//       return (
//         <div className="grid grid-cols-2 gap-[6px] w-[120px] h-[120px] justify-center items-center">
//           {[...Array(4)].map((_, i) => <div key={i} className={boxSize} />)}
//         </div>
//       );
//     case 5:
//       const wideBoxSize = "w-[110px] h-[60px] bg-yellow-400 rounded-sm";
//       return (
//         <div className="flex flex-col items-center gap-[6px] h-[200px] justify-center">
//           <div className="flex justify-center"><div className={wideBoxSize} /></div>
//           <div className="flex gap-[6px] justify-center">
//             <div className={boxSize} />
//             <div className={boxSize} />
//           </div>
//           <div className="flex gap-[6px] justify-center">
//             <div className={boxSize} />
//             <div className={boxSize} />
//           </div>
//         </div>
//       );
//     case 6:
//       return (
//         <div className="grid grid-cols-3 gap-[6px] w-[160px] h-[130px] justify-center items-center">
//           {[...Array(6)].map((_, i) => <div key={i} className={boxSize} />)}
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// const RoomBlock = ({ sharing, floor, roomNumber, selectedRooms, toggleRoom, globalSelectedRooms, beds }) => (
//   <div className="mb-2">
//     <div className="text-[13px] font-semibold mb-1">{roomNumber}</div>
//     <div className="flex flex-wrap gap-2">
//       {beds.map((bed, index) => {
//         const fullBedId = `${sharing}-${floor}-${roomNumber}-${bed}`;
//         const isSelected = selectedRooms.includes(`${roomNumber}-${bed}`);
//         const isDisabled = !isSelected && globalSelectedRooms.includes(fullBedId);
        
//         return (
//           <button
//             key={index}
//             onClick={() => toggleRoom(sharing, floor, roomNumber, bed)}
//             disabled={isDisabled}
//             className={`text-[12px] px-3 py-2 rounded border transition-colors duration-200 ${
//               isSelected
//                 ? "bg-green-600 text-white border-green-600"
//                 : "bg-white text-gray-800 border-gray-300"
//             } ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
//           >
//             {bed}
//           </button>
//         );
//       })}
//     </div>
//   </div>
// );

// const FloorRow = ({ sharing, floorLabel, roomsConfig, selectedRoomsMap, toggleRoom, globalSelectedRooms }) => (
//   <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//     <div className="text-[16px] font-semibold mb-3 text-blue-800">{floorLabel}</div>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {Object.entries(roomsConfig).map(([roomNumber, beds]) => (
//         <RoomBlock
//           key={roomNumber}
//           sharing={sharing}
//           floor={floorLabel}
//           roomNumber={roomNumber}
//           beds={beds}
//           selectedRooms={selectedRoomsMap[`${sharing}-${floorLabel}-${roomNumber}`] || []}
//           toggleRoom={toggleRoom}
//           globalSelectedRooms={globalSelectedRooms}
//         />
//       ))}
//     </div>
//   </div>
// );

// const FigmaDeluxeHostel = () => {
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [selectedDate, setSelectedDate] = useState("");
//   const [personCount, setPersonCount] = useState("");
//   const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
//   const [globalSelectedRooms, setGlobalSelectedRooms] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Generate sharing types based on actual room data
//   const generateSharingTypes = (roomTypes) => {
//     if (!roomTypes || roomTypes.length === 0) {
//       return [
//         { type: "Single Room", boxes: 1, label: "Single Room" },
//         { type: "Two Sharing", boxes: 2, label: "Two Sharing" },
//         { type: "Triple Sharing", boxes: 3, label: "Triple Sharing" },
//         { type: "Four Sharing", boxes: 4, label: "Four Sharing" },
//       ];
//     }

//     return roomTypes.map(roomType => {
//       let boxes;
//       switch (roomType.type) {
//         case "single": boxes = 1; break;
//         case "double": boxes = 2; break;
//         case "triple": boxes = 3; break;
//         case "four": boxes = 4; break;
//         default: boxes = parseInt(roomType.type) || 2;
//       }
      
//       return {
//         type: roomType.type,
//         boxes: boxes,
//         label: roomType.label || `${boxes} Sharing`,
//         price: roomType.price,
//         capacity: roomType.capacity,
//         deposit: roomType.deposit
//       };
//     });
//   };

//   const [sharingTypes, setSharingTypes] = useState([]);
//   const [filteredTypes, setFilteredTypes] = useState([]);

//   useEffect(() => {
//     if (location.state) {
//       setBookingData(location.state);
//       const types = generateSharingTypes(location.state.roomTypes);
//       setSharingTypes(types);
//       setFilteredTypes(types);
//       setLoading(false);
//     } else {
//       setError("No booking data available");
//       setLoading(false);
//     }
//   }, [location.state]);

//   const toggleRoom = (sharing, floor, roomNumber, bed) => {
//     const key = `${sharing}-${floor}-${roomNumber}`;
//     const bedId = `${roomNumber}-${bed}`;
    
//     setSelectedRoomsMap((prev) => {
//       const current = prev[key] || [];
//       let updated;
      
//       if (current.includes(bedId)) {
//         updated = current.filter((b) => b !== bedId);
//       } else {
//         // Check capacity limits
//         const roomType = sharingTypes.find(st => st.type === sharing);
//         if (roomType && current.length >= roomType.capacity) {
//           alert(`Maximum ${roomType.capacity} beds allowed for ${sharing} sharing`);
//           return prev;
//         }
//         updated = [...current, bedId];
//       }
      
//       const newMap = { ...prev, [key]: updated };
//       const allSelectedBedIds = Object.entries(newMap).flatMap(
//         ([key, beds]) => beds.map((bed) => `${key}-${bed}`)
//       );
//       setGlobalSelectedRooms(allSelectedBedIds);
//       return newMap;
//     });
//   };

//   // const handleAddProofs = () => {
//   //   if (!bookingData || globalSelectedRooms.length === 0) {
//   //     alert("Please select at least one bed before proceeding");
//   //     return;
//   //   }

//   //   const updatedBookingData = {
//   //     ...bookingData,
//   //     selectedRooms: globalSelectedRooms,
//   //     selectedDate,
//   //     personCount: parseInt(personCount) || 1
//   //   };

//   //   navigate("/user/add-proof", { state: updatedBookingData });
//   // };

//   const [selectedRoomType, setSelectedRoomType] = useState(null);

// const handleAddProofs = () => {
//   if (!bookingData || globalSelectedRooms.length === 0) {
//     alert("Please select at least one bed before proceeding");
//     return;
//   }

//   if (!selectedRoomType) {
//     alert("Please select a room type");
//     return;
//   }

//   const updatedBookingData = {
//     ...bookingData,
//     selectedRooms: globalSelectedRooms,
//     selectedRoomType,
//     selectedDate,
//     personCount: parseInt(personCount) || 1
//   };

//   navigate("/user/add-proof", { state: updatedBookingData });
// };

//   const handleSearch = () => {
//     const count = parseInt(personCount);
//     if (!isNaN(count) && count > 0) {
//       const filtered = sharingTypes.filter((room) => room.capacity >= count);
//       setFilteredTypes(filtered);
//     } else {
//       setFilteredTypes(sharingTypes);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-xl">Loading booking information...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-xl text-red-600">{error}</div>
//         <button 
//           onClick={() => navigate(-1)}
//           className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!bookingData) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-xl">No booking data available</div>
//       </div>
//     );
//   }

//   const { propertyName, roomTypes, rooms, owner } = bookingData;

//   return (
//     <>
//       <Headers />
//       <div className="min-h-screen w-full py-24 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
//         <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 pb-16 bg-white bg-opacity-95">
//           <div className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-1 text-center md:text-left">
//             {propertyName}
//           </div>

//           <div className="flex flex-wrap gap-4 sm:gap-6 my-4 justify-center md:justify-start">
//             {roomTypes && roomTypes[0]?.amenities?.map((amenity, i) => (
//               <div key={i} className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-full">
//                 <span className="text-xs sm:text-sm">{amenity}</span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap gap-3 items-center justify-center w-full max-w-[720px] mx-auto mb-6">
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="border px-3 py-2 rounded text-sm w-[140px]"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Number of Persons"
//               value={personCount}
//               onChange={(e) => setPersonCount(e.target.value)}
//               className="border px-3 py-2 rounded text-sm w-[140px]"
//               min={1}
//               required
//             />
//             <button
//               className="bg-[#0120c8] text-white text-sm px-4 py-2 rounded"
//               onClick={handleSearch}
//             >
//               Search Rooms
//             </button>
//           </div>

//           <div className="space-y-8">
//             {filteredTypes.map((roomType, index) => {
//               const roomConfig = rooms?.floorConfig?.floors?.[0]?.rooms || {};
              
//               return (
//                 <div key={index} className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-lg shadow">
//                   <div className="w-full lg:w-1/4 flex flex-col items-center justify-center border rounded-lg p-4">
//                     <VisualBox boxes={roomType.boxes} />
//                     <p className="text-sm font-medium mt-2 text-center">{roomType.label}</p>
//                     <p className="text-lg text-green-600 font-semibold mt-1">₹{roomType.price}</p>
//                     <p className="text-xs text-gray-500">Deposit: ₹{roomType.deposit}</p>
//                     <p className="text-xs text-gray-500">Capacity: {roomType.capacity} persons</p>
//                   </div>
                  
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold mb-4">Available Rooms - Floor 1</h3>
//                     <FloorRow
//                       sharing={roomType.type}
//                       floorLabel="Floor 1"
//                       roomsConfig={roomConfig}
//                       selectedRoomsMap={selectedRoomsMap}
//                       toggleRoom={toggleRoom}
//                       globalSelectedRooms={globalSelectedRooms}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="text-center mt-8">
//             <div className="mb-4">
//               <strong>Selected: </strong>
//               {globalSelectedRooms.length > 0 
//                 ? globalSelectedRooms.join(', ') 
//                 : 'No rooms selected'}
//             </div>
            
//             <button
//               className="bg-[#0B2DC9] text-white text-base font-normal px-10 sm:px-16 md:px-28 py-3 sm:py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
//               onClick={handleAddProofs}
//               disabled={globalSelectedRooms.length === 0}
//             >
//               {globalSelectedRooms.length === 0 ? 'Select Rooms First' : 'Proceed to Payment'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FigmaDeluxeHostel;