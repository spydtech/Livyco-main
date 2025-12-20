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
            <div className="absolute top-4 left-4   glass-panel backdrop-blur-xl bg-black/10 border border-white text-sm font-medium text-white px-3 py-1 rounded shadow">
              {cat.title}
            </div>

            {/* Features Bottom Right */}
            <div className="absolute bottom-4 right-4 bg-white  glass-badge backdrop-blur-xl bg-white/20 border border-white text-xs md:text-sm text-white px-4 py-2 rounded-md shadow-lg max-w-[70%]">
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






// import React from "react";
// import catGrid1 from "../../assets/user/home page/CategoryGrid/Catgrid1.png";
// import catGrid2 from "../../assets/user/home page/CategoryGrid/Catgrid2.png";
// import catGrid3 from "../../assets/user/home page/CategoryGrid/Catgrid3.png";
// import catGrid4 from "../../assets/user/home page/CategoryGrid/Catgrid4.png";

// const categories = [
//   {
//     title: "For Professionals",
//     image: catGrid1,
//     features: [
//       "High-Speed Internet",
//       "Locker storage facility",
//       "Air Conditioning & Heating",
//     ],
//     gradient: "from-blue-500/20 to-cyan-500/20",
//   },
//   {
//     title: "For Female",
//     image: catGrid2,
//     features: [
//       "Self Cooking",
//       "Emergency Preparedness",
//       "Power outlines & Lift",
//       "CC TV",
//     ],
//     gradient: "from-purple-500/20 to-pink-500/20",
//   },
//   {
//     title: "For Co-living",
//     image: catGrid3,
//     features: [
//       "Privacy & Security",
//       "Self Cooking facility",
//       "Washing machine & fridge",
//       "Sanitation",
//     ],
//     gradient: "from-emerald-500/20 to-teal-500/20",
//   },
//   {
//     title: "For Students",
//     image: catGrid4,
//     features: [
//       "3 Times Food & Lunch box",
//       "Power backup & T.V",
//       "Air Conditioning & Heating",
//     ],
//     gradient: "from-amber-500/20 to-orange-500/20",
//   },
// ];

// export default function CategoryGrid() {
//   return (
//     <div className="relative py-16 px-4 md:px-8 overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-200/10 to-emerald-200/10 rounded-full blur-3xl"></div>
//       </div>
      
//       <div className="relative max-w-7xl mx-auto z-10">
//         {/* Header Section */}
//         <div className="mb-12">
//           <div className="glass-effect backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 inline-block shadow-xl shadow-blue-500/10">
//             <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Choice Best one by Category
//             </h2>
//             <div className="mt-3 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//           </div>
//           <p className="text-gray-600 mt-6 text-lg max-w-2xl">
//             Discover the perfect accommodation tailored to your lifestyle and needs
//           </p>
//         </div>

//         {/* Grid with Glass Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {categories.map((cat, index) => (
//             <div
//               key={index}
//               className="relative group cursor-pointer overflow-hidden rounded-3xl"
//             >
//               {/* Glass Card Container */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-blue-500/10 group-hover:shadow-blue-500/20 transition-all duration-500"></div>
              
//               {/* Image Container */}
//               <div className="relative h-[450px] rounded-3xl overflow-hidden">
//                 {/* Gradient Overlay */}
//                 <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} to-transparent z-10`}></div>
                
//                 {/* Background Image */}
//                 <img
//                   src={cat.image}
//                   alt={cat.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
                
//                 {/* Category Badge - Glass Effect */}
//                 <div className="absolute top-6 left-6 z-20">
//                   <div className="glass-badge backdrop-blur-xl bg-white/20 border border-white/30 rounded-full px-6 py-3 shadow-xl">
//                     <span className="text-gray-800 font-bold text-lg tracking-wide">
//                       {cat.title}
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Features Panel - Glass Effect */}
//                 <div className="absolute bottom-6 right-6 z-20">
//                   <div className="glass-panel backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 max-w-md shadow-xl transform transition-transform duration-500 group-hover:translate-x-0 translate-x-2">
//                     <h3 className="text-white font-bold text-xl mb-4 drop-shadow-lg">
//                       Premium Features
//                     </h3>
//                     <ul className="space-y-3">
//                       {cat.features.map((item, i) => (
//                         <li key={i} className="flex items-center space-x-3">
//                           <div className="w-2 h-2 bg-gradient-to-r from-white to-white/70 rounded-full"></div>
//                           <span className="text-white font-medium drop-shadow-md">
//                             {item}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
                    
//                     {/* CTA Button */}
//                     <button className="mt-6 glass-button backdrop-blur-xl bg-white/20 border border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
//                       Explore Options
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Hover Effect Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"></div>
//               </div>
              
//               {/* Decorative Corner Accents */}
//               <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
//                 <div className="absolute -right-10 -top-10 w-20 h-20 bg-gradient-to-bl from-white/30 to-transparent rotate-45"></div>
//               </div>
//               <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
//                 <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-gradient-to-tr from-white/30 to-transparent rotate-45"></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="mt-12 text-center">
//           <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
//             <span className="relative z-10">View All Categories</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent skew-x-45 group-hover:left-full transition-all duration-700"></div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }