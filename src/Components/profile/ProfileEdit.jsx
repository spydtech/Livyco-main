// ProfileEdit.jsx
import React, { useState, useEffect, useRef } from "react";
import { userAPI } from "../../Clients-components/PropertyController";

// Profile Image Component for the top
const ProfileImageTop = ({ currentImage, onImageChange, loading, onSaveImage }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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
      await onSaveImage(imageFile);
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
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        {/* Profile Image with Edit Overlay */}
        <div 
          onClick={handleImageClick}
          className={`w-24 h-24 rounded-full overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90 ${
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
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {/* Camera Icon Overlay */}
          <div className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Uploading Spinner */}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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

// Stepper component with profile image at top
const StepperWithProfile = ({ step, setStep, profileImage, onProfileImageChange, onSaveImage, loading }) => {
  const steps = ["Basic Details", "Contact Information", "KYC Information"];
  
  const handleTabClick = (index) => {
    setStep(index + 1);
  };

  return (
    <div className="mb-6">
      {/* Profile Image at Top Center */}
      <div className="flex justify-center mb-4">
        <ProfileImageTop 
          currentImage={profileImage}
          onImageChange={onProfileImageChange}
          onSaveImage={onSaveImage}
          loading={loading}
        />
      </div>
      
      {/* Tabs */}
      <div className="flex justify-between border-b">
        {steps.map((label, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(index)}
            className={`pb-2 cursor-pointer text-sm font-medium transition-colors duration-200 ${
              step === index + 1
                ? "text-yellow-600 border-b-2 border-yellow-600"
                : "text-gray-600 border-b-2 border-transparent hover:text-yellow-600"
            }`}
            style={{ flex: 1, textAlign: 'center' }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
  </div>
);

// Basic Details component
const BasicDetails = ({ formData, handleChange, handleNext, loading }) => {
  const handleValidation = () => {
    if (!formData.name || !formData.email || !formData.gender || !formData.dob) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleValidation()) handleNext();
      }}
    >
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Full Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
          disabled={loading}
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Location Name*</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Email ID*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Gender*</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male" || formData.gender === "male"}
              onChange={handleChange}
              disabled={loading}
              className="mr-2"
              required
            /> 
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female" || formData.gender === "female"}
              onChange={handleChange}
              disabled={loading}
              className="mr-2"
              required
            /> 
            Female
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">Date of Birth*</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-yellow-500 text-black py-2 rounded font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </form>
  );
};

// Contact Info component
const ContactInfo = ({ formData, handleChange, handleNext, handlePrev, loading }) => {
  const handleValidation = () => {
    if (!formData.phone || !formData.profession) {
      alert("Please fill all required fields.");
      return false;
    }
    
    // Additional validation for students
    if (formData.profession === "student" && !formData.institute) {
      alert("Please fill Institute Name for students.");
      return false;
    }
    
    return true;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleValidation()) handleNext();
      }}
    >
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Mobile Number*</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="whatsappUpdates"
            checked={formData.whatsappUpdates}
            onChange={handleChange}
            disabled={loading}
            className="mr-2"
          /> 
          Get Updates on WhatsApp
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">I'm a*</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="profession"
              value="professional"
              checked={formData.profession === "professional"}
              onChange={handleChange}
              disabled={loading}
              className="mr-2"
              required
            /> 
            Professional
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="profession"
              value="student"
              checked={formData.profession === "student"}
              onChange={handleChange}
              disabled={loading}
              className="mr-2"
              required
            /> 
            Student
          </label>
        </div>
      </div>

      {formData.profession === "student" && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Institute Name*</label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            required={formData.profession === "student"}
            disabled={loading}
            placeholder="Enter your institute/college name"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Guardian Name</label>
        <input
          type="text"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">Guardian Contact Number</label>
        <input
          type="text"
          name="guardianContact"
          value={formData.guardianContact}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          disabled={loading}
        />
      </div>

      <div className="flex justify-between gap-4">
        <button 
          type="button" 
          onClick={handlePrev} 
          className="flex-1 bg-gray-300 px-4 py-2 rounded font-medium hover:bg-gray-400 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Back
        </button>
        <button 
          type="submit" 
          className="flex-1 bg-yellow-500 px-6 py-2 rounded font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </form>
  );
};

// KYC Info component
const KYCInfo = ({ formData, handleChange, handlePrev, handleSubmit, loading }) => {
  const handleValidation = () => {
    if (!formData.aadharNumber) {
      alert("Please fill Aadhar Card Number.");
      return false;
    }
    return true;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleValidation()) handleSubmit(e);
      }}
    >
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">Aadhar Card Number*</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
          disabled={loading}
        />
      </div>

      <div className="flex justify-between gap-4">
        <button 
          type="button" 
          onClick={handlePrev} 
          className="flex-1 bg-gray-300 px-4 py-2 rounded font-medium hover:bg-gray-400 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Back
        </button>
        <button 
          type="submit" 
          className="flex-1 bg-yellow-500 px-6 py-2 rounded font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Done"}
        </button>
      </div>
    </form>
  );
};

// Main ProfileEdit component
const ProfileEdit = ({ onComplete, onClose, profile }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Initialize formData with profile data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    gender: "",
    dob: "",
    whatsappUpdates: false,
    profession: "",
    institute: "",
    guardianName: "",
    guardianContact: "",
    aadharNumber: "",
  });

  // Update formData when profile changes
  useEffect(() => {
    if (profile && !dataLoaded) {
      // Normalize gender
      const normalizedGender = profile.gender 
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase()
        : "";

      // Map userType to profession
      const mappedProfession = profile.userType || "";

      // Format DOB
      let formattedDob = "";
      if (profile.dob) {
        try {
          formattedDob = String(profile.dob).substring(0, 10);
        } catch (error) {
          console.error("Error parsing DOB:", error);
        }
      }

      // Set profile image from database
      if (profile.profileImage) {
        setProfileImage(profile.profileImage);
      }

      setFormData(prev => ({
        ...prev,
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        location: profile.location || "",
        gender: normalizedGender,
        dob: formattedDob,
        profession: mappedProfession,
        institute: profile.institute || "",
        guardianName: profile.guardianName || "",
        guardianContact: profile.guardianContact || "",
        aadharNumber: profile.aadhar || "",
        whatsappUpdates: profile.whatsappUpdates || false,
      }));
      setDataLoaded(true);
    }
  }, [profile, dataLoaded]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      const formData = new FormData();
      formData.append('profileImage', file);
      
      // Call the uploadProfileImage API
      const response = await userAPI.uploadProfileImage(formData);
      
      if (response.data && response.data.success) {
        // Get the updated image URL from response
        const uploadedImageUrl = response.data.profileImage || response.data.user?.profileImage;
        
        if (uploadedImageUrl) {
          // Update local state
          setProfileImage(uploadedImageUrl);
          setProfileImageFile(null);
          
          return true;
        }
      }
      
      throw new Error("Failed to upload image");
    } catch (error) {
      alert("Failed to save image. Please try again.");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare payload
      const payload = {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender.toLowerCase(),
        dob: formData.dob ? new Date(formData.dob).toISOString() : "",
        userType: formData.profession,
        institute: formData.institute || "",
        guardianName: formData.guardianName,
        guardianContact: formData.guardianContact,
        aadhar: formData.aadharNumber,
        whatsappUpdates: formData.whatsappUpdates,
      };

      // Upload profile image if there's a new one
      if (profileImageFile) {
        await handleSaveProfileImage(profileImageFile);
      }

      // Update user data
      const res = await userAPI.updateUser(payload);
      
      if (res.data && res.data.success) {
        // Force complete refresh from server
        try {
          const userRes = await userAPI.getUser();
          if (userRes.data?.user) {
            localStorage.setItem('user', JSON.stringify(userRes.data.user));
          }
        } catch (refreshError) {
          console.error("Error refreshing user data:", refreshError);
        }
        
        alert("✅ Profile Updated Successfully!");
        
        // Force parent to refresh
        if (onComplete) {
          onComplete();
        }
        
        // Close modal
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 300);
        
      } else {
        alert("Failed to update profile. Please try again.");
      }
      
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message || "Failed to update profile"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md h-[600px] overflow-y-auto">
        {!dataLoaded && profile ? (
          <div className="text-center h-full flex items-center justify-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-2">Loading your profile data...</p>
          </div>
        ) : (
          <>
            <StepperWithProfile 
              step={step} 
              setStep={setStep}
              profileImage={profileImage}
              onProfileImageChange={handleProfileImageChange}
              onSaveImage={handleSaveProfileImage}
              loading={loading}
            />
            
            {step === 1 && (
              <BasicDetails 
                formData={formData} 
                handleChange={handleChange} 
                handleNext={handleNext} 
                loading={loading}
              />
            )}
            {step === 2 && (
              <ContactInfo
                formData={formData}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrev={handlePrev}
                loading={loading}
              />
            )}
            {step === 3 && (
              <KYCInfo
                formData={formData}
                handleChange={handleChange}
                handlePrev={handlePrev}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;