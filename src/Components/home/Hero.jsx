import React from "react";
import room from "../../assets/user/home page/homepage image.png";

export default function Hero() {
  return (
    <section className="bg-[#f6f7fb] px-6 py-12">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-5xl mx-auto">
        <div className="max-w-lg space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
            Need a Safe, Affordable  Hostel or PG?
            <span className="relative inline-block">
              We've Got
              <span className="absolute w-full h-1 bg-yellow-400 bottom-0 left-0"></span>
            </span>{" "}
            You Covered!
          </h1>
          <button className="bg-blue-700 text-white px-8 py-3 rounded-full shadow-md">
            Find a Hostel/PG
          </button>
        </div>

        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center absolute md:relative">
          <img src={room} alt="Room" className="rounded-lg  max-w-[700px] w-full" />
        </div>
      </div>

     <div className="md:relative -mt-12 bg-[#FFDC82] rounded-2xl shadow-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row-2 items-center gap-4 md:gap-6">
 <div className="flex items-center gap-48 text-sm">
  <div className="flex items-center gap-2 text-sm whitespace-break-spaces  justify-start bg-[#FFDC82]">
    <input type="radio" name="visit" id="shortVisit" className="accent-[#FFDC82] " />
    <label htmlFor="shortVisit">Short Visit</label>
  </div>

  <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-sm justify-end">
    <button className="px-2">For Him</button>
    <button className="px-2">For Her</button>
    <button className="px-2">Co Living</button>
    <select className="bg-transparent focus:outline-none">
      <option>Sharing Type</option>
    </select>
    <input type="text" placeholder="Budget" className="bg-transparent focus:outline-none" />
    <button className="text-xl"><i className="fas fa-sliders-h"></i></button>
  </div>
  </div>

<div className="flex items-center gap-32 text-sm">
  <div className="flex items-center w-full md:w-auto gap-2 text-sm">
    <div className="flex items-center border-r border-gray-400 pr-2">
      <span className="font-medium text-gray-700">Hyderabad</span>
    </div>
    <input
      type="text"
      placeholder="Search for locality or landmark"
      className="flex-1 md:flex-none px-2 py-1 bg-transparent focus:outline-none w-full md:w-[200px]"
    />
  </div>

  <div className="flex items-center gap-2 text-sm">
    <label htmlFor="move-in" className="whitespace-nowrap">Move In</label>
    <input type="date" id="move-in" className="bg-transparent focus:outline-none" />
  </div>

  <button className="bg-yellow-400 px-6 py-2 rounded-full text-sm">Search</button>
</div></div>
    </section>
  );
}
