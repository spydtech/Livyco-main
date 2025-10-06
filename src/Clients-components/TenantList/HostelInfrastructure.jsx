// // HostelInfrastructure.jsx
// import React, { useState, useEffect } from "react";
// import { FaUser, FaCalendarAlt, FaWifi, FaDumbbell, FaParking, FaSnowflake, FaSwimmingPool, FaConciergeBell, FaBed } from "react-icons/fa";
// import { MdStarRate, MdStarHalf } from "react-icons/md";
// import Button from "./Button";
// import clsx from "clsx";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { propertyAPI } from "../PropertyController";

// const sharingTypes = [
//   { type: "Single Room", beds: 1 },
//   { type: "Two Sharing", beds: 2 },
//   { type: "Triple Sharing", beds: 3 },
//   { type: "Four Sharing", beds: 4 },
//   { type: "Five Sharing", beds: 5 },
//   { type: "Six Sharing", beds: 6 },
// ];

// const generateRooms = (floors = 3, roomsPerFloor = 10, beds) => {
//   return Array.from({ length: floors }, (_, fIdx) => {
//     return {
//       floor: `${fIdx + 1} Floor`,
//       rooms: Array.from({ length: roomsPerFloor }, (_, rIdx) => {
//         const filledBeds = Math.floor(Math.random() * (beds + 1));
//         const availableBeds = beds - filledBeds;
//         return {
//           number: `${fIdx + 1}2${rIdx + 1}A`,
//           beds,
//           filledBeds,
//           availableBeds,
//         };
//       }),
//     };
//   });
// };

// const HostelInfrastructure = () => {
//   const [selectedBeds, setSelectedBeds] = useState(null);
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [persons, setPersons] = useState(2);
//    const [propertyData, setPropertyData] = useState([]);
//    const [selectedPropertyId, setSelectedPropertyId] = useState("");

//    useEffect(() => {
//     // Replace this with your real API call
//     const fetchProperties = async () => {
//       try {
//         const res = await propertyAPI.getCompletePropertyData();
//         setPropertyData(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch properties", err);
//       }
//     };
//     fetchProperties();
//   }, []);

//   const selectedProperty = propertyData.find(
//     (p) => p.basicInfo._id === selectedPropertyId
//   );

//   const shouldShowRoomType = (roomType) => {
//     if (!checkIn || !checkOut) return true;
//     return roomType.availableCount > 0;
//   };

//   const allRooms = sharingTypes.reduce((acc, item) => {
//     acc[item.type] = generateRooms(3, 10, item.beds);
//     return acc;
//   }, {});

//   const filteredSharing = selectedBeds
//     ? sharingTypes.filter((type) => type.beds === selectedBeds)
//     : sharingTypes;

//   return (
//     <div>
//         <ClientNav />
//     <div className="p-6 space-y-6 bg-gray-100 ">
//       <div className="text-sm text-gray-500">Home / Infrastructure</div>
//        {/* <label className="text-sm text-gray-600">Select Property</label> */}
//           <select
//             value={selectedPropertyId}
//             onChange={(e) => setSelectedPropertyId(e.target.value)}
//             className="border rounded px-4 py-2 "
//           >
//             <option value="">-- Select a Property --</option>
//             {propertyData.map((prop) => (
//               <option key={prop.basicInfo._id} value={prop.basicInfo._id}>
//                 {prop.basicInfo.name}
//               </option>
//             ))}
//           </select>
//       <div className="flex items-center text-yellow-400 space-x-1">
//         {[...Array(4)].map((_, i) => (
//           <MdStarRate key={i} />
//         ))}
//         <MdStarHalf />
//       </div>
//       <p className="text-gray-600 text-sm max-w-3xl">
//         Sapiente asperiores ut inventore. Voluptatem molestiae atque minima corrupti adipisci fugit a.
//         Earum assumenda qui beatae aperiam quaerat est quis hic sit...
//       </p>
//       <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
//         {[FaWifi, FaDumbbell, FaParking, FaSnowflake, FaSwimmingPool, FaConciergeBell].map((Icon, i) => (
//           <div className="flex items-center gap-1" key={i}>
//             <Icon /> Wifi
//           </div>
//         ))}
//       </div>

