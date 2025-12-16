import React from "react";
import { useEffect, useState } from "react";
import { 
  FaEdit, FaMoon, FaHome, FaCreditCard, FaHistory, 
  FaQuestionCircle, FaFileContract, FaSignOutAlt, 
  FaComments, FaTrash, FaPhone 
} from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { userAPI } from "../../Clients-components/PropertyController";
import ProfileEdit from "./ProfileEdit";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Theme", hasArrow: false, icon: <FaMoon className="w-4 h-4" /> },
    { label: "My Stay", hasArrow: true, link: "/user/my-stay", icon: <FaHome className="w-4 h-4" /> },
    { label: "Pay Rent", hasArrow: true, link: "/user/pay-rent", icon: <FaCreditCard className="w-4 h-4" /> },
    { label: "Payment history", hasArrow: true, link: "/user/payment-history", icon: <FaHistory className="w-4 h-4" /> },
    { label: "My Concerns", hasArrow: true, link: "/user/raise-concern", icon: <FaComments className="w-4 h-4" /> },
    { label: "Contacted List", hasArrow: true, link: "/user/contacted-list", icon: <FaPhone className="w-4 h-4" /> },
    { label: "Help & support", hasArrow: true, icon: <FaQuestionCircle className="w-4 h-4" /> },
    { label: "Term & policy", hasArrow: true, icon: <FaFileContract className="w-4 h-4" /> },
    { label: "Delete Account", hasArrow: true, icon: <FaTrash className="w-4 h-4" />, isDelete: true },
    { label: "Logout", hasArrow: false, icon: <FaSignOutAlt className="w-4 h-4" />, isLogout: true }
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
  };

  const handleProfileCreationComplete = () => {
    fetchUser();
    closeEditModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await userAPI.deleteUserAccount();
      
      // Clear all user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      alert("Your account has been permanently deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(error.message || "Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.isLogout) {
      handleLogout();
    } else if (item.isDelete) {
      handleDeleteAccount();
    }
  };

  const defaultProfileImage = "https://randomuser.me/api/portraits/men/75.jpg";

  const getProfileImageUrl = () => {
    if (!profile?.profileImage) return defaultProfileImage;
    const timestamp = profile._timestamp || Date.now();
    return `${profile.profileImage}?t=${timestamp}`;
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
              src={getProfileImageUrl()}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
              key={profile._timestamp}
              onError={(e) => e.target.src = defaultProfileImage}
            />
            <div>
              <h2 className="font-semibold text-lg">{profile.name}</h2>
              <p className="text-sm text-gray-600">{profile.location}</p>
              <p className="text-sm text-gray-600">{profile.phone}</p>
            </div>
          </div>
          <div
            className="p-2 bg-gray-700 text-white rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={openEditModal}
          >
            <FaEdit size={16} />
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center text-sm font-medium border-b pb-3 border-gray-300 cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors ${
                item.isLogout ? 'text-red-600 hover:text-red-700' : ''
              }`}
              onClick={() => handleMenuItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                <span className={`${item.isLogout ? 'text-red-600' : 'text-gray-600'}`}>
                  {item.icon}
                </span>
                {item.link ? (
                  <Link 
                    to={item.link} 
                    className="flex justify-between items-center w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className={`${item.isLogout ? 'text-red-600' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span className={`${item.isLogout ? 'text-red-600' : ''}`}>
                    {item.label}
                  </span>
                )}
              </div>
              {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end px-4 sticky top-0 bg-white z-10 border-b">
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
              profile={profile}
            />
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Account</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              All your data including profile information, payment history, and stay details will be permanently deleted.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting...
                  </>
                ) : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
// import React from "react";
// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { ChevronRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import Header from "../Header";
// import { userAPI } from "../../Clients-components/PropertyController";
// import ProfileEdit from "./ProfileEdit";
// import profileImg from '../../assets/profile/undraw_pic-profile_nr49.png';

// const UserProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const menuItems = [
//     { label: "Theme", hasArrow: false },
//     // { label: "Account Info", hasArrow: true },
//     { label: "My Stay", hasArrow: true, link: "/user/my-stay" },
//     { label: "Pay Rent", hasArrow: true, link: "/user/booking/conformation" },
//     { label: "Payment history", hasArrow: true, link: "/user/payment-history" },
//     { label: "My Concerns", hasArrow: true, link: "/user/raise-concern" },
//     // { label: "My Wallet", hasArrow: true },
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
//               src={profileImg}
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
//               {item.link ? (
//                 <Link to={item.link} className="flex justify-between items-center w-full">
//                   <span>{item.label}</span>
//                   {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
//                 </Link>
//               ) : (
//                 <>
//                   <span>{item.label}</span>
//                   {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Close button */}
//             <div className="flex justify-end px-4 sticky top-0 bg-white z-10 border-b">
//               <button
//                 onClick={closeEditModal}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 &times;
//               </button>
//             </div>
//             <ProfileEdit
//               onComplete={handleProfileCreationComplete}
//               onClose={closeEditModal}
//               profile={profile}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;