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







import React, { useEffect, useState } from "react";
import foodmimg from "../../assets/food menu/food menu.png";
import bgImage from "../../assets/user/pgsearch/image (5).png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { menuAPI, bookingAPI, userAPI } from "../../Clients-components/PropertyController";

export default function FoodMenuUser() {
  const todayISO = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedDay, setSelectedDay] = useState("");
  const [menu, setMenu] = useState({
    Breakfast: "",
    Lunch: "",
    Snacks: "",
    Dinner: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStay, setCurrentStay] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getDayFromDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    const dayIndex = date.getDay();
    return dayIndex === 0 ? "Sunday" : daysOfWeek[dayIndex - 1];
  };

  // ✅ Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await userAPI.getUser();
      setProfile(res.data?.user || null);
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  // ✅ Fetch current stay
  const fetchCurrentStay = async () => {
    try {
      const response = await bookingAPI.getBookingsByUser();
      console.log("booking response", response);

      if (response?.data?.success && response.data.bookings?.length > 0) {
        const activeBooking = response.data.bookings[0];
        setCurrentStay(activeBooking);
        return activeBooking;
      } else {
        setCurrentStay(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching current stay:", err);
      setCurrentStay(null);
      return null;
    }
  };

  // ✅ Fetch menu for the current day and property
  const fetchMenuForDay = async (day) => {
    setLoading(true);
    setError("");
    try {
      if (!currentStay) {
        setError("You don't have an active booking. Please check your stay details.");
        setMenu({ Breakfast: "", Lunch: "", Snacks: "", Dinner: "" });
        return;
      }

      const propertyId =
        currentStay.propertyId?._id ||
        currentStay.propertyId ||
        currentStay.property?._id;

      if (!propertyId) {
        setError("Unable to determine your current hostel.");
        setMenu({ Breakfast: "", Lunch: "", Snacks: "", Dinner: "" });
        return;
      }

      const response = await menuAPI.getFoodItems({ day, propertyId });
      const result = response?.data;

      const newMenu = { Breakfast: "", Lunch: "", Snacks: "", Dinner: "" };

      if (result?.data && result.data.length > 0) {
        result.data.forEach((item) => {
          if (newMenu[item.category] !== undefined) {
            newMenu[item.category] = newMenu[item.category]
              ? `${newMenu[item.category]}, ${item.name}`
              : item.name;
          }
        });
      } else {
        newMenu.Breakfast =
          newMenu.Lunch =
          newMenu.Snacks =
          newMenu.Dinner =
            "No menu specified";
      }

      setMenu(newMenu);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setMenu({ Breakfast: "", Lunch: "", Snacks: "", Dinner: "" });

      if (err?.response?.data?.message === "No active booking found") {
        setError("You don't have an active booking. Please check your stay details.");
      } else if (err?.response?.data?.message === "No property found for your booking") {
        setError("Unable to find hostel details for your booking.");
      } else if (err?.response?.status === 401) {
        setError("Please login to view your menu.");
      } else if (err?.response?.status === 404) {
        setError("No menu found for your current hostel.");
      } else {
        setError("Failed to load menu. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // On mount → fetch profile
  useEffect(() => {
    fetchProfile();
  }, []);

  // After profile loads → fetch current stay + menu
  useEffect(() => {
    const init = async () => {
      const stay = await fetchCurrentStay();
      const day = getDayFromDate(selectedDate);
      setSelectedDay(day);

      if (stay) {
        await fetchMenuForDay(day);
      } else {
        setMenu({
          Breakfast: "No menu specified",
          Lunch: "No menu specified",
          Snacks: "No menu specified",
          Dinner: "No menu specified",
        });
        setError("No active booking found.");
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // When date changes → refetch menu
  useEffect(() => {
    const day = getDayFromDate(selectedDate);
    setSelectedDay(day);
    if (!currentStay) return;
    fetchMenuForDay(day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, currentStay]);

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const handleRefresh = () => {
    const day = getDayFromDate(selectedDate);
    setSelectedDay(day);
    fetchMenuForDay(day);
  };

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
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500">
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/my-stay")}
            >
              My Stays
            </span>{" "}
            &gt; <span className="font-medium">Food Menu</span>
          </div>

          {/* Top image */}
          <div className="flex justify-center">
            <img src={foodmimg} alt="Food Illustration" className="w-full max-w-xl object-contain" />
          </div>

          {/* Current Stay - Professional Design */}
          {currentStay ? (
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                <h3 className="text-xl font-semibold text-gray-900">Your Current Stay</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Hostel</span>
                  <span className="text-gray-900 font-semibold">
                    {currentStay.property?.name || currentStay.propertyId?.name || "Loading..."}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Room Number</span>
                  <span className="text-gray-900 font-semibold">{currentStay.roomNumber}</span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Room Type</span>
                  <span className="text-gray-900 font-semibold">{currentStay.roomType}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 text-center">
                  Menu is personalized for your current accommodation
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Stay</h3>
                <p className="text-gray-600 mb-4">
                  You don't have an active booking at the moment
                </p>
                <button
                  onClick={() => navigate("/my-stay")}
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors font-medium"
                >
                  View My Stays
                </button>
              </div>
            </div>
          )}

          {/* Date Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Select Date to View Menu:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Day heading */}
          <div className="text-lg font-semibold text-black border-b pb-2">
             Menu for {selectedDay || getDayFromDate(selectedDate)}
            {currentStay && (
              <span className="text-sm font-normal text-gray-600 block">
                at {currentStay.property?.name || currentStay.propertyId?.name}
              </span>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-blue-600 py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
              Loading menu...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <div className="flex justify-between items-center">
                <span>{error}</span>
                <button
                  onClick={() => setError("")}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-6">
            {[
              { time: "Breakfast (7:00 A.M - 9:00 A.M)", items: menu.Breakfast || "Menu not specified yet" },
              { time: "Lunch (12:30 P.M - 2:00 P.M)", items: menu.Lunch || "Menu not specified yet" },
              { time: "Snacks (4:30 P.M - 5:00 P.M)", items: menu.Snacks || "Menu not specified yet" },
              { time: "Dinner (07:30 P.M - 9:00 P.M)", items: menu.Dinner || "Menu not specified yet" },
            ].map((meal, i) => (
              <div key={i} className="border border-gray-200 p-4 rounded-lg hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{meal.time}</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">{meal.items}</p>
              </div>
            ))}
          </div>

          {/* Refresh Button */}
          <div className="text-center">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? "Refreshing..." : "Refresh Menu"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}