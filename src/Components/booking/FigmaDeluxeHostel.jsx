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

// const RoomBlock = ({ sharing, floor, roomNumber, selectedRooms, toggleRoom, globalSelectedRooms, beds, selectedRoomType, setSelectedRoomType, unavailableRooms }) => {
//   // Generate proper room identifiers for availability checking
//   const getBedIdentifier = (bed) => {
//     // Remove spaces from bed names to match room configuration
//     const formattedBed = typeof bed === 'string' ? bed.replace(/\s+/g, '') : bed;
//     return `${sharing}-${roomNumber}-${formattedBed}`;
//   };

//   return (
//     <div className="mb-2">
//       <div className="text-[13px] font-semibold mb-1">{roomNumber}</div>
//       <div className="flex flex-wrap gap-2">
//         {beds.map((bed, index) => {
//           const bedLabel = typeof bed === 'string' && bed.includes('Bed') ? bed : `Bed${index + 1}`;
//           const bedIdentifier = getBedIdentifier(bedLabel);
//           const isSelected = selectedRooms.includes(bedLabel);
//           const isUnavailable = unavailableRooms.includes(bedIdentifier);
          
//           return (
//             <button
//               key={index}
//               onClick={() => {
//                 if (!isUnavailable) {
//                   toggleRoom(sharing, floor, roomNumber, bedLabel);
//                   setSelectedRoomType(sharing);
//                 }
//               }}
//               disabled={isUnavailable}
//               className={`text-[12px] px-3 py-2 rounded border transition-colors duration-200 ${
//                 isSelected
//                   ? "bg-green-600 text-white border-green-600"
//                   : isUnavailable
//                   ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
//                   : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
//               }`}
//               title={isUnavailable ? "This bed is not available for the selected date" : ""}
//             >
//               {bedLabel}
//               {isUnavailable && " ❌"}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const FloorRow = ({ sharing, floorLabel, roomsConfig, selectedRoomsMap, toggleRoom, globalSelectedRooms, selectedRoomType, setSelectedRoomType, unavailableRooms }) => (
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
//           selectedRooms={selectedRoomsMap[`${sharing}-${roomNumber}`] || []}
//           toggleRoom={toggleRoom}
//           globalSelectedRooms={globalSelectedRooms}
//           selectedRoomType={selectedRoomType}
//           setSelectedRoomType={setSelectedRoomType}
//           unavailableRooms={unavailableRooms}
//         />
//       ))}
//     </div>
//   </div>
// );

// const FigmaDeluxeHostel = () => {
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [unavailableRooms, setUnavailableRooms] = useState([]);

//   const [selectedDate, setSelectedDate] = useState("");
//   const [personCount, setPersonCount] = useState("");
//   const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
//   const [globalSelectedRooms, setGlobalSelectedRooms] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState(null);
//   const [availabilityChecked, setAvailabilityChecked] = useState(false);

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
      
//       // Check for unavailable rooms if we have a selected date
//       if (location.state.selectedDate) {
//         setSelectedDate(location.state.selectedDate);
//         checkRoomAvailability(location.state.selectedDate, location.state.propertyId || location.state._id);
//       }
//     } else {
//       setError("No booking data available");
//       setLoading(false);
//     }
//   }, [location.state]);

//   // Function to check room availability
//   const checkRoomAvailability = async (date, propertyId) => {
//     if (!date || !propertyId) return;
    
//     try {
//       setAvailabilityChecked(false);
//       const response = await fetch('http://localhost:5000/api/auth/bookings/check-availability', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           date: date,
//           propertyId: propertyId
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log("Availability result:", result);
      
//       if (result.success) {
//         setUnavailableRooms(result.unavailableRooms || []);
//         setAvailabilityChecked(true);
        
//         // Clear any selected rooms that are now unavailable
//         setSelectedRoomsMap(prev => {
//           const newMap = {...prev};
//           Object.keys(newMap).forEach(key => {
//             const [sharing, roomNumber] = key.split('-');
//             newMap[key] = newMap[key].filter(bed => {
//               const formattedBed = bed.replace(/\s+/g, '');
//               const bedIdentifier = `${sharing}-${roomNumber}-${formattedBed}`;
//               return !result.unavailableRooms.includes(bedIdentifier);
//             });
//           });
//           return newMap;
//         });
        
//         // Update global selected rooms
//         const allSelectedBedIds = Object.entries(selectedRoomsMap).flatMap(
//           ([key, beds]) => beds.map((bed) => {
//             const [sharing, roomNumber] = key.split('-');
//             const formattedBed = bed.replace(/\s+/g, '');
//             return `${sharing}-${roomNumber}-${formattedBed}`;
//           })
//         );
//         setGlobalSelectedRooms(allSelectedBedIds);
//       }
//     } catch (error) {
//       console.error("Error checking room availability:", error);
//       setUnavailableRooms([]);
//       setAvailabilityChecked(true);
//     }
//   };

//   const toggleRoom = (sharing, floor, roomNumber, bed) => {
//     // Remove spaces from bed names to match room configuration
//     const formattedBed = bed.replace(/\s+/g, '');
//     const key = `${sharing}-${roomNumber}`;
//     const bedId = bed; // Keep original for display
//     const fullBedId = `${sharing}-${roomNumber}-${formattedBed}`;
    
//     // Check if this room is unavailable
//     if (unavailableRooms.includes(fullBedId)) {
//       alert("This bed is not available for the selected date. Please choose another bed.");
//       return;
//     }
    
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
//         ([key, beds]) => beds.map((bed) => {
//           const [sharing, roomNumber] = key.split('-');
//           const formattedBed = bed.replace(/\s+/g, '');
//           return `${sharing}-${roomNumber}-${formattedBed}`;
//         })
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

