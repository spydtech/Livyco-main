import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import image1 from "../../assets/user/pgsearch/images/image1.png";
import image2 from "../../assets/user/pgsearch/images/image2.png";
import image4 from "../../assets/user/pgsearch/images/image4.png";

const amenitiesSuggestions = [
  "Food",
  "CCTV Camera",
  "Security",
  "Fire Safety",
  "Lift",
  "Solar Power",
];

const rulesSuggestions = [
  "No Smoking",
  "No Drinking",
  "No Visitors",
  "No Pets",
];

export default function UserFilters({ filters, setFilters }) {
  const [amenitiesSearch, setAmenitiesSearch] = useState("");
  const [rulesSearch, setRulesSearch] = useState("");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllRules, setShowAllRules] = useState(false);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type] || [];
      return current.includes(value)
        ? { ...prev, [type]: current.filter((i) => i !== value) }
        : { ...prev, [type]: [...current, value] };
    });
  };

  const handleRadioChange = (key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value, // Deselect if clicked again
    }));

  // Reusable checkbox list renderer
  const renderCheckboxList = (items, type, searchTerm, showAll, setShowAll) => {
    if (!items || items.length === 0) return null;
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const displayItems = showAll ? filtered : filtered.slice(0, 2);

    return (
      <div>
        {displayItems.map((item) => (
          <div key={item} className="mb-1">
            <input
              type="checkbox"
              checked={filters[type]?.includes(item)}
              onChange={() => handleCheckboxChange(type, item)}
            />
            <label className="ml-2 text-[#333333] text-xs">{item}</label>
          </div>
        ))}
        {filtered.length > 2 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-1 text-blue-600 text-sm mt-1 hover:underline"
          >
            {showAll ? "Show Less" : "Show More"}
            {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 p-4 bg-white shadow rounded-md space-y-6">
      <h2 className="font-bold mb-2">Filters</h2>

      {/* Deals */}
      <div>
        <h2 className="font-semibold mb-2">Deals</h2>
        <div className="space-y-2">
          <div>
            <input
              type="checkbox"
              id="recommended"
              onChange={() =>
                setFilters((prev) => ({ ...prev, recommended: !prev.recommended }))
              }
              checked={filters.recommended || false}
            />
            <label htmlFor="recommended" className="ml-2 text-[#333333] text-xs">
              Recommended
            </label>
          </div>
        </div>
      </div>

      {/* Looking For */}
      <div>
        <h2 className="font-semibold mb-2">Looking For</h2>
        {[
          { label: "Men's", value: "Male" },
          { label: "Girls/Women's", value: "Female" },
          { label: "Co-Living", value: "Co living" },
        ].map(({ label, value }) => (
          <div key={value} className="mb-1">
            <input
              type="radio"
              name="gender"
              checked={filters.gender === value}
              onChange={() => handleRadioChange("gender", value)}
            />
            <label className="ml-2 text-[#333333] text-xs">{label}</label>
          </div>
        ))}
      </div>

      {/* Room Type */}
      <div>
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <img src={image1} alt="" className="w-2 h-2" /> Room Type
        </h2>
        {[
          { label: "Single", value: "single" },
          { label: "Double", value: "double" },
          { label: "3 Sharing", value: "triple" },
          { label: "4 Sharing", value: "quint" },
        ].map(({ label, value }) => (
          <div key={value} className="mb-1">
            <input
              type="checkbox"
              checked={filters.roomType?.includes(value)}
              onChange={() => handleCheckboxChange("roomType", value)}
            />
            <label className="ml-2 text-[#333333] text-xs">{label}</label>
          </div>
        ))}
      </div>

      {/* Budget */}
      <div>
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <img src={image2} alt="" className="w-3 h-3" /> Budget
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

      {/* Rating */}
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
            <label className="ml-2 text-yellow-500 text-xs">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </label>
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <img src={image4} alt="" className="w-3 h-3" /> Amenities
        </h2>

        {/* Search input */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search amenities"
            value={amenitiesSearch}
            onChange={(e) => setAmenitiesSearch(e.target.value)}
            className="w-full border border-gray-300 rounded pl-8 py-1 text-[#333333] text-xs"
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Render amenities checkboxes */}
        {renderCheckboxList(
          amenitiesSuggestions,
          "amenities",
          amenitiesSearch,
          showAllAmenities,
          setShowAllAmenities
        )}
      </div>

      {/* Rules */}
      <div>
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <img src={image4} alt="" className="w-3 h-3" /> Rules
        </h2>

        {/* Search input */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search rules"
            value={rulesSearch}
            onChange={(e) => setRulesSearch(e.target.value)}
            className="w-full border border-gray-300 rounded pl-8 py-1 text-[#333333] text-xs"
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Render rules checkboxes */}
        {renderCheckboxList(
          rulesSuggestions,
          "rules",
          rulesSearch,
          showAllRules,
          setShowAllRules
        )}
      </div>

      {/* Reset button */}
      <button
        onClick={() =>
          setFilters({
            city: "",
            gender: "",
            roomType: [],
            budget: "",
            recommended: false,
            rating: "",
            amenities: [],
            rules: [],
          })
        }
        className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded"
      >
        Reset Filters
      </button>
    </div>
  );
}
