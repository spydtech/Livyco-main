import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import ClientNav from "../Client-Navbar/ClientNav";
import { userAPI } from "../PropertyController"; // adjust the path as needed
import { Link } from "react-router-dom";


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    hostel: "",
    phone: ""
  });

  const menuItems = [
    // { label: "My Profile", hasArrow: false },
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userAPI.getUser();
        const user = res.data.user; // ✅ correct access
        setProfile(user);
        setFormData({
          name: user.name || "",
          hostel: user.location || "", // location treated as hostel
          phone: user.phone || ""
        });
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    fetchUser();
  }, []);

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        location: formData.hostel, // ✅ match backend field name
        phone: formData.phone
      };
      const res = await userAPI.updateUser(payload);
      setProfile(res.data); // updated profile from backend
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <ClientNav />
      <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
        {/* Profile Info */}
        <div className="flex items-center justify-between mb-10">
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
              <Link to={item.link || "#"} className="flex items-center gap-2">
              <span>{item.label}</span>
              {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-500" />}
               </Link>
            </div>
             
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                placeholder="Hostel"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
