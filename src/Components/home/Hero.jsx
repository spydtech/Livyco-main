import React, { useState } from "react";
import room from "../../assets/user/home page/homepage image.png";

export default function Hero() {
  const [genderOption, setGenderOption] = useState("him");
  const [location, setLocation] = useState("Hyderabad");
  const [moveInDate, setMoveInDate] = useState("");

  return (
    <section className="bg-[#f6f7fb] px-4 sm:px-6 py-10 w-full">
      {/* Top Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-6xl mx-auto gap-6">
        {/* Left Content */}
        <div className="max-w-lg space-y-6 text-center md:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0827B2] leading-tight">
            Need a Safe, Affordable Hostel or PG?{" "}
            <span className="relative inline-block">
              We’ve Got
              <span className="absolute w-full h-1 bg-yellow-400 bottom-0 left-0"></span>
            </span>{" "}
            You Covered!
          </h1>
          <button className="bg-[#144FB6] text-white px-6 py-2 md:px-8 md:py-3 rounded-full shadow-md text-sm md:text-base">
            Find a Hostel/PG
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end flex-1">
          <img
            src={room}
            alt="Room"
            className="rounded-lg w-full max-w-sm sm:max-w-md md:max-w-[800px] md:h-[650px] object-cover"
          />
        </div>
      </div>

      {/* Search / Filters Box */}
      <div className="mt-6 md:-mt-28 bg-[#FFDC82] rounded-2xl shadow-lg p-4 sm:p-6 max-w-4xl mx-auto flex flex-col gap-4">
        {/* Gender + Visit Options */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* Short Visit */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="visit"
              id="shortVisit"
              className="accent-[#FFDC82]"
            />
            <label htmlFor="shortVisit">Short Visit</label>
          </div>

          {/* Gender Switch */}
          <div className="flex gap-2 flex-wrap">
            {["him", "her", "coliving"].map((opt) => (
              <button
                key={opt}
                onClick={() => setGenderOption(opt)}
                className={`px-3 py-1 rounded-full text-sm ${
                  genderOption === opt
                    ? "bg-[#144FB6] text-white"
                    : "bg-white text-black"
                }`}
              >
                {opt === "him"
                  ? "For Him"
                  : opt === "her"
                  ? "For Her"
                  : "Co Living"}
              </button>
            ))}
          </div>

          {/* Sharing Type + Budget */}
          <select className="bg-white rounded px-2 py-1 text-sm">
            <option>Sharing Type</option>
            <option>Single Sharing</option>
            <option>Double Sharing</option>
            <option>Triple Sharing</option>
            <option>Four Sharing</option>
          </select>
          <input
            type="text"
            placeholder="Budget"
            className="bg-white rounded px-2 py-1 text-sm w-28"
          />
        </div>

        {/* Location + Move-in */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
          {/* Location */}
         <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="bg-white px-3 py-1 rounded-3xl w-full sm:w-auto"
  >
    <option>Hyderabad</option>
    <option>Bangalore</option>
    <option>Chennai</option>
    <option>Pune</option>
    <option>Mumbai</option>
    <option>Delhi</option>
  </select>
  <input
    type="text"
    placeholder="Locality or landmark"
    className="px-3 py-1 rounded-3xl w-full sm:w-auto"
  />
</div>


          {/* Move-in Date + Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <label htmlFor="move-in" className="whitespace-nowrap">
              Move In
            </label>
            <input
              type="date"
              id="move-in"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="bg-white px-3 py-1 rounded w-full sm:w-auto"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-full font-medium hover:bg-yellow-300 w-full sm:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
