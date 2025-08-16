import React, { useState } from "react";
import room from "../../assets/user/home page/homepage image.png";

export default function Hero() {
  const [genderOption, setGenderOption] = useState("him");
  const [location, setLocation] = useState("Hyderabad");
  const [sharing, setSharing] = useState("");
  const [budget, setBudget] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  return (
    <section className="bg-[#f6f7fb] px-6 py-10 w-full">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="max-w-lg space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0827B2] leading-tight">
            Need a Safe, Affordable  Hostel or PG?
            <span className="relative inline-block">
              We've Got
              <span className="absolute w-full h-1 bg-yellow-400 bottom-0 left-0"></span>
            </span>{" "}
            You Covered!
          </h1>
          <button className="bg-[#144FB6] text-white px-8 py-3 rounded-full shadow-md">
            Find a Hostel/PG
          </button>
        </div>

        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center absolute md:relative">
          <img src={room} alt="Room" className="rounded-lg  md:max-w-[800px] w-full md:h-[650px]" />
        </div>
      </div>

     <div className="md:relative -mt-36 bg-[#FFDC82] rounded-2xl shadow-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row-2 items-center gap-4 md:gap-6">
 <div className="flex items-center gap-x-10 text-sm">
 {/* Short Visit */}
          <div className="flex items-center gap-2">
            <input type="radio" name="visit" id="shortVisit" className="accent-[#FFDC82]" />
            <label htmlFor="shortVisit" className="text-sm">Short Visit</label>
          </div>

 <div className="flex gap-2 text-sm">
            <button
              onClick={() => setGenderOption("him")}
              className={`px-3 py-1 rounded-full ${genderOption === "him" ? "bg-[#144FB6] text-white" : "bg-white text-black"}`}
            >
              For Him
            </button>
            <button
              onClick={() => setGenderOption("her")}
              className={`px-3 py-1 rounded-full ${genderOption === "her" ? "bg-[#144FB6] text-white" : "bg-white text-black"}`}
            >
              For Her
            </button>
            <button
              onClick={() => setGenderOption("coliving")}
              className={`px-3 py-1 rounded-full ${genderOption === "coliving" ? "bg-[#144FB6] text-white" : "bg-white text-black"}`}
            >
              Co Living
            </button>
    <select className="bg-transparent focus:outline-none">
      <option>Sharing Type</option>
      <option>Single Sharing </option>
      <option>Double Sharing </option>
      <option>three Sharing </option>
      <option>Foure Sharing </option>
    </select>
    <input type="text" placeholder="Budget" className="bg-transparent focus:outline-none" />
    <button className="text-xl"><i className="fas fa-sliders-h"></i></button>
  </div>
    <div>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L17 3M1 17H4M1 3L5 3M8 17H17M14 10H17M1 10L10 10" stroke="#333333" stroke-linecap="round"/>
      <path d="M5 3C5 4.10457 5.89543 5 7 5C8.10457 5 9 4.10457 9 3C9 1.89543 8.10457 1 7 1C5.89543 1 5 1.89543 5 3Z" stroke="#333333" stroke-linecap="round"/>
      <path d="M10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10Z" stroke="#333333" stroke-linecap="round"/>
      <path d="M4 17C4 18.1046 4.89543 19 6 19C7.10457 19 8 18.1046 8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17Z" stroke="#333333" stroke-linecap="round"/>
      </svg>

    </div>
  </div>

<div className="flex items-center gap-14 text-sm ">
  <div className="flex items-center gap-2 rounded-3xl">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-yellow-400 px-3 py-1 rounded-3xl focus:outline-none"
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
              placeholder="Search for locality or landmark"
              className=" px-3 py-1 rounded-3xl focus:outline-none w-60"
            />
          </div>

   <div className="flex items-center gap-3">
            <label htmlFor="move-in" className="text-sm">Move In</label>
            <input
              type="date"
              id="move-in"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="bg-white px-3 py-1 rounded focus:outline-none"
            />
            <button className="bg-yellow-400 px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-300">
              Search
            </button>
          </div>

  {/* <button className="bg-yellow-400 px-6 py-2 rounded-full text-sm">Search</button> */}
</div></div>
    </section>
  );
}
