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

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaWifi,
  FaDumbbell,
  FaParking,
  FaSnowflake,
  FaSwimmingPool,
  FaConciergeBell,
} from "react-icons/fa";
import { MdStarRate, MdStarHalf } from "react-icons/md";
import clsx from "clsx";
import ClientNav from "../Client-Navbar/ClientNav";
import Button from "./Button";
import { propertyAPI } from "../PropertyController";

const HostelInfrastructure = () => {
  const [selectedBeds, setSelectedBeds] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(1);
  const [propertyData, setPropertyData] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");

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

  const selectedProperty = propertyData.find(
    (p) => p.basicInfo._id === selectedPropertyId
  );

  const roomTypes = selectedProperty?.rooms?.types || [];
  const roomFloors = selectedProperty?.rooms?.floors?.floors || [];

  const filteredRoomTypes = roomTypes.filter((room) => {
    const matchBed = selectedBeds ? room.capacity === selectedBeds : true;
    const matchAvailability = checkIn && checkOut ? room.availableCount > 0 : true;
    return matchBed && matchAvailability;
  });

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

            <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
              {["WiFi", "Gym", "Parking", "AC", "Swimming Pool", "Room Service"].map((name, i) => (
                <div key={i} className="flex items-center gap-1"><FaWifi /> {name}</div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white shadow rounded-xl p-4 flex gap-2 flex-wrap justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <FaCalendarAlt />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="outline-none border rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaCalendarAlt />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="outline-none border rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaUser />
                <input
                  type="number"
                  min="1"
                  value={persons}
                  onChange={(e) => setPersons(Number(e.target.value))}
                  className="w-16 outline-none border rounded px-2 py-1"
                />
                Persons
              </div>
              <select
                value={selectedBeds || ""}
                onChange={(e) => setSelectedBeds(Number(e.target.value) || null)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="">All Sharing Types</option>
                {[...new Set(roomTypes.map((r) => r.capacity))].map((bed) => (
                  <option key={bed} value={bed}>
                    {bed === 1 ? "Single Room" : `${bed} Sharing`}
                  </option>
                ))}
              </select>
              <Button type="button" className="bg-blue-600 text-white px-6">Search</Button>
            </div>

            <div className="text-2xl font-bold pt-4">Room Types</div>

            {/* Room Cards */}
            {filteredRoomTypes.map((room) => (
              <div key={room._id} className="mt-6 bg-white shadow rounded-xl p-6">
                <div className="flex gap-6 items-start">
                  <div className="min-w-[200px] text-center">
                    <div className="h-24 w-24 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded mx-auto" />
                    <div className="text-sm mt-2 font-semibold">{room.label}</div>
                    <div className="text-xs text-gray-500">({room.capacity} Bed{room.capacity > 1 ? "s" : ""} per Room)</div>
                    <div className="text-xs text-gray-500">₹{room.price}/month + ₹{room.deposit} deposit</div>
                  </div>
                  <div className="flex-1 space-y-4">
                    {roomFloors.map((floor, idx) => {
                      const roomNumbersStr = floor.rooms[room.type];
                      if (!roomNumbersStr) return null;
                      const roomNumbers = roomNumbersStr.split(",").map(r => r.trim());

                      return (
                        <div key={idx}>
                          <div className="font-semibold text-gray-700 mb-1">Floor {floor.floor}</div>
                          <div className="flex flex-wrap gap-2">
                            {roomNumbers.map((num, i) => (
                              <div key={i} className="flex flex-col items-center border rounded p-2 min-w-[60px] text-xs">
                                <div className="font-semibold mb-1">{num}</div>
                                <div className="flex gap-1">
                                  {Array.from({ length: room.capacity }).map((_, bIdx) => (
                                    <div
                                      key={bIdx}
                                      className={clsx(
                                        "w-2.5 h-4 rounded-sm",
                                        "bg-gray-100 border"
                                      )}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
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
          <Button className="bg-blue-600 px-10 text-white">Proceed</Button>
        </div>
      </div>
    </div>
  );
};

export default HostelInfrastructure;
