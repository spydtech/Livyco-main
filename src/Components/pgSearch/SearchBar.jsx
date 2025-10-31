// import React, { useState } from "react";
// import { CalendarDays, MapPin, Users } from "lucide-react";

// export default function SearchBar({ setFilters }) {
//   const [search, setSearch] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [persons, setPersons] = useState(1);

//   const handleSearch = () => {
//     const trimmedCity = search.trim();

//     // Prevent filtering if end date is before start date
//     if (startDate && endDate && endDate < startDate) {
//       alert("End date cannot be before start date!");
//       return;
//     }

//     setFilters((prev) => ({
//       ...prev,
//       city: trimmedCity || "",
//       startDate,
//       endDate,
//       persons,
//     }));
//   };

//   return (
//     <div className="w-full px-4 md:px-8 lg:px-32 mt-6">
//       <div className="flex flex-col md:flex-row flex-wrap items-stretch gap-4 bg-white p-4 shadow-lg rounded-2xl">

//         {/* City Input */}
//         <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
//           <MapPin className="w-4 h-4 text-[#333333]" />
//           <input
//             type="text"
//             placeholder="City"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
//           />
//         </div>

//         {/* Start Date */}
//         <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
//           <CalendarDays className="w-4 h-4 text-[#333333]" />
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="bg-transparent outline-none w-full text-sm text-gray-700"
//           />
//         </div>

//         {/* End Date */}
//         <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
//           <CalendarDays className="w-4 h-4 text-[#333333]" />
//           <input
//             type="date"
//             value={endDate}
//             min={startDate} // ✅ ensures valid range
//             onChange={(e) => setEndDate(e.target.value)}
//             className="bg-transparent outline-none w-full text-sm text-gray-700"
//           />
//         </div>

//         {/* Number of Persons */}
//         <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
//           <Users className="w-4 h-4 text-[#333333]" />
//           <input
//             type="number"
//             min="1"
//             value={persons}
//             onChange={(e) => setPersons(Math.max(1, Number(e.target.value)))}
//             className="bg-transparent outline-none w-full text-sm text-gray-700"
//           />
//         </div>

//         {/* Search Button */}
//         <button
//           onClick={handleSearch}
//           className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 transition text-white px-6 py-2 rounded-full text-sm font-medium"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function SearchBar({ setFilters }) {
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);

  // ✅ Extract city from URL query params
  const cityFromQuery = queryParams.get("city") || "";

  const [search, setSearch] = useState(cityFromQuery);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // ✅ Sync input if URL changes (e.g., user navigates to another query)
  useEffect(() => {
    const city = queryParams.get("city") || "";
    setSearch(city);
  }, [locationHook.search]);

  const handleSearch = () => {
    const trimmedCity = search.trim();
    setFilters((prev) => ({
      ...prev,
      city: trimmedCity || "",
    }));
    console.log("Filters updated:", { city: trimmedCity || "" });
  };

  // 🧭 Detect current city on MapPin click
  const handleGetCurrentCity = async () => {
    try {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.state ||
          "Unknown";

        setSearch(city);
        setFilters((prev) => ({ ...prev, city })); // ✅ also update filters directly
        setLoadingLocation(false);
      });
    } catch (error) {
      console.error("Error getting city:", error);
      alert("Unable to detect your current city.");
      setLoadingLocation(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-32 mt-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl">
        {/* City Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
          <MapPin
            className={`w-4 h-4 text-[#333333] cursor-pointer ${
              loadingLocation ? "animate-spin text-yellow-500" : ""
            }`}
            onClick={handleGetCurrentCity}
            title="Use current location"
          />
          <input
            type="text"
            placeholder="City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 transition text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
}
