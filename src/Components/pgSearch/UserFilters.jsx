import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import image1 from "../../assets/user/pgsearch/images/image1.png";
import image2 from "../../assets/user/pgsearch/images/image2.png";
import image3 from "../../assets/user/pgsearch/images/image3.png";
import image4 from "../../assets/user/pgsearch/images/image4.png";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

// Filters.jsx
const suggestions = [
  "Wi-Fi",
  "CC TV",
  "Security guard",
  "Daily Cleaning",
  "Smoking",
  "Alcohol",
];
const otherServices = [
  "T.V",
  "Self Cooking",
  "Refrigerator",
  "Independent Cupboard",
  "Allow Guests",
  "Lift",
];
const ratings = [5, 4, 3, 2, 1];

export default function UserFilters({ filters, setFilters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type] || [];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((i) => i !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const handleRadioChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-72 p-4 bg-white shadow rounded-md space-y-6">
      <h2 className="font-bold mb-2">Filters</h2>
      {/* Deals */}
      <div>
        <h2 className="font-semibold mb-2">Deals</h2>
        <div className="space-y-2 ">
          <div>
            <input
              type="checkbox"
              id="recommended"
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  recommended: !prev.recommended,
                }))
              }
              checked={filters.recommended || false}
            />
            <label
              htmlFor="recommended"
              className="ml-2 text-[#333333] text-xs"
            >
              Recommended
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="distance"
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  distance: !prev.distance,
                }))
              }
              checked={filters.distance || false}
            />
            <label htmlFor="distance" className="ml-2 text-[#333333] text-xs">
              New By Distan..
            </label>
          </div>

          {/* Toggle button */}
          {otherServices.length > 2 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="flex items-center gap-1 text-blue-600 text-sm mt-1 hover:underline"
            >
              {showAll ? "Show Less" : "Show More"}
              {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* Looking For */}
      <div>
        <h2 className="font-semibold mb-2">Looking For</h2>
        {["Men's", "Girls/Women's", "Co-Living"].map((gender) => (
          <div key={gender} className="mb-1">
            <input
              type="radio"
              name="gender"
              checked={filters.gender === gender}
              onChange={() => handleRadioChange("gender", gender)}
            />
            <label className="ml-2 text-[#333333] text-xs">{gender}</label>
          </div>
        ))}
      </div>

      {/* Room Type */}
      <div>
        <h2 className="font-semibold mb-2">
          {" "}
          <span className="flex items-center gap-2 text-black">
            {" "}
            <img src={image1} alt="" className="w-2 h-2" />
            Room Type{" "}
          </span>
        </h2>
        {["Single", "Double", "3 Sharing", "4 Sharing"].map((type) => (
          <div key={type} className="mb-1">
            <input
              type="checkbox"
              checked={filters.roomType?.includes(type)}
              onChange={() => handleCheckboxChange("roomType", type)}
            />
            <label className="ml-2 text-[#333333] text-xs">{type}</label>
          </div>
        ))}
      </div>

      {/* Budget */}
      <div>
        <h2 className="font-semibold mb-2">
          <span className="flex items-center gap-2 text-black">
            {" "}
            <img src={image2} alt="" className="w-3 h-3 " />
            Budget
          </span>
        </h2>
        {["0-5000", "5001-8000", "8001-12000", "12001-15000"].map((range) => (
          <div key={range} className="mb-1">
            <input
              type="radio"
              name="budget"
              checked={filters.budget === range}
              onChange={() => handleRadioChange("budget", range)}
            />
            <label className="ml-2 text-[#333333] text-xs">₹{range}</label>
          </div>
        ))}
      </div>

      {/* Ratings */}
      <div>
        <h2 className="font-semibold mb-2">Rating</h2>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center mb-1">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === String(rating)}
              onChange={() =>
                setFilters((prev) => ({ ...prev, rating: String(rating) }))
              }
            />
            <label className="ml-2 text-yellow-500">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </label>
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <h2 className="font-semibold mb-2">
          <span className="flex items-center gap-2 text-black ">
            {" "}
            <img src={image4} alt="" className="w-3 h-3 " />
            Amenities
          </span>
        </h2>

        {/* Search input */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search amenities"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded pl-8 py-1 text-[#333333] text-xs"
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Suggestions */}
        <div className="mb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Suggestions
          </p>
          {suggestions
            .filter((am) => am.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((am) => (
              <div key={am} className="mb-1">
                <input
                  type="checkbox"
                  checked={filters.amenities?.includes(am)}
                  onChange={() => handleCheckboxChange("amenities", am)}
                />
                <label className="ml-2 text-[#333333] text-xs">{am}</label>
              </div>
            ))}
        </div>

        {/* All Other Services */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            All Other Services
          </p>
          {(showAll ? otherServices : otherServices.slice(0, 2))
            .filter((am) => am.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((am) => (
              <div key={am} className="mb-1">
                <input
                  type="checkbox"
                  checked={filters.amenities?.includes(am)}
                  onChange={() => handleCheckboxChange("amenities", am)}
                />
                <label className="ml-2 text-[#333333] text-xs">{am}</label>
              </div>
            ))}
        </div>

        {/* Toggle button */}
        {otherServices.length > 2 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-1 text-blue-600 text-sm mt-1 hover:underline"
          >
            {showAll ? "Show Less" : "Show More"}
            {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
