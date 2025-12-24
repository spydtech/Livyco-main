
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import room from "../../assets/user/home page/homepage image.png";

// export default function Hero() {
//   const navigate = useNavigate();
//   const [genderOption, setGenderOption] = useState("");
//   const [location, setLocation] = useState("");
//   const [sharing, setSharing] = useState("");
//   const [budget, setBudget] = useState("");
//   const [moveInDate, setMoveInDate] = useState("");
//   const [locality, setLocality] = useState("");

//   const handleSearch = () => {
//     const queryParams = new URLSearchParams({
//       gender: genderOption,
//       city: location,
//       sharing,
//       budget,
//       moveInDate,
//       locality,
//     });
//     console.log("asking for-", queryParams.toString());
//     navigate(`/user/pgsearch?${queryParams.toString()}`);
//   };

//   return (
//     <section className="bg-[#f6f7fb] px-6 py-10 w-full">
//       <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-6xl mx-auto">
//         {/* Left Text Section */}
//         <div className="max-w-lg space-y-6">
//           <h1 className="text-3xl md:text-5xl font-bold text-[#0827B2] leading-tight">
//             Need a Safe, Affordable Hostel or PG?{" "}
//             <span className="relative inline-block">
//               We've Got
//               <span className="absolute w-full h-1 bg-yellow-400 bottom-0 left-0"></span>
//             </span>{" "}
//             You Covered!
//           </h1>
//           <button className="bg-[#144FB6] text-white px-8 py-3 rounded-full shadow-md">
//             Find a Hostel/PG
//           </button>
//         </div>

//         {/* Right Image Section */}
//         <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center absolute md:relative">
//           <img
//             src={room}
//             alt="Room"
//             className="rounded-lg md:max-w-[800px] w-full md:h-[650px]"
//           />
//         </div>
//       </div>

//       {/* Search Filter Box */}
//       <div className="md:relative -mt-36 bg-[#FFDC82] rounded-2xl shadow-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row-2 items-center gap-4 md:gap-6">
//         <div className="flex items-center gap-x-10 text-sm">
//           {/* Gender Selection */}
//           <div className="flex gap-2 text-sm">
//             {["Male", "Female", "Co living"].map((opt) => (
//               <button
//                 key={opt}
//                 onClick={() => setGenderOption(opt)}
//                 className={`px-3 py-1 rounded-full ${genderOption === opt
//                     ? "bg-[#144FB6] text-white"
//                     : "bg-white text-black"
//                   }`}
//               >
//                 {opt === "Male"
//                   ? "For Him"
//                   : opt === "Female"
//                     ? "For Her"
//                     : "Co Living"}
//               </button>
//             ))}

//             {/* Sharing Type */}
//             <select
//               className="bg-transparent focus:outline-none"
//               value={sharing}
//               onChange={(e) => setSharing(e.target.value)}
//             >
//               <option value="">Sharing Type</option>
//               <option value="single">Single Sharing</option>
//               <option value="double">Double Sharing</option>
//               <option value="triple">Triple Sharing</option>
//               <option value="quint">Four Sharing</option>
//             </select>

//             {/* Budget Selection (Range) */}
//             <select
//               className="bg-transparent focus:outline-none"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//             >
//               <option value="">Budget</option>
//               <option value="0-5000">₹0 - ₹5000</option>
//               <option value="5001-8000">₹5001 - ₹8000</option>
//               <option value="8001-12000">₹8001 - ₹12000</option>
//               <option value="12001-15000">₹12001 - ₹15000</option>
//             </select>
//           </div>
//         </div>

//         {/* City, Locality & Move-in */}
//         <div className="flex items-center gap-14 text-sm">
//           <div className="flex items-center gap-2 rounded-3xl">
//             {/* City Dropdown */}
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="bg-yellow-400 px-3 py-1 rounded-3xl focus:outline-none"
//             >
//               <option value="">Select City</option> {/* Default empty */}
//               <option value="Hyderabad">Hyderabad</option>
//               <option value="Bangalore">Bangalore</option>
//               <option value="Chennai">Chennai</option>
//               <option value="Pune">Pune</option>
//               <option value="Mumbai">Mumbai</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Guntur">Guntur</option>
//             </select>

//             {/* Locality Input */}
//             <input
//               type="text"
//               placeholder="Search for locality or landmark"
//               className="px-3 py-1 rounded-3xl focus:outline-none w-60"
//               value={locality}
//               onChange={(e) => setLocality(e.target.value)} // ✅ Automatically updates state
//             />
//           </div>


