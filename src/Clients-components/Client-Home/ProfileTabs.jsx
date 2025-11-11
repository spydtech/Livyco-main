import React, { useState, useEffect } from "react";
import { userAPI } from "../../Clients-components/PropertyController";

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#facc14]"></div>
  </div>
);

const ProfileTabs = ({ profile, onComplete }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    profession: "",
    clientId: "",
    guardianName: "",
    guardianContact: "",
    aadharNumber: "",
    whatsappUpdates: false,
  });

  // Initialize form data when profile changes
  useEffect(() => {
    if (profile) {
      // Normalize gender
      const normalizedGender = profile.gender
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase()
        : "";

      // Format DOB
      let formattedDob = "";
      if (profile.dob) {
        try {
          formattedDob = String(profile.dob).substring(0, 10);
        } catch (error) {
          console.error("Error parsing DOB:", error);
        }
      }

      setFormData({
        name: profile.name || "",
        location: profile.location || "",
        phone: profile.phone || "",
        email: profile.email || "",
        gender: normalizedGender,
        dob: formattedDob,
        profession: profile.userType || "",
        clientId: profile.clientId || "",
        guardianName: profile.guardianName || "",
        guardianContact: profile.guardianContact || "",
        aadharNumber: profile.aadhar || "",
        whatsappUpdates: profile.whatsappUpdates || false,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      // Prepare the data for API submission (same structure as working ProfileEdit)
      const payload = {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender.toLowerCase(),
        dob: formData.dob ? new Date(formData.dob).toISOString() : "",
        userType: formData.profession,
        guardianName: formData.guardianName,
        guardianContact: formData.guardianContact,
        aadhar: formData.aadharNumber,
        whatsappUpdates: formData.whatsappUpdates,
      };

      // console.log("Saving profile data:", payload);

      // Use the same API call as working ProfileEdit
      const res = await userAPI.updateUser(payload);

      if (res.data && res.data.success) {
        alert("Profile Updated Successfully ✅");
        if (onComplete) onComplete(res.data.user);
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Failed to update profile"}`);
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full bg-white p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg  h-[600px] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 ">
          <div
            onClick={() => setActiveTab("basic")}
            className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "basic"
                ? "text-[#facc14] border-b-2 border-[#facc14]"
                : "text-gray-400 hover:text-[#facc14] border-b-2 border-transparent"
            }`}
          >
            Basic Info
          </div>
          <div
            onClick={() => setActiveTab("contact")}
            className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "contact"
                ? "text-[#facc14] border-b-2 border-[#facc14]"
                : "text-gray-400 hover:text-[#facc14] border-b-2 border-transparent"
            }`}
          >
            Contact Info
          </div>
          <div
            onClick={() => setActiveTab("professional")}
            className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "professional"
                ? "text-[#facc14] border-b-2 border-[#facc14]"
                : "text-gray-400 hover:text-[#facc14] border-b-2 border-transparent"
            }`}
          >
            Professional Info
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "basic" && (
            <>
              <div>
                <label className="block mb-1">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Client ID*</label>
                <input
                  type="text"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-gray-100"
                  required
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Date of Birth*</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </>
          )}

          {activeTab === "contact" && (
            <>
              <div>
                <label className="block mb-1">Mobile Number*</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="whatsappUpdates"
                    checked={formData.whatsappUpdates}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Get Updates on WhatsApp
                </label>
              </div>

              <div>
                <label className="block mb-1">Email ID*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </>
          )}

          {activeTab === "professional" && (
            <>
              <div>
                <label className="block mb-1">Aadhar Card Number*</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-center mt-6 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-1/3 bg-[#facc14] text-black py-2 rounded disabled:opacity-50 hover:bg-[#facc14] transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;