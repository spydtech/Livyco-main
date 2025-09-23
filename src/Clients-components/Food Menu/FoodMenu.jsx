// import React, { useState } from "react";
// import ClientNav from "../Client-Navbar/ClientNav";

// const FoodMenu = () => {
//   const [manualEntry, setManualEntry] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState("Breakfast");
//   const [menu, setMenu] = useState({
//     Breakfast: "upma with chutney",
//     Lunch: "Sambar rice with curd",
//     Snacks: "Biscuits",
//     Dinner: "curd rice with roti and curry",
//   });

//   return (
//     <>
//     <ClientNav />
//     <div className="min-h-screen bg-[#FFFFFF] p-6">
//       <h2 className="text-sm text-gray-500 mb-4">Dashboard / Food Menu</h2>
//       <div className="flex justify-end mt-4 space-x-4">
//       <button
//               className="bg-blue-600 text-white px-6 py-2 rounded-md"
//               // onClick={() => setManualEntry(true)}
//             >
//               Upload Menu
//             </button>
//             <button
//               className="bg-blue-600 text-white px-6 py-2 rounded-md"
//               onClick={() => setManualEntry(true)}
//             >
//               Enter Manually
//             </button>
//           </div>
//       {!manualEntry ? (
//         <div className="bg-[#FFFFFF] p-6  w-[50%] mx-auto">
//           <h3 className="font-semibold text-lg mb-4">Today's Menu</h3>
//           <div className="border-2 border-blue-300 p-4 rounded-lg bg-white">
//             {Object.entries(menu).map(([meal, items]) => (
//               <p key={meal} className="mb-2">
//                 <strong>{meal}:</strong> {items}
//               </p>
//             ))}
//           </div>
          
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] mx-auto">
//           <h3 className="font-semibold text-lg mb-4 flex justify-center">
//             🎮 Manual Entry
//           </h3>
//           <div className="flex justify-center gap-4 mb-4">
//             <button className="border px-4 py-2 rounded-md">Day to Day</button>
//             <button className="border px-4 py-2 rounded-md">Weekly</button>
//           </div>
//           <h4 className="font-semibold text-md mb-2">Select Meal</h4>
//           <div className="flex space-x-4 mb-4">
//             {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
//               <button
//                 key={meal}
//                 className={`px-4 py-2 rounded-md ${
//                   selectedMeal === meal ? "bg-blue-600 text-white" : "border"
//                 }`}
//                 onClick={() => setSelectedMeal(meal)}
//               >
//                 {meal}
//               </button>
//             ))}
//           </div>
//           <h4 className="font-semibold text-md mb-2">Food Entry</h4>
//           <input
//             type="text"
//             placeholder="Food Name"
//             className="w-full border p-2 rounded-md mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Food Name"
//             className="w-full border p-2 rounded-md mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Food Name"
//             className="w-full border p-2 rounded-md mb-4"
//           />
//           <div className="flex justify-center">
//             <button
//               className="bg-blue-600 text-white px-6 py-2 rounded-md"
//               onClick={() => setManualEntry(false)}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default FoodMenu;




import React, { useState, useEffect } from "react";
import ClientNav from "../Client-Navbar/ClientNav";
import bgImage from "../../assets/user/pgsearch/image (5).png"; 
import { menuAPI } from "../PropertyController"; // Adjust the import path

