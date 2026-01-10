// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { ChevronRight } from "lucide-react";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { userAPI } from "../PropertyController";
// import { Link } from "react-router-dom";
// import ProfileTabs from "./ProfileTabs";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const menuItems = [
//     { label: "Theme", hasArrow: false },
//     { label: "Account Info", hasArrow: false, link: "/client/add-bank-account" },
//     { label: "Manage Properties", hasArrow: true, link: "/client/tenantlist" },
//     { label: "Booking Dashboard", hasArrow: true, link: "/client/tenantrequest" },
//     { label: "Payment Management", hasArrow: true, link: "/client/payment" },
//     { label: "Tenant List", hasArrow: true, link: "/client/tenantlist" },
//     { label: "My wallet", hasArrow: true, link: "/client/payment-history" },
//     { label: "Help & support", hasArrow: true },
//     { label: "Term & policy", hasArrow: true }
//   ];

//   const fetchUser = async () => {
//     try {
//       const res = await userAPI.getUser();
//       const user = res.data.user;
      
//       // Add timestamp to force image refresh
//       const updatedUser = {
//         ...user,
//         _timestamp: Date.now()
//       };
      
//       setProfile(updatedUser);
//     } catch (err) {
//       console.error("Error fetching user", err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [refreshTrigger]);

//   const openEditModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleProfileUpdateComplete = (updatedUser) => {
//     // Force refresh of profile data
//     setRefreshTrigger(prev => prev + 1);
//     closeEditModal();
//   };

//   if (!profile) {
//     return (
//       <div>
//         <ClientNav />
//         <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading profile...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Default profile image
//   const defaultProfileImage = "https://randomuser.me/api/portraits/men/75.jpg";

//   // Get profile image with cache-busting
//   const getProfileImageUrl = () => {
//     if (!profile.profileImage) return defaultProfileImage;
    
//     // Add timestamp to prevent caching
//     const timestamp = profile._timestamp || Date.now();
//     return `${profile.profileImage}?t=${timestamp}`;
//   };

//   return (
//     <div>
//       <ClientNav />
//       <div className="min-h-screen bg-gray-100 p-6 text-gray-800 py-24">
//         {/* Profile Info */}
//         <div className="flex items-center gap-10 mb-10">
//           <div className="flex items-center space-x-4">
//             <img
//               src={getProfileImageUrl()}
//               alt="Profile"
//               className="w-16 h-16 rounded-full object-cover"
//               key={profile._timestamp} // Force re-render when timestamp changes
//               onError={(e) => {
//                 e.target.src = defaultProfileImage;
//               }}
//             />
//             <div>
//               <h2 className="font-semibold text-lg">{profile.name}</h2>
//               <p className="text-sm text-gray-600">{profile.location}</p>
//               <p className="text-sm text-gray-600">{profile.phone}</p>
//               {profile.clientId && (
//                 <p className="text-xs text-gray-500 mt-1">ID: {profile.clientId}</p>
//               )}
//             </div>
//           </div>
//           <div
//             className="p-2 bg-gray-700 text-white rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
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
//               className="flex justify-between items-center text-sm font-medium border-b pb-2 border-gray-300 hover:bg-gray-50 transition-colors p-2 rounded"
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
//             <div className="flex justify-end px-4 sticky top-0 bg-white z-10">
//               <button
//                 onClick={closeEditModal}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 &times;
//               </button>
//             </div>
//             <ProfileTabs
//               profile={profile}
//               onComplete={handleProfileUpdateComplete}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPalette, FaWallet, FaQuestionCircle, FaFileContract, FaCheck } from "react-icons/fa";
import { 
  ChevronRight, 
  User, 
  Home, 
  Calendar, 
  CreditCard, 
  Users,
  Building,
  Bell,
  Shield,
  Sparkles,
  Zap
} from "lucide-react";
import ClientNav from "../Client-Navbar/ClientNav";
import { userAPI } from "../PropertyController";
import { Link } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";
import profileImg from '../../assets/profile/undraw_pic-profile_nr49.png';import
bgImg from '../../assets/user/pgsearch/image (5).png';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTheme, setActiveTheme] = useState('light');
  const navigate = useNavigate();

  const menuItems = [
    { label: "Theme", hasArrow: false, icon: <FaPalette className="w-5 h-5" />, action: () => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light') },
    { label: "Account Info", hasArrow: true, icon: <User className="w-5 h-5" />, link: "/client/add-bank-account" },
    { label: "Manage Properties", hasArrow: true, icon: <Building className="w-5 h-5" />, link: "/client/tenantlist", highlight: true },
    { label: "Booking Dashboard", hasArrow: true, icon: <Calendar className="w-5 h-5" />, link: "/client/tenantrequest" },
    { label: "Payment Management", hasArrow: true, icon: <CreditCard className="w-5 h-5" />, link: "/client/payment" },
    { label: "Tenant List", hasArrow: true, icon: <Users className="w-5 h-5" />, link: "/client/tenantlist" },
    { label: "My Wallet", hasArrow: true, icon: <FaWallet className="w-5 h-5" />, link: "/client/payment-history" },
    { label: "Help & Support", hasArrow: true, icon: <FaQuestionCircle className="w-5 h-5" />, link: "/client/supportdashboard" },
    { label: "Terms & Policy", hasArrow: true, icon: <FaFileContract className="w-5 h-5" /> },
  ];

  const stats = [
    { label: "Properties", value: "12", icon: <Building className="w-4 h-4" />, change: "+2" },
    { label: "Tenants", value: "8", icon: <Users className="w-4 h-4" />, change: "+1" },
    { label: "Bookings", value: "24", icon: <Calendar className="w-4 h-4" />, change: "+5" },
    { label: "Wallet", value: "$2,540", icon: <FaWallet className="w-4 h-4" />, change: "+$320" },
  ];

  const fetchUser = async () => {
    try {
      const res = await userAPI.getUser();
      const user = res.data.user;
      
      const updatedUser = {
        ...user,
        _timestamp: Date.now()
      };
      
      setProfile(updatedUser);
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [refreshTrigger]);

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdateComplete = (updatedUser) => {
    setRefreshTrigger(prev => prev + 1);
    closeEditModal();
  };

  if (!profile) {
    return (
      <div>
        <ClientNav />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const defaultProfileImage = profileImg;
  const getProfileImageUrl = () => {
    if (!profile.profileImage) return defaultProfileImage;
    const timestamp = profile._timestamp || Date.now();
    return `${profile.profileImage}?t=${timestamp}`;
  };

  return (
    <>
<    ClientNav />
    <div 
    style={{ backgroundImage: `url('${bgImg}')` }}
    className={`min-h-screen transition-colors duration-300 ${activeTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      
      
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className={`text-3xl md:text-xl font-bold ${activeTheme === 'dark' ? 'text-gray-900' : 'text-gray-900'}`}>
              My Profile
            </h1>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <Shield className="w-4 h-4 text-green-500" />
                <span className={`text-sm font-medium ${activeTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Verified Account
                </span>
              </div>
              <button 
                onClick={() => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light')}
                className={`p-3 rounded-full ${activeTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow-sm'}`}
              >
                <Sparkles className={`w-5 h-5 ${activeTheme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`} />
              </button>
            </div>
          </div>
          <p className={`text-lg ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account, properties, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card - Left Column */}
          <div className={`lg:col-span-2 rounded-2xl p-6 md:p-8 ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}  border ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              {/* Profile Image with Decorative Elements */}
              <div className="relative">
                <div className={`absolute -inset-4 rounded-full ${activeTheme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}></div>
                <div className="relative">
                  <img
                    src={getProfileImageUrl()}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    key={profile._timestamp}
                    onError={(e) => {
                      e.target.src = defaultProfileImage;
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2">
                    <button
                      onClick={openEditModal}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                      title="Edit Profile"
                    >
                      <FaEdit size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className={`text-2xl md:text-3xl font-bold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {profile.name}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${activeTheme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                        <FaCheck className="inline mr-1" size={12} /> Active
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className={`flex items-center gap-2 ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Home className="w-5 h-5" />
                        <span>{profile.location || "Add location"}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Bell className="w-5 h-5" />
                        <span>{profile.phone || "Add phone"}</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {stats.map((stat, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl ${activeTheme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} border ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-medium ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {stat.label}
                            </span>
                            <div className={`p-1 rounded ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                              {stat.icon}
                            </div>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-xl font-bold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {stat.value}
                            </span>
                            <span className="text-xs font-medium text-green-600">
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Tags */}
                <div className="flex flex-wrap gap-3">
                  {profile.clientId && (
                    <div className={`px-4 py-2 rounded-full ${activeTheme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'} text-sm font-medium flex items-center gap-2`}>
                      <Zap className="w-4 h-4" />
                      ID: {profile.clientId}
                    </div>
                  )}
                  {profile.email && (
                    <div className={`px-4 py-2 rounded-full ${activeTheme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} text-sm font-medium`}>
                      ✉️ {profile.email}
                    </div>
                  )}
                  {profile.role && (
                    <div className={`px-4 py-2 rounded-full ${activeTheme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'} text-sm font-medium`}>
                      👑 {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={openEditModal}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center gap-3  hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaEdit size={16} />
                Edit Profile
              </button>
            
                <button 
                  onClick={() => navigate('/client/calendar')} // Add this navigation
                  className={`px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 ${activeTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  <Calendar className="w-5 h-5" />
                  View Calendar
                </button>
              <button className={`px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 ${activeTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                <CreditCard className="w-5 h-5" />
                Billing
              </button>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className={`rounded-2xl p-6 ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}  border-2 ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Sparkles className="w-6 h-6 text-blue-500" />
              Quick Stats
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${activeTheme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} border ${activeTheme === 'dark' ? 'border-gray-700' : 'border-blue-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${activeTheme === 'dark' ? 'text-gray-400' : 'text-blue-800'}`}>Profile Completion</span>
                  <span className="text-lg font-bold text-blue-600">85%</span>
                </div>
                <div className={`h-2 rounded-full ${activeTheme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                </div>
              </div>

              <div className={`p-4 rounded-xl ${activeTheme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} border ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`block text-sm font-medium ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Next Payment</span>
                    <span className={`text-xl font-bold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>$1,250</span>
                  </div>
                  <div className={`p-3 rounded-full ${activeTheme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>
                <span className={`text-xs ${activeTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Due in 3 days</span>
              </div>

              <div className={`p-4 rounded-xl ${activeTheme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} border ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`block text-sm font-medium ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Tenants</span>
                    <span className={`text-xl font-bold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>8</span>
                  </div>
                  <div className={`p-3 rounded-full ${activeTheme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <span className={`text-xs ${activeTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>All payments current</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className={`text-sm font-semibold mb-4 ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>RECENT ACTIVITY</h4>
              <div className="space-y-3">
                {['Property uploaded', 'Payment received', 'New tenant approved'].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <span className={`text-sm ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{activity}</span>
                    <span className={`text-xs ml-auto ${activeTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>2h ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className={`rounded-2xl overflow-hidden ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="p-6 md:p-8 border-b ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-100'}">
            <h3 className={`text-2xl font-bold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Account Settings</h3>
            <p className={`mt-2 ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your account preferences, properties, and settings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className={`group border ${activeTheme === 'dark' ? 'border-gray-700 hover:bg-gray-900/50' : 'border-gray-100 hover:bg-gray-50'} transition-all duration-200 ${item.highlight ? 'relative overflow-hidden' : ''}`}
              >
                {item.highlight && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}
                
                {item.link ? (
                  <Link 
                    to={item.link} 
                    className="block p-6"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${activeTheme === 'dark' ? 'bg-gray-900 text-blue-400' : 'bg-blue-50 text-blue-600'} group-hover:scale-110 transition-transform duration-200`}>
                          {item.icon}
                        </div>
                        <div>
                          <span className={`block font-semibold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.label}
                          </span>
                          <span className={`text-sm mt-1 ${activeTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {item.label === "Theme" ? "Switch between themes" : 
                             item.label === "Account Info" ? "Bank details & security" :
                             item.label === "Manage Properties" ? "View and manage properties" :
                             item.label === "Booking Dashboard" ? "Calendar & reservations" :
                             item.label === "Payment Management" ? "Invoices & transactions" :
                             item.label === "Tenant List" ? "All tenant information" :
                             item.label === "My Wallet" ? "Balance & history" :
                             item.label === "Help & Support" ? "FAQ & contact" :
                             "Legal documents"}
                          </span>
                        </div>
                      </div>
                      {item.hasArrow && (
                        <ChevronRight className={`w-5 h-5 ${activeTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'} group-hover:translate-x-1 transition-transform duration-200`} />
                      )}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="w-full text-left p-6"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${activeTheme === 'dark' ? 'bg-gray-900 text-blue-400' : 'bg-blue-50 text-blue-600'} group-hover:scale-110 transition-transform duration-200`}>
                          {item.icon}
                        </div>
                        <div>
                          <span className={`block font-semibold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.label}
                          </span>
                          <span className={`text-sm mt-1 ${activeTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {item.label === "Theme" ? `Switch to ${activeTheme === 'light' ? 'dark' : 'light'} mode` : "Legal documents & policies"}
                          </span>
                        </div>
                      </div>
                      {item.hasArrow && (
                        <ChevronRight className={`w-5 h-5 ${activeTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'} group-hover:translate-x-1 transition-transform duration-200`} />
                      )}
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className={`mt-8 text-center ${activeTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
          <p className="text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <div className={`rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="sticky top-0  border-b flex justify-between items-center z-10 bg-inherit">
              <h3 className={` font-bold ${activeTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              
              </h3>
              <button
                onClick={closeEditModal}
                className={`p-2 rounded-full ${activeTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <span className={`text-2xl ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>&times;</span>
              </button>
            </div>
            <ProfileTabs
              profile={profile}
              onComplete={handleProfileUpdateComplete}
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfilePage;