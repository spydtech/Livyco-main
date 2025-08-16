import React, { useState } from "react";
import foodmimg from "../../assets/food menu/food menu.png"; // Import food menu image
import { useNavigate } from "react-router-dom";
import Header from "../Header"; // Import Header component

export default function FoodMenu() {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const foodMenu = [
    {
      time: "Breakfast (8:00 A.M - 9:00 A.M)",
      items: "Idly and Karam Podi, Chutney, Juice, and Omelette",
    },
    {
      time: "Lunch (12:30 P.M - 2:00 P.M)",
      items: "Rice, Sambar, Curry, Papadam, Pickle and Curd",
    },
    {
      time: "Snacks (4:30 P.M - 5:00 P.M)",
      items: "Tea / Milk and Biscuits",
    },
    {
      time: "Dinner (07:30 P.M - 9:00 P.M)",
      items: "Dal, Roti with Subzi, Rice and Salad",
    },
  ];

  return (
    <>
    <Header />
   <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6 py-24">
         <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 space-y-8">
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
