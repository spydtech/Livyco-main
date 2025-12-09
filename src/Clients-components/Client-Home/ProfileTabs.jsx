import React, { useState, useEffect, useRef } from "react";
import { userAPI } from "../../Clients-components/PropertyController";

// Profile Image Component
const ProfileImageUpload = ({ currentImage, onImageChange, loading, onSaveImage }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(currentImage || null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Reset when currentImage changes
  useEffect(() => {
    setImagePreview(currentImage);
    setImageFile(null);
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        setImagePreview(previewUrl);
        setImageFile(file);
        onImageChange(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    setIsUploading(true);
    try {
      const success = await onSaveImage(imageFile);
      if (success) {
        setImageFile(null);
      }
    } catch (error) {
      alert("Failed to save image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    if (!loading && !isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(currentImage);
    setImageFile(null);
    onImageChange(null, null);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        {/* Profile Image */}
        <div 
          onClick={handleImageClick}
          className={`w-20 h-20 rounded-full overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90 ${
            loading || isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {imagePreview ? (
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {/* Camera Icon Overlay */}
          <div className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          </div>

          {/* Uploading Spinner */}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={loading || isUploading}
        />
      </div>
      
      {/* Image Actions */}
      <div className="mt-2 flex flex-col items-center gap-2">
        <p className="text-xs text-gray-600">
          {imageFile ? "New image selected" : "Click to upload"}
        </p>
        
        {imageFile && !isUploading && (
          <button
            type="button"
            onClick={handleSaveImage}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
          >
            Save Image
          </button>
        )}
        
        {imageFile && !isUploading && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#facc14]"></div>
  </div>
);

const ProfileTabs = ({ profile, onComplete }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  
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

      // Set profile image
      if (profile.profileImage) {
        setProfileImage(profile.profileImage);
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

  const handleProfileImageChange = (file) => {
    if (file) {
      setProfileImageFile(file);
    } else {
      setProfileImage(profile.profileImage);
      setProfileImageFile(null);
    }
  };

  // Function to save profile image
  const handleSaveProfileImage = async (file) => {
    if (!file) return false;

    try {
      // Create FormData for image upload
      const imageFormData = new FormData();
      imageFormData.append('profileImage', file);
      
      const response = await userAPI.uploadProfileImage(imageFormData);
      
      if (response.data && response.data.success) {
        const uploadedImageUrl = response.data.profileImage || response.data.user?.profileImage;
        
        if (uploadedImageUrl) {
          setProfileImage(uploadedImageUrl);
          return true;
        }
      }
      
      throw new Error("Failed to upload image");
    } catch (error) {
      alert("Failed to save image. Please try again.");
      throw error;
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      // Upload profile image if there's a new one
      if (profileImageFile) {
        await handleSaveProfileImage(profileImageFile);
      }

      // Prepare the data for API submission
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

      // Update user data
      const res = await userAPI.updateUser(payload);

      if (res.data && res.data.success) {
        // Get fresh user data to include profileImage
        const userRes = await userAPI.getUser();
        if (userRes.data?.user) {
          alert("Profile Updated Successfully ✅");
          if (onComplete) onComplete(userRes.data.user);
        }
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
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg h-[600px] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>
        
        {/* Profile Image at Top */}
        <div className="flex justify-center mb-6">
          <ProfileImageUpload 
            currentImage={profileImage}
            onImageChange={handleProfileImageChange}
            onSaveImage={handleSaveProfileImage}
            loading={loading}
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
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
              className="w-1/3 bg-[#facc14] text-black py-2 rounded disabled:opacity-50 hover:bg-[#e6b800] transition-colors font-medium"
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