//     // Check if any selected rooms are unavailable
//     const unavailableSelected = globalSelectedRooms.some(room => 
//       unavailableRooms.includes(room)
//     );
    
//     if (unavailableSelected) {
//       alert("Some of your selected rooms are no longer available. Please refresh the page and select different rooms.");
//       return;
//     }

//     // Calculate advance amount (first month's rent)
//     const roomType = sharingTypes.find(st => st.type === selectedRoomType);
//     const advanceAmount = roomType ? roomType.price : 0;
//     const depositAmount = roomType ? roomType.deposit * globalSelectedRooms.length : 0;
//     const totalAmount = advanceAmount + depositAmount;

//     const updatedBookingData = {
//       ...bookingData,
//       selectedRooms: globalSelectedRooms,
//       selectedRoomType,
//       selectedDate,
//       personCount: parseInt(personCount) || 1,
//       propertyId: bookingData._id || bookingData.propertyId,
//       advanceAmount,
//       depositAmount,
//       totalAmount
//     };

//     navigate("/user/add-proof", { state: updatedBookingData });
//   };

//   const handleSearch = () => {
//     const count = parseInt(personCount);
//     if (!isNaN(count) && count > 0) {
//       const filtered = sharingTypes.filter((room) => room.capacity >= count);
//       setFilteredTypes(filtered);
      
//       // Check availability when date is selected
//       if (selectedDate && bookingData) {
//         checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
//       }
//     } else {
//       setFilteredTypes(sharingTypes);
//     }
//   };

//   // Update availability when date changes
//   useEffect(() => {
//     if (selectedDate && bookingData) {
//       checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
//     }
//   }, [selectedDate]);

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
//             <button
//               onClick={() => checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId)}
//               className="bg-gray-200 text-gray-800 text-sm px-3 py-2 rounded ml-2"
//               title="Refresh availability"
//             >
//               🔄 Refresh
//             </button>
//           </div>

//           {!availabilityChecked && selectedDate && (
//             <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
//               <p>Checking room availability for {selectedDate}...</p>
//             </div>
//           )}

//           {availabilityChecked && unavailableRooms.length > 0 && (
//             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
//               <p className="font-bold">Note</p>
//               <p>Some rooms are not available for your selected date. Unavailable rooms are marked with ❌.</p>
//             </div>
//           )}

//           {availabilityChecked && unavailableRooms.length === 0 && selectedDate && (
//             <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
//               <p className="font-bold">Good news!</p>
//               <p>All rooms are available for {selectedDate}.</p>
//             </div>
//           )}

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
//                       unavailableRooms={unavailableRooms}
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
//             <div className="mb-4">
//               <strong>Advance Amount (First Month): </strong>
//               {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.price || 0}` : '₹0'}
//             </div>
//             <div className="mb-4">
//               <strong>Security Deposit: </strong>
//               {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length || 0}` : '₹0'}
//             </div>
//             <div className="mb-4">
//               <strong>Total Amount: </strong>
//               {selectedRoomType ? `₹${(sharingTypes.find(st => st.type === selectedRoomType)?.price + (sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length)) || 0}` : '₹0'}
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
//               disabled={globalSelectedRooms.length === 0 || !selectedRoomType || !availabilityChecked}
//             >
//               {!availabilityChecked ? 'Checking Availability...' : 
//                globalSelectedRooms.length === 0 ? 'Select Beds First' : 
//                !selectedRoomType ? 'Select Room Type' : 'Proceed to Payment'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FigmaDeluxeHostel;




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

// const RoomBlock = ({ 
//   sharing, 
//   floor, 
//   roomNumber, 
//   selectedRooms, 
//   toggleRoom, 
//   globalSelectedRooms, 
//   beds, 
//   selectedRoomType, 
//   setSelectedRoomType, 
//   unavailableRooms,
//   bedStatus
// }) => {
//   const getBedIdentifier = (bed) => {
//     // Use the actual bed name with spaces for the identifier
//     return `${sharing}-${roomNumber}-${bed}`;
//   };

//   return (
//     <div className="mb-2">
//       <div className="text-[13px] font-semibold mb-1">{roomNumber}</div>
//       <div className="flex flex-wrap gap-2">
//         {beds.map((bed, index) => {
//           const bedLabel = typeof bed === 'string' && bed.includes('Bed') ? bed : `Bed${index + 1}`;
//           const bedIdentifier = getBedIdentifier(bedLabel);
//           const isSelected = selectedRooms.includes(bedLabel);
//           const isUnavailable = unavailableRooms.includes(bedIdentifier);
          
//           // Get status from bedStatus object - use the actual identifier with spaces
//           const status = bedStatus[bedIdentifier] || 'available';
          
//           let buttonClass = "text-[12px] px-3 py-2 rounded border transition-colors duration-200 ";
//           let titleText = "";
          
//           if (status === 'approved') {
//             buttonClass += "bg-green-600 text-white border-green-600 cursor-not-allowed";
//             titleText = "Approved booking - Not available";
//           } else if (status === 'booked') {
//             buttonClass += "bg-orange-400 text-white border-orange-400 cursor-not-allowed";
//             titleText = "Pending booking - Not available";
//           } else if (isSelected) {
//             buttonClass += "bg-blue-600 text-white border-blue-600";
//             titleText = "Selected";
//           } else if (isUnavailable) {
//             buttonClass += "bg-green-600 text-white border-gray-300 cursor-not-allowed";
//             titleText = "Not available for selected date";
//           } else {
//             buttonClass += "bg-white text-gray-800 border-gray-300 hover:bg-gray-100";
//             titleText = "Available";
//           }
          
