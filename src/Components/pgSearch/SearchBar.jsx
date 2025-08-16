import React, { useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function SearchBar({ setFilters }) {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [persons, setPersons] = useState(1);

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      city: search,
      startDate,
      endDate,
      persons,
    }));
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-32 mt-6">
      <div className="flex flex-col md:flex-row flex-wrap items-stretch gap-4 bg-white p-4 shadow-lg rounded-2xl">
        {/* City Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
          <MapPin className="w-4 h-4 text-[#333333]" />
          <input
            type="text"
            placeholder="City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Start Date */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
          <CalendarDays className="w-4 h-4 text-[#333333]" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* End Date */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
          <CalendarDays className="w-4 h-4 text-[#333333]" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Number of Persons */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#F2F2F2] rounded px-3 py-2">
          <Users className="w-4 h-4 text-[#333333]" />
          <input
            type="number"
            min="1"
            value={persons}
            onChange={(e) => setPersons(Number(e.target.value))}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
}
