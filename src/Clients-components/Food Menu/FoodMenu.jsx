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
// import headers from "../../Components/Header"
import { menuAPI, propertyAPI } from "../PropertyController";

const FoodMenu = () => {
  const [manualEntry, setManualEntry] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menuItems, setMenuItems] = useState([]);
  const [foodEntries, setFoodEntries] = useState({
    Breakfast: "", Lunch: "", Snacks: "", Dinner: "",
  });

  const [weeklyMenu, setWeeklyMenu] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewDay, setViewDay] = useState("Monday");
  const [showMenuCard, setShowMenuCard] = useState(false);

  // Property states
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [propertyLoading, setPropertyLoading] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  // Fetch properties
  const fetchProperties = async () => {
    setPropertyLoading(true);
    try {
      const response = await propertyAPI.getProperty();
      setProperties(response.data.data || []);
      
      if (response.data.data && response.data.data.length > 0) {
        setSelectedProperty(response.data.data[0].property._id);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties");
    } finally {
      setPropertyLoading(false);
    }
  };

  // Fetch menu for selected day and property (NO BOOKING FILTER)
  const fetchMenuForDay = async (day) => {
    if (!selectedProperty) {
      setError("Please select a property first");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await menuAPI.getFoodItems({
        day: day, 
        propertyId: selectedProperty
      });
      setMenuItems(response.data.data || []);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setMenuItems([]);
      setError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weekly menu for property (NO BOOKING FILTER)
  const fetchWeeklyMenu = async () => {
    if (!selectedProperty) return;

    try {
      const response = await menuAPI.getWeeklyMenu({
        propertyId: selectedProperty
      });
      const result = response.data;
      
      const formattedWeeklyMenu = {};
      daysOfWeek.forEach(day => {
        formattedWeeklyMenu[day] = {};
        meals.forEach(meal => {
          if (result.data[day] && result.data[day][meal]) {
            formattedWeeklyMenu[day][meal] = result.data[day][meal]
              .map(item => item.name).join(", ");
          } else {
            formattedWeeklyMenu[day][meal] = "Not specified";
          }
        });
      });
      setWeeklyMenu(formattedWeeklyMenu);
    } catch (err) {
      console.error("Error fetching weekly menu:", err);
    }
  };

  // Save food items for PROPERTY (not specific booking)
  const saveFoodItems = async () => {
    if (!selectedProperty) {
      setError("Please select a property first");
      return;
    }

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
              category: meal,
              day: selectedDay,
              propertyId: selectedProperty
            });
          });
        }
      });

      if (foodItemsData.length === 0) {
        setError("Please enter at least one food item");
        setLoading(false);
        return;
      }

      const savePromises = foodItemsData.map(item => menuAPI.addFoodItem(item));
      await Promise.all(savePromises);

      setSuccess(`Menu for ${selectedDay} saved successfully! This menu will be available to all guests at this property.`);
      fetchMenuForDay(viewDay);
      fetchWeeklyMenu();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete food item
  const deleteFoodItem = async (id) => {
    if (!selectedProperty) return;

    if (!window.confirm("Are you sure you want to delete this food item?")) return;

    setLoading(true);
    try {
      await menuAPI.deleteFoodItem(id);
      setSuccess("Food item deleted successfully!");
      fetchMenuForDay(viewDay);
      fetchWeeklyMenu();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete food item");
    } finally {
      setLoading(false);
    }
  };

  const handleFoodEntryChange = (meal, value) => {
    setFoodEntries(prev => ({ ...prev, [meal]: value }));
  };

  const loadExistingMenuData = async () => {
    if (!selectedProperty) return;
    try {
      const response = await menuAPI.getFoodItems({
        day: selectedDay, 
        propertyId: selectedProperty
      });
      const newFoodEntries = { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" };
      
      if (response.data.data) {
        response.data.data.forEach(item => {
          if (newFoodEntries[item.category] !== undefined) {
            newFoodEntries[item.category] = newFoodEntries[item.category] 
              ? `${newFoodEntries[item.category]}, ${item.name}`
              : item.name;
          }
        });
      }
      setFoodEntries(newFoodEntries);
    } catch (err) {
      console.error("Error loading menu data:", err);
    }
  };

  // Effects
  useEffect(() => { 
    fetchProperties(); 
  }, []);

  useEffect(() => { 
    if (selectedProperty) {
      fetchMenuForDay(viewDay);
      fetchWeeklyMenu();
    }
  }, [viewDay, selectedProperty]);

  useEffect(() => { 
    if (manualEntry && selectedProperty) {
      loadExistingMenuData(); 
    }
  }, [manualEntry, selectedDay, selectedProperty]);

  const getCurrentPropertyName = () => {
    const property = properties.find(p => p.property._id === selectedProperty);
    return property ? property.property.name : "";
  };

  return (
    <>
      <ClientNav />
      <div className="min-h-screen p-4 sm:p-6 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
        {/* Breadcrumb */}
        <h2 className="text-xs sm:text-sm text-gray-500 mb-4">Dashboard / Food Menu</h2>
        
        {/* Property Selection */}
        <div className="mb-6 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">Select Property:</label>
          {propertyLoading ? (
            <p className="text-sm">Loading properties...</p>
          ) : (
            <>
              <select 
                className="border p-2 rounded-md w-full md:w-1/2 lg:w-1/3 text-sm sm:text-base"
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
              >
                <option value="">Select a property</option>
                {properties.map((propData) => (
                  <option key={propData.property._id} value={propData.property._id}>
                    {propData.property.name}
                  </option>
                ))}
              </select>
              {selectedProperty && (
                <p className="text-xs sm:text-sm text-green-600 mt-2">
                  Managing menu for: {getCurrentPropertyName()} 
                  <br />
                  <span className="text-blue-600">This menu will be available to all guests at this property</span>
                </p>
              )}
            </>
          )}
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}
        
        {!selectedProperty ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
            Select a property to manage menu
          </div>
        ) : (
          <>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mb-6">
              <button 
                className="bg-blue-900 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
                onClick={() => { setShowMenuCard(true); setManualEntry(false); }}
              >
                View Menu Card
              </button>
              <button 
                className="bg-blue-900 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
                onClick={() => { setManualEntry(true); setShowMenuCard(false); }}
              >
                Enter Manually
              </button>
            </div>

            {/* Menu Card View */}
            {showMenuCard ? (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-center">
                  📋 Weekly Menu Card - {getCurrentPropertyName()}
                </h3>
                
                {/* Scrollable container for small screens */}
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 min-w-max">
                    {daysOfWeek.map(day => (
                      <div key={day} className="border p-3 sm:p-4 bg-blue-50 rounded-lg min-w-[180px]">
                        <h4 className="font-semibold text-center mb-2 sm:mb-3 bg-blue-900 text-white py-1 px-2 text-sm sm:text-base rounded">
                          {day}
                        </h4>
                        {meals.map(meal => (
                          <div key={meal} className="mb-2 sm:mb-3">
                            <h5 className="font-medium text-xs sm:text-sm">{meal}</h5>
                            <p className="text-xs sm:text-sm leading-tight">
                              {weeklyMenu[day]?.[meal] || "Not specified"}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-6 sm:mt-8">
                  <button 
                    className="bg-gray-300 px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
                    onClick={() => setShowMenuCard(false)}
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : !manualEntry ? (
              /* Daily Menu View */
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h3 className="font-semibold text-lg">Menu for</h3>
                  <select 
                    className="border p-2 rounded w-full sm:w-auto text-sm sm:text-base"
                    value={viewDay} 
                    onChange={(e) => setViewDay(e.target.value)}
                  >
                    {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </div>
                
                <div className="border-2 border-blue-300 p-3 sm:p-4 rounded-lg">
                  {meals.map(meal => (
                    <div key={meal} className="mb-3 last:mb-0">
                      <strong className="text-sm sm:text-base">{meal}:</strong> 
                      <span className="text-sm sm:text-base ml-2">
                        {menuItems.filter(item => item.category === meal).map(item => item.name).join(", ") || "No items"}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-full sm:w-auto text-sm sm:text-base"
                  onClick={() => fetchMenuForDay(viewDay)}
                  disabled={loading}
                >
                  {loading ? "Refreshing..." : "Refresh Menu"}
                </button>
              </div>
            ) : (
              /* Manual Entry View */
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg sm:text-xl mb-4 text-center">
                  Daily Menu Entry for {selectedDay}
                </h3>
                
                {/* Day Selection - Scrollable on mobile */}
                <div className="overflow-x-auto mb-4 sm:mb-6">
                  <div className="flex gap-2 min-w-max pb-2">
                    {daysOfWeek.map(day => (
                      <button 
                        key={day}
                        className={`px-3 py-2 rounded text-xs sm:text-sm min-w-[80px] sm:min-w-[100px] ${
                          selectedDay === day ? "bg-blue-900 text-white" : "border border-gray-300"
                        }`}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Meal Inputs */}
                <div className="space-y-4">
                  {meals.map(meal => (
                    <div key={meal}>
                      <label className="block text-sm font-medium mb-1 sm:mb-2">{meal}</label>
                      <input 
                        type="text" 
                        placeholder={`Enter ${meal} items (comma separated)`}
                        className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                        value={foodEntries[meal]} 
                        onChange={(e) => handleFoodEntryChange(meal, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
                  <button 
                    className="bg-gray-300 px-4 py-2 sm:px-6 sm:py-2 rounded text-sm sm:text-base w-full sm:w-auto"
                    onClick={() => setManualEntry(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="bg-blue-900 text-white px-4 py-2 sm:px-6 sm:py-2 rounded text-sm sm:text-base w-full sm:w-auto"
                    onClick={saveFoodItems}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Menu"}
                  </button>
                </div>

                {/* Preview Section */}
                <div className="mt-6 p-3 sm:p-4 border rounded">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">{selectedDay} Preview:</h4>
                  <div className="space-y-3">
                    {meals.map(meal => {
                      const items = menuItems.filter(item => item.category === meal && item.day === selectedDay);
                      return items.length > 0 && (
                        <div key={meal} className="mb-2 last:mb-0">
                          <p className="font-medium text-sm sm:text-base">{meal}:</p>
                          <div className="ml-2 sm:ml-4 space-y-1">
                            {items.map(item => (
                              <div key={item._id} className="flex items-center justify-between">
                                <span className="text-sm">• {item.name}</span>
                                <button 
                                  onClick={() => deleteFoodItem(item._id)}
                                  className="ml-2 text-red-600 text-xs sm:text-sm hover:text-red-800"
                                  disabled={loading}
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FoodMenu;