//           return (
//             <button
//               key={index}
//               onClick={() => {
//                 if (status === 'available' && !isUnavailable) {
//                   toggleRoom(sharing, floor, roomNumber, bedLabel);
//                   setSelectedRoomType(sharing);
//                 }
//               }}
//               disabled={status !== 'available' || isUnavailable}
//               className={buttonClass}
//               title={titleText}
//             >
//               {bedLabel}
//               {status === 'approved' && " ✅"}
//               {status === 'booked' && " ⏳"}
//               {isUnavailable && " "}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const FloorRow = ({ 
//   sharing, 
//   floorLabel, 
//   roomsConfig, 
//   selectedRoomsMap, 
//   toggleRoom, 
//   globalSelectedRooms, 
//   selectedRoomType, 
//   setSelectedRoomType, 
//   unavailableRooms,
//   bedStatus
// }) => (
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
//           selectedRooms={selectedRoomsMap[`${sharing}-${roomNumber}`] || []}
//           toggleRoom={toggleRoom}
//           globalSelectedRooms={globalSelectedRooms}
//           selectedRoomType={selectedRoomType}
//           setSelectedRoomType={setSelectedRoomType}
//           unavailableRooms={unavailableRooms}
//           bedStatus={bedStatus}
//         />
//       ))}
//     </div>
//   </div>
// );

// const FigmaDeluxeHostel = () => {
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [unavailableRooms, setUnavailableRooms] = useState([]);
//   const [bedStatus, setBedStatus] = useState({});

//   const [selectedDate, setSelectedDate] = useState("");
//   const [personCount, setPersonCount] = useState("");
//   const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
//   const [globalSelectedRooms, setGlobalSelectedRooms] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState(null);
//   const [availabilityChecked, setAvailabilityChecked] = useState(false);
//   const [bedStatistics, setBedStatistics] = useState(null);

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

//   // Add this useEffect to check authentication
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError("Please log in to access this page");
//         // Optionally redirect to login page after a delay
//         setTimeout(() => navigate('/login'), 2000);
//       }
//     };
    
//     checkAuth();
//   }, [navigate]);

//   useEffect(() => {
//     if (location.state) {
//       setBookingData(location.state);
//       const types = generateSharingTypes(location.state.roomTypes);
//       setSharingTypes(types);
//       setFilteredTypes(types);
//       setLoading(false);
      
//       if (location.state.selectedDate) {
//         setSelectedDate(location.state.selectedDate);
//         checkRoomAvailability(location.state.selectedDate, location.state.propertyId || location.state._id);
//       }
//     } else {
//       setError("No booking data available");
//       setLoading(false);
//     }
//   }, [location.state]);

//   const checkRoomAvailability = async (date, propertyId) => {
//     if (!date || !propertyId) return;
    
//     try {
//       setAvailabilityChecked(false);
      
//       const statusMap = {};
//       let stats = {
//         totalBeds: 0,
//         availableBeds: 0,
//         bookedBeds: 0,
//         approvedBeds: 0
//       };
      
//       // Get the authentication token from localStorage
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         console.error("No authentication token found");
//         setError("Please log in to check room availability");
//         setAvailabilityChecked(true);
//         return;
//       }
      
//       // Use the new endpoint that returns all beds without requiring roomType
//       const response = await fetch(`http://localhost:5000/api/auth/bookings/availability/property/${propertyId}/all-beds?date=${date}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.success && result.bedsByFloor) {
//           // Process the data from bedsByFloor
//           Object.entries(result.bedsByFloor).forEach(([floor, beds]) => {
//             beds.forEach(bed => {
//               // Use the actual roomIdentifier (with spaces) for the status map
//               statusMap[bed.roomIdentifier] = bed.status;
              
//               // Update statistics
//               stats.totalBeds++;
//               if (bed.status === 'available') stats.availableBeds++;
//               else if (bed.status === 'booked') stats.bookedBeds++;
//               else if (bed.status === 'approved') stats.approvedBeds++;
//             });
//           });
          
//           // Update statistics from API if available
//           if (result.statistics) {
//             stats = { ...stats, ...result.statistics };
//           }
//         }
//       } else if (response.status === 401) {
//         // Token is invalid or expired
//         console.error("Authentication failed - token may be invalid or expired");
//         setError("Your session has expired. Please log in again.");
//       } else if (response.status === 400) {
//         console.error("Bad request - missing parameters");
//       }
      
//       setBedStatus(statusMap);
//       setBedStatistics(stats);
      
//       // Now check specific availability for the date
//       const availabilityResponse = await fetch('http://localhost:5000/api/auth/bookings/check-availability', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           date: date,
//           propertyId: propertyId
//         })
//       });
      
//       if (availabilityResponse.ok) {
//         const availabilityResult = await availabilityResponse.json();
//         if (availabilityResult.success) {
//           setUnavailableRooms(availabilityResult.unavailableRooms || []);
//         }
//       }
      
//       setAvailabilityChecked(true);
      
//     } catch (error) {
//       console.error("Error checking room availability:", error);
//       setUnavailableRooms([]);
//       setBedStatus({});
//       setBedStatistics(null);
//       setAvailabilityChecked(true);
//     }
//   };

//   const toggleRoom = (sharing, floor, roomNumber, bed) => {
//     // Use the actual bed name with spaces for the identifier
//     const key = `${sharing}-${roomNumber}`;
//     const bedId = bed;
//     const fullBedId = `${sharing}-${roomNumber}-${bed}`; // Use actual bed name with spaces
    
//     if (unavailableRooms.includes(fullBedId)) {
//       alert("This bed is not available for the selected date. Please choose another bed.");
//       return;
//     }
    
//     setSelectedRoomsMap((prev) => {
//       const current = prev[key] || [];
//       let updated;
      
