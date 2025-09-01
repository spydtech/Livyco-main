// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { ChevronRight } from "lucide-react";
// import Header from "../Header";
// import { userAPI } from "../../Clients-components/PropertyController"; // adjust the path as needed
// import ProfilePage from "../../Clients-components/Client-Home/ProfilePage";

// const UserProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     hostel: "",
//     phone: ""
//   });

//   const menuItems = [
//     // { label: "My Profile", hasArrow: false },
//       { label: "Theme", hasArrow: false },
//     { label: "Account Info", hasArrow: false },
  
//     { label: "Payment history", hasArrow: true },
//     { label: "My Wallet", hasArrow: true },
    
    
//     // { label: "Payment Management", hasArrow: true },
//     // { label: "Tenant List", hasArrow: true },
    
//     // { label: "My wallet", hasArrow: true },
//     { label: "Help & support", hasArrow: true },
//     { label: "Term & policy", hasArrow: true }
//   ];

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await userAPI.getUser();
//         const user = res.data.user; // ✅ correct access
//         setProfile(user);
//         setFormData({
//           name: user.name || "",
//           hostel: user.location || "", // location treated as hostel
//           phone: user.phone || ""
//         });
//       } catch (err) {
//         console.error("Error fetching user", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   const openEditModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const payload = {
//         name: formData.name,
//         location: formData.hostel, // ✅ match backend field name
//         phone: formData.phone
//       };
//       const res = await userAPI.updateUser(payload);
//       setProfile(res.data); // updated profile from backend
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error("Failed to update user", err);
//     }
//   };

//   if (!profile) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen mx-w-4xl mx-auto">
//       <Header />
//       <div className=" bg-gray-100 p-6 text-gray-800 py-24">
//         {/* Profile Info */}
//         <div className="flex items-center gap-10 mb-10">
//           <div className="flex items-center space-x-4">
//             <img
//               src={"https://randomuser.me/api/portraits/men/75.jpg"}
//               alt="Profile"
//               className="w-16 h-16 rounded-full object-cover"
//             />
//             <div>
//               <h2 className="font-semibold text-lg">{profile.name}</h2>
//               <p className="text-sm text-gray-600">{profile.location}</p>
//               <p className="text-sm text-gray-600">{profile.phone}</p>
//             </div>
//           </div>
//           <div
//             className="p-2 bg-gray-700 text-white rounded-full cursor-pointer"
//             onClick={openEditModal}
//           >
//             <FaEdit size={16} />
//           </div>
//         </div>

//         {/* Menu Items */}
//         <div className="space-y-6">
//           {menuItems.map((item, idx) => (
//             <div
//               key={idx}
//               className="flex justify-between items-center text-sm font-medium border-b pb-2 border-gray-300"
//             >
//               <span>{item.label}</span>
//               {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           {/* <div className="bg-white p-6 rounded-lg w-96 space-y-4">
//             <h2 className="text-lg font-semibold">Edit Profile</h2>
//             <div className="space-y-2">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="hostel"
//                 value={formData.hostel}
//                 onChange={handleChange}
//                 placeholder="Hostel"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div> */}
//           <ProfilePage />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


// import React from "react";
// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { ChevronRight, Link } from "lucide-react";
// import Header from "../Header";
// import { userAPI } from "../../Clients-components/PropertyController";
// import ProfileEdit from "./ProfileEdit";

// const UserProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showFullProfileCreation, setShowFullProfileCreation] = useState(false);

//   const menuItems = [
//     { label: "Theme", hasArrow: false },
//     { label: "Account Info", hasArrow: false },
//     { label: "My Stay", hasArrow: true, link: "/user/my-stay" },
//     { label: "Payment history", hasArrow: true },
//     { label: "My Wallet", hasArrow: true },
//     { label: "Help & support", hasArrow: true },
//     { label: "Term & policy", hasArrow: true }
//   ];

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await userAPI.getUser();
//       const user = res.data.user;
//       setProfile(user);
//     } catch (err) {
//       console.error("Error fetching user", err);
//     }
//   };

//   const openEditModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsModalOpen(false);
//     setShowFullProfileCreation(false);
//   };

