import React from "react";
import catGrid1 from "../../assets/user/home page/CategoryGrid/Catgrid1.png";
import catGrid2 from "../../assets/user/home page/CategoryGrid/Catgrid2.png";
import catGrid3 from "../../assets/user/home page/CategoryGrid/Catgrid3.png";
import catGrid4 from "../../assets/user/home page/CategoryGrid/Catgrid4.png";


const categories = [
  {
    title: "For Professionals",
    image: catGrid1,
    features: [
      "High-Speed Internet",
      "Locker storage facility",
      "Air Conditioning & Heating",
    ],
  },
  {
    title: "For Female",
    image: catGrid2,
    features: [
      "Self Cooking",
      "Emergency Preparedness",
      "Power outlines & Lift",
      "CC TV",
    ],
  },
  {
    title: "For Co-living",
    image: catGrid3,
    features: [
      "Privacy & Security",
      "Self Cooking facility",
      "Washing machine & fridge",
      "Sanitation",
    ],
  },
  {
    title: "For Students",
    image: catGrid4,
    features: [
      "3 Times Food & Lunch box",
      "Power backup & T.V",
      "Air Conditioning & Heating",
    ],
  },
];

export default function CategoryGrid() {
  return (
    <div className="bg-[#F6F7FC] py-12 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#0032A0] mb-10 relative inline-block after:block after:w-24 after:h-[3px] after:bg-[#0032A0] after:mt-2">
        Choice Best one by Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-[400px] object-cover"
            />

            {/* Label Top Left */}
            <div className="absolute top-4 left-4 bg-white text-sm font-medium text-gray-800 px-3 py-1 rounded shadow">
              {cat.title}
            </div>

            {/* Features Bottom Right */}
            <div className="absolute bottom-4 right-4 bg-white text-xs md:text-sm text-gray-800 px-4 py-2 rounded-md shadow-lg max-w-[70%]">
              <ul className="space-y-1 list-none">
                {cat.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
