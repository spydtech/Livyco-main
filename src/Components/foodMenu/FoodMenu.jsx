// import React, { useState } from "react";
// import foodmimg from "../../assets/food menu/food menu.png"; // Import food menu image
// import { useNavigate } from "react-router-dom";
// import Header from "../Header"; // Import Header component

// export default function FoodMenu() {
//   const [selectedDate, setSelectedDate] = useState("");
//   const navigate = useNavigate();

//   const foodMenu = [
//     {
//       time: "Breakfast (8:00 A.M - 9:00 A.M)",
//       items: "Idly and Karam Podi, Chutney, Juice, and Omelette",
//     },
//     {
//       time: "Lunch (12:30 P.M - 2:00 P.M)",
//       items: "Rice, Sambar, Curry, Papadam, Pickle and Curd",
//     },
//     {
//       time: "Snacks (4:30 P.M - 5:00 P.M)",
//       items: "Tea / Milk and Biscuits",
//     },
//     {
//       time: "Dinner (07:30 P.M - 9:00 P.M)",
//       items: "Dal, Roti with Subzi, Rice and Salad",
//     },
//   ];

//   return (
//     <>
//     <Header />
//    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6 py-24">
//          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 space-y-8">
//            {/* Top-left heading */}
//            <div className="text-sm text-gray-500">
//              <span
//                className="text-blue-600 cursor-pointer hover:underline"
//                onClick={() => navigate("/my-stay")}
//              >
//                My Stays
//              </span>{" "}
//              &gt; <span className="font-medium">Food Menu</span>
//            </div>
   
//            {/* Image on Top */}
//            <div className="flex justify-center">
//              <img
//                src={foodmimg}
//                alt="Food Illustration"
//                className="w-full max-w-xl object-contain"
//              />
//            </div>
   
//            {/* Date Picker */}
//            <div className="flex justify-start">
//              <input
//                type="date"
//                value={selectedDate}
//                onChange={(e) => setSelectedDate(e.target.value)}
//                className="border border-gray-300 rounded px-4 py-2"
//              />
//            </div>
   
//            {/* Menu Items */}
//            <div className="space-y-6">
//              {foodMenu.map((meal, index) => (
//                <div key={index} className="border p-4 rounded-lg">
//                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
//                    {meal.time}
//                  </h3>
//                  <p className="text-gray-600">{meal.items}</p>
//                </div>
//              ))}
//            </div>
//          </div>
//        </div>
//     </>
//   );
// }







import React, { useState, useEffect } from "react";
import foodmimg from "../../assets/food menu/food menu.png";
import bgImage from "../../assets/user/pgsearch/image (5).png"; 
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { menuAPI } from "../../Clients-components/PropertyController"; // Adjust the import path

export default function FoodMenuUser() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menu, setMenu] = useState({
    Breakfast: "",
    Lunch: "",
    Snacks: "",
    Dinner: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Function to get day of week from date
  const getDayFromDate = (dateString) => {
    if (!dateString) {
      const today = new Date();
      const dayIndex = today.getDay();
      return dayIndex === 0 ? "Sunday" : daysOfWeek[dayIndex - 1];
    }
    
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return dayIndex === 0 ? "Sunday" : daysOfWeek[dayIndex - 1];
  };

  // Fetch menu for selected day using menuAPI
  const fetchMenuForDay = async (day) => {
    setLoading(true);
    setError("");
    try {
      const response = await menuAPI.getFoodItems(day);
      const result = response.data;
      
      // Convert the array of food items to the menu format
      const newMenu = { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" };
      
      if (result.data && result.data.length > 0) {
        result.data.forEach(item => {
          if (newMenu[item.category] !== undefined) {
            newMenu[item.category] = newMenu[item.category] 
              ? `${newMenu[item.category]}, ${item.name}`
              : item.name;
          }
        });
      }
      
      setMenu(newMenu);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setMenu({
        Breakfast: "",
        Lunch: "",
        Snacks: "",
        Dinner: "",
      });
      setError("Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // When date changes, update the day and fetch menu
  useEffect(() => {
    const day = getDayFromDate(selectedDate);
    setSelectedDay(day);
    fetchMenuForDay(day);
  }, [selectedDate]);

  // Format meal times with the actual food items
  const foodMenu = [
    {
      time: "Breakfast (7:00 A.M - 9:00 A.M)",
      items: menu.Breakfast || "Menu not specified yet",
    },
    {
      time: "Lunch (12:30 P.M - 2:00 P.M)",
      items: menu.Lunch || "Menu not specified yet",
    },
    {
      time: "Snacks (4:30 P.M - 5:00 P.M)",
      items: menu.Snacks || "Menu not specified yet",
    },
    {
      time: "Dinner (07:30 P.M - 9:00 P.M)",
      items: menu.Dinner || "Menu not specified yet",
    },
  ];

  return (
    <>
      <Header />
      <div 
        className="min-h-screen flex flex-col items-center justify-start p-6 py-24 w-full bg-cover bg-center"
        style={{
               backgroundImage: `url('${bgImage}')`,
             }}
      >
        <div className="w-full max-w-3xl bg-white bg-opacity-95 shadow-lg rounded-lg p-8 space-y-8">
          {/* Top-left heading */}
          <div className="text-sm text-gray-500">
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/my-stay")}
            >
              My Stays
            </span>{" "}
            &gt; <span className="font-medium">Food Menu</span>
          </div>

          {/* Image on Top */}
          <div className="flex justify-center">
            <img
              src={foodmimg}
              alt="Food Illustration"
              className="w-full max-w-xl object-contain"
            />
          </div>

          {/* Date Picker */}
          <div className="flex justify-start">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Display selected day */}
          <div className="text-lg font-semibold text-blue-900">
            Menu for {selectedDay}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center text-blue-600">Loading menu...</div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
              <button 
                onClick={() => setError("")} 
                className="float-right font-bold"
              >
                ×
              </button>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-6">
            {foodMenu.map((meal, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {meal.time}
                </h3>
                <p className="text-gray-600">{meal.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}