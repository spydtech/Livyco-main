import React, { useState } from "react";
import ClientNav from "../Client-Navbar/ClientNav";

const FoodMenu = () => {
  const [manualEntry, setManualEntry] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [menu, setMenu] = useState({
    Breakfast: "upma with chutney",
    Lunch: "Sambar rice with curd",
    Snacks: "Biscuits",
    Dinner: "curd rice with roti and curry",
  });

  return (
    <>
    <ClientNav />
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <h2 className="text-sm text-gray-500 mb-4">Dashboard / Food Menu</h2>
      <div className="flex justify-end mt-4 space-x-4">
      <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
              // onClick={() => setManualEntry(true)}
            >
              Upload Menu
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
              onClick={() => setManualEntry(true)}
            >
              Enter Manually
            </button>
          </div>
      {!manualEntry ? (
        <div className="bg-[#FFFFFF] p-6  w-[50%] mx-auto">
          <h3 className="font-semibold text-lg mb-4">Today's Menu</h3>
          <div className="border-2 border-blue-300 p-4 rounded-lg bg-white">
            {Object.entries(menu).map(([meal, items]) => (
              <p key={meal} className="mb-2">
                <strong>{meal}:</strong> {items}
              </p>
            ))}
          </div>
          
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] mx-auto">
          <h3 className="font-semibold text-lg mb-4 flex justify-center">
            🎮 Manual Entry
          </h3>
          <div className="flex justify-center gap-4 mb-4">
            <button className="border px-4 py-2 rounded-md">Day to Day</button>
            <button className="border px-4 py-2 rounded-md">Weekly</button>
          </div>
          <h4 className="font-semibold text-md mb-2">Select Meal</h4>
          <div className="flex space-x-4 mb-4">
            {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
              <button
                key={meal}
                className={`px-4 py-2 rounded-md ${
                  selectedMeal === meal ? "bg-blue-600 text-white" : "border"
                }`}
                onClick={() => setSelectedMeal(meal)}
              >
                {meal}
              </button>
            ))}
          </div>
          <h4 className="font-semibold text-md mb-2">Food Entry</h4>
          <input
            type="text"
            placeholder="Food Name"
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Food Name"
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Food Name"
            className="w-full border p-2 rounded-md mb-4"
          />
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
              onClick={() => setManualEntry(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default FoodMenu;