//       <div className="bg-white shadow rounded-xl p-4 flex gap-2 flex-wrap justify-between items-center">
//         <div className="flex items-center gap-2 text-gray-500">
//           <FaCalendarAlt />
//           <input
//             type="date"
//             value={checkIn}
//             onChange={(e) => setCheckIn(e.target.value)}
//             className="outline-none border rounded px-2 py-1"
//           />
//         </div>
//         <div className="flex items-center gap-2 text-gray-500">
//           <FaCalendarAlt />
//           <input
//             type="date"
//             value={checkOut}
//             onChange={(e) => setCheckOut(e.target.value)}
//             className="outline-none border rounded px-2 py-1"
//           />
//         </div>
//         <div className="flex items-center gap-2 text-gray-500">
//           <FaUser />
//           <input
//             type="number"
//             min="1"
//             value={persons}
//             onChange={(e) => setPersons(Number(e.target.value))}
//             className="w-16 outline-none border rounded px-2 py-1"
//           />
//           Persons
//         </div>
//         <div>
//           <select
//             value={selectedBeds || ""}
//             onChange={(e) => setSelectedBeds(Number(e.target.value) || null)}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="">All Sharing Types</option>
//             {sharingTypes.map(({ beds, type }) => (
//               <option key={type} value={beds}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//         <Button type="button" className="bg-blue-600 text-white px-6">Search</Button>
//       </div>

//       <div className="text-2xl font-bold pt-4">Hostel Infrastructure</div>

//       {filteredSharing.map(({ type, beds }) => (
//         <div key={type} className="mt-6 bg-white shadow rounded-xl p-6">
//           <div className="flex gap-6 items-start ">
//             <div className="min-w-[200px] text-center">
//               <div className="h-24 w-24 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded mx-auto" />
//               <div className="text-sm mt-2 font-semibold">{type}</div>
//               <div className="text-xs text-gray-500">({beds} Bed{beds > 1 ? "s" : ""} per Room)</div>
//             </div>
//             <div className="flex-1 space-y-4">
//               {allRooms[type].map((floor, idx) => (
//                 <div key={idx}>
//                   <div className="font-semibold text-gray-700 mb-1">{floor.floor}</div>
//                   <div className="flex flex-wrap gap-2">
//                     {floor.rooms.map((room, i) => (
//                       <div
//                         key={i}
//                         className="flex flex-col items-center border rounded p-2 min-w-[60px] text-xs"
//                       >
//                         <div className="font-semibold mb-1">{room.number}</div>
//                         <div className="flex gap-1">
//                           {Array.from({ length: room.beds }).map((_, bIdx) => (
//                             <div
//                               key={bIdx}
//                               className={clsx(
//                                 "w-2.5 h-4 rounded-sm",
//                                 bIdx < room.filledBeds ? "bg-green-600" : "bg-gray-100 border"
//                               )}
//                             ></div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="text-center mt-10 text-sm text-gray-500">
//         Click here for <span className="text-blue-600 underline">Booking & Refund Policies</span>
//       </div>
//       <div className="text-center mt-2">
//         <Button className="bg-blue-600 px-10 text-white">Proceed</Button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default HostelInfrastructure;
import React, { useState, useEffect, useMemo } from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdStarRate, MdStarHalf } from "react-icons/md";
import ClientNav from "../Client-Navbar/ClientNav";
import Button from "./Button";
import { propertyAPI } from "../PropertyController";
import { useLocation } from "react-router-dom";