//       if (current.includes(bedId)) {
//         updated = current.filter((b) => b !== bedId);
//       } else {
//         const roomType = sharingTypes.find(st => st.type === sharing);
//         if (roomType && current.length >= roomType.capacity) {
//           alert(`Maximum ${roomType.capacity} beds allowed for ${sharing} sharing`);
//           return prev;
//         }
//         updated = [...current, bedId];
//       }
      
//       const newMap = { ...prev, [key]: updated };
//       const allSelectedBedIds = Object.entries(newMap).flatMap(
//         ([key, beds]) => beds.map((bed) => {
//           const [sharing, roomNumber] = key.split('-');
//           return `${sharing}-${roomNumber}-${bed}`; // Use actual bed name with spaces
//         })
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

//     const unavailableSelected = globalSelectedRooms.some(room => 
//       unavailableRooms.includes(room)
//     );
    
//     if (unavailableSelected) {
//       alert("Some of your selected rooms are no longer available. Please refresh the page and select different rooms.");
//       return;
//     }

//     const roomType = sharingTypes.find(st => st.type === selectedRoomType);
//     const advanceAmount = roomType ? roomType.price : 0;
//     const depositAmount = roomType ? roomType.deposit * globalSelectedRooms.length : 0;
//     const totalAmount = advanceAmount + depositAmount;

//     const updatedBookingData = {
//       ...bookingData,
//       selectedRooms: globalSelectedRooms,
//       selectedRoomType,
//       selectedDate,
//       personCount: parseInt(personCount) || 1,
//       propertyId: bookingData._id || bookingData.propertyId,
//       advanceAmount,
//       depositAmount,
//       totalAmount
//     };

//     navigate("/user/add-proof", { state: updatedBookingData });
//   };

//   const handleSearch = () => {
//     const count = parseInt(personCount);
//     if (!isNaN(count) && count > 0) {
//       const filtered = sharingTypes.filter((room) => room.capacity >= count);
//       setFilteredTypes(filtered);
      
//       if (selectedDate && bookingData) {
//         checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
//       }
//     } else {
//       setFilteredTypes(sharingTypes);
//     }
//   };

//   useEffect(() => {
//     if (selectedDate && bookingData) {
//       checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
//     }
//   }, [selectedDate]);

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

//   const { propertyName } = bookingData;

//   return (
//     <>
//       <Headers />
//       <div className="min-h-screen w-full py-24 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
//         <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 pb-16 bg-white bg-opacity-95">
//           <div className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-1 text-center md:text-left">
//             {propertyName}
//           </div>

//           <div className="flex flex-wrap gap-4 sm:gap-6 my-4 justify-center md:justify-start">
//             {bookingData.roomTypes && bookingData.roomTypes[0]?.amenities?.map((amenity, i) => (
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
//             <button
//               onClick={() => checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId)}
//               className="bg-gray-200 text-gray-800 text-sm px-3 py-2 rounded ml-2"
//               title="Refresh availability"
//             >
//               🔄 Refresh
//             </button>
//           </div>

//           {!availabilityChecked && selectedDate && (
//             <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
//               <p>Checking room availability for {selectedDate}...</p>
//             </div>
//           )}

//           {availabilityChecked && unavailableRooms.length > 0 && (
//             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
//               <p className="font-bold">Note</p>
//               <p>Some rooms are not available for your selected date. Unavailable rooms are marked with ❌.</p>
//             </div>
//           )}

//           {availabilityChecked && unavailableRooms.length === 0 && selectedDate && (
//             <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
//               <p className="font-bold">Good news!</p>
//               <p>All rooms are available for {selectedDate}.</p>
//             </div>
//           )}

//           {bedStatistics && (
//             <div className="bg-blue-50 p-4 rounded-lg mb-6">
//               <h3 className="text-lg font-semibold mb-2">Bed Availability Summary</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                 <div className="text-center">
//                   <div className="font-bold text-2xl">{bedStatistics.totalBeds}</div>
//                   <div>Total Beds</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-bold text-2xl text-green-600">{bedStatistics.availableBeds}</div>
//                   <div>Available</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-bold text-2xl text-orange-500">{bedStatistics.bookedBeds}</div>
//                   <div>Pending</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-bold text-2xl text-red-600">{bedStatistics.approvedBeds}</div>
//                   <div>Approved</div>
//                 </div>
//               </div>
//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 <div className="text-center">
//                   <div className="font-bold text-xl">{Math.round((bedStatistics.availableBeds / bedStatistics.totalBeds) * 100)}%</div>
//                   <div>Availability Rate</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-bold text-xl">{Math.round(((bedStatistics.bookedBeds + bedStatistics.approvedBeds) / bedStatistics.totalBeds) * 100)}%</div>
//                   <div>Occupancy Rate</div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-wrap gap-4 mb-6 justify-center">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-green-600 rounded"></div>
//               <span className="text-sm">Approved Booking</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-orange-400 rounded"></div>
//               <span className="text-sm">Pending Booking</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-blue-600 rounded"></div>
//               <span className="text-sm">Selected</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
//               <span className="text-sm">Available</span>
//             </div>
//           </div>

