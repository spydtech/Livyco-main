import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image15 from "../../assets/user/pgsearch/Pgimg.png";
import Header from "../Header"; // Assuming you have a Header component

const MyStay_Main = () => {
  const [activeTab, setActiveTab] = useState("current");
  const navigate = useNavigate();

  const data = {
    current: {
      title: "Abc Boys Hostel",
      address: "PNo 123, abc, dfg xxxx, Hyd 500xxx",
      checkIn: "12/06/2025",
      checkOut: "NA",
      room: "Room 101 - Bed B",
      sharing: "2 Sharing",
      image: image15,
    },
    previous: {
      title: "XYZ Girls Hostel",
      address: "P No 45, Some Lane, Pune, 411xxx",
      checkIn: "01/02/2025",
      checkOut: "01/05/2025",
      room: "Room 202 - Bed A",
      sharing: "3 Sharing",
      image: image15,
    },
  };

  const activeData = data[activeTab];

  return (
    <div>
        <Header />
    <div className="max-w-6xl mx-auto px-4 py-24">
      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-8">
        {["current", "previous"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-semibold pb-2 border-b-2 ${
              activeTab === tab
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-xl flex flex-col md:flex-row gap-6 p-6 items-start md:items-center">
        {/* Image */}
        <img
          src={activeData.image}
          alt="hostel"
          className="w-full md:w-[300px] rounded-lg object-cover"
        />

        {/* Info */}
        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-semibold">{activeData.title}</h2>
          <p className="text-gray-600">{activeData.address}</p>
          <div className="text-sm text-gray-700 space-y-1">
            <p>Check in Date: {activeData.checkIn}</p>
            <p>Check out Date: {activeData.checkOut}</p>
            <div className="space-y-2 pt-2">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
                {activeData.room}
              </div>
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
                {activeData.sharing}
              </div>
            </div>
          </div>

          {/* Buttons */}
          {activeTab === "current" ? (
            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate("/user/food-menu")}
                className="w-full border border-gray-300 py-2 rounded-lg flex justify-between px-4 text-left text-sm font-medium"
              >
                Food Menu <span className="ml-auto">→</span>
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/user/raise-concern")}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
                >
                  Raise Concern
                </button>
                <button
                  onClick={() => navigate("/user/vacate-room")}
                  className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg font-semibold w-full"
                >
                  Vacate Room
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4">
              <button
                onClick={() => navigate("/refer-friend")}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
              >
                Refer to a friend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyStay_Main;