// ✅ Reusable SingleBed component
function SingleBed({ room, bed, booked = false, selected, onToggle }) {
  let mainBg = booked
    ? "bg-gray-400 text-black"
    : selected
      ? "bg-[#FFBD15] text-black"
      : "bg-[#008000] text-white";

  let handleBg = "bg-[#BCBCBC] text-black";

  return (
    <div className="inline-block">
      <div
        onClick={() => {
          if (booked) return;
          onToggle?.();
        }}
        className="relative flex items-center justify-center w-14 h-10 rounded-lg overflow-hidden cursor-pointer select-none transition"
      >
        <div className={`${mainBg} absolute inset-0 rounded-lg`} />
        <div className={`absolute z-20 text-sm font-medium ${mainBg}`}>
          {room}-{bed.replace("Bed ", "")}
        </div>
        <div
          className={`absolute right-0 top-0 w-3 h-6 ${handleBg} rounded-sm`}
          style={{ transform: "translate(0.30rem, 33%)" }}
        />
      </div>
    </div>
  );
}

const HostelInfrastructure = () => {
  const location = useLocation();
  const tenantData = location.state?.tenantData;

  console.log("Received tenant data:", tenantData);

  const [selectedBeds, setSelectedBeds] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(1);
  const [propertyData, setPropertyData] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [unavailableRooms, setUnavailableRooms] = useState([]);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [stayType, setStayType] = useState("");
  const [totalRent, setTotalRent] = useState(0);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);
  const [selectedRoomDeposit, setSelectedRoomDeposit] = useState(0);

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await propertyAPI.getCompletePropertyData();
        setPropertyData(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };
    fetchProperties();
  }, []);

  const selectedProperty = useMemo(() => {
    return (
      propertyData.find((p) => p.basicInfo._id === selectedPropertyId) || null
    );
  }, [propertyData, selectedPropertyId]);

  const roomTypes = selectedProperty?.rooms?.types || [];
  const roomFloors = selectedProperty?.rooms?.floors?.floors || [];

  // ✅ Bed mapping logic
  const roomsBySharing = useMemo(() => {
    const result = {};
    if (!selectedProperty) return result;

    roomFloors.forEach((floor) => {
      Object.entries(floor.rooms || {}).forEach(([roomNumber, beds]) => {
        const bedCount = beds.length;
        const sharingType =
          ["single", "double", "triple", "four", "five", "six"][bedCount - 1] ||
          "unknown";

        if (!result[sharingType]) result[sharingType] = [];
        let floorGroup = result[sharingType].find((f) => f.floor === floor.floor);
        if (!floorGroup) {
          floorGroup = { floor: floor.floor, beds: [] };
          result[sharingType].push(floorGroup);
        }

        beds.forEach((bedName) => {
          const bedId = `${roomNumber}-${bedName.replace(/\s+/g, "-")}`;

          let isBooked = false;
          if (
            selectedProperty?.bookings &&
            Array.isArray(selectedProperty.bookings)
          ) {
            const bookingInfo = selectedProperty.bookings.find(
              (b) =>
                b.room === roomNumber &&
                b.bed === bedName &&
                new Date(b.checkOutDate) > new Date()
            );
            if (bookingInfo) isBooked = true;
          }

          const bedIdentifier = `${sharingType}-${roomNumber}-${bedName.replace(/\s+/g, "")}`;
          if (unavailableRooms.includes(bedIdentifier)) isBooked = true;

          floorGroup.beds.push({
            id: bedId,
            room: roomNumber,
            bed: bedName,
            booked: isBooked,
          });
        });
      });
    });

    return result;
  }, [selectedProperty, roomFloors, unavailableRooms]);

  // Availability checker
  const checkRoomAvailability = async (date, propertyId) => {
    if (!date || !propertyId) return;
    try {
      setAvailabilityChecked(false);
      const res = await fetch("http://localhost:5000/api/auth/bookings/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, propertyId }),
      });
      const result = await res.json();
      if (result.success) setUnavailableRooms(result.unavailableRooms || []);
      setAvailabilityChecked(true);
    } catch (err) {
      console.error(err);
      setUnavailableRooms([]);
      setAvailabilityChecked(true);
    }
  };

  // ✅ Auto set checkOut based on stayType
  useEffect(() => {
    if (!checkIn || !stayType) return;
    const checkInDate = new Date(checkIn);
    let newCheckOut = "";

    if (stayType === "daily") {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      newCheckOut = nextDay.toISOString().split("T")[0];
    } else if (stayType === "monthly") {
      const nextMonth = new Date(checkInDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      newCheckOut = nextMonth.toISOString().split("T")[0];
    }

    if (stayType !== "custom") setCheckOut(newCheckOut);
  }, [checkIn, stayType]);

  useEffect(() => {
    if (checkIn && selectedPropertyId) checkRoomAvailability(checkIn, selectedPropertyId);
  }, [checkIn, selectedPropertyId]);

  // Calculate rent
  useEffect(() => {
    if (!selectedProperty || !stayType) return;
    const currentRoom = selectedBeds
      ? selectedProperty.rooms.types.find((r) => r.capacity === selectedBeds)
      : selectedProperty.rooms.types[0];
    if (!currentRoom) return;

    setSelectedRoomPrice(currentRoom.price);
    setSelectedRoomDeposit(currentRoom.deposit);

    let rent = 0;
    if (stayType === "monthly") rent = currentRoom.price;
    else if (stayType === "daily") rent = Math.round(currentRoom.price / 30);
    else if (stayType === "custom" && checkIn && checkOut) {
      const days = Math.max(
        1,
        Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      );
      rent = Math.round((currentRoom.price / 30) * days);
    }
    setTotalRent(rent);
  }, [stayType, checkIn, checkOut, selectedBeds, selectedProperty]);

  // ✅ Proceed button
const handleProceed = async () => {
  if (!selectedBedId || !stayType) {
    alert("Please select a bed and stay type");
    return;
  }

  // 1️⃣ Find selected bed details
  let selectedRoomDetails = null;
  for (const sharingType in roomsBySharing) {
    for (const floorGroup of roomsBySharing[sharingType]) {
      const bed = floorGroup.beds.find(
        (b) => `${b.room}-${b.bed.replace(/\s+/g, "-")}` === selectedBedId
      );
      if (bed) {
        selectedRoomDetails = {
          roomIdentifier: `${bed.room}-${bed.bed}`,
          sharingType,
          floor: floorGroup.floor,
          roomNumber: bed.room,
          bed: bed.bed,
        };
        break;
      }
    }
    if (selectedRoomDetails) break;
  }

  if (!selectedRoomDetails) {
    alert("Invalid bed selection");
    return;
  }

  try {
    // ✅ Use existing tenant id
    const userId = tenantData._id || tenantData.id;
    if (!userId) {
      alert("No tenant ID found. Please create tenant first.");
      return;
    }

    // ✅ Build booking payload
    const pricingPayload = {
      monthlyRent: selectedRoomPrice,
      securityDeposit: selectedRoomDeposit,
      maintenanceFee: 0,
      totalRent,
    };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const clientIdFromLocalStorageOrState =
      storedUser?._id || tenantData?.clientId;

    const payload = {
      tenant: userId,
      propertyId: selectedPropertyId,
      roomDetails: selectedRoomDetails,
      stayType,
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      personCount: persons,
      pricing: pricingPayload,
      createdBy: clientIdFromLocalStorageOrState, // client creating this booking
      bookingStatus: "confirmed",
    };

    // 3️⃣ Save booking
    const res = await fetch("http://localhost:5000/api/offline-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Offline booking created successfully!");
    } else {
      alert("Booking failed: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Booking failed!");
  }
};





  return (
    <div>
      <ClientNav />
      <div className="p-6 space-y-6 bg-gray-100">
        <div className="text-sm text-gray-500">Home / Infrastructure</div>

        <select
          value={selectedPropertyId}
          onChange={(e) => setSelectedPropertyId(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">-- Select a Property --</option>
          {propertyData.map((prop) => (
            <option key={prop.basicInfo._id} value={prop.basicInfo._id}>
              {prop.basicInfo.name}
            </option>
          ))}
        </select>

        {selectedProperty && (
          <>
            <div className="text-3xl font-semibold">{selectedProperty.basicInfo.name}</div>
            <div className="flex items-center text-yellow-400 space-x-1">
              {[...Array(4)].map((_, i) => <MdStarRate key={i} />)}
              <MdStarHalf />
            </div>
            <p className="text-gray-600 text-sm max-w-3xl">{selectedProperty.pgDetails?.description}</p>

            {/* Filters */}
            <div className="bg-white shadow rounded-xl p-4 flex gap-4 flex-wrap items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <FaCalendarAlt />
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="outline-none border rounded px-2 py-1" />
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <label className="font-medium">Duration:</label>
                <select value={stayType} onChange={(e) => setStayType(e.target.value)} className="border rounded px-2 py-1 text-sm">
                  <option value="">-- Select --</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {stayType === "custom" && (
                <div className="flex items-center gap-2 text-gray-500">
                  <FaCalendarAlt />
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="outline-none border rounded px-2 py-1" min={checkIn || ""} />
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-500">
                <FaUser />
                <input type="number" min="1" value={persons} onChange={(e) => setPersons(Number(e.target.value))} className="w-16 outline-none border rounded px-2 py-1" />
                Persons
              </div>

              <select value={selectedBeds || ""} onChange={(e) => setSelectedBeds(Number(e.target.value) || null)} className="border rounded px-2 py-1 text-sm">
                <option value="">All Sharing Types</option>
                {[...new Set(roomTypes.map((r) => r.capacity))].map((bed) => (
                  <option key={bed} value={bed}>{bed === 1 ? "Single Room" : `${bed} Sharing`}</option>
                ))}
              </select>

              <Button type="button" className="bg-blue-600 text-white px-6" onClick={() => checkRoomAvailability(checkIn, selectedPropertyId)}>Search</Button>
            </div>

            {stayType && (
              <div className="text-lg font-semibold text-green-700 mt-2">
                {stayType === "daily" && `Rent: ₹${totalRent}/Day`}
                {stayType === "custom" && (checkOut ? `Total Rent: ₹${totalRent}` : "Select checkout date for total rent")}
                {stayType === "monthly" && `Rent: ₹${totalRent}/Month`}
              </div>
            )}

            <div className="text-2xl font-bold pt-4">Room Types</div>

            {/* Room Cards */}
            {roomTypes.filter(r => !selectedBeds || r.capacity === selectedBeds).map(room => (
              <div key={room._id} className="mt-6 bg-white shadow rounded-xl p-6">
                <div className="flex gap-32 items-center">
                  <div className="min-w-[200px] text-center">
                    <div className="h-24 w-24 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded mx-auto" />
                    <div className="text-sm mt-2 font-semibold">{room.label}</div>
                    <div className="text-xs text-gray-500">({room.capacity} Bed{room.capacity > 1 ? "s" : ""} per Room)</div>
                    <div className="text-xs text-gray-500">₹{room.price}/month + ₹{room.deposit} deposit</div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {roomFloors.map((floor, idx) => {
                      const sharingType = ["single", "double", "triple", "four", "five", "six"][room.capacity - 1] || "unknown";
                      const floorGroup = roomsBySharing[sharingType]?.find(f => f.floor === floor.floor);
                      if (!floorGroup) return null;

                      const groupedBeds = [];
                      for (let i = 0; i < room.capacity; i++) groupedBeds.push([]);
                      floorGroup.beds.forEach((b, index) => groupedBeds[index % room.capacity].push(b));

                      return (
                        <div key={idx}>
                          <div className="font-semibold text-gray-700 mb-5">Floor {floor.floor}</div>
                          <div className="space-y-4">
                            {groupedBeds.map((row, rowIdx) => (
                              <div key={rowIdx} className="flex gap-16">
                                {row.map(b => (
                                  <SingleBed
                                    key={b.id}
                                    room={b.room}
                                    bed={b.bed}
                                    booked={b.booked}
                                    selected={selectedBedId === b.id}
                                    onToggle={() => setSelectedBedId(prev => prev === b.id ? null : b.id)}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="text-center mt-10 text-sm text-gray-500">
          Click here for <span className="text-blue-600 underline">Booking & Refund Policies</span>
        </div>

        <div className="text-center mt-2">
          <Button
            className={`px-10 text-white ${selectedBedId && stayType ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!selectedBedId || !stayType}
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelInfrastructure;
