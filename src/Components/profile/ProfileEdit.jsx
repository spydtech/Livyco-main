// ProfileEdit.jsx
import React, { useState, useEffect } from "react";
import { userAPI } from "../../Clients-components/PropertyController"; // Import your real API

// Stepper component with fully clickable tabs
const Stepper = ({ step, setStep }) => {
  const steps = ["Basic Details", "Contact Information", "KYC Information"];
  
  const handleTabClick = (index) => {
    // Allow clicking any tab in any order
    setStep(index + 1);
  };

  return (
    <div className="flex justify-between mb-6 border-b">
      {steps.map((label, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(index)}
          className={`pb-2 cursor-pointer text-sm font-medium transition-colors duration-200 ${
            step === index + 1
              ? "text-[#facc14] border-b-2 border-[#facc14]"
              : "text-gray-600 border-b-2 border-transparent hover:text-[#facc14]"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#facc14]"></div>
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
        <label className="block mb-1">Full Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={loading}
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">Location Name*</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email ID*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Gender*</label>
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
        <label className="block mb-1">Date of Birth*</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#facc14] text-black py-2 rounded disabled:opacity-50 hover:bg-[#e6b800] transition-colors"
        disabled={loading}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </form>
  );
};

// Contact Info component - FIXED: Proper field mapping including institute
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
        <label className="block mb-1">Mobile Number*</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
        <label className="block mb-1">I'm a*</label>
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
          <label className="block mb-1">Institute Name*</label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required={formData.profession === "student"}
            disabled={loading}
            placeholder="Enter your institute/college name"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">Guardian Name</label>
        <input
          type="text"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">Guardian Contact Number</label>
        <input
          type="text"
          name="guardianContact"
          value={formData.guardianContact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={loading}
        />
      </div>

      <div className="flex justify-between gap-4">
        <button 
          type="button" 
          onClick={handlePrev} 
          className="flex-1 bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
          disabled={loading}
        >
          Back
        </button>
        <button 
          type="submit" 
          className="flex-1 bg-[#facc14] px-6 py-2 rounded disabled:opacity-50 hover:bg-[#e6b800] transition-colors"
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
      <div className="mb-4">
        <label className="block mb-1">Aadhar Card Number*</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={loading}
        />
      </div>

      {/* <div className="mb-6">
        <label className="block mb-1">Upload Aadhar Photo*</label>
        <input
          type="file"
          name="aadharPhoto"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={loading}
        />
        {formData.aadharPhoto && (
          <p className="text-sm text-green-600 mt-1">File selected: {formData.aadharPhoto.name}</p>
        )}
      </div> */}

      <div className="flex justify-between gap-4">
        <button 
          type="button" 
          onClick={handlePrev} 
          className="flex-1 bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
          disabled={loading}
        >
          Back
        </button>
        <button 
          type="submit" 
          className="flex-1 bg-[#facc14] px-6 py-2 rounded disabled:opacity-50 hover:bg-[#e6b800] transition-colors"
          disabled={loading}
        >
          {loading ? "Updating..." : "Done"}
        </button>
      </div>
    </form>
  );
};

// Main ProfileEdit component - FIXED: Using real API and better DOB handling
const ProfileEdit = ({ onComplete, onClose, profile }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

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
    aadharPhoto: null,
  });

  // Update formData when profile changes - FIXED: Include institute data
  useEffect(() => {
    if (profile && !dataLoaded) {
      console.log("Loading profile data:", profile);
      
      // Normalize gender: convert "female" to "Female", "male" to "Male"
      const normalizedGender = profile.gender 
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase()
        : "";

      // Map userType to profession (API has userType, form uses profession)
      const mappedProfession = profile.userType || "";

      // FIXED: Simple DOB extraction
      let formattedDob = "";
      if (profile.dob) {
        try {
          // Simple string extraction for ISO format
          formattedDob = String(profile.dob).substring(0, 10);
          console.log("DOB conversion:", { original: profile.dob, formatted: formattedDob });
        } catch (error) {
          console.error("Error parsing DOB:", error);
        }
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
        institute: profile.institute || "", // ADDED: Populate institute from API
        guardianName: profile.guardianName || "",
        guardianContact: profile.guardianContact || "",
        aadharNumber: profile.aadhar || "",
      }));
      setDataLoaded(true);
    }
  }, [profile, dataLoaded]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the data for API submission
      const payload = {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender.toLowerCase(),
        dob: formData.dob ? new Date(formData.dob).toISOString() : "",
        userType: formData.profession,
        institute: formData.institute || "", // Ensure institute is included
        guardianName: formData.guardianName,
        guardianContact: formData.guardianContact,
        aadhar: formData.aadharNumber,
        whatsappUpdates: formData.whatsappUpdates,
      };

      console.log("Submitting payload to real API:", payload);

      // FIXED: Use the real API call instead of mock
      const res = await userAPI.updateUser(payload);
      console.log("API Response:", res);
      
      if (res.data && res.data.success) {
        alert("Profile Updated Successfully ✅");
        onComplete(); // Refresh parent component and close modal
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

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md h-[600px] overflow-y-auto">
        {/* Show loading when initial data is being loaded */}
        {!dataLoaded && profile ? (
          <div className="text-center h-full flex items-center justify-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-2">Loading your profile data...</p>
          </div>
        ) : (
          <>
            {/* Stepper with fully clickable tabs */}
            <Stepper step={step} setStep={setStep} />
            {/* Steps - Pass loading state to each step */}
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