//   const handleProfileCreationComplete = () => {
//     fetchUser(); // Refresh user data
//     closeEditModal(); // Close the modal
//   };

//   if (!profile) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="bg-gray-100 p-6 text-gray-800 py-24">
//         {/* Profile Info */}
//         <div className="flex items-center gap-10 mb-10">
//           <div className="flex items-center space-x-4">
//             <img
//               src={"https://randomuser.me/api/portraits/men/75.jpg"}
//               alt="Profile"
//               className="w-16 h-16 rounded-full object-cover"
//             />
//             <div>
//               <h2 className="font-semibold text-lg">{profile.name}</h2>
//               <p className="text-sm text-gray-600">{profile.location}</p>
//               <p className="text-sm text-gray-600">{profile.phone}</p>
//             </div>
//           </div>
//           <div
//             className="p-2 bg-gray-700 text-white rounded-full cursor-pointer"
//             onClick={openEditModal}
//           >
//             <FaEdit size={16} />
//           </div>
//         </div>

//         {/* Menu Items */}
//         <div className="space-y-6">
//           {menuItems.map((item, idx) => (
//             <div
//               key={idx}
//               className="flex justify-between items-center text-sm font-medium border-b pb-2 border-gray-300"
//             >
//               <Link to={item.link || "#"}>
//               <span>{item.label}</span>
//               {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0   flex items-center justify-center z-50 ">
//           <div className="bg-white rounded-lg w-full max-w-4xl h-[600px] overflow-y-auto  space-y-4">
//            {/* close model */}
//             <div className="flex justify-end p-4">
//               <button
//                 onClick={closeEditModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>
//             <ProfileEdit
//               onComplete={handleProfileCreationComplete}
//               onClose={closeEditModal}
//               showFullProfileCreation={showFullProfileCreation}
//               setShowFullProfileCreation={setShowFullProfileCreation}
//               profile={profile}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;



import React from "react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Changed from lucide-react import
import Header from "../Header";
import { userAPI } from "../../Clients-components/PropertyController";
import ProfileEdit from "./ProfileEdit";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullProfileCreation, setShowFullProfileCreation] = useState(false);

  const menuItems = [
    { label: "Theme", hasArrow: false },
    { label: "Account Info", hasArrow: true },
    { label: "My Stay", hasArrow: true, link: "/user/my-stay" },
    { label: "Pay Rent", hasArrow: true, link: "/user/booking/conformation" },
    { label: "Payment history", hasArrow: true, link: "/user/payment-history" },
    { label: "My Concerns", hasArrow: true, link: "/user/my-concerns" },
    { label: "My Wallet", hasArrow: true },
    { label: "Help & support", hasArrow: true },
    { label: "Term & policy", hasArrow: true }
  ];

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await userAPI.getUser();
      const user = res.data.user;
      setProfile(user);
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setShowFullProfileCreation(false);
  };

  const handleProfileCreationComplete = () => {
    fetchUser(); // Refresh user data
    closeEditModal(); // Close the modal
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="bg-gray-100 p-6 text-gray-800 py-24">
        {/* Profile Info */}
        <div className="flex items-center gap-10 mb-10">
          <div className="flex items-center space-x-4">
            <img
              src={"https://randomuser.me/api/portraits/men/75.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">{profile.name}</h2>
              <p className="text-sm text-gray-600">{profile.location}</p>
              <p className="text-sm text-gray-600">{profile.phone}</p>
            </div>
          </div>
          <div
            className="p-2 bg-gray-700 text-white rounded-full cursor-pointer"
            onClick={openEditModal}
          >
            <FaEdit size={16} />
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm font-medium border-b pb-2 border-gray-300"
            >
              {item.link ? (
                <Link to={item.link} className="flex justify-between items-center w-full">
                  <span>{item.label}</span>
                  {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
                </Link>
              ) : (
                <>
                  <span>{item.label}</span>
                  {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <div className="flex justify-end p-4 sticky top-0 bg-white z-10 border-b">
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <ProfileEdit
              onComplete={handleProfileCreationComplete}
              onClose={closeEditModal}
              showFullProfileCreation={showFullProfileCreation}
              setShowFullProfileCreation={setShowFullProfileCreation}
              profile={profile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;