const FoodMenu = () => {
  const [manualEntry, setManualEntry] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menu, setMenu] = useState({
    Breakfast: "",
    Lunch: "",
    Snacks: "",
    Dinner: "",
  });

  const [menuItems, setMenuItems] = useState([]);
  const [foodEntries, setFoodEntries] = useState({
    Breakfast: "",
    Lunch: "",
    Snacks: "",
    Dinner: "",
  });

  const [weeklyMenu, setWeeklyMenu] = useState({
    Monday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
    Tuesday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
    Wednesday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
    Thursday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
    Friday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
    Saturday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
    Sunday: { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewDay, setViewDay] = useState("Monday");
  const [showMenuCard, setShowMenuCard] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  // Fetch menu for selected day using menuAPI
  const fetchMenuForDay = async (day) => {
    setLoading(true);
    setError("");
    try {
      const response = await menuAPI.getFoodItems(day);
      const result = response.data;
      
      const newMenu = { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" };
      setMenuItems(result.data || []);
      
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
      setMenu({ Breakfast: "", Lunch: "", Snacks: "", Dinner: "" });
      setMenuItems([]);
      setError("Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a food item using menuAPI
  const deleteFoodItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await menuAPI.deleteFoodItem(id);
      setSuccess("Food item deleted successfully!");
      fetchMenuForDay(viewDay);
      fetchWeeklyMenu();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete food item. Please try again.");
      console.error("Error deleting food item:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weekly menu using menuAPI
  const fetchWeeklyMenu = async () => {
    try {
      const response = await menuAPI.getWeeklyMenu();
      const result = response.data;
      
      const formattedWeeklyMenu = {};
      
      daysOfWeek.forEach(day => {
        formattedWeeklyMenu[day] = { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" };
        
        meals.forEach(meal => {
          if (result.data[day] && result.data[day][meal]) {
            formattedWeeklyMenu[day][meal] = result.data[day][meal]
              .map(item => item.name)
              .join(", ");
          }
        });
      });
      
      setWeeklyMenu(formattedWeeklyMenu);
    } catch (err) {
      console.error("Error fetching weekly menu:", err);
      setError("Failed to load weekly menu.");
    }
  };

  // Save food items using menuAPI
  const saveFoodItems = async () => {
    setLoading(true);
    setError("");
    
    try {
      const foodItemsData = [];
      
      meals.forEach(meal => {
        if (foodEntries[meal].trim() !== "") {
          const items = foodEntries[meal].split(',').map(item => item.trim()).filter(item => item !== "");
          
          items.forEach(itemName => {
            foodItemsData.push({
              name: itemName,
              description: "",
              category: meal,
              day: selectedDay
            });
          });
        }
      });

      if (foodItemsData.length === 0) {
        setError("Please enter at least one food item");
        setLoading(false);
        return;
      }

      // Clear existing items for the selected day
      try {
        await menuAPI.clearDayMenu(selectedDay);
      } catch (clearErr) {
        console.log('Clear day endpoint not available, saving without clearing');
      }

      // Save each food item
      const savePromises = foodItemsData.map(item => menuAPI.addFoodItem(item));
      await Promise.all(savePromises);

      setSuccess(`Menu for ${selectedDay} saved successfully!`);
      
      if (viewDay === selectedDay) {
        fetchMenuForDay(viewDay);
      }
      
      fetchWeeklyMenu();
      setTimeout(() => setSuccess(""), 3000);
      setTimeout(() => setManualEntry(false), 1000);
      
    } catch (err) {
      setError(err.message || "Failed to save menu. Please try again.");
      console.error("Error saving menu:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodEntryChange = (meal, value) => {
    setFoodEntries(prev => ({
      ...prev,
      [meal]: value
    }));
  };

  const loadExistingMenuData = async () => {
    try {
      const response = await menuAPI.getFoodItems(selectedDay);
      const result = response.data;
      
      const newFoodEntries = {
        Breakfast: "",
        Lunch: "",
        Snacks: "",
        Dinner: "",
      };
      
      if (result.data && result.data.length > 0) {
        result.data.forEach(item => {
          if (newFoodEntries[item.category] !== undefined) {
            newFoodEntries[item.category] = newFoodEntries[item.category] 
              ? `${newFoodEntries[item.category]}, ${item.name}`
              : item.name;
          }
        });
      }
      
      setFoodEntries(newFoodEntries);
    } catch (err) {
      console.error("Error loading existing menu data:", err);
    }
  };

  useEffect(() => {
    fetchMenuForDay(viewDay);
    fetchWeeklyMenu();
  }, [viewDay]);

  useEffect(() => {
    if (manualEntry) {
      loadExistingMenuData();
    }
  }, [manualEntry, selectedDay]);



  return (
    <>
      <ClientNav />
      <div className="min-h-screen p-6 bg-cover bg-center"
       style={{
                     backgroundImage: `url('${bgImage}')`,
                   }}
      >
        <h2 className="text-sm text-gray-500 mb-4">Dashboard / Food Menu</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              onClick={() => setError("")} 
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
            <button 
              onClick={() => setSuccess("")} 
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded-md"
            onClick={() => {
              setShowMenuCard(true);
              if (manualEntry) setManualEntry(false);
            }}
          >
            View Menu Card
          </button>
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded-md"
            onClick={() => {
              setManualEntry(true);
              if (showMenuCard) setShowMenuCard(false);
            }}
            disabled={loading}
          >
            Enter Manually
          </button>
        </div>
        
        {showMenuCard ? (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto mt-6">
            <h3 className="font-semibold text-2xl mb-6 flex justify-center">
              📋 Weekly Menu Card
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {daysOfWeek.map(day => (
                <div key={day} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-lg text-center mb-3 bg-blue-900 text-white py-1 rounded">
                    {day}
                  </h4>
                  
                  {meals.map(meal => (
                    <div key={meal} className="mb-3">
                      <h5 className="font-medium text-sm text-gray-700 mb-1">{meal}</h5>
                      <p className="text-sm text-gray-600">
                        {weeklyMenu[day] && weeklyMenu[day][meal] 
                          ? weeklyMenu[day][meal] 
                          : "Not specified"}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
                onClick={() => setShowMenuCard(false)}
              >
                Back to Daily View
              </button>
            </div>
          </div>
        ) : !manualEntry ? (
          <div className="bg-white p-6 w-[50%] mx-auto rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Menu for</h3>
              <select 
                className="border p-2 rounded-md"
                value={viewDay}
                onChange={(e) => setViewDay(e.target.value)}
                disabled={loading}
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div className="border-2 border-blue-300 p-4 rounded-lg bg-white">
              {Object.entries(menu).map(([meal, items]) => (
                <div key={meal} className="mb-2">
                  <p>
                    <strong>{meal}:</strong> {items || "No items added yet"}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button
                className="bg-blue-900 text-white px-4 py-2 rounded-md"
                onClick={() => fetchMenuForDay(viewDay)}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh Menu"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] mx-auto">
            <h3 className="font-semibold text-lg mb-4 flex justify-center">
               Daily Menu Entry for {selectedDay}
            </h3>
            
            <div className="flex justify-center gap-4 mb-4">
              <button className="border px-4 py-2 rounded-md bg-blue-900 text-white">Day to Day</button>
              <button className="border px-4 py-2 rounded-md">Weekly</button>
            </div>
            
            <h4 className="font-semibold text-md mb-2">Select Day</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  className={`px-4 py-2 rounded-md ${
                    selectedDay === day ? "bg-blue-900 text-white" : "border"
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
            
            <h4 className="font-semibold text-md mb-2">Food Entries for {selectedDay}</h4>
            
            {meals.map(meal => (
              <div key={meal} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {meal}
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${meal} items (comma separated)`}
                  className="w-full border p-2 rounded-md"
                  value={foodEntries[meal]}
                  onChange={(e) => handleFoodEntryChange(meal, e.target.value)}
                />
              </div>
            ))}
            
            <p className="text-sm text-gray-500 mb-4">
              Enter multiple items separated by commas (e.g., "Idli, Dosa, Vada")
            </p>
            
            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md mr-4"
                onClick={() => setManualEntry(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-900 text-white px-6 py-2 rounded-md"
                onClick={saveFoodItems}
                disabled={loading}
              >
                {loading ? "Saving..." : `Save ${selectedDay} Menu`}
              </button>
            </div>

            <div className="mt-6 p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">{selectedDay} Preview:</h4>
              {meals.map(meal => (
                menuItems
                  .filter(item => item.category === meal && item.day === selectedDay)
                  .length > 0 && (
                  <div key={meal} className="mb-3">
                    <p className="font-medium">{meal}:</p>
                    {menuItems
                      .filter(item => item.category === meal && item.day === selectedDay)
                      .map(item => (
                        <div key={item._id} className="ml-4 mt-1 flex items-center">
                          <span className="text-sm">• {item.name}</span>
                          <button
                            onClick={() => deleteFoodItem(item._id)}
                            className="ml-2 text-red-600 text-xs hover:text-red-800"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodMenu;