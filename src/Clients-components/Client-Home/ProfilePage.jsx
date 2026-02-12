import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import ClientNav from "../Client-Navbar/ClientNav";
import { userAPI } from "../PropertyController";
import { Link } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const menuItems = [
    { label: "Theme", hasArrow: false },
    { label: "Account Info", hasArrow: false, link: "/client/add-bank-account" },
    { label: "Manage Properties", hasArrow: true, link: "/client/tenantlist" },
    { label: "Booking Dashboard", hasArrow: true, link: "/client/tenantrequest" },
    { label: "Payment Management", hasArrow: true, link: "/client/payment" },
    { label: "Tenant List", hasArrow: true, link: "/client/tenantlist" },
    { label: "My wallet", hasArrow: true, link: "/client/payment-history" },
    { label: "Help & support", hasArrow: true },
    { label: "Term & policy", hasArrow: true }
  ];

  const fetchUser = async () => {
    try {
      const res = await userAPI.getUser();
      const user = res.data.user;
      
      // Add timestamp to force image refresh
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
    // Force refresh of profile data
    setRefreshTrigger(prev => prev + 1);
    closeEditModal();
  };

  if (!profile) {
    return (
      <div>
        <ClientNav />
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Default profile image
  const defaultProfileImage = "https://randomuser.me/api/portraits/men/75.jpg";

  // Get profile image with cache-busting
  const getProfileImageUrl = () => {
    if (!profile.profileImage) return defaultProfileImage;
    
    // Add timestamp to prevent caching
    const timestamp = profile._timestamp || Date.now();
    return `${profile.profileImage}?t=${timestamp}`;
  };

  return (
    <div>
      <ClientNav />
      <div className="min-h-screen bg-gray-100 p-6 text-gray-800 py-24">
        {/* Profile Info */}
        <div className="flex items-center gap-10 mb-10">
          <div className="flex items-center space-x-4">
            <img
              src={getProfileImageUrl()}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
              key={profile._timestamp} // Force re-render when timestamp changes
              onError={(e) => {
                e.target.src = defaultProfileImage;
              }}
            />
            <div>
              <h2 className="font-semibold text-lg">{profile.name}</h2>
              <p className="text-sm text-gray-600">{profile.location}</p>
              <p className="text-sm text-gray-600">{profile.phone}</p>
              {profile.clientId && (
                <p className="text-xs text-gray-500 mt-1">ID: {profile.clientId}</p>
              )}
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
        <div className="space-y-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm font-medium border-b pb-2 border-gray-300 hover:bg-gray-50 transition-colors p-2 rounded"
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
            <div className="flex justify-end px-4 sticky top-0 bg-white z-10">
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
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
  );
};

export default ProfilePage;