//           <div className="space-y-8">
//             {filteredTypes.map((roomType, index) => {
//               const roomConfig = bookingData?.rooms?.floorConfig?.floors?.[0]?.rooms || {};
              
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
//                       unavailableRooms={unavailableRooms}
//                       bedStatus={bedStatus}
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
//             <div className="mb-4">
//               <strong>Advance Amount (First Month): </strong>
//               {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.price || 0}` : '₹0'}
//             </div>
//             <div className="mb-4">
//               <strong>Security Deposit: </strong>
//               {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length || 0}` : '₹0'}
//             </div>
//             <div className="mb-4">
//               <strong>Total Amount: </strong>
//               {selectedRoomType ? `₹${(sharingTypes.find(st => st.type === selectedRoomType)?.price + (sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length)) || 0}` : '₹0'}
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
//               disabled={globalSelectedRooms.length === 0 || !selectedRoomType || !availabilityChecked}
//             >
//               {!availabilityChecked ? 'Checking Availability...' : 
//                globalSelectedRooms.length === 0 ? 'Select Beds First' : 
//                !selectedRoomType ? 'Select Room Type' : 'Proceed to Payment'}
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
import { API_BASE_URL } from "../../Clients-components/PropertyController"

const VisualBox = ({ boxes }) => {
  const boxSize = "w-[40px] h-[50px] sm:w-[50px] sm:h-[60px] bg-yellow-400 rounded-sm  border-2 ";

  switch (boxes) {
    case 1:
      return <div className="flex justify-center items-center h-[80px] sm:h-[100px]"><div className={boxSize} /></div>;
    case 2:
      return (
        <div className="flex justify-center items-center gap-1 sm:gap-[6px] h-[80px] sm:h-[100px]">
          <div className={boxSize} />
          <div className={boxSize} />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center gap-1 sm:gap-[6px] h-[100px] sm:h-[120px] justify-center">
          <div className="flex gap-1 sm:gap-[6px]">
            <div className={boxSize} />
            <div className={boxSize} />
          </div>
          <div className={boxSize} />
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 gap-1 sm:gap-[6px] w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] justify-center items-center">
          {[...Array(4)].map((_, i) => <div key={i} className={boxSize} />)}
        </div>
      );
    case 5:
      const wideBoxSize = "w-[90px] h-[50px] sm:w-[110px] sm:h-[60px] bg-yellow-400 rounded-sm";
      return (
        <div className="flex flex-col items-center gap-1 sm:gap-[6px] h-[160px] sm:h-[200px] justify-center">
          <div className="flex justify-center"><div className={wideBoxSize} /></div>
          <div className="flex gap-1 sm:gap-[6px] justify-center">
            <div className={boxSize} />
            <div className={boxSize} />
          </div>
          <div className="flex gap-1 sm:gap-[6px] justify-center">
            <div className={boxSize} />
            <div className={boxSize} />
          </div>
        </div>
      );
    case 6:
      return (
        <div className="grid grid-cols-3 gap-1 sm:gap-[6px] w-[130px] h-[110px] sm:w-[160px] sm:h-[130px] justify-center items-center">
          {[...Array(6)].map((_, i) => <div key={i} className={boxSize} />)}
        </div>
      );
    default:
      return null;
  }
};

const RoomBlock = ({ 
  sharing, 
  floor, 
  roomNumber, 
  selectedRooms, 
  toggleRoom, 
  globalSelectedRooms, 
  beds, 
  selectedRoomType, 
  setSelectedRoomType, 
  unavailableRooms,
  bedStatus
}) => {
  const getBedIdentifier = (bed) => {
    return `${sharing}-${roomNumber}-${bed}`;
  };

  return (
    <div className="mb-3 sm:mb-2">
      <div className="text-[12px] sm:text-[13px] font-semibold mb-1">{roomNumber}</div>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {beds.map((bed, index) => {
          const bedLabel = typeof bed === 'string' && bed.includes('Bed') ? bed : `Bed${index + 1}`;
          const bedIdentifier = getBedIdentifier(bedLabel);
          const isSelected = selectedRooms.includes(bedLabel);
          const isUnavailable = unavailableRooms.includes(bedIdentifier);
          
          const status = bedStatus[bedIdentifier] || 'available';
          
          let buttonClass = "text-[10px] sm:text-[12px] px-2 sm:px-3 py-1 sm:py-2 rounded border transition-colors duration-200 ";
          let titleText = "";
          
          if (status === 'approved') {
            buttonClass += "bg-green-600 text-white border-green-600 cursor-not-allowed";
            titleText = "Approved booking - Not available";
          } else if (status === 'booked') {
            buttonClass += "bg-orange-400 text-white border-orange-400 cursor-not-allowed";
            titleText = "Pending booking - Not available";
          } else if (isSelected) {
            buttonClass += "bg-blue-600 text-white border-blue-600";
            titleText = "Selected";
          } else if (isUnavailable) {
            buttonClass += "bg-green-600 text-white border-gray-300 cursor-not-allowed";
            titleText = "Not available for selected date";
          } else {
            buttonClass += "bg-white text-gray-800 border-gray-300 hover:bg-gray-100";
            titleText = "Available";
          }
          
          return (
            <button
              key={index}
              onClick={() => {
                if (status === 'available' && !isUnavailable) {
                  toggleRoom(sharing, floor, roomNumber, bedLabel);
                  setSelectedRoomType(sharing);
                }
              }}
              disabled={status !== 'available' || isUnavailable}
              className={buttonClass}
              title={titleText}
            >
              {bedLabel}
              {status === 'approved' && " ✅"}
              {status === 'booked' && " ⏳"}
              {isUnavailable && " "}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FloorRow = ({ 
  sharing, 
  floorLabel, 
  roomsConfig, 
  selectedRoomsMap, 
  toggleRoom, 
  globalSelectedRooms, 
  selectedRoomType, 
  setSelectedRoomType, 
  unavailableRooms,
  bedStatus
}) => (
  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-100 rounded-lg border-2">
    <div className="text-[14px] sm:text-[16px] font-semibold mb-2 sm:mb-3 text-blue-900">{floorLabel}</div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
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
          bedStatus={bedStatus}
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
  const [bedStatus, setBedStatus] = useState({});

  const [selectedDate, setSelectedDate] = useState("");
  const [personCount, setPersonCount] = useState("");
  const [selectedRoomsMap, setSelectedRoomsMap] = useState({});
  const [globalSelectedRooms, setGlobalSelectedRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [bedStatistics, setBedStatistics] = useState(null);
  
  // New state variables for duration selection
  const [durationType, setDurationType] = useState("monthly");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [durationMonths, setDurationMonths] = useState(1);
  const [durationDays, setDurationDays] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

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
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to access this page");
        setTimeout(() => navigate('/login'), 2000);
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (location.state) {
      setBookingData(location.state);
      const types = generateSharingTypes(location.state.roomTypes);
      setSharingTypes(types);
      setFilteredTypes(types);
      setLoading(false);
      
      if (location.state.selectedDate) {
        setSelectedDate(location.state.selectedDate);
        checkRoomAvailability(location.state.selectedDate, location.state.propertyId || location.state._id);
      }
    } else {
      setError("No booking data available");
      setLoading(false);
    }
  }, [location.state]);

  const calculateEndDate = () => {
    if (!selectedDate) return null;
    
    const startDate = new Date(selectedDate);
    
    switch(durationType) {
      case "daily":
        const endDateDaily = new Date(startDate);
        endDateDaily.setDate(startDate.getDate() + durationDays);
        return endDateDaily.toISOString().split('T')[0];
        
      case "monthly":
        const endDateMonthly = new Date(startDate);
        endDateMonthly.setMonth(startDate.getMonth() + durationMonths);
        return endDateMonthly.toISOString().split('T')[0];
        
      case "custom":
        return customEndDate;
        
      default:
        return null;
    }
  };

  const checkRoomAvailability = async (date, propertyId) => {
    if (!date || !propertyId) return;
    
    try {
      setAvailabilityChecked(false);
      
      const statusMap = {};
      let stats = {
        totalBeds: 0,
        availableBeds: 0,
        bookedBeds: 0,
        approvedBeds: 0
      };
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No authentication token found");
        setError("Please log in to check room availability");
        setAvailabilityChecked(true);
        return;
      }
      
      // Calculate end date for availability check
      const endDate = calculateEndDate();
      
      // Use the new endpoint that accepts date range
      const response = await fetch(`${API_BASE_URL}/api/bookings/availability/property/${propertyId}/all-beds?startDate=${date}&endDate=${endDate || date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.bedsByFloor) {
          Object.entries(result.bedsByFloor).forEach(([floor, beds]) => {
            beds.forEach(bed => {
              statusMap[bed.roomIdentifier] = bed.status;
              
              stats.totalBeds++;
              if (bed.status === 'available') stats.availableBeds++;
              else if (bed.status === 'booked') stats.bookedBeds++;
              else if (bed.status === 'approved') stats.approvedBeds++;
            });
          });
          
          if (result.statistics) {
            stats = { ...stats, ...result.statistics };
          }
        }
      } else if (response.status === 401) {
        console.error("Authentication failed - token may be invalid or expired");
        setError("Your session has expired. Please log in again.");
      } else if (response.status === 400) {
        console.error("Bad request - missing parameters");
      }
      
      setBedStatus(statusMap);
      setBedStatistics(stats);
      
      // Now check specific availability for the date range
      const availabilityResponse = await fetch(`${API_BASE_URL}/api/bookings/check-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          startDate: date,
          endDate: endDate || date,
          propertyId: propertyId
        })
      });
      
      if (availabilityResponse.ok) {
        const availabilityResult = await availabilityResponse.json();
        if (availabilityResult.success) {
          setUnavailableRooms(availabilityResult.unavailableRooms || []);
        }
      }
      
      setAvailabilityChecked(true);
      
    } catch (error) {
      console.error("Error checking room availability:", error);
      setUnavailableRooms([]);
      setBedStatus({});
      setBedStatistics(null);
      setAvailabilityChecked(true);
    }
  };

  const toggleRoom = (sharing, floor, roomNumber, bed) => {
    const key = `${sharing}-${roomNumber}`;
    const bedId = bed;
    const fullBedId = `${sharing}-${roomNumber}-${bed}`;
    
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
          return `${sharing}-${roomNumber}-${bed}`;
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

    const unavailableSelected = globalSelectedRooms.some(room => 
      unavailableRooms.includes(room)
    );
    
    if (unavailableSelected) {
      alert("Some of your selected rooms are no longer available. Please refresh the page and select different rooms.");
      return;
    }

    const endDate = calculateEndDate();
    if (!endDate) {
      alert("Please select a valid duration");
      return;
    }

    const roomType = sharingTypes.find(st => st.type === selectedRoomType);
    
    // Calculate pricing based on duration
    let advanceAmount = 0;
    let totalAmount = 0;
    
    if (durationType === "daily") {
      advanceAmount = roomType.price * durationDays;
      totalAmount = advanceAmount + (roomType.deposit * globalSelectedRooms.length);
    } else {
      advanceAmount = roomType.price * durationMonths;
      totalAmount = advanceAmount + (roomType.deposit * globalSelectedRooms.length);
    }

    const updatedBookingData = {
      ...bookingData,
      selectedRooms: globalSelectedRooms,
      selectedRoomType,
      selectedDate,
      endDate,
      durationType,
      durationDays: durationType === "daily" ? durationDays : null,
      durationMonths: durationType === "monthly" ? durationMonths : null,
      personCount: parseInt(personCount) || 1,
      propertyId: bookingData._id || bookingData.propertyId,
      advanceAmount,
      depositAmount: roomType.deposit * globalSelectedRooms.length,
      totalAmount
    };

    navigate("/user/add-proof", { state: updatedBookingData });
  };

  const handleSearch = () => {
    const count = parseInt(personCount);
    if (!isNaN(count) && count > 0) {
      const filtered = sharingTypes.filter((room) => room.capacity >= count);
      setFilteredTypes(filtered);
      
      if (selectedDate && bookingData) {
        checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
      }
    } else {
      setFilteredTypes(sharingTypes);
    }
  };

  useEffect(() => {
    if (selectedDate && bookingData) {
      checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId);
    }
  }, [selectedDate, durationType, durationDays, durationMonths, customEndDate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg sm:text-xl">Loading booking information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center flex-col p-4">
        <div className="text-lg sm:text-xl text-red-600 text-center mb-4">{error}</div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg sm:text-xl">No booking data available</div>
      </div>
    );
  }

  const { propertyName } = bookingData;

  return (
    <>
      <Headers />
      <div className="min-h-screen w-full py-20 sm:py-24 bg-cover bg-center " style={{ backgroundImage: `url('${bgImage}')` }}>
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20 pt-4 sm:pt-6 pb-12 sm:pb-16  bg-opacity-95">

          <div className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-1 sm:text-start flex flex-col-2">
            <h1>Hostel-</h1>
            <p className="">({propertyName})</p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 my-3 sm:my-4 justify-center md:justify-start">
            {bookingData.roomTypes && bookingData.roomTypes[0]?.amenities?.map((amenity, i) => (
              <div key={i} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-gray-400">
                <span className="text-xs sm:text-sm">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Search and Filter Section - Responsive */}
          <hr className="border border-gray-300"/>
          <div className="bg-white shadow-md rounded-md p-3 sm:p-4 flex flex-col sm:flex-row gap-0 items-center justify-center w-full max-w-[950px] mx-auto mb-4 sm:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-full"
                required
              />
              <input
                type="number"
                placeholder="Number of Persons"
                value={personCount}
                onChange={(e) => setPersonCount(e.target.value)}
                className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-full"
                min={1}
                required
              />
              
              <select
                value={durationType}
                onChange={(e) => setDurationType(e.target.value)}
                className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-full"
              >
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="custom">Custom Range</option>
              </select>
              
              {durationType === "monthly" && (
                <div className="flex items-center w-full">
                  <input
                    type="number"
                    placeholder="Months"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(parseInt(e.target.value) || 1)}
                    className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-full"
                    min={1}
                  />
                  <span className="ml-2 text-xs sm:text-sm whitespace-nowrap">Months</span>
                </div>
              )}
              
              {durationType === "daily" && (
                <div className="flex items-center w-full">
                  <input
                    type="number"
                    placeholder="Days"
                    value={durationDays}
                    onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                    className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-full"
                    min={1}
                  />
                  <span className="ml-2 text-xs sm:text-sm whitespace-nowrap">Days</span>
                </div>
              )}
              
              {durationType === "custom" && (
                <div className="col-span-2 flex flex-col sm:flex-row gap-2 w-full">
                  {/* <input
                    type="date"
                    placeholder="Start Date"
                    value={customStartDate}
                    onChange={(e) => {
                      setCustomStartDate(e.target.value);
                      setSelectedDate(e.target.value);
                    }}
                    className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-full"
                  /> */}
                  <input
                    type="date"
                    placeholder="End Date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="border px-2 sm:px-3 py-1 sm:py-2 rounded text-sm w-1/2"
                  />
                </div>
              )}
            </div>
           
            
            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 md:-ml-[14%] ml-0">
              <button
                className="bg-[#0120c8] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded flex-1 sm:flex-none"
                onClick={handleSearch}
              >
                Search Rooms
              </button>
              <button
                onClick={() => checkRoomAvailability(selectedDate, bookingData._id || bookingData.propertyId)}
                className="bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-2 rounded"
                title="Refresh availability"
              >
                🔄
              </button>
            </div>
             
          </div>
           <hr className="border border-gray-300"/>
         

          {/* Status Messages */}
          {!availabilityChecked && selectedDate && (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm" role="alert">
              <p>Checking room availability for {selectedDate}...</p>
            </div>
          )}

          {availabilityChecked && unavailableRooms.length > 0 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm" role="alert">
              <p className="font-bold">Note</p>
              <p>Some rooms are not available for your selected date. Unavailable rooms are marked with ❌.</p>
            </div>
          )}

          {availabilityChecked && unavailableRooms.length === 0 && selectedDate && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm" role="alert">
              <p className="font-bold">Good news!</p>
              <p>All rooms are available for {selectedDate}.</p>
            </div>
          )}

          {/* Bed Statistics */}
          {bedStatistics && (
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Bed Availability Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="text-center">
                  <div className="font-bold text-xl sm:text-2xl">{bedStatistics.totalBeds}</div>
                  <div>Total Beds</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl sm:text-2xl text-green-600">{bedStatistics.availableBeds}</div>
                  <div>Available</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl sm:text-2xl text-orange-500">{bedStatistics.bookedBeds}</div>
                  <div>Pending</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl sm:text-2xl text-red-600">{bedStatistics.approvedBeds}</div>
                  <div>Approved</div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg sm:text-xl">{Math.round((bedStatistics.availableBeds / bedStatistics.totalBeds) * 100)}%</div>
                  <div>Availability Rate</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg sm:text-xl">{Math.round(((bedStatistics.bookedBeds + bedStatistics.approvedBeds) / bedStatistics.totalBeds) * 100)}%</div>
                  <div>Occupancy Rate</div>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded"></div>
              <span className="text-xs sm:text-sm">Approved Booking</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded"></div>
              <span className="text-xs sm:text-sm">Pending Booking</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-900 rounded"></div>
              <span className="text-xs sm:text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white border border-gray-300 rounded"></div>
              <span className="text-xs sm:text-sm">Available</span>
            </div>
          </div>

                  {/* Room Types */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
  {filteredTypes.map((roomType, index) => {
    // Get all rooms from floor configuration
    const allRooms = bookingData?.rooms?.floorConfig?.floors?.[0]?.rooms || {};
   
    // Filter rooms based on number of beds matching the room type capacity
    const filteredRooms = Object.keys(allRooms).reduce((acc, roomNumber) => {
      const beds = allRooms[roomNumber];
     
      // Check if number of beds matches the room type capacity
      if (beds && Array.isArray(beds) && beds.length === roomType.capacity) {
        acc[roomNumber] = beds;
      }
      return acc;
    }, {});
   
    return (
      <div key={index} className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white p-3 sm:p-4 rounded-lg shadow">
        <div className="w-full lg:w-1/4 flex flex-col items-center justify-center border rounded-lg p-3 sm:p-4">
          <VisualBox boxes={roomType.boxes} />
          <p className="text-sm font-medium mt-2 text-center">{roomType.label}</p>
          <p className="text-base sm:text-lg text-green-600 font-semibold mt-1">₹{roomType.price}</p>
          <p className="text-xs text-gray-500">Deposit: ₹{roomType.deposit}</p>
          <p className="text-xs text-gray-500">Capacity: {roomType.capacity} persons</p>
        </div>
       
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Available {roomType.label} Rooms - Floor 1</h3>
          {Object.keys(filteredRooms).length > 0 ? (
            <FloorRow
              sharing={roomType.type}
              floorLabel="Floor 1"
              roomsConfig={filteredRooms}
              selectedRoomsMap={selectedRoomsMap}
              toggleRoom={toggleRoom}
              globalSelectedRooms={globalSelectedRooms}
              selectedRoomType={selectedRoomType}
              setSelectedRoomType={setSelectedRoomType}
              unavailableRooms={unavailableRooms}
              bedStatus={bedStatus}
            />
          ) : (
            <div className="text-center py-4 text-gray-500">
              No {roomType.label} rooms available on this floor
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>
 

          <div className="mt-6 sm:mt-8">
  {/* Mobile Layout (unchanged) */}
  <div className="block lg:hidden space-y-3 sm:space-y-4">
    <div className="mb-3 sm:mb-4 text-sm sm:text-base">
      <strong>Duration: </strong>
      {durationType === "monthly" && `${durationMonths} month(s)`}
      {durationType === "daily" && `${durationDays} day(s)`}
      {durationType === "custom" && `${selectedDate} to ${customEndDate}`}
    </div>
    <div className="mb-3 sm:mb-4 text-sm sm:text-base">
      <strong>Selected Room Type: </strong>
      {selectedRoomType || 'None selected'}
    </div>
    <div className="mb-3 sm:mb-4 text-sm sm:text-base">
      <strong>Advance Amount: </strong>
      {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.price || 0}` : '₹0'}
    </div>
    <div className="mb-3 sm:mb-4 text-sm sm:text-base">
      <strong>Security Deposit: </strong>
      {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length || 0}` : '₹0'}
    </div>
    <div className="mb-3 sm:mb-4 text-sm sm:text-base">
      <strong>Total Amount: </strong>
      {selectedRoomType ? `₹${(sharingTypes.find(st => st.type === selectedRoomType)?.price + (sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length)) || 0}` : '₹0'}
    </div>
    <div className="mb-3 sm:mb-4 text-sm sm:text-base">
      <strong>Selected Beds: </strong>
      {globalSelectedRooms.length > 0 
        ? globalSelectedRooms.join(', ') 
        : 'No beds selected'}
    </div>
  </div>

  {/* Desktop/Laptop Layout - Left Title & Right Value */}
  <div className="hidden lg:block">
    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center py-2">
          <strong className="text-base text-gray-800 font-medium">Duration</strong>
          <span className="text-base text-gray-900">
            {durationType === "monthly" && `${durationMonths} month(s)`}
            {durationType === "daily" && `${durationDays} day(s)`}
            {durationType === "custom" && `${selectedDate} to ${customEndDate}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <strong className="text-base text-gray-800 font-medium">Room Type</strong>
          <span className="text-base text-gray-900">{selectedRoomType || 'None selected'}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <strong className="text-base text-gray-800 font-medium">Advance Amount</strong>
          <span className="text-lg font-semibold text-green-600">
            {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.price || 0}` : '₹0'}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <strong className="text-base text-gray-800 font-medium">Security Deposit</strong>
          <span className="text-lg font-semibold text-blue-600">
            {selectedRoomType ? `₹${sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length || 0}` : '₹0'}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-t border-gray-200">
          <strong className="text-lg text-gray-900 font-bold">Total Amount</strong>
          <span className="text-xl font-bold text-green-600">
            {selectedRoomType ? `₹${(sharingTypes.find(st => st.type === selectedRoomType)?.price + (sharingTypes.find(st => st.type === selectedRoomType)?.deposit * globalSelectedRooms.length)) || 0}` : '₹0'}
          </span>
        </div>
        
        <div className="flex justify-between items-start py-3 border-t border-gray-200">
          <strong className="text-base text-gray-800 font-medium mt-1">Selected Beds</strong>
          <span className="text-base text-gray-900 text-right max-w-[60%] leading-relaxed">
            {globalSelectedRooms.length > 0 
              ? globalSelectedRooms.join(', ') 
              : 'No beds selected'}
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Button - Same for both */}
  <div className="text-center mt-6 sm:mt-8">
    <button
      className="bg-[#0B2DC9] text-white text-sm sm:text-base font-normal px-6 sm:px-10 md:px-16 lg:px-28 py-2 sm:py-3 md:py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
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