//           {/* Move In & Search */}
//           <div className="flex items-center gap-3">
//             <label htmlFor="move-in" className="text-sm">
//               Move In
//             </label>
//             <input
//               type="date"
//               id="move-in"
//               value={moveInDate}
//               onChange={(e) => setMoveInDate(e.target.value)}
//               className="bg-white px-3 py-1 rounded focus:outline-none"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-yellow-400 px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-300"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import room from "../../assets/user/home page/homepage image.png";
import delhi from "../../assets/locationmonuments/delhi.jpg";
import mumbai from "../../assets/locationmonuments/mumbai.jpeg";
import bangalore from "../../assets/locationmonuments/bangalore.png";
import hyderabad from "../../assets/locationmonuments/hyderabad.png";
import chandigarh from "../../assets/locationmonuments/chandigarh.png";
import ahmedabad from "../../assets/locationmonuments/ahmedabad.png";
import pune from "../../assets/locationmonuments/pune.png";
import chennai from "../../assets/locationmonuments/chennai.png";
import kolkata from "../../assets/locationmonuments/kolkata.png";
import kochi from "../../assets/locationmonuments/kochi.png";
import guntur from "../../assets/locationmonuments/guntur.webp";


export default function Hero() {
  const navigate = useNavigate();
  const [genderOption, setGenderOption] = useState("");
  const [location, setLocation] = useState("");
  const [sharing, setSharing] = useState("");
  const [budget, setBudget] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [locality, setLocality] = useState("");
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState("");


  const cities = [
    { name: "Mumbai", img: mumbai },
    { name: "Delhi-NCR", img: delhi },
    { name: "Bangalore", img: bangalore },
    { name: "Hyderabad", img: hyderabad },
    { name: "Chandigarh", img: chandigarh },
    { name: "Ahmedabad", img: ahmedabad },
    { name: "Pune", img: pune },
    { name: "Chennai", img: chennai },
    { name: "Kolkata", img: kolkata },
    { name: "Kochi", img: kochi },


  ];

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      gender: genderOption,
      city: location,
      sharing,
      budget,
      moveInDate,
      locality,
    });
    navigate(`/user/pgsearch?${queryParams.toString()}`);
    window.scrollTo(0, 0);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=pk.d9ded81b098baab4433252bccb34a41e&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const cityName =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state_district;
            setLocation(cityName);
            setShowCityModal(false);
          } catch {
            alert("Unable to detect location");
          }
        },
        () => alert("Location access denied")
      );
    }
  };

  return (
    <section className="bg-[#f6f7fb] px-4 sm:px-6 py-8 md:py-10 w-full ">
      {/* Main Hero Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="max-w-lg space-y-4 md:space-y-6 mt-6 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0827B2] leading-tight">
            Need a Safe, Affordable Hostel or PG?{" "}
            <span className="relative inline-block">
              We've Got
              <span className="absolute w-full h-1 bg-yellow-400 bottom-0 left-0"></span>
            </span>{" "}
            You Covered!
          </h1>
          <button className="bg-[#144FB6] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md text-sm sm:text-base">
            Find a Hostel/PG
          </button>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center relative">
          <img
            src={room}
            alt="Room"
            className="rounded-lg md:max-w-[800px] w-full h-[300px] sm:h-[400px] md:h-[650px] object-cover"
          />
        </div>
      </div>

      {/* Search Filter Box */}
      {/* <div className="md:relative mt-4 md:-mt-36 bg-[#FFDC82] glass-badge backdrop-blur-xl rounded-2xl shadow-lg p-4 sm:p-6 max-w-4xl mx-auto flex flex-col gap-4 md:gap-6">
        */}
       
        {/* Gender Options & Filters */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {["Male", "Female", "Co living"].map((opt) => (
              <button
                key={opt}
                onClick={() => setGenderOption(opt)}
                className={`px-3 py-1 border-2 border/30 rounded-full ${genderOption === opt
                    ? "bg-[#144FB6] text-white "
                    : "bg-white text-black"
                  }`}
              >
                {opt === "Male"
                  ? "For Him"
                  : opt === "Female"
                    ? "For Her"
                    : "Co Living"}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm">
            <select
              className="bg-white px-3 py-1 rounded-full border-2 border/30 focus:outline-none"
              value={sharing}
              onChange={(e) => setSharing(e.target.value)}
            >
              <option value="">Sharing Type</option>
              <option value="single">Single Sharing</option>
              <option value="double">Double Sharing</option>
              <option value="triple">Triple Sharing</option>
              <option value="quint">Four Sharing</option>
            </select>

            <select
              className="bg-white px-3 py-1 rounded-full focus:outline-none border-2 border/30"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Budget</option>
              <option value="0-5000">₹0 - ₹5000</option>
              <option value="5001-8000">₹5001 - ₹8000</option>
              <option value="8001-12000">₹8001 - ₹12000</option>
              <option value="12001-15000">₹12001 - ₹15000</option>
            </select>
          </div>
        </div> 
        */}
        <div className="md:relative mt-4 md:-mt-36 max-w-4xl mx-auto">
  {/* Main glass container */}
  <div className="glass-badge backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 md:gap-6 relative overflow-hidden">
    {/* Background gradient overlay for glass effect */}
    <div className="absolute inset-0 bg-[#ffdc82] rounded-2xl"></div>
    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
    
    {/* Content container */}
    <div className="relative z-10">
      {/* Gender Options & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {["Male", "Female", "Co living"].map((opt) => (
            <button
              key={opt}
              onClick={() => setGenderOption(opt)}
              className={`glass-button px-4 py-2 border border-white/30 rounded-full font-medium transition-all duration-300 ${genderOption === opt
                  ? "bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white shadow-lg shadow-blue-500/30 border-blue-400/40"
                  : "bg-white/40 text-gray-800 hover:bg-white/60 hover:shadow-md hover:shadow-white/20"
                }`}
            >
              {opt === "Male"
                ? "For Him"
                : opt === "Female"
                  ? "For Her"
                  : "Co Living"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm">
          <select
            className="glass-select bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 text-gray-800"
            value={sharing}
            onChange={(e) => setSharing(e.target.value)}
          >
            <option value="" className="bg-white/90">Sharing Type</option>
            <option value="single" className="bg-white/90">Single Sharing</option>
            <option value="double" className="bg-white/90">Double Sharing</option>
            <option value="triple" className="bg-white/90">Triple Sharing</option>
            <option value="quint" className="bg-white/90">Four Sharing</option>
          </select>

          <select
            className="glass-select bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 text-gray-800"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="" className="bg-white/90">Budget</option>
            <option value="0-5000" className="bg-white/90">₹0 - ₹5000</option>
            <option value="5001-8000" className="bg-white/90">₹5001 - ₹8000</option>
            <option value="8001-12000" className="bg-white/90">₹8001 - ₹12000</option>
            <option value="12001-15000" className="bg-white/90">₹12001 - ₹15000</option>
          </select>
        </div>
      </div>

      {/* City, Locality & Move-in */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm w-full mt-2">
        <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowCityModal(true)}
            className="glass-button bg-gradient-to-r from-yellow-400/80 to-yellow-500/80 hover:from-yellow-400 hover:to-yellow-500 px-4 py-2.5 border border-yellow-300/40 rounded-full focus:outline-none flex items-center gap-2 w-full sm:w-auto justify-center font-medium shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300"
          >
            <MapPin className="w-4 h-4" />
            {location || "Select City"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <div className="glass-label bg-white/40 backdrop-blur-sm px-4 py-1.5 border border-white/40 rounded-full text-gray-800 font-medium">
            <label htmlFor="move-in" className="text-sm whitespace-nowrap">
              Move In
            </label>
          </div>
          <input
            type="date"
            id="move-in"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="glass-input bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 w-full sm:w-auto text-gray-800"
          />
          <button
            onClick={handleSearch}
            className="glass-button bg-gradient-to-r from-yellow-400/80 to-yellow-500/80 hover:from-yellow-400 hover:to-yellow-500 px-6 py-2.5 border border-yellow-300/40 rounded-full text-sm font-medium shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* City, Locality & Move-in */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-14 text-sm w-full">
          <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowCityModal(true)}
              className="bg-yellow-400 px-3 py-2 sm:py-1 border-2 border/30  rounded-3xl focus:outline-none flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MapPin className="w-4 h-4" />
              {location || "Select City"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <label htmlFor="move-in" className="text-sm whitespace-nowrap rounded-full border-2 border/30 px-2 py-1">
              Move In
            </label>
            <input
              type="date"
              id="move-in"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="bg-white px-3 py-1 rounded-full border-2 border/30 focus:outline-none w-full sm:w-auto"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 px-6 py-2 border-2 border/30 rounded-full text-sm font-medium hover:bg-yellow-300 w-full sm:w-auto text-center"
            >
              Search
            </button>
          </div>
        </div> */}
      {/* </div> */}

      {/* City Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            {/* Search input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Search for your city"
                  className="w-full border px-3 py-2 rounded-md"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
                <button
                  onClick={handleDetectLocation}
                  className="flex items-center gap-2 text-red-500 whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4" />
                  Detect
                </button>
              </div>
            </div>

            {/* Use typed city button */}
            {citySearch.trim() && (
              <button
                onClick={() => {
                  setLocation(citySearch.trim());
                  setShowCityModal(false);
                }}
                className="bg-yellow-400 px-4 py-2 rounded-md mb-4 w-full sm:w-auto"
              >
                Use "{citySearch.trim()}"
              </button>
            )}

            {/* Heading */}
            <h3 className="font-semibold mb-3">Popular Cities</h3>

            {/* Grid layout for cities */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-2">
              {cities
                .filter((c) =>
                  c.name.toLowerCase().includes(citySearch.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.name}
                    onClick={() => {
                      setLocation(city.name);
                      setShowCityModal(false);
                    }}
                    className="cursor-pointer border rounded-lg p-3 text-center hover:bg-blue-50 transition"
                  >
                    <img
                      src={city.img}
                      alt={city.name}
                      className="w-full h-20 sm:h-24 object-cover rounded-md mb-2 mx-auto"
                    />
                    <p className="font-medium text-sm">{city.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
